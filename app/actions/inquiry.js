'use server';
import prisma from '@/lib/prisma';

export async function submitInquiry(formData) {
  try {
    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = formData.get('message');

    // Validation
    if (!name || !phone || !message) {
      return { success: false, error: 'All fields are required.' };
    }

    if (phone.length < 10) {
      return { success: false, error: 'Please enter a valid 10-digit phone number.' };
    }

    // Store in database
    await prisma.inquiry.create({
      data: {
        name,
        phone,
        message
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Inquiry Submission Error:', error);
    return { success: false, error: 'Failed to submit inquiry. Please try again later.' };
  }
}
