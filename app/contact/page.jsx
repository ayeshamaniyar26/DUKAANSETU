'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ContactPage() {
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
            <Header store={platformStore} />
            <main style={{backgroundColor: '#fff'}}>
                
                {/* Banner Section */}
                <section className="breadcrumb__area pt-100 pb-100 p-relative theme-bg-heading-primary" style={{backgroundColor: '#15181B'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="breadcrumb__content text-center">
                                    <h1 className="breadcrumb__title color-white mb-20 text-capitalize">Get In Touch With Us</h1>
                                    <p className="color-white opacity-75 mb-30">We're here to support your journey towards digital retail success.</p>
                                    <div className="breadcrumb__list">
                                        <span><Link href="/" className="color-white">Home</Link></span>
                                        <span className="dvdr color-white mx-2"><i className="fa-solid fa-angle-right"></i></span>
                                        <span className="color-primary" style={{color: '#2E7D32'}}>Contact Us</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Contact Info Cards */}
                <section className="contact-info-cards pt-100 pb-60">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-lg-4">
                                <div className="card h-100 text-center p-40 border-0 shadow-sm" style={{borderRadius: '15px', backgroundColor: '#f9fff9'}}>
                                    <div className="icon-wrap mb-20">
                                        <i className="fas fa-map-marker-alt fa-3x" style={{color: '#2E7D32'}}></i>
                                    </div>
                                    <h4 className="fw-bold mb-10">Our Location</h4>
                                    <p className="text-muted mb-0">Plot No. 45, Sector 12, Dharavi Main Road<br/>Mumbai, Maharashtra - 400017</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card h-100 text-center p-40 border-0 shadow-sm" style={{borderRadius: '15px', backgroundColor: '#f9fff9'}}>
                                    <div className="icon-wrap mb-20">
                                        <i className="fas fa-envelope fa-3x" style={{color: '#2E7D32'}}></i>
                                    </div>
                                    <h4 className="fw-bold mb-10">Email Address</h4>
                                    <p className="text-muted mb-0">support@dukaansetu.com<br/>info@dukaansetu.com</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card h-100 text-center p-40 border-0 shadow-sm" style={{borderRadius: '15px', backgroundColor: '#f9fff9'}}>
                                    <div className="icon-wrap mb-20">
                                        <i className="fas fa-phone-alt fa-3x" style={{color: '#2E7D32'}}></i>
                                    </div>
                                    <h4 className="fw-bold mb-10">Phone Number</h4>
                                    <p className="text-muted mb-0">+91 90000 00000<br/>+91 91122 33445</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="map-section text-center pb-80">
                    <div className="container">
                        <h2 className="section__title mb-20">Contact Us</h2>
                        <a href="https://maps.google.com" target="_blank" className="btn btn-success rounded-pill px-4 py-2" style={{backgroundColor: '#2E7D32', border: 'none'}}>
                            Find us on Map
                        </a>
                    </div>
                </section>

                {/* Get in Touch Section */}
                <section className="get-in-touch pt-60 pb-100">
                    <div className="container">
                        <div className="row align-items-center g-5">
                            <div className="col-lg-6">
                                <div className="contact-illustration text-center">
                                    {/* Using a placeholder SVG illustrating communication */}
                                    <img src="https://img.freepik.com/free-vector/customer-support-flat-illustration_23-2148892786.jpg?t=st=1713874000~exp=1713877600~hmac=56238b7e28a554a9d7b4e85764c6a6f44d8e578c7c9f6d6c4d7c58c2c1a8e9e1" alt="Get in Touch" className="img-fluid" style={{borderRadius: '20px'}} />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="contact-form-wrap">
                                    <h3 className="fw-bold mb-10">Get in touch</h3>
                                    <p className="text-muted mb-30">Have questions? We're here to help you digitize your business.</p>
                                    
                                    <form>
                                        <div className="mb-20">
                                            <input type="text" className="form-control border-0 border-bottom rounded-0 px-0" placeholder="Full Name" style={{boxShadow: 'none'}} />
                                        </div>
                                        <div className="row g-3 mb-20">
                                            <div className="col-md-6">
                                                <input type="email" className="form-control border-0 border-bottom rounded-0 px-0" placeholder="Email Address" style={{boxShadow: 'none'}} />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" className="form-control border-0 border-bottom rounded-0 px-0" placeholder="Subject" style={{boxShadow: 'none'}} />
                                            </div>
                                        </div>
                                        <div className="mb-30">
                                            <textarea className="form-control border-0 border-bottom rounded-0 px-0" placeholder="Write Your Message" rows="4" style={{boxShadow: 'none', resize: 'none'}}></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-success rounded-pill px-5 py-3" style={{backgroundColor: '#2E7D32', border: 'none'}}>
                                            Send Message
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer store={platformStore} />

            <style jsx>{`
                .form-control:focus {
                    border-color: #2E7D32 !important;
                }
                .card:hover {
                    transform: translateY(-5px);
                    transition: transform 0.3s;
                }
            `}</style>
        </>
    );
}
