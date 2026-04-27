'use server';
import prisma from '@/lib/prisma';
export async function getDashboardData(storeId) {
    try {
        const store = await prisma.store.findUnique({
            where: storeId ? { id: storeId } : { slug: 'kirana-global' }
        });

        if (!store) return null;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Run all queries in parallel for speed
        const [
            productCount, 
            orderCountToday, 
            creditSum, 
            debitSum, 
            recentOrders, 
            recentLedger
        ] = await Promise.all([
            prisma.product.count({ where: { storeId: store.id, isDeleted: false } }),
            prisma.order.count({ where: { storeId: store.id, createdAt: { gte: today } } }),
            prisma.ledger.aggregate({
                where: { storeId: store.id, type: 'CREDIT' },
                _sum: { amount: true }
            }),
            prisma.ledger.aggregate({
                where: { storeId: store.id, type: 'DEBIT' },
                _sum: { amount: true }
            }),
            prisma.order.findMany({
                where: { storeId: store.id },
                take: 5,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.ledger.findMany({
                where: { storeId: store.id },
                take: 5,
                orderBy: { createdAt: 'desc' }
            })
        ]);

        const outstandingUdhar = (creditSum._sum.amount || 0) - (debitSum._sum.amount || 0);

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
