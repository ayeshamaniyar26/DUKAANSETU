'use client';
import Link from 'next/link';

export default function Sidebar({ items, activeItem }) {
  return (
    <>
      <div className="admin-sidebar" id="admin-sidebar" style={{
          width: '280px', 
          backgroundColor: '#FFFFFF', 
          color: 'var(--text-main)',
          borderRight: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          height: '100vh',
          zIndex: 100
      }}>
          <div className="mb-40 px-30 mt-40">
              <div className="d-flex align-items-center gap-12 mb-8">
                  <div style={{width: '32px', height: '32px', backgroundColor: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <i className="fas fa-store text-white" style={{fontSize: '16px'}}></i>
                  </div>
                  <h2 style={{color: 'var(--text-main)', fontWeight: '800', fontSize: '22px', letterSpacing: '-0.5px', margin: 0}}>Dukaan <span style={{color: 'var(--primary)'}}>Setu</span></h2>
              </div>
              <p style={{color: 'var(--text-muted)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', paddingLeft: '44px'}}>Owner Portal</p>
          </div>
          
          <nav style={{padding: '0 20px'}}>
              <ul style={{listStyle: 'none', padding: 0}}>
                  {items.map((item, idx) => (
                      <li key={idx} className="mb-4">
                          <Link href={item.link} 
                              className={`d-flex align-items-center gap-16 px-20 py-12 text-decoration-none`}
                              style={{
                                  borderRadius: '12px',
                                  color: activeItem === item.name ? 'var(--primary)' : 'var(--text-muted)',
                                  backgroundColor: activeItem === item.name ? 'var(--primary-light)' : 'transparent',
                                  fontWeight: activeItem === item.name ? '700' : '500',
                                  fontSize: '14px',
                                  transition: '0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                              }}
                          >
                              <i className={`${item.icon}`} style={{width: '20px', fontSize: '18px'}}></i>
                              <span>{item.name}</span>
                          </Link>
                      </li>
                  ))}
              </ul>
          </nav>

          <div style={{marginTop: 'auto', padding: '30px', borderTop: '1px solid var(--border-light)'}}>
              <div className="d-flex align-items-center gap-12">
                  <div style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--primary)'}}>
                      <i className="fas fa-user-circle fa-lg"></i>
                  </div>
                  <div>
                      <div style={{fontSize: '13px', fontWeight: '700'}}>Shop Admin</div>
                      <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>Active Session</div>
                  </div>
              </div>
          </div>
      </div>
      <div className="sidebar-overlay" id="sidebar-overlay" onClick={() => {
        document.getElementById('admin-sidebar').classList.remove('opened');
        document.getElementById('sidebar-overlay').classList.remove('opened');
      }}></div>
    </>
  );
}
