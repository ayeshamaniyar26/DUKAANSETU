'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const DEFAULT_STORE_SLUG = 'kirana-global';

async function getStore() {
  return await prisma.store.findUnique({
    where: { slug: DEFAULT_STORE_SLUG }
  });
}

export async function getOrdersData() {
  const store = await getStore();
  if (!store) return { orders: [], stats: { daily: 0, monthly: 0, yearly: 0, totalOrders: 0 } };

  const orders = await prisma.order.findMany({
    where: { storeId: store.id },
    orderBy: { createdAt: 'desc' }
  });

  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const [daily, monthly, yearly] = await Promise.all([
    prisma.order.count({
      where: { storeId: store.id, createdAt: { gte: startOfDay } }
    }),
    prisma.order.count({
      where: { storeId: store.id, createdAt: { gte: startOfMonth } }
    }),
    prisma.order.count({
      where: { storeId: store.id, createdAt: { gte: startOfYear } }
    })
  ]);

  return {
    orders: orders.map(o => {
        let parsedItems = [];
        try {
            parsedItems = JSON.parse(o.items || '[]');
            if (!Array.isArray(parsedItems)) parsedItems = [];
        } catch (e) {
            parsedItems = [];
        }
        return { ...o, items: parsedItems };
    }),
    stats: {
      daily,
      monthly,
      yearly,
      totalOrders: orders.length
    }
  };
}

export async function createOrder(formData) {
    const store = await getStore();
    if (!store) throw new Error('Store not found');

    const customerName = formData.get('customerName');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const totalAmount = parseFloat(formData.get('totalAmount'));
    const items = formData.get('items');

    await prisma.order.create({
        data: {
            customerName,
            phone,
            address,
            totalAmount,
            items,
            status: 'PENDING',
            storeId: store.id
        }
    });

    revalidatePath('/dashboard/owner/orders');
    return { success: true };
}

export async function updateOrder(formData) {
    const id = formData.get('id');
    const customerName = formData.get('customerName');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const totalAmount = parseFloat(formData.get('totalAmount'));
    const items = formData.get('items');

    await prisma.order.update({
        where: { id },
        data: {
            customerName,
            phone,
            address,
            totalAmount,
            items
        }
    });

    revalidatePath('/dashboard/owner/orders');
    return { success: true };
}

export async function deleteOrder(id) {
    await prisma.order.delete({ where: { id } });
    revalidatePath('/dashboard/owner/orders');
    return { success: true };
}

export async function updateOrderStatus(orderId, status) {
    await prisma.order.update({
        where: { id: orderId },
        data: { status }
    });
    revalidatePath('/dashboard/owner/orders');
    return { success: true };
}

export async function getOrder(id) {
    const order = await prisma.order.findUnique({
        where: { id }
    });
    if (!order) return null;
    let parsedItems = [];
    try {
        parsedItems = JSON.parse(order.items || '[]');
        if (!Array.isArray(parsedItems)) parsedItems = [];
    } catch (e) {
        parsedItems = [];
    }
    return {
        ...order,
        items: parsedItems
    };
}
