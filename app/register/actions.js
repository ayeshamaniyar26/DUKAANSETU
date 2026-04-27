'use server';
import prisma from '@/lib/prisma';

export async function registerStore(formData) {
    try {
        // Basic Info
        const storeName = formData.get('storeName');
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        
        // Shop Details
        const address = formData.get('address');
        const city = formData.get('city');
        const state = formData.get('state');
        const pincode = formData.get('pincode');
        const latitude = parseFloat(formData.get('latitude')) || null;
        const longitude = parseFloat(formData.get('longitude')) || null;
        
        // Business Info
        const businessType = formData.get('businessType');
        const licenseType = formData.get('licenseType');
        
        // Security
        const password = formData.get('password');

        // Generate a unique slug
        const baseSlug = storeName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
        const slug = `${baseSlug}-${Math.floor(Math.random() * 10000)}`;

        // File names (simulated upload)
        const businessProofUrl = formData.get('businessProof')?.name || null;
        const shopFrontUrl = formData.get('shopFront')?.name || null;
        const shopInteriorUrl = formData.get('shopInterior')?.name || null;
        const ownerIdProofUrl = formData.get('ownerIdProof')?.name || null;

        // 1. Create the store with detailed info
        const store = await prisma.store.create({
            data: {
                name: storeName,
                slug: slug,
                phone: phone,
                status: 'PENDING',
                address,
                city,
                state,
                pincode,
                latitude,
                longitude,
                businessType,
                licenseType,
                businessProofUrl,
                shopFrontUrl,
                shopInteriorUrl,
                ownerIdProofUrl,
                category: businessType
            }
        });

        // 2. Create the user (owner)
        await prisma.user.create({
            data: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password, // Note: In production always hash passwords!
                role: 'OWNER',
                storeId: store.id
            }
        });

        return { success: true };
    } catch (error) {
        console.error('Detailed Registration Error:', error);
        return { success: false, error: 'Registration failed: ' + error.message };
    }
}
