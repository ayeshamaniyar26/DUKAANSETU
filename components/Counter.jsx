export default function Counter({ store }) {
    return (
        <section className="experience theme-bg-heading-primary section-space-100 position-relative z-1 overflow-hidden">
            <div className="experience__bg" style={{background: 'url(/assets/imgs/experience/experience.jpg)', opacity: 0.1}}></div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="experience__box d-flex flex-wrap justify-content-sm-between">
                            <div className="experience__item d-flex flex-wrap align-items-center">
                                <div className="experience__item-icon">
                                    <img src="/assets/imgs/experience/experience__item-1.png" alt="" />
                                </div>
                                <div className="experience__item-text">
                                    <h2 className="experience__item-text-title color-white">1.2k+</h2>
                                    <h4 className="color-white rr-fw-sbold mb-0">Monthly Orders</h4>
                                </div>
                            </div>

                            <div className="experience__item d-flex flex-wrap align-items-center">
                                <div className="experience__item-icon">
                                    <img src="/assets/imgs/experience/experience__item-2.png" alt="" />
                                </div>
                                <div className="experience__item-text">
                                    <h2 className="experience__item-text-title color-white">5k+</h2>
                                    <h4 className="color-white rr-fw-sbold mb-0">Satisfied Families</h4>
                                </div>
                            </div>

                            <div className="experience__item d-flex flex-wrap align-items-center">
                                <div className="experience__item-icon">
                                    <img src="/assets/imgs/experience/experience__item-3.png" alt="" />
                                </div>
                                <div className="experience__item-text">
                                    <h2 className="experience__item-text-title color-white">15+</h2>
                                    <h4 className="color-white rr-fw-sbold mb-0">Years in Locality</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
