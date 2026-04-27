'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

import { handleFileUpload } from '@/lib/upload';

// Improved Store Retrieval
async function getStore(storeId) {
  if (!storeId) throw new Error('Session Expired or Store ID missing');
  return await prisma.store.findUnique({
    where: { id: storeId }
  });
}


export async function getProducts({ page = 1, pageSize = 10, sortBy = 'createdAt', sortOrder = 'desc', category = '', storeId }) {
  if (!storeId) return { products: [], total: 0 };
  
  const skip = (page - 1) * pageSize;
  const where = {
    storeId,
    isDeleted: false,
    ...(category && { category })
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: pageSize
    }),
    prisma.product.count({ where })
  ]);

  return { products, total };
}

export async function createProduct(formData, storeId) {
  const store = await getStore(storeId);
  if (!store) throw new Error('Store context lost');

  const name = formData.get('name');
  const description = formData.get('description');
  const price = parseFloat(formData.get('price'));
  const category = formData.get('category');
  
  // Duplicate Check
  const existing = await prisma.product.findFirst({
    where: {
      name: { equals: name, mode: 'insensitive' },
      storeId: store.id,
      isDeleted: false
    }
  });

  if (existing) {
    throw new Error(`A product named "${name}" already exists in this store.`);
  }

  const file = formData.get('file');
  let image = formData.get('image');

  const uploadedPath = await handleFileUpload(file);
  if (uploadedPath) {
    image = uploadedPath;
  }

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      image: image || '',
      category: category || 'Uncategorized',
      storeId: store.id
    }
  });

  revalidatePath('/dashboard/owner/products');
  revalidatePath(`/shop/${store.slug}`);
}

export async function updateProduct(formData) {
  const id = formData.get('id');
  const name = formData.get('name');
  const description = formData.get('description');
  const price = parseFloat(formData.get('price'));
  const category = formData.get('category');
  
  const file = formData.get('file');
  let image = formData.get('image');

  const uploadedPath = await handleFileUpload(file);
  if (uploadedPath) {
    image = uploadedPath;
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      image,
      category
    }
  });

  const store = await prisma.store.findUnique({ where: { id: product.storeId } });
  revalidatePath('/dashboard/owner/products');
  revalidatePath(`/shop/${store.slug}`);
}

export async function deleteProduct(id) {
  const product = await prisma.product.update({
    where: { id },
    data: { isDeleted: true }
  });

  const store = await prisma.store.findUnique({ where: { id: product.storeId } });
  revalidatePath('/dashboard/owner/products');
  revalidatePath(`/shop/${store.slug}`);
}

export async function getAllProductsForExport(storeId) {
  const store = await getStore(storeId);
  if (!store) return [];
  
  return await prisma.product.findMany({
    where: { 
      storeId: store.id,
      isDeleted: false
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function bulkCreateProducts(productsList, storeId) {
  const store = await getStore(storeId);
  if (!store) throw new Error('Store not found');

  const formattedProducts = productsList.map(p => ({
    name: p.name,
    description: p.description || '',
    price: parseFloat(p.price) || 0,
    image: p.image || '',
    category: p.category || 'Uncategorized',
    storeId: store.id
  }));

  await prisma.product.createMany({
    data: formattedProducts
  });

  revalidatePath('/dashboard/owner/products');
  revalidatePath(`/shop/${store.slug}`);
  return { success: true, count: formattedProducts.length };
}
