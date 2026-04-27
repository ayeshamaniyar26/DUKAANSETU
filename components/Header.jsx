'use client';
import Link from 'next/link';

export default function Header({ store }) {
  return (
    <header className="header header-1 sticky-header" id="header-sticky" style={{ backgroundColor: '#000000', transition: 'all 0.3s ease' }}>
        <div className="container">
            <div className="d-flex align-items-center justify-content-between py-1">
                <div className="d-flex align-items-center gap-3">
                    <Link href="/" className="d-block" style={{ overflow: 'visible' }}>
                        <img src="/images/dukaan-setu-logo.png" alt="Logo" style={{ height: '80px', width: 'auto', objectFit: 'contain', transform: 'scale(1.6)', transformOrigin: 'left center', display: 'block', marginLeft: '10px' }} />
                    </Link>
                </div>
                
                <nav className="d-none d-lg-block">
                    <ul className="d-flex align-items-center mb-0 gap-4" style={{listStyle: 'none'}}>
                        <li><Link href="/" className="color-white fw-bold">Home</Link></li>
                        <li><Link href="/#about" className="color-white fw-bold">About</Link></li>
                        <li><Link href="/shops" className="color-white">Shops</Link></li>
                        <li><Link href="/contact" className="color-white fw-bold">Contact</Link></li>
                        <li><Link href="/login" className="btn btn-sm btn-outline-light rounded-pill px-3 ms-4">Login</Link></li>
                        <li><Link href="/register" className="btn btn-sm text-white rounded-pill px-3" style={{backgroundColor: '#2E7D32'}}>Register</Link></li>
                    </ul>
                </nav>

                {/* Hamburger Menu for Mobile */}
                <button className="sidebar__toggle d-lg-none border-0 bg-transparent text-white p-2" onClick={() => {
                    document.querySelector('.offcanvas__area')?.classList.add('info-open');
                    document.querySelector('.offcanvas__overlay')?.classList.add('overlay-open');
                }}>
                    <i className="fa-solid fa-bars fa-2xl"></i>
                </button>
            </div>
        </div>
    </header>
  );
}
