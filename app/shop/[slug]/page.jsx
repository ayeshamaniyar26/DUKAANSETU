import prisma from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import About from '@/components/About';
import Products from '@/components/Products';
import Services from '@/components/Services';
import Counter from '@/components/Counter';
import Portfolio from '@/components/Portfolio';
import Skills from '@/components/Skills';
import Team from '@/components/Team';
import ContactList from '@/components/ContactList';
import RequestQuote from '@/components/RequestQuote';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import Brands from '@/components/Brands';
import SearchPopup from '@/components/SearchPopup';
import Offcanvas from '@/components/Offcanvas';

export default async function ShopPage({ params }) {
  const { slug } = await params;

  const store = await prisma.store.findUnique({
    where: { slug: slug },
    include: {
      products: true,
      categories: true
    }
  });

  if (!store) {
    return <div>Store not found</div>;
  }

  return (
    <>
      <SearchPopup />
      <Offcanvas store={store} />
      <Header store={store} />
      <main>
        <Banner store={store} />
        <About store={store} />
        <Products store={store} products={store.products} />
      </main>
      <Footer store={store} />
    </>
  );
}
