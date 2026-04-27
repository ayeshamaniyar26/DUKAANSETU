'use server';
import prisma from '@/lib/prisma';
import { handleFileUpload } from '@/lib/upload';

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

        // Handle File Uploads (Base64)
        const businessProofFile = formData.get('businessProof');
        const shopFrontFile = formData.get('shopFront');
        const shopInteriorFile = formData.get('shopInterior');
        const ownerIdProofFile = formData.get('ownerIdProof');

        const [bpUrl, sfUrl, siUrl, opUrl] = await Promise.all([
            handleFileUpload(businessProofFile),
            handleFileUpload(shopFrontFile),
            handleFileUpload(shopInteriorFile),
            handleFileUpload(ownerIdProofFile)
        ]);

        if (bpUrl) storeData.businessProofUrl = bpUrl;
        if (sfUrl) storeData.shopFrontUrl = sfUrl;
        if (siUrl) storeData.shopInteriorUrl = siUrl;
        if (opUrl) storeData.ownerIdProofUrl = opUrl;

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
