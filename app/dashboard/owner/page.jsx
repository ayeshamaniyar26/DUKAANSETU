'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { getDashboardData } from './actions';
import Link from 'next/link';

export default function OwnerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const menuItems = [
    { name: 'Dashboard', icon: 'fas fa-home', link: '/dashboard/owner' },
    { name: 'Products', icon: 'fas fa-box', link: '/dashboard/owner/products' },
    { name: 'Orders', icon: 'fas fa-shopping-cart', link: '/dashboard/owner/orders' },
    { name: 'Udhar Ledger', icon: 'fas fa-book-open', link: '/dashboard/owner/ledger' },
    { name: 'Customers', icon: 'fas fa-users', link: '/dashboard/owner/customers' },
    { name: 'Profile', icon: 'fas fa-user-circle', link: '/dashboard/owner/profile' },
    { name: 'Logout', icon: 'fas fa-sign-out-alt', link: '/logout' },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const storeId = localStorage.getItem('storeId');
    const res = await getDashboardData(storeId);
    setData(res);
    setLoading(false);
  }

  if (loading) return (
    <div style={{display: 'flex', backgroundColor: '#F8FFF8', minHeight: '100vh', alignItems: 'center', justifyContent: 'center'}}>
        <div className="text-muted fw-500">Loading your store dashboard...</div>
    </div>
  );

    return (
        <div style={{display: 'flex', backgroundColor: 'var(--bg-main)', minHeight: '100vh'}}>
            <Sidebar items={menuItems} activeItem="Dashboard" />
            <div style={{marginLeft: '280px', padding: '0', flexGrow: 1, width: 'calc(100% - 280px)'}}>
                
                {/* Page Header */}
                <header style={{ padding: '60px 48px 32px 48px' }} className="animate-fade-in">
                    <div className="d-flex justify-content-between align-items-center mb-40">
                        <div>
                            <h1 className="fw-bold mb-8" style={{ fontSize: '40px', color: 'var(--text-main)', letterSpacing: '-0.04em' }}>
                                {data?.storeName || 'Dashboard'}
                            </h1>
                            <p className="text-muted mb-0" style={{ fontSize: '18px', fontWeight: '500' }}>
                                Welcome back! Here's how your business is performing today.
                            </p>
                        </div>
                        <div className="d-flex gap-16">
                            <button 
                                className="btn bg-white shadow-sm px-24 py-12" 
                                onClick={fetchData} 
                                style={{borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', fontWeight: '700', fontSize: '14px'}}
                            >
                                <i className="fas fa-sync-alt me-8 text-success"></i> Sync Data
                            </button>
                        </div>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="row g-24">
                        {[
                            { label: 'Total Products', value: data?.productCount || 0, icon: 'fa-box-open', color: '#3b82f6', bg: '#eff6ff', trend: '+12% this week' },
                            { label: 'New Orders', value: data?.orderCountToday || 0, icon: 'fa-cart-shopping', color: 'var(--primary)', bg: 'var(--primary-light)', trend: 'Today' },
                            { label: 'Pending Udhar', value: `₹${(data?.outstandingUdhar || 0).toLocaleString()}`, icon: 'fa-receipt', color: '#ef4444', bg: '#fef2f2', trend: 'Critical' }
                        ].map((stat, i) => (
                            <div className="col-md-4" key={i}>
                                <div className="ds-card border-0 shadow-md p-32" style={{minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div className="rounded-16 d-flex align-items-center justify-content-center" 
                                            style={{backgroundColor: stat.bg, color: stat.color, width: '56px', height: '56px', flexShrink: 0}}>
                                            <i className={`fas ${stat.icon} fa-xl`}></i>
                                        </div>
                                        <span className="small fw-700 px-10 py-4 rounded-pill" style={{backgroundColor: stat.bg, color: stat.color, fontSize: '11px'}}>
                                            {stat.trend}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-muted small fw-800 text-uppercase mb-8" style={{letterSpacing: '0.1em'}}>{stat.label}</div>
                                        <h2 className="mb-0 fw-900" style={{fontSize: '42px', color: 'var(--text-main)', letterSpacing: '-0.02em'}}>{stat.value}</h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </header>

                <div style={{ padding: '0 48px 48px 48px' }} className="animate-fade-in">
                    <div className="row g-32">
                        {/* Recent Activity Table */}
                        <div className="col-xl-8">
                            <div className="ds-card p-0 overflow-hidden border-0 shadow-md">
                                <div className="p-32 border-bottom d-flex justify-content-between align-items-center">
                                    <h4 className="mb-0 fw-800" style={{fontSize: '22px'}}>Recent Orders</h4>
                                    <Link href="/dashboard/owner/orders" className="btn btn-sm btn-light px-16 py-8 rounded-10 fw-700 text-primary" style={{fontSize: '12px'}}>
                                        View All History <i className="fas fa-chevron-right ms-4"></i>
                                    </Link>
                                </div>
                                <div className="table-responsive">
                                    <table className="table align-middle mb-0">
                                        <thead style={{backgroundColor: '#F9FAFB'}}>
                                            <tr className="text-muted small text-uppercase fw-800" style={{letterSpacing: '0.1em'}}>
                                                <th className="ps-32 py-20 border-0">Items Details</th>
                                                <th className="py-20 border-0">Customer</th>
                                                <th className="py-20 border-0">Revenue</th>
                                                <th className="py-20 border-0 text-end pe-32">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.recentOrders.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="text-center py-100">
                                                        <div className="text-muted opacity-20 mb-20"><i className="fas fa-file-invoice fa-5x"></i></div>
                                                        <h5 className="fw-bold mb-4">No recent activity</h5>
                                                        <p className="text-muted small mb-0">New orders will appear here in real-time.</p>
                                                    </td>
                                                </tr>
                                            ) : (
                                                data?.recentOrders.map((order, idx) => (
                                                    <tr key={idx} className="hover-row">
                                                        <td className="ps-32 py-24">
                                                            <div className="fw-700 mb-4" style={{fontSize: '15px', color: 'var(--text-main)'}}>
                                                                {order.items.map(i => i.name).join(', ')}
                                                            </div>
                                                            <div className="text-muted small fw-600">
                                                                <i className="far fa-clock me-4"></i>
                                                                {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                            </div>
                                                        </td>
                                                        <td className="py-24">
                                                            <div className="fw-700" style={{fontSize: '15px'}}>{order.customerName}</div>
                                                        </td>
                                                        <td className="py-24 fw-800 text-dark" style={{fontSize: '16px'}}>₹{order.totalAmount.toLocaleString()}</td>
                                                        <td className="py-24 text-end pe-32">
                                                            <span className={`status-badge ${order.status.toLowerCase()}`}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Recent Ledger Feed */}
                        <div className="col-xl-4">
                            <div className="ds-card p-32 shadow-md h-100">
                                <div className="d-flex justify-content-between align-items-center mb-32">
                                    <h4 className="mb-0 fw-800" style={{fontSize: '22px'}}>Ledger Live</h4>
                                    <Link href="/dashboard/owner/ledger" className="text-success fw-700 text-decoration-none small">
                                        Full Ledger <i className="fas fa-chevron-right ms-4"></i>
                                    </Link>
                                </div>
                                <div className="ledger-timeline">
                                    {data?.recentLedger.length === 0 ? (
                                        <div className="text-center py-64">
                                            <div className="text-muted opacity-20 mb-20"><i className="fas fa-book-open fa-4x"></i></div>
                                            <p className="text-muted small mb-0">Ledger is empty.</p>
                                        </div>
                                    ) : (
                                        data?.recentLedger.map((entry, idx) => (
                                            <div key={idx} className="timeline-item d-flex gap-16 mb-24 last-mb-0">
                                                <div className="rounded-12 d-flex align-items-center justify-content-center" 
                                                    style={{
                                                        width: '44px', 
                                                        height: '44px', 
                                                        flexShrink: 0, 
                                                        backgroundColor: entry.type === 'DEBIT' ? '#ecfdf5' : '#fff1f2',
                                                        color: entry.type === 'DEBIT' ? 'var(--primary)' : '#e11d48'
                                                    }}>
                                                    <i className={`fas ${entry.type === 'DEBIT' ? 'fa-arrow-down' : 'fa-arrow-up'} small`}></i>
                                                </div>
                                                <div className="flex-grow-1 border-bottom pb-16 last-border-0">
                                                    <div className="d-flex justify-content-between align-items-start mb-4">
                                                        <p className="mb-0 fw-700 text-dark" style={{fontSize: '14px'}}>{entry.description}</p>
                                                        <span className="text-muted x-small fw-600">{new Date(entry.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                                    </div>
                                                    <div className="fw-900" style={{fontSize: '16px', color: entry.type === 'DEBIT' ? 'var(--primary)' : '#e11d48'}}>
                                                        {entry.type === 'DEBIT' ? '+' : '-'} ₹{entry.amount.toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <Link href="/dashboard/owner/ledger" className="rr-btn w-100 d-block text-center text-decoration-none py-18 mt-20" style={{borderRadius: '16px', fontSize: '16px', fontWeight: '800'}}>
                                    Add Entry
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hover-row:hover { background-color: #FAFBFC; }
                .status-badge {
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .status-badge.delivered { background-color: #ecfdf5; color: #059669; }
                .status-badge.pending { background-color: #fffbeb; color: #d97706; }
                .status-badge.cancelled { background-color: #fff1f2; color: #e11d48; }
                
                .timeline-item:last-child .border-bottom { border-bottom: 0 !important; }
            `}</style>
        </div>
    );
}
