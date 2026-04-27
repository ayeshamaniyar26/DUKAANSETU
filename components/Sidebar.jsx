'use client';
import Link from 'next/link';

export default function Sidebar({ items, activeItem }) {
  return (
    <>
      <div className="admin-sidebar" id="admin-sidebar" style={{width: '280px', backgroundColor: '#15181B', color: 'white'}}>
          <div className="mb-40 px-30 mt-30">
              <h2 style={{color: 'white', fontWeight: '800', fontSize: '24px', letterSpacing: '-1px'}}>Dukkan <span style={{color: '#4CAF50'}}>Setu</span></h2>
              <p style={{color: '#4CAF50', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px'}}>Owner Portal</p>
          </div>
          <ul style={{listStyle: 'none', padding: 0}}>
              {items.map((item, idx) => (
                  <li key={idx} className="mb-10 padd-lr-30">
                      <Link href={item.link} className={`sidebar-link ${activeItem === item.name ? 'active' : ''}`}>
                          <i className={item.icon} style={{width: '20px'}}></i>
                          <span>{item.name}</span>
                      </Link>
                  </li>
              ))}
          </ul>
      </div>
      <div className="sidebar-overlay" id="sidebar-overlay" onClick={() => {
        document.getElementById('admin-sidebar').classList.remove('opened');
        document.getElementById('sidebar-overlay').classList.remove('opened');
      }}></div>
    </>
  );
}
