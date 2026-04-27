'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { getCustomersData, createCustomer } from './actions';
import Link from 'next/link';

export default function CustomersPage() {
    const [data, setData] = useState({ customers: [], stats: { total: 0, active: 0 } });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const menuItems = [
        { name: 'Dashboard', icon: 'fas fa-home', link: '/dashboard/owner' },
        { name: 'Products', icon: 'fas fa-box', link: '/dashboard/owner/products' },
        { name: 'Orders', icon: 'fas fa-shopping-cart', link: '/dashboard/owner/orders' },
        { name: 'Udhar Ledger', icon: 'fas fa-book-open', link: '/dashboard/owner/ledger' },
        { name: 'Customers', icon: 'fas fa-users', link: '/dashboard/owner/customers' },
        { name: 'Profile', icon: 'fas fa-user-circle', link: '/dashboard/owner/profile' },
        { name: 'Logout', icon: 'fas fa-sign-out-alt', link: '/logout' },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setLoading(true);
        const storeId = localStorage.getItem('storeId');
        const res = await getCustomersData(storeId);
        setData(res);
        setLoading(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const storeId = localStorage.getItem('storeId');
        const res = await createCustomer(formData, storeId);
        if (res.success) {
            setIsModalOpen(false);
            fetchData();
        }
    }

    const filteredCustomers = data.customers.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.phone.includes(search)
    );

    return (
        <div style={{display: 'flex', backgroundColor: 'var(--bg-main)', minHeight: '100vh'}}>
            <Sidebar items={menuItems} activeItem="Customers" />
            <div style={{marginLeft: '280px', padding: '0', flexGrow: 1, width: 'calc(100% - 280px)'}}>
                
                {/* Page Header */}
                <header style={{ padding: '60px 48px 32px 48px' }} className="animate-fade-in">
                    <div className="d-flex justify-content-between align-items-end mb-40">
                        <div>
                            <h1 className="fw-bold mb-8" style={{ fontSize: '36px', color: 'var(--text-main)', letterSpacing: '-0.04em' }}>Customers</h1>
                            <p className="text-muted mb-0" style={{ fontSize: '16px', fontWeight: '500' }}>Manage your client database and analyze purchase history.</p>
                        </div>
                        <div className="d-flex align-items-center gap-16">
                            <button className="btn bg-white shadow-sm border-0 px-24 py-12" onClick={fetchData} 
                                style={{ borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '14px', border: '1px solid var(--border-medium) !important' }}>
                                <i className="fas fa-sync-alt me-8 text-success"></i> Sync Database
                            </button>
                            <button className="rr-btn px-28 py-12" style={{ borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '700' }} onClick={() => setIsModalOpen(true)}>
                                <i className="fas fa-user-plus me-8"></i> Add Customer
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="row g-24 mb-40">
                        {[
                            { label: 'Total Customers', value: data.stats.total, icon: 'fa-users', color: '#3b82f6', bg: '#eff6ff' },
                            { label: 'Repeat Clients', value: data.stats.active, icon: 'fa-user-check', color: 'var(--primary)', bg: 'var(--primary-light)' },
                            { label: 'Total Revenue', value: `₹${data.customers.reduce((acc, c) => acc + c.totalSpent, 0).toLocaleString()}`, icon: 'fa-wallet', color: '#8b5cf6', bg: '#f5f3ff' }
                        ].map((stat, i) => (
                            <div className="col-md-4" key={i}>
                                <div className="ds-card border-0 shadow-sm p-32">
                                    <div className="d-flex align-items-center mb-16 gap-16">
                                        <div className="rounded-16 d-flex align-items-center justify-content-center" 
                                            style={{backgroundColor: stat.bg, color: stat.color, width: '48px', height: '48px'}}>
                                            <i className={`fas ${stat.icon} fa-lg`}></i>
                                        </div>
                                        <div className="text-muted small fw-800 text-uppercase" style={{letterSpacing: '0.05em'}}>{stat.label}</div>
                                    </div>
                                    <h2 className="mb-0 fw-900" style={{fontSize: '34px', color: 'var(--text-main)'}}>{stat.value}</h2>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="d-flex justify-content-between align-items-center p-12 bg-white border shadow-sm" style={{ borderRadius: 'var(--radius-lg)' }}>
                        <div className="position-relative flex-grow-1 max-w-400 ms-8">
                            <i className="fas fa-search text-muted" style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px'}}></i>
                            <input 
                                type="text" 
                                className="form-control border-0 bg-light ps-44 py-12" 
                                placeholder="Search by name or phone..." 
                                style={{ borderRadius: '10px', fontSize: '14px', fontWeight: '500' }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </header>

                <div style={{ padding: '0 48px 48px 48px' }} className="animate-fade-in">
                    <div className="ds-card p-0 overflow-hidden border-0 shadow-md">
                        <div className="table-responsive">
                            <table className="table align-middle mb-0">
                                <thead>
                                    <tr style={{ backgroundColor: '#F9FAFB' }}>
                                        <th className="ps-32 py-20 text-uppercase small fw-bold text-muted border-0" style={{ letterSpacing: '0.1em' }}>Customer</th>
                                        <th className="py-20 text-uppercase small fw-bold text-muted border-0" style={{ letterSpacing: '0.1em' }}>Location</th>
                                        <th className="py-20 text-uppercase small fw-bold text-muted border-0 text-center" style={{ letterSpacing: '0.1em' }}>Orders</th>
                                        <th className="py-20 text-uppercase small fw-bold text-muted border-0" style={{ letterSpacing: '0.1em' }}>Revenue</th>
                                        <th className="py-20 text-uppercase small fw-bold text-muted border-0" style={{ letterSpacing: '0.1em' }}>Last Visit</th>
                                        <th className="pe-32 py-20 text-uppercase small fw-bold text-muted border-0 text-end" style={{ letterSpacing: '0.1em' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="border-top-0">
                                    {loading ? (
                                        <tr><td colSpan="6" className="text-center py-80"><div className="ds-loader mx-auto"></div></td></tr>
                                    ) : filteredCustomers.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center py-100">
                                                <div className="mb-20 text-muted opacity-20"><i className="fas fa-users fa-5x"></i></div>
                                                <h5 className="fw-bold mb-8">No Customers Found</h5>
                                                <p className="text-muted">Your customer database is currently empty.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredCustomers.map((customer, idx) => (
                                            <tr key={idx} className="hover-row">
                                                <td className="ps-32 py-24">
                                                    <div className="d-flex align-items-center">
                                                        <div className="customer-avatar me-16">
                                                            {customer.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="fw-800 text-dark mb-2" style={{fontSize: '15px'}}>{customer.name}</div>
                                                            <div className="text-muted small fw-600">{customer.phone}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-24">
                                                    <div className="text-muted small fw-500" style={{maxWidth: '200px', lineHeight: '1.4'}}>
                                                        {customer.address || 'No address provided'}
                                                    </div>
                                                </td>
                                                <td className="text-center py-24">
                                                    <span className="order-count-badge">
                                                        {customer.totalOrders} Orders
                                                    </span>
                                                </td>
                                                <td className="py-24 fw-900 text-dark" style={{fontSize: '16px'}}>
                                                    ₹{customer.totalSpent.toLocaleString()}
                                                </td>
                                                <td className="py-24 text-muted small fw-600">
                                                    {new Date(customer.lastOrder).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </td>
                                                <td className="text-end pe-32 py-24">
                                                    <Link 
                                                        href={`/dashboard/owner/ledger?customer=${encodeURIComponent(customer.name)}`}
                                                        className="action-circle-btn ms-auto"
                                                        title="View Payment History"
                                                        style={{textDecoration: 'none'}}
                                                    >
                                                        <i className="fas fa-history"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hover-row:hover { background-color: #FAFBFC; }
                .customer-avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    background-color: var(--primary-light);
                    color: var(--primary-dark);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 900;
                    font-size: 18px;
                }
                .order-count-badge {
                    padding: 6px 14px;
                    background-color: #F3F4F6;
                    border-radius: 10px;
                    font-size: 11px;
                    font-weight: 800;
                    color: #4B5563;
                }
                .action-circle-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid var(--border-medium);
                    background-color: white;
                    color: var(--text-muted);
                    transition: 0.2s;
                }
                .action-circle-btn:hover {
                    background-color: var(--bg-main);
                    color: var(--primary);
                    border-color: var(--primary);
                }
                .max-w-400 { max-width: 400px; }
            `}</style>

            {/* Premium Add Customer Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(17, 24, 39, 0.7)', zIndex: 9999, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', padding: '20px',
                    backdropFilter: 'blur(8px)'
                }} className="animate-fade-in">
                    <div style={{
                        backgroundColor: 'white', maxWidth: '550px', width: '100%', 
                        borderRadius: 'var(--radius-xl)', padding: '48px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                        position: 'relative'
                    }}>
                        <button onClick={() => setIsModalOpen(false)} style={{
                            position: 'absolute', top: '30px', right: '30px', border: 'none', 
                            background: '#F3F4F6', width: '40px', height: '40px', borderRadius: '50%',
                            fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--text-muted)'
                        }}><i className="fas fa-times"></i></button>

                        <div className="mb-40">
                            <h2 className="mb-8" style={{fontSize: '28px', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.03em'}}>
                                New Customer
                            </h2>
                            <p className="text-muted fw-500">Create a permanent profile for your client.</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row g-24 mb-32">
                                <div className="col-12">
                                    <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Full Name</label>
                                    <input name="name" type="text" required 
                                        className="form-control px-20 py-14"
                                        style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }}
                                        placeholder="Enter customer name" />
                                </div>
                                <div className="col-12">
                                    <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Phone Number</label>
                                    <input name="phone" type="text" required 
                                        className="form-control px-20 py-14"
                                        style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }}
                                        placeholder="+91 XXXXX XXXXX" />
                                </div>
                                <div className="col-12">
                                    <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Address</label>
                                    <textarea name="address" rows="3"
                                        className="form-control px-20 py-14"
                                        style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px', resize: 'none' }}
                                        placeholder="Full address details..."></textarea>
                                </div>
                            </div>
                            <button type="submit" className="rr-btn w-100 py-18" style={{borderRadius: '16px', fontSize: '16px', fontWeight: '800'}}>
                                Register Customer
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
