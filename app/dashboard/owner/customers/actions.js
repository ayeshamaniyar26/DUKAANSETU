'use server';
import prisma from '@/lib/prisma';
const DEFAULT_STORE_SLUG = 'kirana-global';

export async function getCustomersData() {
    try {
        const store = await prisma.store.findUnique({
            where: { slug: DEFAULT_STORE_SLUG }
        });

        if (!store) return { customers: [], stats: { total: 0, active: 0 } };

        // 1. Fetch manual customers
        const manualCustomers = await prisma.customer.findMany({
            where: { storeId: store.id },
            orderBy: { createdAt: 'desc' }
        });

        // 2. Fetch orders to get derived customers and spending data
        const orders = await prisma.order.findMany({
            where: { storeId: store.id },
            orderBy: { createdAt: 'desc' }
        });

        const customerMap = {};

        // Process manual customers first
        manualCustomers.forEach(c => {
            customerMap[c.phone] = {
                id: c.id,
                name: c.name,
                phone: c.phone,
                address: c.address,
                totalOrders: 0,
                totalSpent: 0,
                lastOrder: c.createdAt,
                type: 'MANUAL'
            };
        });

        // Merge with order data
        orders.forEach(order => {
            if (!customerMap[order.phone]) {
                customerMap[order.phone] = {
                    name: order.customerName,
                    phone: order.phone,
                    address: order.address,
                    totalOrders: 0,
                    totalSpent: 0,
                    lastOrder: order.createdAt,
                    type: 'DERIVED'
                };
            }
            customerMap[order.phone].totalOrders += 1;
            customerMap[order.phone].totalSpent += order.totalAmount;
            if (new Date(order.createdAt) > new Date(customerMap[order.phone].lastOrder)) {
                customerMap[order.phone].lastOrder = order.createdAt;
            }
        });

        const customers = Object.values(customerMap);
        
        return {
            customers,
            stats: {
                total: customers.length,
                active: customers.filter(c => c.totalOrders > 1).length
            }
        };
    } catch (error) {
        console.error('Error fetching customers:', error);
        return { customers: [], stats: { total: 0, active: 0 } };
    }
}

export async function createCustomer(formData) {
    try {
        const store = await prisma.store.findUnique({
            where: { slug: DEFAULT_STORE_SLUG }
        });

        const name = formData.get('name');
        const phone = formData.get('phone');
        const address = formData.get('address');

        await prisma.customer.upsert({
            where: { 
                phone_storeId: {
                    phone: phone,
                    storeId: store.id
                }
            },
            update: { name, address },
            create: { name, phone, address, storeId: store.id }
        });

        return { success: true };
    } catch (error) {
        console.error('Error creating customer:', error);
        return { success: false, error: error.message };
    }
}
