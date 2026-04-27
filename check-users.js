const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUsers() {
  const users = await prisma.user.findMany();
  console.log('--- DATABASE USERS ---');
  users.forEach(u => {
    console.log(`Email: ${u.email} | Password: ${u.password} | Role: ${u.role}`);
  });
  console.log('----------------------');
  await prisma.$disconnect();
}

checkUsers();
