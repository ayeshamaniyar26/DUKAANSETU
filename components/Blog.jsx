export default function Blog({ store }) {
    return (
        <section className="blog section-space">
            <div className="container">
                <div className="row mb-60 mb-sm-40 mb-xs-35 align-items-lg-end align-items-center">
                    <div className="col-xl-6">
                        <div className="section__title-wrapper text-center text-xl-start">
                            <span className="section__subtitle justify-content-start mb-13"><span data-width="40px" className="right-separetor"></span>Shop News</span>
                            <h2 className="section__title title-animation text-capitalize mb-0">Latest Offers & Store Updates</h2>
                        </div>
                    </div>
                </div>

                <div className="row mb-minus-60">
                    <div className="col-xl-4 col-md-6">
                        <div className="blog__item mb-60">
                            <div className="blog__item-media d-block">
                                <img src="/images/gallery-1.png" alt="" className="img-fluid" />
                            </div>
                            <div className="blog__item-text">
                                <span className="d-block mb-10"><i className="fa-regular fa-calendar-days text-primary"></i> 26 Jan, 2024</span>
                                <h4 className="blog__item-title mb-25 rr-fw-bold text-capitalize">Monthly Ration Discounts Now Live!</h4>
                                <p>Get up to 20% off on bulk purchase of Atta and Rice this month.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="blog__item mb-60">
                            <div className="blog__item-media d-block">
                                <img src="/images/delivery.png" alt="" className="img-fluid" />
                            </div>
                            <div className="blog__item-text">
                                <span className="d-block mb-10"><i className="fa-regular fa-calendar-days text-primary"></i> 20 Jan, 2024</span>
                                <h4 className="blog__item-title mb-25 rr-fw-bold text-capitalize">New Arrival: Organic Honey</h4>
                                <p>We now stock 100% pure organic honey sourced from local farms.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="blog__item mb-60">
                            <div className="blog__item-media d-block">
                                <img src="/images/gallery-3.png" alt="" className="img-fluid" />
                            </div>
                            <div className="blog__item-text">
                                <span className="d-block mb-10"><i className="fa-regular fa-calendar-days text-primary"></i> 15 Jan, 2024</span>
                                <h4 className="blog__item-title mb-25 rr-fw-bold text-capitalize">Free Home Delivery Update</h4>
                                <p>Minimum order value for free delivery reduced to ₹499 only.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
