export default function Portfolio({ store }) {
    return (
        <section className="latest-project section-space">
            <div className="container">
                <div className="row mb-60 mb-sm-40 mb-xs-35 align-items-lg-end align-items-center">
                    <div className="col-xl-7">
                        <div className="section__title-wrapper text-center text-xl-start">
                            <span className="section__subtitle justify-content-start mb-13"><span data-width="40px" className="left-separetor"></span>Our Store Gallery</span>
                            <h2 className="section__title title-animation text-capitalize mb-0">Explore Our Shop & <br /> Latest Success Stories</h2>
                        </div>
                    </div>
                    <div className="col-xl-5">
                        <div className="d-flex flex-column justify-content-xl-end mt-xs-20 mt-sm-20 mt-md-20 mt-lg-20 justify-content-center text-center text-xl-start">
                            <p className="mb-30 mb-xs-20">We take pride in our clean, organized store and high-quality product displays. Each section is curated for your best shopping experience.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="latest-project__tab masonary-menu d-flex flex-wrap mb-35 mb-xs-30">
                            <button className="active">All Sections</button>
                            <button>Groceries</button>
                            <button>Dairy</button>
                            <button>Fruits</button>
                            <button>Packaged</button>
                        </div>
                    </div>
                </div>

                <div className="row grid mb-minus-30">
                    <div className="col-lg-4 col-md-6 grid-item">
                        <div className="latest-project__item mb-30">
                            <div className="latest-project__item-thumb wow clip-a-z">
                                <img src="/images/gallery-1.png" alt="" />
                            </div>
                            <div className="latest-project__item-content">
                                <div className="text">
                                    <span className="subtitle color-white d-block">Grocery Section</span>
                                    <h4 className="title color-white">Daily Essentials</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 grid-item">
                        <div className="latest-project__item mb-30">
                            <div className="latest-project__item-thumb wow clip-a-z">
                                <img src="/images/gallery-2.png" alt="" />
                            </div>
                            <div className="latest-project__item-content">
                                <div className="text">
                                    <span className="subtitle color-white d-block">Fresh Fruits</span>
                                    <h4 className="title color-white">Sourced Daily</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 grid-item">
                        <div className="latest-project__item mb-30">
                            <div className="latest-project__item-thumb wow clip-a-z">
                                <img src="/images/gallery-3.png" alt="" />
                            </div>
                            <div className="latest-project__item-content">
                                <div className="text">
                                    <span className="subtitle color-white d-block">Dairy & Milk</span>
                                    <h4 className="title color-white">Morning Fresh</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
