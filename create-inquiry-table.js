const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Attempting to create Inquiry table...");
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Inquiry" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "message" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'PENDING',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
    );
  `);
  console.log("✅ Inquiry table created successfully!");
}

main()
  .catch(e => {
    console.error("❌ Error creating table:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
