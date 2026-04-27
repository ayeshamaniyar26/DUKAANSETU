export default function RequestQuote({ store }) {
    return (
        <section className="request-a-quote" id="contact">
            <div className="container">
                <div className="col-12">
                    <div className="request-a-quote__box request-a-quote__box-up d-flex flex-column flex-xl-row align-items-center">
                        <div className="request-a-quote__left">
                            <div className="request-a-quote__left-bg rr-upDown" style={{background: 'url(/assets/imgs/request-quote/bg.png)'}}></div>
                            <div className="section__title-wrapper text-center text-xl-start">
                                <span className="section__subtitle justify-content-start mb-13"><span data-width="40px" className="left-separetor"></span>Lets Talk</span>
                                <h2 className="section__title title-animation mb-20">Have a Big Order or Query? Contact With Us</h2>
                                <p className="des mb-35">Whether you want to order in bulk for a function or have questions about our monthly ration plans, we are here to help.</p>

                                <div className="request-a-quote__meta d-flex align-items-center justify-content-center justify-content-xl-start">
                                    <div className="request-a-quote__meta-img">
                                        <img src="/assets/imgs/request-quote/author-img.jpg" alt="" />
                                    </div>
                                    <div className="request-a-quote__meta-content">
                                        <h5 className="title">{store.name} Support</h5>
                                        <span className="position">Owner Assistant</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="request-a-quote__right">
                            <form className="request-a-quote__form">
                                <h3 className="text-center mb-30">Send Inquiry</h3>
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="request-a-quote__form-input">
                                            <input type="text" placeholder="Your Name" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="request-a-quote__form-input">
                                            <input type="tel" placeholder="Phone Number" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="request-a-quote__form-input textarea">
                                            <textarea placeholder="Order Details or Inquiry"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="rr-btn">
                                            <span className="btn-wrap">
                                                <span className="text-one">Submit Message</span>
                                                <span className="text-two">Submit Message</span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
