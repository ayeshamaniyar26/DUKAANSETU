'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

// TODO: Replace with actual session auth
async function getStore(storeIdFromSession) {
  if (storeIdFromSession) {
    return await prisma.store.findUnique({
      where: { id: storeIdFromSession }
    });
  }
  
  // Fallback for now if no session is passed
  return await prisma.store.findFirst();
}

async function handleFileUpload(file) {
  if (!file || file.size === 0) return null;
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${file.name}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  const filePath = path.join(uploadDir, filename);

  await fs.writeFile(filePath, buffer);
  return `/uploads/${filename}`;
}

export async function getProducts({ page = 1, pageSize = 10, sortBy = 'createdAt', sortOrder = 'desc', category = '', storeId }) {
  const skip = (page - 1) * pageSize;
  
  const where = {
    storeId: storeId || undefined,
    isDeleted: false,
    ...(category && { category })
  };

  // If no storeId, we fallback to finding the first store (compatibility)
  if (!storeId) {
    const store = await prisma.store.findFirst();
    if (store) where.storeId = store.id;
  }

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

export async function createProduct(formData, storeIdFromSession) {
  const store = await getStore(storeIdFromSession);
  if (!store) throw new Error('Store not found');

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
    throw new Error(`Product with name "${name}" already exists in your store.`);
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
      image,
      category,
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

export async function getAllProductsForExport(storeIdFromSession) {
  const store = await getStore(storeIdFromSession);
  if (!store) return [];
  
  return await prisma.product.findMany({
    where: { 
      storeId: store.id,
      isDeleted: false
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function bulkCreateProducts(productsList) {
  const store = await getStore();
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
