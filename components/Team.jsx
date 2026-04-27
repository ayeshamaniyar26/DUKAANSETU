export default function Team({ store }) {
    return (
        <section className="team section-space">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section__title-wrapper text-center mb-60 mb-sm-40 mb-xs-35">
                            <span className="section__subtitle justify-content-center mb-13 ml-0"><span data-width="40px" className="left-separetor"></span>Our Staff<span data-width="40px" className="right-separetor"></span></span>
                            <h2 className="section__title title-animation text-capitalize">The Faces Behind <br /> {store.name}</h2>
                        </div>
                    </div>
                </div>

                <div className="row mb-minus-30">
                    <div className="col-xl-4 col-md-6">
                        <div className="team__item mb-30">
                            <div className="team__item-media d-block">
                                <img src="/images/team-1.png" alt="" className="img-fluid" />
                            </div>
                            <div className="team__item-text d-flex align-items-center justify-content-between">
                                <div className="team__item-text__left">
                                    <h4 className="team__item-title rr-fw-bold color-white mb-0">Rahul Sharma</h4>
                                    <span className="team__item-subtitle color-white">Store Owner</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="team__item mb-30">
                            <div className="team__item-media d-block">
                                <img src="/images/team-2.png" alt="" className="img-fluid" />
                            </div>
                            <div className="team__item-text d-flex align-items-center justify-content-between">
                                <div className="team__item-text__left">
                                    <h4 className="team__item-title rr-fw-bold color-white mb-0">Amit Jha</h4>
                                    <span className="team__item-subtitle color-white">Inventory Manager</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="team__item mb-30">
                            <div className="team__item-media d-block">
                                <img src="/images/team-3.png" alt="" className="img-fluid" />
                            </div>
                            <div className="team__item-text d-flex align-items-center justify-content-between">
                                <div className="team__item-text__left">
                                    <h4 className="team__item-title rr-fw-bold color-white mb-0">Sunita Devi</h4>
                                    <span className="team__item-subtitle color-white">Quality Controller</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
