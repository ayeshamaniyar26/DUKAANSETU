'use server';
import prisma from '@/lib/prisma';
const DEFAULT_STORE_SLUG = 'kirana-global';

export async function getDashboardData() {
    try {
        const store = await prisma.store.findUnique({
            where: { slug: DEFAULT_STORE_SLUG }
        });

        if (!store) return null;

        // 1. Total Products
        const productCount = await prisma.product.count({
            where: { storeId: store.id }
        });

        // 2. Today's Orders
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const orderCountToday = await prisma.order.count({
            where: { 
                storeId: store.id,
                createdAt: { gte: today }
            }
        });

        // 3. Outstanding Udhar (Sum of Ledger)
        // CREDIT = Money given by store to customer (Udhar)
        // DEBIT = Money paid by customer to store
        const ledgerEntries = await prisma.ledger.findMany({
            where: { storeId: store.id }
        });
        
        let outstandingUdhar = 0;
        ledgerEntries.forEach(entry => {
            if (entry.type === 'CREDIT') outstandingUdhar += entry.amount;
            if (entry.type === 'DEBIT') outstandingUdhar -= entry.amount;
        });

        // 4. Recent Sales
        const recentOrders = await prisma.order.findMany({
            where: { storeId: store.id },
            take: 5,
            orderBy: { createdAt: 'desc' }
        });

        // 5. Recent Ledger
        const recentLedger = await prisma.ledger.findMany({
            where: { storeId: store.id },
            take: 5,
            orderBy: { createdAt: 'desc' }
        });

        return {
            storeName: store.name,
            productCount,
            orderCountToday,
            outstandingUdhar,
            recentOrders: recentOrders.map(o => {
                let parsedItems = [];
                try {
                    parsedItems = JSON.parse(o.items || '[]');
                    if (!Array.isArray(parsedItems)) parsedItems = [];
                } catch (e) {
                    parsedItems = [];
                }
                return { ...o, items: parsedItems };
            }),
            recentLedger
        };
    } catch (error) {
        console.error('Dashboard Action Error:', error);
        return null;
    }
}
