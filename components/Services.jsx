export default function Services({ store }) {
    return (
        <section className="what-we-do section-space section-bg-2 overflow-hidden">
            <div className="container rr-shape-p-c_1">
                <div className="what-we-do__shape-1 rr-shape-p-s_1 rr-upDown"><img src="/assets/imgs/what-we-do/shape-1.png" alt="" /></div>
                <div className="what-we-do__shape-2 rr-shape-p-s_1 rr-upDown"><img src="/assets/imgs/what-we-do/shape-2.png" alt="" /></div>
                <div className="row mb-60 mb-sm-40 mb-xs-35 align-items-lg-end align-items-center">
                    <div className="col-xl-6">
                        <div className="section__title-wrapper text-center text-xl-start">
                            <span className="section__subtitle justify-content-start mb-13"><span data-width="40px" className="left-separetor"></span>Our Services</span>
                            <h2 className="section__title title-animation text-capitalize mb-0 rr-br-hidden-md">Fully Integrated <br />Local Store Services.</h2>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="d-flex justify-content-xl-end mt-xs-20 mt-sm-20 mt-md-20 mt-lg-20 justify-content-center rr-mb-13-hide-xl">
                            <a href="#contact" className="rr-btn">
                                <span className="btn-wrap">
                                    <span className="text-one">Talk to Owner</span>
                                    <span className="text-two">Talk to Owner</span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="row mb-minus-30">
                    <div className="col-xl-4 col-md-6">
                        <div className="what-we-do__item d-flex flex-column mb-30">
                            <div className="what-we-do__item-bg" style={{background: 'url(/assets/imgs/what-we-do/what-we-do__bg.jpg)'}}></div>
                            <div className="what-we-do__item-img mb-20">
                                <img src="/images/delivery.png" alt="Home Delivery" style={{borderRadius: '10px'}} />
                            </div>
                            <div className="what-we-do__item-text">
                                <h4 className="title mb-20">Home Delivery</h4>
                                <p className="mb-0">Fast and reliable home delivery service for all your grocery needs within 5km radius of {store.name}.</p>
                            </div>
                            <a href="#contact" className="readmore rr-a-16">Contact Now <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 5.5L19 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13.75 1L19 5.5L13.75 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            </a>
                        </div>
                    </div>

                    <div className="col-xl-4 col-md-6">
                        <div className="what-we-do__item d-flex flex-column mb-30">
                            <div className="what-we-do__item-bg" style={{background: 'url(/assets/imgs/what-we-do/what-we-do__bg.jpg)'}}></div>
                            <div className="what-we-do__item-img mb-20">
                                <img src="/assets/imgs/what-we-do/what-we-do__item-2.png" alt="" />
                            </div>
                            <div className="what-we-do__item-text">
                                <h4 className="title mb-20">Fresh Quality Store</h4>
                                <p className="mb-0">We guarantee the freshest items sourced daily. Quality testing is our priority for your health.</p>
                            </div>
                            <a href="#contact" className="readmore rr-a-16">Visit Store <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 5.5L19 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13.75 1L19 5.5L13.75 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            </a>
                        </div>
                    </div>

                    <div className="col-xl-4 col-md-6">
                        <div className="what-we-do__item d-flex flex-column mb-30">
                            <div className="what-we-do__item-bg" style={{background: 'url(/assets/imgs/what-we-do/what-we-do__bg.jpg)'}}></div>
                            <div className="what-we-do__item-img mb-20">
                                <img src="/assets/imgs/what-we-do/what-we-do__item-3.png" alt="" />
                            </div>
                            <div className="what-we-do__item-text">
                                <h4 className="title mb-20">Udhar Facility</h4>
                                <p className="mb-0">Trusted customers can enjoy digital udhar ledger benefits. Pay at your convenience monthly.</p>
                            </div>
                            <a href="#contact" className="readmore rr-a-16">Learn More <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 5.5L19 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13.75 1L19 5.5L13.75 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
