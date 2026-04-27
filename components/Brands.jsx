export default function Brands({ store }) {
    return (
        <section className="our-clients section-space section-bg-1">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 text-center mb-60">
                        <span className="section__subtitle justify-content-center mb-13 ml-0"><span data-width="40px" className="left-separetor"></span>Trusted Brands We Stock<span data-width="40px" className="right-separetor"></span></span>
                    </div>

                    <div className="col-12">
                        <div className="brand__active d-flex justify-content-between align-items-center flex-wrap gap-4">
                            <img src="/assets/imgs/brand/brand-1.png" alt="" style={{height: '50px', filter: 'grayscale(100%) opacity(0.5)'}} />
                            <img src="/assets/imgs/brand/brand-2.png" alt="" style={{height: '50px', filter: 'grayscale(100%) opacity(0.5)'}} />
                            <img src="/assets/imgs/brand/brand-3.png" alt="" style={{height: '50px', filter: 'grayscale(100%) opacity(0.5)'}} />
                            <img src="/assets/imgs/brand/brand-4.png" alt="" style={{height: '50px', filter: 'grayscale(100%) opacity(0.5)'}} />
                            <img src="/assets/imgs/brand/brand-5.png" alt="" style={{height: '50px', filter: 'grayscale(100%) opacity(0.5)'}} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
