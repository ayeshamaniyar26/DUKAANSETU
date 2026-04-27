import React from 'react';
import prisma from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default async function ShopsPage() {
    const platformStore = {
        name: 'Dukkan Setu',
        slug: 'platform',
        phone: '+91 90000 00000',
        category: 'SaaS Platform',
        logo: '/assets/imgs/logo/logo.svg',
        accentColor: '#2E7D32'
    };

    const stores = await prisma.store.findMany({
        where: { status: 'APPROVED' },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <>
            <Header store={platformStore} />
            <main>
                {/* Banner Section */}
                <section className="breadcrumb__area pt-120 pb-120 p-relative theme-bg-heading-primary" style={{backgroundColor: '#15181B'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="breadcrumb__content text-center">
                                    <h1 className="breadcrumb__title color-white mb-20 text-capitalize">Our Partner Shops</h1>
                                    <div className="breadcrumb__list">
                                        <span><Link href="/" className="color-white">Home</Link></span>
                                        <span className="dvdr color-white mx-2"><i className="fa-solid fa-angle-right"></i></span>
                                        <span className="color-primary" style={{color: '#2E7D32'}}>Shops</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Shops List Section */}
                <section className="shop__area section-space overflow-hidden" style={{backgroundColor: '#F8FFF8'}}>
                    <div className="container">
                        <div className="row mb-50 align-items-center">
                            <div className="col-lg-6">
                                <div className="section__title-wrapper">
                                    <h2 className="section__title text-capitalize">Choose your local <br /> marketplace</h2>
                                </div>
                            </div>
                            <div className="col-lg-6 text-lg-end mt-30 mt-lg-0">
                                <p className="text-muted mb-0">Discover and support neighborhood businesses digitizing with Dukaan Setu.</p>
                            </div>
                        </div>

                        <div className="row g-4">
                            {stores.length === 0 ? (
                                <div className="col-12 text-center py-5">
                                    <div className="p-50 bg-white shadow-sm border-radius-20">
                                        <i className="fas fa-store-slash fa-4x mb-20 opacity-25"></i>
                                        <h4>No shops are currently live</h4>
                                        <p>Check back later or register your own store today!</p>
                                        <Link href="/register" className="rr-btn mt-20">Register My Store</Link>
                                    </div>
                                </div>
                            ) : (
                                stores.map((store) => (
                                    <div key={store.id} className="col-xl-4 col-md-6">
                                        <div className="card h-100 border-0 shadow-sm overflow-hidden" style={{borderRadius: '20px', transition: 'transform 0.3s'}}>
                                            <div style={{height: '180px', overflow: 'hidden', position: 'relative'}}>
                                                {/* Background image / Shop Front */}
                                                <div style={{
                                                    backgroundColor: store.accentColor || '#f0f0f0',
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundImage: store.shopFrontUrl ? `url(${store.shopFrontUrl})` : 'none',
                                                    backgroundSize: 'cover',
                                                    opacity: 0.8
                                                }}></div>
                                                <span className="badge bg-white text-dark shadow-sm px-3 py-2" style={{position: 'absolute', top: '15px', right: '15px', borderRadius: '30px', fontSize: '11px', fontWeight: 'bold'}}>
                                                    {store.category.toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="card-body p-30 position-relative" style={{marginTop: '-50px'}}>
                                                <div className="bg-white p-3 shadow-sm mb-20 d-inline-block border-radius-10" style={{borderRadius: '15px', border: '2px solid white'}}>
                                                    <img src={store.logo || 'https://via.placeholder.com/60'} alt={store.name} style={{width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover'}} />
                                                </div>
                                                <h4 className="card-title fw-bold">{store.name}</h4>
                                                <p className="text-muted small mb-20" style={{minHeight: '40px'}}>
                                                    <i className="fas fa-map-marker-alt me-2 color-primary" style={{color: '#2E7D32'}}></i>
                                                    {store.city}, {store.state}
                                                </p>
                                                <div className="d-flex align-items-center justify-content-between pt-20" style={{borderTop: '1px solid #f0f0f0'}}>
                                                    <span className="small text-muted"><i className="fas fa-phone-alt me-1"></i> {store.phone}</span>
                                                    <Link href={`/shop/${store.slug}`} className="btn btn-dark btn-sm rounded-pill px-4">
                                                        Visit Store
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer store={platformStore} />
        </>
    );
}
