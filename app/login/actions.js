'use server';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function login(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.password !== password) {
    return { error: 'Invalid email or password' };
  }

  // Simple session logic - in production use JWT or NextAuth
  if (user.role === 'ADMIN') {
    redirect('/dashboard/admin');
  } else if (user.role === 'OWNER') {
    redirect('/dashboard/owner');
  }

  return { error: 'Unknown role' };
}
