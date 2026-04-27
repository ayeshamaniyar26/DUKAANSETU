export default function Testimonials({ store }) {
    return (
        <section className="testimonial section-space__top overflow-hidden">
            <div className="container position-relative b-t__scroll-container-2">
                <div className="big-text__scroll-2 b-t__scroll" data-target=".b-t__scroll-container-2" data-target-height="30">SETU</div>
                <div className="row position-relative z-99">
                    <div className="col-12">
                        <div className="section__title-wrapper text-center mb-60 mb-sm-40 mb-xs-35">
                            <span className="section__subtitle justify-content-center mb-13 ml-0"><span data-width="40px" className="left-separetor"></span>Testimonial<span data-width="40px" className="right-separetor"></span></span>
                            <h2 className="section__title title-animation text-capitalize">What Our Customers Think</h2>
                        </div>

                        <div className="testimonial__item d-flex flex-column flex-lg-row justify-content-center">
                            <div className="testimonial__item-media" style={{maxWidth: '200px'}}>
                                <img src="/images/team-2.png" alt="" style={{borderRadius: '50%'}} />
                            </div>

                            <div className="testimonial__item-content__wrapper">
                                <div className="testimonial__item-icon">
                                    <img src="/assets/imgs/testimonial/qotetion.png" alt="" />
                                </div>
                                <div className="testimonial__item-content">
                                    <p className="mb-20 mb-xs-15">"We always buy our monthly ration from {store.name}. The quality is always top-notch, and the new WhatsApp ordering makes it so easy!"</p>

                                    <div className="testimonial__item-author d-flex align-items-center">
                                        <div className="testimonial__item-author-content d-flex flex-column">
                                            <ul className="testimonial__item-rating d-flex flex-wrap flex-row mb-10">
                                                <li><img src="/assets/imgs/testimonial/start.png" alt="" /></li>
                                                <li><img src="/assets/imgs/testimonial/start.png" alt="" /></li>
                                                <li><img src="/assets/imgs/testimonial/start.png" alt="" /></li>
                                                <li><img src="/assets/imgs/testimonial/start.png" alt="" /></li>
                                                <li><img src="/assets/imgs/testimonial/start.png" alt="" /></li>
                                            </ul>
                                            <h4 className="testimonial__item-author-title">Mukesh Agarwal</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
