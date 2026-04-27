const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const storesData = [
    {
      slug: 'kirana-global',
      name: 'Kirana Global Store',
      logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop',
      accentColor: '#2E7D32',
      category: 'Kirana Store',
      address: 'Plot No. 45, Sector 12, Dharavi Main Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400017',
      businessType: 'Kirana Store',
      licenseType: 'Shop License',
      phone: '919876543210',
      status: 'APPROVED',
      products: [
        { name: 'Basmati Rice (5kg)', price: 550, category: 'Grains', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100' },
        { name: 'Toor Dal (1kg)', price: 160, category: 'Pulses', image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=100&h=100' },
        { name: 'Sunflower Oil (1L)', price: 185, category: 'Essentials', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100' },
        { name: 'Tata Salt (1kg)', price: 28, category: 'Essentials', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=100&h=100' },
        { name: 'Aashirvaad Atta (5kg)', price: 245, category: 'Flour', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100' },
        { name: 'Maggi Noodles (Pack of 12)', price: 168, category: 'Instant Food', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=100&h=100' }
      ]
    },
    {
      slug: 'health-first',
      name: 'Health First Pharmacy',
      logo: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=200&h=200&fit=crop',
      accentColor: '#1976D2',
      category: 'Pharmacy',
      address: 'Suite 201, Sterling Tower, Brigade Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      businessType: 'Pharmacy',
      licenseType: 'GST',
      phone: '919112233445',
      status: 'APPROVED',
      products: [
        { name: 'Vitamin C Tablets', price: 450, category: 'Supplements', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100' },
        { name: 'Digital BP Monitor', price: 2100, category: 'Devices', image: 'https://images.unsplash.com/photo-1613374824701-447a1998fde0?w=100&h=100' },
        { name: 'Surgical Masks (50pcs)', price: 250, category: 'Safety', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&h=100' },
        { name: 'Paracetamol (Strip 10)', price: 45, category: 'Medicine', image: 'https://images.unsplash.com/photo-1550572017-ed200f545dec?w=100&h=100' },
        { name: 'N95 Respirator', price: 120, category: 'Safety', image: 'https://images.unsplash.com/photo-1584462198614-03c2a523945d?w=100&h=100' },
        { name: 'Sanitizer (500ml)', price: 199, category: 'Hygiene', image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=100&h=100' }
      ]
    },
    {
      slug: 'modern-supermart',
      name: 'Modern Supermart',
      logo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200&h=200&fit=crop',
      accentColor: '#D32F2F',
      category: 'Supermarket',
      address: 'G-12, West Side Mall, Salt Lake',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700091',
      businessType: 'Supermarket',
      licenseType: 'Trade License',
      phone: '918887776665',
      status: 'APPROVED',
      products: [
        { name: 'Amul Butter (500g)', price: 275, category: 'Dairy', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=100&h=100' },
        { name: 'Kelloggs Corn Flakes', price: 320, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=100&h=100' },
        { name: 'Hersheys Syrup', price: 210, category: 'Dessert', image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=100&h=100' },
        { name: 'Surf Excel Matic (2kg)', price: 450, category: 'Cleaning', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=100&h=100' },
        { name: 'Nescafe Classic (100g)', price: 340, category: 'Beverages', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100' },
        { name: 'Britannia Biscuits', price: 35, category: 'Snacks', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100' }
      ]
    },
    {
      slug: 'fashion-hub',
      name: 'Style Hub Fashion',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop',
      accentColor: '#C2185B',
      category: 'Fashion',
      address: 'Shop 5, Chandni Chowk Market',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110006',
      businessType: 'Others',
      licenseType: 'Shop License',
      phone: '917770001112',
      status: 'APPROVED',
      products: [
        { name: 'Cotton T-Shirt', price: 599, category: 'Apparel', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100' },
        { name: 'Denim Jeans', price: 1299, category: 'Apparel', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100' },
        { name: 'Leather Belt', price: 899, category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100' },
        { name: 'Formal Shirt', price: 1499, category: 'Apparel', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c717f18?w=100&h=100' },
        { name: 'Wrist Watch', price: 3499, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100&h=100' },
        { name: 'Sunglasses', price: 1199, category: 'Accessories', image: 'https://images.unsplash.com/photo-1511499767390-90342f56771f?w=100&h=100' }
      ]
    },
    {
      slug: 'electronics-world',
      name: 'Electronics World',
      logo: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop',
      accentColor: '#333333',
      category: 'Electronics',
      address: 'Tech Park Avenue, Whitefield',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560066',
      businessType: 'Others',
      licenseType: 'GST',
      phone: '916665554443',
      status: 'APPROVED',
      products: [
        { name: 'USB-C Cable (1m)', price: 399, category: 'Cables', image: 'https://images.unsplash.com/photo-1589307737252-0562e558122d?w=100&h=100' },
        { name: 'Wireless Mouse', price: 899, category: 'Peripherals', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100' },
        { name: 'Phone Case (iPhone 14)', price: 450, category: 'Protection', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100&h=100' },
        { name: 'Portable SSD 500GB', price: 5600, category: 'Storage', image: 'https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?w=100&h=100' },
        { name: 'HDMI Cable (2m)', price: 499, category: 'Cables', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=100&h=100' },
        { name: 'Laptop Cooling Pad', price: 1200, category: 'Accessories', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100' }
      ]
    },
    {
      slug: 'fresh-bites',
      name: 'Fresh Bites Bakery',
      logo: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&h=200&fit=crop',
      accentColor: '#F57C00',
      category: 'Bakery',
      address: 'B-Block, Park Street Extension',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
      businessType: 'Others',
      licenseType: 'Trade License',
      phone: '915554443322',
      status: 'APPROVED',
      products: [
        { name: 'Choco Chip Muffin', price: 85, category: 'Pastries', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100' },
        { name: 'Vanilla Cream Roll', price: 45, category: 'Snacks', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100' },
        { name: 'Multigrain Bread', price: 65, category: 'Bread', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=100&h=100' },
        { name: 'Cheese Croissant', price: 120, category: 'Pastries', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=100&h=100' },
        { name: 'Fruit Tart', price: 150, category: 'Dessert', image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=100&h=100' },
        { name: 'Sugar Cookies', price: 120, category: 'Cookies', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=100&h=100' }
      ]
    }
  ];

  console.log('Cleaning up old records...');
  await prisma.product.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.store.deleteMany({});

  console.log('Creating Admin...');
  await prisma.user.create({
    data: {
      email: 'admin@dukaansetu.com',
      password: 'admin123',
      role: 'ADMIN'
    }
  });

  console.log('Seeding 6 new stores with 6 products each...');
  for (const info of storesData) {
    const { products, ...storeData } = info;
    const store = await prisma.store.create({
      data: storeData
    });

    await prisma.user.create({
      data: {
        email: `${info.slug}@example.com`,
        password: 'password123',
        role: 'OWNER',
        storeId: store.id
      }
    });

    for (const p of products) {
      await prisma.product.create({
        data: {
          ...p,
          storeId: store.id
        }
      });
    }
  }

  console.log('Finalizing seed...');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
