export default function About({ store }) {
  const getAboutImage = () => {
    switch (store.category) {
      case 'Kirana Store':
      case 'Supermarket':
        return 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800&auto=format&fit=crop';
      case 'Pharmacy':
        return 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=800&auto=format&fit=crop';
      case 'Electronics':
        return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop';
      case 'Fashion':
        return 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=800&auto=format&fit=crop';
      case 'SaaS Platform':
        return 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop';
      default:
        return 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop';
    }
  };

  const aboutImg = (store.slug !== 'platform' && store.bannerImage) ? store.bannerImage : getAboutImage();

  return (
    <section id="about" className="about-us section-space overflow-hidden">
        <div className="container rr-shape-p-c_1">
            <div className="row align-items-center flex-column-reverse flex-xl-row">
                <div className="col-xl-6">
                    <div className="about-us__media img1 mb-30">
                        <img src={aboutImg} alt={store.name} className="img-fluid" style={{borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', width: '100%', height: '400px', objectFit: 'cover'}} />
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="section__title-wrapper text-center text-xl-start pl-30 rr-pl-none-lg rr-mb-60-lg">
                        <span className="section__subtitle justify-content-start mb-13"><span data-width="40px" className="left-separetor"></span>About Our Store</span>
                        <h2 className="section__title text-capitalize mb-15 mb-xs-10 rr-br-hidden-md">{store.name} - Your Trusted Local Partner.</h2>
                        <p className="mb-45 mb-xs-30">We have been serving our community with the freshest {store.category} products for years. Now, we're bringing our store to your screen with Dukkan Setu.</p>

                        <ul className="about-us__list mb-25">
                            <li><span><svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.002 1L5.22195 11L1.00195 6.5" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                                Fresh Quality Products
                            </li>
                            <li><span><svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.002 1L5.22195 11L1.00195 6.5" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                                Direct WhatsApp Ordering
                            </li>
                            <li><span><svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.002 1L5.22195 11L1.00195 6.5" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                                Fast Local Delivery
                            </li>
                            <li><span><svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.002 1L5.22195 11L1.00195 6.5" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                                Best Market Prices
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
