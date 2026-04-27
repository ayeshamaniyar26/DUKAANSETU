'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function approveStore(storeId) {
    try {
        await prisma.store.update({
            where: { id: storeId },
            data: { status: 'APPROVED' }
        });
        revalidatePath('/dashboard/admin');
        return { success: true };
    } catch (error) {
        console.error('Approve Store Error:', error);
        return { success: false, error: 'Failed to approve store' };
    }
}

export async function rejectStore(storeId) {
    try {
        await prisma.store.update({
            where: { id: storeId },
            data: { status: 'REJECTED' }
        });
        revalidatePath('/dashboard/admin');
        return { success: true };
    } catch (error) {
        console.error('Reject Store Error:', error);
        return { success: false, error: 'Failed to reject store' };
    }
}
