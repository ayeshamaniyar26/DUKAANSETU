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
    const res = await getDashboardData();
    setData(res);
    setLoading(false);
  }

  if (loading) return (
    <div style={{display: 'flex', backgroundColor: '#F8FFF8', minHeight: '100vh', alignItems: 'center', justifyContent: 'center'}}>
        <div className="text-muted fw-500">Loading your store dashboard...</div>
    </div>
  );

    return (
        <div style={{display: 'flex', backgroundColor: '#F8FFF8', minHeight: '100vh', fontFamily: "'Inter', sans-serif"}}>
            <Sidebar items={menuItems} activeItem="Dashboard" />
            <div style={{marginLeft: '280px', padding: '60px 80px', flexGrow: 1, maxWidth: '1600px'}}>
                
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-50">
                    <div>
                        <h1 className="mb-10 fw-bold" style={{fontSize: '34px', color: '#111827', letterSpacing: '-0.8px'}}>{data?.storeName || 'Owner Dashboard'}</h1>
                        <p className="text-muted mb-0" style={{fontSize: '16px'}}>Welcome back! Here is your business performance at a glance.</p>
                    </div>
                    <button 
                        className="btn btn-white shadow-sm px-30 py-15" 
                        onClick={fetchData} 
                        style={{borderRadius: '14px', border: '1px solid #e5e7eb', fontWeight: '700', backgroundColor: '#fff', fontSize: '14px'}}
                    >
                        <i className="fas fa-sync-alt me-2 text-success"></i> Sync Real-time Data
                    </button>
                </div>
                
                {/* Robust Stats Grid */}
                <div className="row mb-50 g-30">
                    {[
                        { label: 'Total Products', value: data?.productCount || 0, icon: 'fa-box', color: '#3b82f6', bg: '#eff6ff' },
                        { label: 'New Orders Today', value: data?.orderCountToday || 0, icon: 'fa-shopping-cart', color: '#10b981', bg: '#ecfdf5' },
                        { label: 'Outstanding Udhar', value: `₹${(data?.outstandingUdhar || 0).toLocaleString()}`, icon: 'fa-hand-holding-usd', color: '#ef4444', bg: '#fef2f2' }
                    ].map((stat, i) => (
                        <div className="col-md-4" key={i}>
                            <div className="bg-white p-40 shadow-sm" style={{borderRadius: '28px', border: '1px solid #f1f5f9', minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <div className="d-flex align-items-center mb-24">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center me-15" 
                                        style={{backgroundColor: stat.bg, color: stat.color, width: '52px', height: '52px', flexShrink: 0}}>
                                        <i className={`fas ${stat.icon} fa-xl`}></i>
                                    </div>
                                    <div className="text-muted small fw-800 text-uppercase" style={{letterSpacing: '1px', fontSize: '12px'}}>{stat.label}</div>
                                </div>
                                <h2 className="mb-0 fw-800" style={{fontSize: '38px', color: '#111827'}}>{stat.value}</h2>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row g-40">
                    {/* Recent Orders Table */}
                    <div className="col-xl-8">
                        <div className="bg-white shadow-sm overflow-hidden" style={{borderRadius: '28px', border: '1px solid #f1f5f9', minHeight: '500px'}}>
                            <div className="p-40 pb-0 d-flex justify-content-between align-items-center mb-30">
                                <h4 className="mb-0 fw-bold" style={{fontSize: '22px'}}>Recent Activity</h4>
                                <Link href="/dashboard/owner/orders" className="text-success fw-700 text-decoration-none small">
                                    Browse Full History <i className="fas fa-arrow-right ms-2"></i>
                                </Link>
                            </div>
                            <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                    <thead style={{backgroundColor: '#f9fafb', borderBottom: '1px solid #f1f5f9'}}>
                                        <tr className="text-muted small text-uppercase fw-800 tracking-wider">
                                            <th className="ps-40 py-24">Items</th>
                                            <th className="py-24">Client</th>
                                            <th className="py-24">Revenue</th>
                                            <th className="py-24 text-end pe-40">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.recentOrders.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="text-center py-100">
                                                    <div className="text-muted opacity-10 mb-20"><i className="fas fa-file-invoice fa-5x"></i></div>
                                                    <h5 className="fw-bold mb-4">Quiet day?</h5>
                                                    <p className="text-muted small mb-0">New orders will appear here as they come in.</p>
                                                </td>
                                            </tr>
                                        ) : (
                                            data?.recentOrders.map((order, idx) => (
                                                <tr key={idx} style={{borderBottom: '1px solid #f8fafc'}}>
                                                    <td className="ps-40 py-24">
                                                        <div className="fw-700" style={{fontSize: '15px', color: '#111827'}}>{order.items.map(i => i.name).join(', ')}</div>
                                                        <span className="text-muted x-small">{new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                                    </td>
                                                    <td className="py-24">
                                                        <div className="fw-700" style={{fontSize: '15px'}}>{order.customerName}</div>
                                                    </td>
                                                    <td className="py-24 fw-800 text-dark" style={{fontSize: '16px'}}>₹{order.totalAmount.toLocaleString()}</td>
                                                    <td className="py-24 text-end pe-40">
                                                        <span className="badge px-15 py-10 rounded-10" 
                                                            style={{
                                                                fontSize: '12px', 
                                                                textTransform: 'uppercase', 
                                                                backgroundColor: order.status === 'DELIVERED' ? '#f0fdf4' : '#fffbeb',
                                                                color: order.status === 'DELIVERED' ? '#16a34a' : '#d97706',
                                                                fontWeight: '800'
                                                            }}>
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
                        <div className="bg-white p-40 shadow-sm h-100" style={{borderRadius: '28px', border: '1px solid #f1f5f9'}}>
                            <div className="d-flex justify-content-between align-items-center mb-40">
                                <h4 className="mb-0 fw-bold" style={{fontSize: '22px'}}>Ledger Feed</h4>
                                <Link href="/dashboard/owner/ledger" className="text-success fw-700 text-decoration-none small">
                                    Ledger <i className="fas fa-arrow-right ms-2"></i>
                                </Link>
                            </div>
                            <div className="ledger-feed mb-40">
                                {data?.recentLedger.length === 0 ? (
                                    <div className="text-center py-80">
                                        <div className="text-muted opacity-10 mb-20"><i className="fas fa-book fa-5x"></i></div>
                                        <p className="text-muted small mb-0">Your digital udhar records are empty.</p>
                                    </div>
                                ) : (
                                    data?.recentLedger.map((entry, idx) => (
                                        <div key={idx} className="d-flex align-items-start mb-24 pb-24 border-bottom" style={{borderColor: '#f8fafc !important'}}>
                                            <div className="rounded-circle d-flex align-items-center justify-content-center me-15" 
                                                style={{
                                                    width: '44px', 
                                                    height: '44px', 
                                                    flexShrink: 0, 
                                                    backgroundColor: entry.type === 'DEBIT' ? '#f0fdf4' : '#fef2f2',
                                                    color: entry.type === 'DEBIT' ? '#16a34a' : '#dc2626'
                                                }}>
                                                <i className={`fas ${entry.type === 'DEBIT' ? 'fa-arrow-down' : 'fa-arrow-up'} small`}></i>
                                            </div>
                                            <div className="flex-grow-1">
                                                <p className="mb-2 fw-700" style={{fontSize: '15px', color: '#111827', lineHeight: '1.2'}}>{entry.description}</p>
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="fw-800" style={{fontSize: '16px', color: entry.type === 'DEBIT' ? '#16a34a' : '#dc2626'}}>
                                                        {entry.type === 'DEBIT' ? '+' : '-'} ₹{entry.amount.toLocaleString()}
                                                    </span>
                                                    <span style={{width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#cbd5e1'}}></span>
                                                    <span className="text-muted x-small">{new Date(entry.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <Link href="/dashboard/owner/ledger" className="rr-btn w-100 d-block text-center text-decoration-none py-18" style={{borderRadius: '16px', fontSize: '16px', fontWeight: '700'}}>
                                Open Ledger Panel
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
