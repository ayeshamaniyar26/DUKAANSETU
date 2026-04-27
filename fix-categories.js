const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Fix Electro Hive
  await prisma.store.updateMany({
    where: { name: { contains: 'Electro' } },
    data: { category: 'Electronics' }
  });

  // Fix Fashion Fiesta
  await prisma.store.updateMany({
    where: { name: { contains: 'Fashion' } },
    data: { category: 'Fashion' }
  });

  console.log('Successfully updated categories for Electro Hive and Fashion Fiesta!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
