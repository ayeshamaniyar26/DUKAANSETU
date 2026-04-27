'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Using the same default store for testing as products
const DEFAULT_STORE_SLUG = 'kirana-global';

async function getStore() {
  return await prisma.store.findUnique({
    where: { slug: DEFAULT_STORE_SLUG }
  });
}

export async function getLedgerData() {
  const store = await getStore();
  if (!store) return { entries: [], stats: { daily: 0, monthly: 0, yearly: 0, totalReceivable: 0 } };

  const entries = await prisma.ledger.findMany({
    where: { storeId: store.id },
    orderBy: { createdAt: 'desc' }
  });

  // Calculate stats
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const [dailyLedger, monthlyLedger, yearlyLedger, dailyOrders, monthlyOrders, yearlyOrders, totalReceivable] = await Promise.all([
    prisma.ledger.aggregate({
      where: { storeId: store.id, type: 'DEBIT', createdAt: { gte: startOfDay } },
      _sum: { amount: true }
    }),
    prisma.ledger.aggregate({
      where: { storeId: store.id, type: 'DEBIT', createdAt: { gte: startOfMonth } },
      _sum: { amount: true }
    }),
    prisma.ledger.aggregate({
      where: { storeId: store.id, type: 'DEBIT', createdAt: { gte: startOfYear } },
      _sum: { amount: true }
    }),
    prisma.order.aggregate({
      where: { storeId: store.id, createdAt: { gte: startOfDay } },
      _sum: { totalAmount: true }
    }),
    prisma.order.aggregate({
      where: { storeId: store.id, createdAt: { gte: startOfMonth } },
      _sum: { totalAmount: true }
    }),
    prisma.order.aggregate({
      where: { storeId: store.id, createdAt: { gte: startOfYear } },
      _sum: { totalAmount: true }
    }),
    prisma.ledger.aggregate({
      where: { storeId: store.id, type: 'CREDIT' },
      _sum: { amount: true }
    })
  ]);

  return {
    entries,
    stats: {
      daily: (dailyLedger._sum.amount || 0) + (dailyOrders._sum.totalAmount || 0),
      monthly: (monthlyLedger._sum.amount || 0) + (monthlyOrders._sum.totalAmount || 0),
      yearly: (yearlyLedger._sum.amount || 0) + (yearlyOrders._sum.totalAmount || 0),
      totalReceivable: (totalReceivable._sum.amount || 0)
    }
  };
}

export async function recordPayment(formData) {
  const store = await getStore();
  if (!store) throw new Error('Store not found');

  const amount = parseFloat(formData.get('amount'));
  const type = formData.get('type'); // 'CREDIT' or 'DEBIT'
  const description = formData.get('description');
  const customerName = formData.get('customerName');

  await prisma.ledger.create({
    data: {
      amount,
      type,
      description: `${customerName}: ${description}`,
      storeId: store.id
    }
  });

  revalidatePath('/dashboard/owner/ledger');
  return { success: true };
}
