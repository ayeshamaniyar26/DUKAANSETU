'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

// In a real app, you'd get the storeId from the session/auth
const DEFAULT_STORE_SLUG = 'kirana-global';

async function getStore() {
  return await prisma.store.findUnique({
    where: { slug: DEFAULT_STORE_SLUG }
  });
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

export async function getProducts(page = 1, pageSize = 10) {
  const store = await getStore();
  if (!store) return { products: [], total: 0 };
  
  const skip = (page - 1) * pageSize;
  
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: { storeId: store.id },
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize
    }),
    prisma.product.count({
      where: { storeId: store.id }
    })
  ]);

  return { products, total };
}

export async function createProduct(formData) {
  const store = await getStore();
  if (!store) throw new Error('Store not found');

  const name = formData.get('name');
  const description = formData.get('description');
  const price = parseFloat(formData.get('price'));
  const category = formData.get('category');
  
  const file = formData.get('file');
  let image = formData.get('image'); // URL from text input

  // If a file was uploaded, use it instead of the URL
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
  const product = await prisma.product.delete({
    where: { id }
  });

  const store = await prisma.store.findUnique({ where: { id: product.storeId } });
  revalidatePath('/dashboard/owner/products');
  revalidatePath(`/shop/${store.slug}`);
}

export async function getAllProductsForExport() {
  const store = await getStore();
  if (!store) return [];
  
  return await prisma.product.findMany({
    where: { storeId: store.id },
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
