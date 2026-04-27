'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { getCustomersData } from './actions';
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
        const res = await getCustomersData();
        setData(res);
        setLoading(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const res = await createCustomer(formData);
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
        <div style={{display: 'flex', backgroundColor: '#F8FFF8', minHeight: '100vh', fontFamily: "'Inter', sans-serif"}}>
            <Sidebar items={menuItems} activeItem="Customers" />
            <div style={{marginLeft: '280px', padding: '50px 60px', flexGrow: 1}}>
                
                {/* Refined Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-40">
                    <div>
                        <h1 className="mb-8 fw-bold" style={{fontSize: '32px', color: '#111827', letterSpacing: '-0.5px'}}>Customer Directory</h1>
                        <p className="text-muted mb-0" style={{fontSize: '15px'}}>Access and manage your complete client database.</p>
                    </div>
                    <div className="d-flex gap-3 align-items-center">
                        <div className="position-relative d-flex align-items-center">
                            <i className="fas fa-search text-muted" style={{position: 'absolute', left: '15px', fontSize: '14px', zIndex: 10}}></i>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search by name or phone..." 
                                style={{
                                    borderRadius: '12px', 
                                    width: '320px', 
                                    height: '48px', 
                                    paddingLeft: '45px', 
                                    border: '1px solid #e5e7eb',
                                    fontSize: '14px',
                                    backgroundColor: '#fff',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                    position: 'relative'
                                }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button 
                            className="rr-btn px-24" 
                            onClick={() => setIsModalOpen(true)} 
                            style={{borderRadius: '12px', height: '48px', fontSize: '14px'}}
                        >
                            <i className="fas fa-plus me-2"></i> Add Customer
                        </button>
                        <button 
                            className="btn btn-white shadow-sm px-15" 
                            onClick={fetchData} 
                            style={{
                                borderRadius: '12px', 
                                height: '48px', 
                                border: '1px solid #e5e7eb',
                                backgroundColor: '#fff',
                                color: '#374151'
                            }}
                        >
                            <i className="fas fa-sync-alt text-success"></i>
                        </button>
                    </div>
                </div>

                {/* Professional Stats Cards */}
                <div className="row mb-40 g-4">
                    {[
                        { label: 'Total Customers', value: data.stats.total, icon: 'fa-users', color: '#3b82f6', bg: '#eff6ff' },
                        { label: 'Repeat Customers', value: data.stats.active, icon: 'fa-user-check', color: '#10b981', bg: '#ecfdf5' },
                        { label: 'Store Revenue', value: `₹${data.customers.reduce((acc, c) => acc + c.totalSpent, 0).toLocaleString()}`, icon: 'fa-wallet', color: '#f59e0b', bg: '#fffbeb' }
                    ].map((stat, i) => (
                        <div className="col-md-4" key={i}>
                            <div className="bg-white p-30 h-100 shadow-sm" style={{borderRadius: '20px', border: '1px solid #f1f5f9'}}>
                                <div className="d-flex align-items-center mb-20" style={{gap: '15px'}}>
                                    <div className="rounded-12 d-flex align-items-center justify-content-center" 
                                        style={{backgroundColor: stat.bg, color: stat.color, width: '48px', height: '48px', flexShrink: 0}}>
                                        <i className={`fas ${stat.icon} fa-lg`}></i>
                                    </div>
                                    <div className="text-muted small fw-700 text-uppercase" style={{letterSpacing: '0.5px', lineHeight: '1.2'}}>{stat.label}</div>
                                </div>
                                <h2 className="mb-0 fw-bold" style={{fontSize: '32px', color: '#111827'}}>{stat.value}</h2>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Structured Table Container */}
                <div className="bg-white shadow-sm overflow-hidden" style={{borderRadius: '24px', border: '1px solid #f1f5f9'}}>
                    <div className="table-responsive">
                        <table className="table align-middle mb-0">
                            <thead style={{backgroundColor: '#f9fafb', borderBottom: '1px solid #f1f5f9'}}>
                                <tr>
                                    <th className="ps-30 py-24 text-muted small fw-700 text-uppercase tracking-wider">Customer Info</th>
                                    <th className="py-24 text-muted small fw-700 text-uppercase tracking-wider">Primary Address</th>
                                    <th className="py-24 text-muted small fw-700 text-uppercase tracking-wider text-center">Orders</th>
                                    <th className="py-24 text-muted small fw-700 text-uppercase tracking-wider">Total Spending</th>
                                    <th className="py-24 text-muted small fw-700 text-uppercase tracking-wider">Last Seen</th>
                                    <th className="text-end pe-30 py-24 text-muted small fw-700 text-uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="6" className="text-center py-60 text-muted fw-500">Syncing with secure server...</td></tr>
                                ) : filteredCustomers.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-100">
                                            <div className="mb-20 opacity-20">
                                                <i className="fas fa-user-friends fa-4x"></i>
                                            </div>
                                            <h5 className="fw-bold mb-4">No records found</h5>
                                            <p className="text-muted small">We couldn't find any customers matching your search.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCustomers.map((customer, idx) => (
                                        <tr key={idx} style={{borderBottom: '1px solid #f8fafc'}}>
                                            <td className="ps-30 py-24">
                                                <div className="d-flex align-items-center">
                                                    <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-15 fw-bold" style={{width: '44px', height: '44px', color: '#2E7D32', fontSize: '15px'}}>
                                                        {customer.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <strong className="d-block" style={{color: '#111827', fontSize: '15px'}}>{customer.name}</strong>
                                                        <span className="text-muted small">{customer.phone}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-24" style={{maxWidth: '220px'}}>
                                                <div className="text-muted small" style={{lineHeight: '1.4'}}>
                                                    {customer.address || 'No address saved'}
                                                </div>
                                            </td>
                                            <td className="text-center py-24">
                                                <span className="badge px-12 py-8 rounded-8" style={{backgroundColor: '#f1f5f9', color: '#475569', fontWeight: '600', fontSize: '12px'}}>
                                                    {customer.totalOrders}
                                                </span>
                                            </td>
                                            <td className="py-24 fw-bold text-success" style={{fontSize: '15px'}}>
                                                ₹{customer.totalSpent.toLocaleString()}
                                            </td>
                                            <td className="py-24 text-muted small">
                                                {new Date(customer.lastOrder).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="text-end pe-30 py-24">
                                                <button className="btn btn-sm btn-light border-0 px-15 py-10" style={{borderRadius: '100px', color: '#64748b', fontWeight: '600', fontSize: '13px'}}>
                                                    <i className="fas fa-comment-dots me-2"></i> Message
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Customer Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', padding: '20px',
                    backdropFilter: 'blur(4px)'
                }}>
                    <div style={{
                        backgroundColor: 'white', maxWidth: '500px', width: '100%', 
                        borderRadius: '24px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        position: 'relative'
                    }}>
                        <button onClick={() => setIsModalOpen(false)} style={{
                            position: 'absolute', top: '25px', right: '25px', border: 'none', 
                            background: '#f8fafc', width: '36px', height: '36px', borderRadius: '50%',
                            fontSize: '20px', cursor: 'pointer', color: '#64748b'
                        }}>&times;</button>

                        <h3 className="mb-10 fw-bold">Add Customer</h3>
                        <p className="text-muted mb-30 small">Create a new customer profile manually.</p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-20">
                                <label className="d-block mb-8 small fw-bold text-muted text-uppercase">Full Name</label>
                                <input name="name" type="text" required className="form-control" 
                                    placeholder="John Doe"
                                    style={{height: '52px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc'}} />
                            </div>
                            <div className="mb-20">
                                <label className="d-block mb-8 small fw-bold text-muted text-uppercase">Phone Number</label>
                                <input name="phone" type="text" required className="form-control" 
                                    placeholder="+91 98765 43210"
                                    style={{height: '52px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc'}} />
                            </div>
                            <div className="mb-30">
                                <label className="d-block mb-8 small fw-bold text-muted text-uppercase">Address</label>
                                <textarea name="address" rows="3" className="form-control" 
                                    placeholder="House No, Street, City..."
                                    style={{borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc'}}></textarea>
                            </div>
                            <button type="submit" className="rr-btn w-100 py-15" style={{borderRadius: '12px', fontSize: '16px'}}>
                                Save Customer
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
