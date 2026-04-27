import prisma from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import Link from 'next/link';

export default async function ShopListPage() {
  const stores = await prisma.store.findMany();

  // Mock data for display if images aren't fully set in DB yet
  const storeImages = {
    'sharma-kirana': '/images/sharma-kirana.png',
    'kaif-fashion': '/images/kaif-store.png',
    'gupta-pharmacy': '/images/gupta-pharmacy.png',
    'royal-sweets': '/images/royal-sweets.png',
    'bharat-electronics': '/images/bharat-electronics.png',
    'pooja-boutique': '/images/pooja-boutique.png',
  };

  return (
    <>
      <Header store={{ name: 'Dukkan Setu', phone: '+91 90000 00000' }} />
      <main>
        <Banner 
          store={{ name: 'Dukkan Setu' }} 
          title="Explore Local Shops" 
          subtitle="Shop Local, Shop Digital"
          description="Browse through the best stores in your neighborhood and get everything delivered to your doorstep."
        />
        
        <section className="shop-list-section py-5" style={{backgroundColor: '#f8f9fa'}}>
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 text-center">
                <h2 className="section__title mb-20" style={{color: '#15181B'}}>Our Featured Stores</h2>
                <div className="section__subtitle justify-content-center" style={{color: '#2E7D32'}}>
                  <span className="left-separetor" style={{backgroundColor: '#2E7D32'}}></span>
                  Trusted by Millions
                  <span className="right-separetor" style={{backgroundColor: '#2E7D32'}}></span>
                </div>
              </div>
            </div>
            
            <div className="row g-4">
              {stores.map((store) => (
                <div key={store.id} className="col-xl-4 col-lg-6 col-md-6">
                  <div className="shop-card" style={{
                    backgroundColor: 'white', 
                    borderRadius: '15px', 
                    overflow: 'hidden', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: `1px solid ${store.accentColor}22`
                  }}>
                    <div className="shop-card__image" style={{position: 'relative', height: '220px', overflow: 'hidden'}}>
                      <img src={storeImages[store.slug] || '/images/gallery-1.png'} alt={store.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                      <div className="category-badge" style={{
                        position: 'absolute', 
                        top: '15px', 
                        right: '15px', 
                        backgroundColor: store.accentColor, 
                        color: 'white', 
                        padding: '5px 15px', 
                        borderRadius: '50px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {store.category}
                      </div>
                    </div>
                    
                    <div className="shop-card__content p-4" style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                      <h4 className="mb-2" style={{color: '#15181B', fontWeight: '700'}}>{store.name}</h4>
                      <p style={{fontSize: '14px', color: '#666', marginBottom: '20px'}}>Experience the best {store.category.toLowerCase()} products at {store.name}.</p>
                      
                      <div className="mt-auto d-flex align-items-center justify-content-between">
                        <div className="shop-info" style={{fontSize: '13px', color: '#888'}}>
                          <i className="fas fa-phone-alt me-2" style={{color: store.accentColor}}></i>
                          {store.phone}
                        </div>
                        <Link href={`/shop/${store.slug}`} className="rr-btn" style={{
                          backgroundColor: store.accentColor, 
                          color: 'white', 
                          padding: '8px 20px', 
                          borderRadius: '5px',
                          textDecoration: 'none',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          Visit Shop
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer store={{ name: 'Dukkan Setu', phone: '+91 90000 00000' }} />
    </>
  );
}
