import Link from 'next/link';

export default function Footer({ store }) {
  return (
    <footer className="footer footer-1 theme-bg-heading-primary">
        <div className="footer__main-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <div className="footer__widget footer__widget-1">
                                <div className="footer__logo mb-30" style={{background: 'white', padding: '15px', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <img src="/images/dukaan-setu-logo.png" alt="Dukkan Setu" style={{maxHeight: '40px', width: 'auto'}} />
                                </div>
                                <div className="footer__content">
                                    <p className="color-white mb-30">Empowering local shopkeepers across India to take their business online with ease. Join the digital revolution with Dukkan Setu.</p>
                                    <div className="footer__social">
                                        <ul className="footer__social-links d-flex">
                                            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                            <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6">
                            <div className="footer__widget footer__widget-2">
                                <h4 className="footer__widget-title color-white mb-30">Quick Links</h4>
                                <ul className="footer__link color-white">
                                    <li><Link href="/">Home</Link></li>
                                    <li><Link href="#about">About Us</Link></li>
                                    <li><Link href="#products">Our Products</Link></li>
                                    <li><Link href="#contact">Contact Us</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                            <div className="footer__widget footer__widget-3">
                                <h4 className="footer__widget-title color-white mb-30">Contact Info</h4>
                                <ul className="footer__contact color-white">
                                    <li>
                                        <div className="icon"><i className="fas fa-phone-alt"></i></div>
                                        <div className="text"><a href={`tel:${store.phone}`}>{store.phone}</a></div>
                                    </li>
                                    <li>
                                        <div className="icon"><i className="fas fa-envelope"></i></div>
                                        <div className="text"><a href="mailto:support@dukkansetu.com">support@dukkansetu.com</a></div>
                                    </li>
                                    <li>
                                        <div className="icon"><i className="fas fa-map-marker-alt"></i></div>
                                        <div className="text">Remote India, Pan India Service</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                            <div className="footer__widget footer__widget-4">
                                <h4 className="footer__widget-title color-white mb-30">Newsletter</h4>
                                <p className="color-white mb-20">Subscribe to get updates on new features and stores.</p>
                                <div className="footer__newsletter">
                                    <form action="#">
                                        <input type="email" placeholder="Email Address" />
                                        <button type="submit" className="rr-btn"><i className="fas fa-paper-plane"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="footer__bottom-wrapper">
                <div className="container">
                    <div className="footer__bottom">
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="footer__copyright">
                                    <p className="color-white mb-0">© 2026 Dukkan Setu. All Rights Reserved.</p>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="footer__bottom-link d-flex justify-content-md-end">
                                    <ul>
                                        <li><a href="#">Privacy Policy</a></li>
                                        <li><a href="#">Terms & Conditions</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
}
