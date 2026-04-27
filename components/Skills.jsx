export default function Skills({ store }) {
    return (
        <section className="our-skill-more section-space section-bg-1 overflow-hidden">
            <div className="container rr-shape-p-c_1">
                <div className="our-skill-more__shape-1 rr-shape-p-s_1 rr-upDown"><img src="/assets/imgs/our-skill/x.png" alt="" /></div>
                <div className="our-skill-more__shape-2 rr-shape-p-s_1 rr-downUp"><img src="/assets/imgs/our-skill/shape-1.png" alt="" /></div>
                <div className="row align-items-center">
                    <div className="col-xl-6">
                        <div className="section__title-wrapper text-center text-xl-start rr-mb-60-lg">
                            <span className="section__subtitle justify-content-start mb-13"><span data-width="40px" className="left-separetor"></span>Our Commitment</span>
                            <h2 className="section__title title-animation text-capitalize mb-15 mb-xs-10">We Deliver Excellence <br /> To Your Door.</h2>
                            <p className="mb-30 mb-xs-20">At {store.name}, we are committed to providing the highest quality groceries at the best prices. Our team works tirelessly to ensure your satisfaction with every order.</p>

                            <div className="skill-one__progress mb-40 mb-xs-30 text-start">
                                <div className="skill-one__progress-single">
                                    <h6 className="skill-one__progress-title mb-10">Freshness Guaranteed</h6>
                                    <div className="bar">
                                        <div className="count-text">99%</div>
                                        <div className="bar-inner count-bar counted" style={{width: '99%'}}></div>
                                    </div>
                                </div>

                                <div className="skill-one__progress-single">
                                    <h6 className="skill-one__progress-title mb-10">On-Time Delivery</h6>
                                    <div className="bar">
                                        <div className="count-text">95%</div>
                                        <div className="bar-inner count-bar counted" style={{width: '95%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="our-skill-more__media d-flex align-items-center align-items-xl-end flex-column">
                            <div className="our-skill-more__media-img img1"><img src="/assets/imgs/our-skill/our-skill-2.png" alt="" /></div>
                            <div className="our-skill-more__media-img img2"><img src="/assets/imgs/our-skill/our-skill-1.png" alt="" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
