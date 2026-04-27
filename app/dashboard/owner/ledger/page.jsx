'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { getLedgerData, recordPayment } from './actions';
import Swal from 'sweetalert2';

export default function LedgerPage() {
    const [data, setData] = useState({ entries: [], stats: { daily: 0, monthly: 0, yearly: 0, totalReceivable: 0 } });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('all'); // 'all', 'credit', 'debit'

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
        const ledgerData = await getLedgerData(storeId);
        setData(ledgerData);
        setLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const storeId = localStorage.getItem('storeId');
        const res = await recordPayment(formData, storeId);
        if (res.success) {
            Swal.fire('Success', 'Transaction recorded successfully', 'success');
            setIsModalOpen(false);
            fetchData();
        }
    };

    const filteredEntries = data.entries.filter(entry => {
        if (filter === 'all') return true;
        return entry.type.toLowerCase() === filter;
    });

    return (
        <div style={{ display: 'flex', backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
            <Sidebar items={menuItems} activeItem="Udhar Ledger" />
            <div style={{ marginLeft: '280px', padding: '0', flexGrow: 1, width: 'calc(100% - 280px)' }}>
                
                {/* Page Header */}
                <header style={{ padding: '60px 48px 32px 48px' }} className="animate-fade-in">
                    <div className="d-flex justify-content-between align-items-end mb-40">
                        <div>
                            <h1 className="fw-bold mb-8" style={{ fontSize: '36px', color: 'var(--text-main)', letterSpacing: '-0.04em' }}>Ledger & Udhar</h1>
                            <p className="text-muted mb-0" style={{ fontSize: '16px', fontWeight: '500' }}>Track customer credit, payments, and overall business earnings.</p>
                        </div>
                        <div className="d-flex align-items-center gap-16">
                            <button className="rr-btn px-28 py-12" style={{ borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '700' }} onClick={() => setIsModalOpen(true)}>
                                <i className="fas fa-plus me-8"></i> Record New Entry
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="row g-24 mb-40">
                        <div className="col-md-3">
                            <div className="ds-card border-0 shadow-sm p-24" style={{borderLeft: '4px solid #EF4444'}}>
                                <div className="text-muted small fw-800 text-uppercase mb-12" style={{letterSpacing: '0.05em'}}>Receivable</div>
                                <div className="d-flex align-items-end gap-12">
                                    <h2 className="mb-0 fw-800 text-danger">₹{data.stats.totalReceivable.toLocaleString()}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="ds-card border-0 shadow-sm p-24" style={{borderLeft: '4px solid var(--primary)'}}>
                                <div className="text-muted small fw-800 text-uppercase mb-12" style={{letterSpacing: '0.05em'}}>Today's Cash</div>
                                <div className="d-flex align-items-end gap-12">
                                    <h2 className="mb-0 fw-800 text-success">₹{data.stats.daily.toLocaleString()}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="ds-card border-0 shadow-sm p-24" style={{borderLeft: '4px solid #3B82F6'}}>
                                <div className="text-muted small fw-800 text-uppercase mb-12" style={{letterSpacing: '0.05em'}}>Monthly</div>
                                <div className="d-flex align-items-end gap-12">
                                    <h2 className="mb-0 fw-800">₹{data.stats.monthly.toLocaleString()}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="ds-card border-0 shadow-sm p-24" style={{borderLeft: '4px solid #8B5CF6'}}>
                                <div className="text-muted small fw-800 text-uppercase mb-12" style={{letterSpacing: '0.05em'}}>Yearly</div>
                                <div className="d-flex align-items-end gap-12">
                                    <h2 className="mb-0 fw-800">₹{data.stats.yearly.toLocaleString()}</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="d-flex justify-content-between align-items-center p-12 bg-white border shadow-sm" style={{ borderRadius: 'var(--radius-lg)' }}>
                        <div className="d-flex gap-12 align-items-center ps-8">
                            <i className="fas fa-filter text-muted small"></i>
                            <div className="d-flex gap-8">
                                {['all', 'debit', 'credit'].map(t => (
                                    <button 
                                        key={t}
                                        onClick={() => setFilter(t)}
                                        className={`btn btn-sm px-20 py-8 border-0 fw-800 text-uppercase`}
                                        style={{ 
                                            borderRadius: '8px', 
                                            fontSize: '11px',
                                            backgroundColor: filter === t ? 'var(--primary-light)' : 'transparent',
                                            color: filter === t ? 'var(--primary-dark)' : 'var(--text-muted)'
                                        }}
                                    >
                                        {t === 'all' ? 'All' : t === 'debit' ? 'Payments' : 'Udhar'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </header>

                <div style={{ padding: '0 48px 48px 48px' }} className="animate-fade-in">
                    <div className="ds-card p-0 overflow-hidden border-0 shadow-md">
                        <div className="table-responsive">
                            <table className="table align-middle mb-0">
                                <thead>
                                    <tr style={{ backgroundColor: '#F9FAFB' }}>
                                        <th className="ps-32 py-20 text-uppercase small fw-bold text-muted border-0" style={{ letterSpacing: '0.1em' }}>Date & Time</th>
                                        <th className="py-20 text-uppercase small fw-bold text-muted border-0" style={{ letterSpacing: '0.1em' }}>Description / Customer</th>
                                        <th className="py-20 text-uppercase small fw-bold text-muted border-0" style={{ letterSpacing: '0.1em' }}>Type</th>
                                        <th className="pe-32 py-20 text-uppercase small fw-bold text-muted border-0 text-end" style={{ letterSpacing: '0.1em' }}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="border-top-0">
                                    {loading ? (
                                        <tr><td colSpan="4" className="text-center py-80"><div className="ds-loader mx-auto"></div></td></tr>
                                    ) : filteredEntries.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center py-80">
                                                <div className="mb-20 text-muted opacity-20"><i className="fas fa-book fa-5x"></i></div>
                                                <h5 className="fw-bold mb-8">No Entries Found</h5>
                                                <p className="text-muted">You haven't recorded any transactions yet.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredEntries.map((entry) => (
                                            <tr key={entry.id} className="hover-row">
                                                <td className="ps-32 py-24">
                                                    <div className="fw-700 text-dark mb-2" style={{fontSize: '14px'}}>{new Date(entry.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                                                    <div className="text-muted small fw-600">{new Date(entry.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
                                                </td>
                                                <td className="py-24">
                                                    <div className="fw-800 text-dark mb-2" style={{fontSize: '15px'}}>{entry.description.split(':')[0]}</div>
                                                    <div className="text-muted small fw-500">{entry.description.split(':')[1] || entry.description}</div>
                                                </td>
                                                <td className="py-24">
                                                    <span className={`status-pill ${entry.type === 'DEBIT' ? 'payment' : 'udhar'}`}>
                                                        {entry.type === 'DEBIT' ? 'Payment Received' : 'Udhar Given'}
                                                    </span>
                                                </td>
                                                <td className={`pe-32 py-24 text-end fw-900 ${entry.type === 'DEBIT' ? 'text-success' : 'text-danger'}`} style={{fontSize: '18px'}}>
                                                    {entry.type === 'DEBIT' ? '+' : '-'} ₹{entry.amount.toLocaleString()}
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
                .status-pill {
                    padding: 6px 14px;
                    border-radius: 12px;
                    font-size: 11px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .status-pill.payment { background-color: #ecfdf5; color: #059669; }
                .status-pill.udhar { background-color: #fff1f2; color: #e11d48; }
            `}</style>

            {/* Premium Entry Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(17, 24, 39, 0.7)', zIndex: 9999, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', padding: '20px',
                    backdropFilter: 'blur(8px)'
                }} className="animate-fade-in">
                    <div style={{
                        backgroundColor: 'white', maxWidth: '600px', width: '100%', 
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
                                Record Entry
                            </h2>
                            <p className="text-muted fw-500">Log a new payment or update a customer's credit record.</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row g-24 mb-32">
                                <div className="col-12">
                                    <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Customer Identity</label>
                                    <input name="customerName" type="text" required 
                                        className="form-control px-20 py-14"
                                        style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }}
                                        placeholder="Enter customer name" />
                                </div>

                                <div className="col-12">
                                    <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Entry Type</label>
                                    <div className="d-flex gap-12 p-8 rounded-16" style={{backgroundColor: '#F3F4F6'}}>
                                        <div className="flex-grow-1">
                                            <input type="radio" className="btn-check" name="type" id="type-payment" value="DEBIT" defaultChecked />
                                            <label className="btn w-100 py-12 border-0 fw-800 text-uppercase d-flex align-items-center justify-content-center gap-8" htmlFor="type-payment" 
                                                style={{ borderRadius: '12px', fontSize: '12px', cursor: 'pointer' }}>
                                                <i className="fas fa-hand-holding-dollar"></i> Payment In
                                            </label>
                                        </div>
                                        <div className="flex-grow-1">
                                            <input type="radio" className="btn-check" name="type" id="type-udhar" value="CREDIT" />
                                            <label className="btn w-100 py-12 border-0 fw-800 text-uppercase d-flex align-items-center justify-content-center gap-8" htmlFor="type-udhar" 
                                                style={{ borderRadius: '12px', fontSize: '12px', cursor: 'pointer' }}>
                                                <i className="fas fa-user-clock"></i> Udhar Out
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Transaction Amount (₹)</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-0 fw-800" style={{borderRadius: '12px 0 0 12px'}}>₹</span>
                                        <input name="amount" type="number" required 
                                            className="form-control px-20 py-14 border-0"
                                            style={{ backgroundColor: '#F3F4F6', fontSize: '18px', fontWeight: '800', borderRadius: '0 12px 12px 0' }} 
                                            placeholder="0.00" />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Notes / Description</label>
                                    <textarea name="description" rows="3"
                                        className="form-control px-20 py-14"
                                        style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px', resize: 'none' }}
                                        placeholder="Add more details here..."></textarea>
                                </div>
                            </div>

                            <button type="submit" className="rr-btn w-100 py-18" style={{borderRadius: '16px', fontSize: '16px', fontWeight: '800'}}>
                                Save Ledger Entry
                            </button>
                        </form>
                    </div>
                </div>
            )}
            
            <style jsx>{`
                .btn-check:checked + label {
                    background-color: white !important;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
                    color: var(--primary) !important;
                }
                .btn-check:not(:checked) + label {
                    color: #6B7280 !important;
                }
            `}</style>
        </div>
    );
}
