export default function ContactList({ store }) {
    return (
        <section className="contact-list contact-list__space contact-list__background theme-bg-heading-primary" style={{background: 'url(/assets/imgs/request-quote/request-quote.png)'}}>
            <div className="container">
                <div className="row mb-minus-30">
                    <div className="col-xxl-3 col-xl-4 col-md-6">
                        <div className="contact-list__item d-flex align-items-center justify-content-center mb-30">
                            <div className="contact-list__item-icon">
                                <i className="fa-solid fa-phone fa-2x" style={{color: '#2E7D32'}}></i>
                            </div>
                            <div className="contact-list__item-text">
                                <h4 className="title">Phone Number</h4>
                                <a href={`tel:${store.phone}`}>{store.phone}</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-xl-4 col-md-6">
                        <div className="contact-list__item d-flex align-items-center justify-content-center mb-30">
                            <div className="contact-list__item-icon">
                                <i className="fa-solid fa-envelope fa-2x" style={{color: '#2E7D32'}}></i>
                            </div>
                            <div className="contact-list__item-text">
                                <h4 className="title">Email Address</h4>
                                <a href="mailto:support@dukkansetu.com">Inquiry Support</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-xl-4 col-md-6">
                        <div className="contact-list__item d-flex align-items-center justify-content-center mb-30">
                            <div className="contact-list__item-icon">
                                <i className="fa-solid fa-location-dot fa-2x" style={{color: '#2E7D32'}}></i>
                            </div>
                            <div className="contact-list__item-text">
                                <h4 className="title">Our Location</h4>
                                <span>Delhi, NCR, India</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-xl-4 col-md-6">
                        <div className="contact-list__item d-flex align-items-center justify-content-center mb-30">
                            <div className="contact-list__item-icon">
                                <i className="fa-solid fa-clock fa-2x" style={{color: '#2E7D32'}}></i>
                            </div>
                            <div className="contact-list__item-text">
                                <h4 class="title">Opening Hour </h4>
                                <span>Mon - Sun: 08am - 10pm</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
