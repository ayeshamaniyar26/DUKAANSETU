'use server';
import prisma from '@/lib/prisma';
export async function getStoreSettings(storeId) {
    try {
        const store = await prisma.store.findUnique({
            where: storeId ? { id: storeId } : { slug: 'kirana-global' }
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

        // Prepare Store Data
        const storeData = {
            name: formData.get('shopName') || undefined,
            slug: formData.get('slug') || undefined,
            category: formData.get('category') || undefined,
            phone: formData.get('shopPhone') || undefined,
            address: formData.get('address') || undefined,
            city: formData.get('city') || undefined,
            state: formData.get('state') || undefined,
            pincode: formData.get('pincode') || undefined,
            businessType: formData.get('businessType') || undefined,
            licenseType: formData.get('licenseType') || undefined,
        };

        // Add file names only if present
        const bp = formData.get('businessProof');
        if (bp && typeof bp !== 'string' && bp.size > 0) storeData.businessProofUrl = bp.name;
        
        const sf = formData.get('shopFront');
        if (sf && typeof sf !== 'string' && sf.size > 0) storeData.shopFrontUrl = sf.name;

        const si = formData.get('shopInterior');
        if (si && typeof si !== 'string' && si.size > 0) storeData.shopInteriorUrl = si.name;

        const op = formData.get('ownerIdProof');
        if (op && typeof op !== 'string' && op.size > 0) storeData.ownerIdProofUrl = op.name;

        // Update Store
        await prisma.store.update({
            where: { id: storeId },
            data: storeData
        });

        // Update User
        const userData = {};
        if (formData.get('email')) userData.email = formData.get('email');
        if (formData.get('firstName')) userData.firstName = formData.get('firstName');
        if (formData.get('lastName')) userData.lastName = formData.get('lastName');

        if (Object.keys(userData).length > 0) {
            await prisma.user.update({
                where: { id: userId },
                data: userData
            });
        }

        return { success: true };
    } catch (error) {
        console.error('Error updating settings:', error);
        return { success: false, error: error.message };
    }
}
