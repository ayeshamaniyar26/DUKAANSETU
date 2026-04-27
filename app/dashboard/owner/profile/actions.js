'use server';
import prisma from '@/lib/prisma';
const DEFAULT_STORE_SLUG = 'kirana-global';

export async function getStoreSettings() {
    try {
        const store = await prisma.store.findUnique({
            where: { slug: DEFAULT_STORE_SLUG }
        });

        if (!store) return null;

        const user = await prisma.user.findFirst({
            where: { storeId: store.id }
        });

        return {
            store,
            user
        };
    } catch (error) {
        console.error('Error fetching settings:', error);
        return null;
    }
}

export async function updateSettings(formData) {
    try {
        const storeId = formData.get('storeId');
        const userId = formData.get('userId');

        // Update Store
        await prisma.store.update({
            where: { id: storeId },
            data: {
                name: formData.get('shopName'),
                slug: formData.get('slug'),
                category: formData.get('category'),
                phone: formData.get('shopPhone'),
                address: formData.get('address'),
                city: formData.get('city'),
                state: formData.get('state'),
                pincode: formData.get('pincode'),
                businessType: formData.get('businessType'),
                licenseType: formData.get('licenseType'),
                businessProofUrl: formData.get('businessProof')?.name || undefined,
                shopFrontUrl: formData.get('shopFront')?.name || undefined,
                shopInteriorUrl: formData.get('shopInterior')?.name || undefined,
                ownerIdProofUrl: formData.get('ownerIdProof')?.name || undefined,
            }
        });

        // Update User
        await prisma.user.update({
            where: { id: userId },
            data: {
                email: formData.get('email'),
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
            }
        });

        return { success: true };
    } catch (error) {
        console.error('Error updating settings:', error);
        return { success: false, error: error.message };
    }
}
