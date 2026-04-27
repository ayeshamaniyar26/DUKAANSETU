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

  try {
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
  } catch (error) {
    console.error('getProducts error:', error);
    return { products: [], total: 0 };
  }
}

export async function createProduct(formData, storeId) {
  try {
    const store = await getStore(storeId);
    if (!store) return { error: 'Store context lost' };

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
      return { error: `A product named "${name}" already exists in this store.` };
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
    return { success: true };
  } catch (error) {
    console.error('createProduct error:', error);
    return { error: error.message || 'Failed to create product' };
  }
}

export async function updateProduct(formData) {
  try {
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
    return { success: true };
  } catch (error) {
    console.error('updateProduct error:', error);
    return { error: error.message || 'Failed to update product' };
  }
}

export async function deleteProduct(id) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: { isDeleted: true }
    });

    const store = await prisma.store.findUnique({ where: { id: product.storeId } });
    revalidatePath('/dashboard/owner/products');
    revalidatePath(`/shop/${store.slug}`);
    return { success: true };
  } catch (error) {
    console.error('deleteProduct error:', error);
    return { error: 'Failed to delete product' };
  }
}

export async function getAllProductsForExport(storeId) {
  try {
    const store = await getStore(storeId);
    if (!store) return [];
    
    return await prisma.product.findMany({
      where: { 
        storeId: store.id,
        isDeleted: false
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    return [];
  }
}

export async function bulkCreateProducts(productsList, storeId) {
  try {
    const store = await getStore(storeId);
    if (!store) return { error: 'Store not found' };

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
  } catch (error) {
    console.error('bulkCreateProducts error:', error);
    return { error: error.message || 'Bulk creation failed' };
  }
}
