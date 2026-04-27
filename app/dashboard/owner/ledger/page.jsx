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
        const ledgerData = await getLedgerData();
        setData(ledgerData);
        setLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const res = await recordPayment(formData);
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
        <div style={{ display: 'flex', backgroundColor: '#F8FFF8', minHeight: '100vh' }}>
            <Sidebar items={menuItems} activeItem="Udhar Ledger" />
            <div style={{ marginLeft: '280px', padding: '40px', flexGrow: 1 }}>
                <div className="d-flex justify-content-between align-items-center mb-30">
                    <h1 className="mb-0">Digital Udhar Ledger</h1>
                    <button className="rr-btn" onClick={() => setIsModalOpen(true)}>
                        <i className="fas fa-plus me-2"></i> Record New Entry
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="row mb-30 g-4">
                    <div className="col-md-3">
                        <div className="bg-white p-25 shadow-sm h-100" style={{ borderRadius: '15px', border: '1px solid #eee' }}>
                            <h6 className="text-muted mb-10">Total Receivable (Udhar)</h6>
                            <h3 className="mb-0 text-danger fw-bold">₹{data.stats.totalReceivable.toLocaleString()}</h3>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="bg-white p-25 shadow-sm h-100" style={{ borderRadius: '15px', border: '1px solid #eee' }}>
                            <h6 className="text-muted mb-10">Today's Earnings</h6>
                            <h3 className="mb-0 text-success fw-bold">₹{data.stats.daily.toLocaleString()}</h3>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="bg-white p-25 shadow-sm h-100" style={{ borderRadius: '15px', border: '1px solid #eee' }}>
                            <h6 className="text-muted mb-10">Monthly Earnings</h6>
                            <h3 className="mb-0 text-success fw-bold">₹{data.stats.monthly.toLocaleString()}</h3>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="bg-white p-25 shadow-sm h-100" style={{ borderRadius: '15px', border: '1px solid #eee' }}>
                            <h6 className="text-muted mb-10">Yearly Earnings</h6>
                            <h3 className="mb-0 text-success fw-bold">₹{data.stats.yearly.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-30" style={{ backgroundColor: 'white', borderRadius: '15px', border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <div className="d-flex justify-content-between align-items-center mb-25">
                        <h4 className="mb-0 fw-bold">Transaction History</h4>
                        <div className="d-flex gap-2">
                            <select
                                className="form-select form-select-sm"
                                style={{ width: '150px', borderRadius: '8px' }}
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="all">All Types</option>
                                <option value="debit">Payments (Earnings)</option>
                                <option value="credit">Udhar (Credit)</option>
                            </select>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-3">Date</th>
                                    <th>Description / Customer</th>
                                    <th>Type</th>
                                    <th className="text-end pe-3">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="4" className="text-center py-40">Loading ledger...</td></tr>
                                ) : filteredEntries.length === 0 ? (
                                    <tr><td colSpan="4" className="text-center py-40">No transactions found</td></tr>
                                ) : (
                                    filteredEntries.map((entry) => (
                                        <tr key={entry.id}>
                                            <td className="ps-3 text-muted small">
                                                {new Date(entry.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                <br />
                                                {new Date(entry.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                            <td>
                                                <span className="fw-bold d-block">{entry.description.split(':')[0]}</span>
                                                <span className="text-muted small">{entry.description.split(':')[1] || entry.description}</span>
                                            </td>
                                            <td>
                                                <span className={`badge rounded-pill ${entry.type === 'DEBIT' ? 'bg-success-light text-success' : 'bg-danger-light text-danger'}`}
                                                    style={{ backgroundColor: entry.type === 'DEBIT' ? '#DCFCE7' : '#FEE2E2', color: entry.type === 'DEBIT' ? '#166534' : '#991B1B', padding: '6px 12px' }}>
                                                    {entry.type === 'DEBIT' ? 'Payment' : 'Udhar'}
                                                </span>
                                            </td>
                                            <td className={`text-end pe-3 fw-bold ${entry.type === 'DEBIT' ? 'text-success' : 'text-danger'}`}>
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

            {/* Record Transaction Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', padding: '20px',
                    backdropFilter: 'blur(4px)'
                }}>
                    <div className="bg-white" style={{
                        maxWidth: '550px', width: '100%', borderRadius: '24px',
                        position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                        padding: '40px', overflow: 'hidden'
                    }}>
                        {/* Header */}
                        <div className="d-flex justify-content-between align-items-center mb-30">
                            <h3 className="mb-0 fw-bold" style={{ fontSize: '24px', color: '#111827' }}>Record New Entry</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    border: 'none', background: '#f3f4f6', width: '36px', height: '36px',
                                    borderRadius: '50%', fontSize: '18px', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                    color: '#6b7280'
                                }}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-24">
                                <label className="form-label fw-bold mb-8 d-block" style={{ color: '#374151', fontSize: '14px' }}>Customer Name</label>
                                <input
                                    name="customerName"
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. Rajesh Kumar"
                                    required
                                    style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid #d1d5db', fontSize: '15px' }}
                                />
                            </div>

                            <div className="mb-24">
                                <label className="form-label fw-bold mb-12 d-block" style={{ color: '#374151', fontSize: '14px' }}>Transaction Type</label>
                                <div className="d-flex gap-3">
                                    <div className="flex-grow-1">
                                        <input type="radio" className="btn-check" name="type" id="type-payment" value="DEBIT" defaultChecked />
                                        <label className="btn btn-outline-success w-100 py-12" htmlFor="type-payment" style={{ borderRadius: '12px', fontWeight: '600', fontSize: '14px', border: '2px solid' }}>
                                            <i className="fas fa-arrow-down me-2"></i> Payment (In)
                                        </label>
                                    </div>
                                    <div className="flex-grow-1">
                                        <input type="radio" className="btn-check" name="type" id="type-udhar" value="CREDIT" />
                                        <label className="btn btn-outline-danger w-100 py-12" htmlFor="type-udhar" style={{ borderRadius: '12px', fontWeight: '600', fontSize: '14px', border: '2px solid' }}>
                                            <i className="fas fa-arrow-up me-2"></i> Udhar (Out)
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-24">
                                <label className="form-label fw-bold mb-8 d-block" style={{ color: '#374151', fontSize: '14px' }}>Amount (₹)</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '12px 0 0 12px', border: '1px solid #d1d5db' }}>₹</span>
                                    <input
                                        name="amount"
                                        type="number"
                                        className="form-control border-start-0"
                                        placeholder="0.00"
                                        required
                                        style={{ padding: '14px 16px', borderRadius: '0 12px 12px 0', border: '1px solid #d1d5db', fontSize: '15px' }}
                                    />
                                </div>
                            </div>

                            <div className="mb-32">
                                <label className="form-label fw-bold mb-8 d-block" style={{ color: '#374151', fontSize: '14px' }}>Description / Note</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    placeholder="e.g. Payment for Order #123"
                                    rows="3"
                                    style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid #d1d5db', fontSize: '15px', resize: 'none' }}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="rr-btn w-100 py-16"
                                style={{ fontSize: '16px', borderRadius: '12px', fontWeight: '700', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            >
                                Save Transaction
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
