import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import About from '@/components/About';
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

export default function Home() {
  const platformStore = {
    name: 'Dukkan Setu',
    slug: 'platform',
    phone: '+91 90000 00000',
    category: 'SaaS Platform',
    logo: '/assets/imgs/logo/logo.svg',
    accentColor: '#2E7D32'
  };

  return (
    <>
      <SearchPopup />
      <Offcanvas store={platformStore} />
      <Header store={platformStore} />
      <main>
        {/* Banner with SaaS messaging sliders */}
        <Banner 
          store={platformStore} 
          title={<>Dukkan Setu: Your Digital <br /> Bridge to Customers.</>}
          subtitle="Revolutionizing Indian Retail"
          description={<>The ultimate multi-tenant SaaS platform for Indian shopkeepers.<br />Launch your online storefront with WhatsApp ordering and Digital Ledger in minutes.</>}
        />

        {/* About the platform */}
        <About store={platformStore} />

        {/* Showcase Stores (Success Stories) - Moved here */}
        <section className="latest-project section-space">
            <div className="container">
                <div className="row mb-60 align-items-center">
                    <div className="col-xl-7">
                        <div className="section__title-wrapper">
                            <span className="section__subtitle justify-content-start mb-13"><span data-width="40px" className="left-separetor"></span>Our Success Stories</span>
                            <h2 className="section__title title-animation text-capitalize mb-0">Trusted By Local <br /> Legends Nationwide</h2>
                        </div>
                    </div>
                </div>
                <div className="row grid mb-minus-30">
                    <div className="col-lg-4 col-md-6 grid-item">
                        <div className="latest-project__item mb-30">
                            <div className="latest-project__item-thumb">
                                <img src="/assets/imgs/latest-project/latest-project__item-1.png" alt="" />
                            </div>
                            <div className="latest-project__item-content">
                                <div className="text">
                                    <span className="subtitle color-white d-block">Grocery Mega-Store</span>
                                    <h4 className="title color-white mb-20">Kirana Global</h4>
                                    <Link href="/shop/kirana-global" className="explore-store-btn">Explore Our Products</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 grid-item">
                        <div className="latest-project__item mb-30">
                            <div className="latest-project__item-thumb">
                                <img src="/assets/imgs/latest-project/latest-project__item-2.png" alt="" />
                            </div>
                            <div className="latest-project__item-content">
                                <div className="text">
                                    <span className="subtitle color-white d-block">Boutique Fashion</span>
                                    <h4 className="title color-white mb-20">Style Hub Fashion</h4>
                                    <Link href="/shop/fashion-hub" className="explore-store-btn">Explore Our Products</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 grid-item">
                        <div className="latest-project__item mb-30">
                            <div className="latest-project__item-thumb">
                                <img src="/assets/imgs/latest-project/latest-project__item-3.png" alt="" />
                            </div>
                            <div className="latest-project__item-content">
                                <div className="text">
                                    <span className="subtitle color-white d-block">Pharmacy</span>
                                    <h4 className="title color-white mb-20">Health First Pharmacy</h4>
                                    <Link href="/shop/health-first" className="explore-store-btn">Explore Our Products</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Core SaaS Services */}
        <section className="what-we-do section-space section-bg-2 overflow-hidden">
            <div className="container rr-shape-p-c_1">
                <div className="row mb-60 align-items-center">
                    <div className="col-xl-6">
                        <div className="section__title-wrapper">
                            <span className="section__subtitle justify-content-start mb-13"><span data-width="40px" className="left-separetor"></span>Why Dukkan Setu?</span>
                            <h2 className="section__title title-animation text-capitalize mb-0">The Power of Digital <br /> In Your Hands.</h2>
                        </div>
                    </div>
                </div>

                <div className="row mb-minus-30">
                    <div className="col-xl-4 col-md-6">
                        <div className="what-we-do__item d-flex flex-column mb-30">
                            <div className="what-we-do__item-bg" style={{background: 'url(/assets/imgs/what-we-do/whatsapp-bg.png)'}}></div>
                            <div className="what-we-do__item-img mb-20">
                                <img src="/assets/imgs/what-we-do/whatsapp-icon.png" alt="" />
                            </div>
                            <div className="what-we-do__item-text">
                                <h4 className="title mb-20">WhatsApp Commerce</h4>
                                <p className="mb-0">Customers order directly on WhatsApp. Keep your relationship local and personal without big platform commissions.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-md-6">
                        <div className="what-we-do__item d-flex flex-column mb-30">
                            <div className="what-we-do__item-bg" style={{background: 'url(/assets/imgs/what-we-do/ledger-bg.png)'}}></div>
                            <div className="what-we-do__item-img mb-20">
                                <img src="/assets/imgs/what-we-do/ledger-icon.png" alt="" />
                            </div>
                            <div className="what-we-do__item-text">
                                <h4 className="title mb-20">Smart Digital Ledger</h4>
                                <p className="mb-0">Manage customer 'Udhar' (credits) with ease. Automated reminders and digital payment tracking in one place.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-md-6">
                        <div className="what-we-do__item d-flex flex-column mb-30">
                            <div className="what-we-do__item-bg" style={{background: 'url(/assets/imgs/what-we-do/catalog-bg.png)'}}></div>
                            <div className="what-we-do__item-img mb-20">
                                <img src="/assets/imgs/what-we-do/catalog-icon.png" alt="" />
                            </div>
                            <div className="what-we-do__item-text">
                                <h4 className="title mb-20">Instant Catalog</h4>
                                <p className="mb-0">Beautiful product displays with rich imagery and descriptions. Update your stock in one click from the owner dashboard.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Platform Stats */}
        <section className="experience theme-bg-heading-primary section-space-100 position-relative z-1 overflow-hidden">
            <div className="experience__bg" style={{background: 'url(/assets/imgs/experience/experience.png)', opacity: 0.3}}></div>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center text-white mb-40">
                        <h2 style={{color: 'white'}}>Dukkan Setu Impact</h2>
                    </div>
                    <div className="col-12">
                        <div className="experience__box d-flex flex-wrap justify-content-sm-between">
                            <div className="experience__item d-flex flex-wrap align-items-center">
                                <div className="experience__item-icon">
                                    <i className="fa-solid fa-shop fa-2x color-primary" style={{color: '#2E7D32'}}></i>
                                </div>
                                <div className="experience__item-text">
                                    <h2 className="experience__item-text-title color-white">100k+</h2>
                                    <h4 className="color-white rr-fw-sbold mb-0">Registered Stores</h4>
                                </div>
                            </div>
                            <div className="experience__item d-flex flex-wrap align-items-center">
                                <div className="experience__item-icon">
                                    <i className="fa-solid fa-receipt fa-2x color-primary" style={{color: '#2E7D32'}}></i>
                                </div>
                                <div className="experience__item-text">
                                    <h2 className="experience__item-text-title color-white">₹50Cr+</h2>
                                    <h4 className="color-white rr-fw-sbold mb-0">Transactions Processed</h4>
                                </div>
                            </div>
                            <div className="experience__item d-flex flex-wrap align-items-center">
                                <div className="experience__item-icon">
                                    <i className="fa-solid fa-server fa-2x color-primary" style={{color: '#2E7D32'}}></i>
                                </div>
                                <div className="experience__item-text">
                                    <h2 className="experience__item-text-title color-white">99.9%</h2>
                                    <h4 className="color-white rr-fw-sbold mb-0">Uptime Reliability</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/* Platform Commitment */}
        <Skills store={platformStore} />

        {/* The Platform Team */}
        <Team store={platformStore} />

        {/* Quick Contact Info */}
        <ContactList store={platformStore} />

        {/* Demo Inquiry */}
        <RequestQuote store={platformStore} />

        {/* Merchant Testimonials */}
        <Testimonials store={platformStore} />

        {/* SaaS Blog / Updates */}
        <Blog store={platformStore} />

        {/* Integrated Brands */}
        <Brands store={platformStore} />
      </main>
      <Footer store={platformStore} />
    </>
  );
}
