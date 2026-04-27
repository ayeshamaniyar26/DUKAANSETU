'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { getOrder, updateOrderStatus } from '../actions';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
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
    fetchOrder();
  }, [id]);

  async function fetchOrder() {
    setLoading(true);
    const data = await getOrder(id);
    setOrder(data);
    setLoading(false);
  }

  const handleStatusUpdate = async (newStatus) => {
    const res = await updateOrderStatus(order.id, newStatus);
    if (res.success) {
        Swal.fire('Updated', `Order is now ${newStatus}`, 'success');
        fetchOrder();
    }
  };

  if (loading) return (
    <div style={{display: 'flex', backgroundColor: '#F8FFF8', minHeight: '100vh'}}>
        <Sidebar items={menuItems} activeItem="Orders" />
        <div style={{marginLeft: '280px', padding: '50px', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className="text-muted">Loading order details...</div>
        </div>
    </div>
  );

  if (!order) return (
    <div style={{display: 'flex', backgroundColor: '#F8FFF8', minHeight: '100vh'}}>
        <Sidebar items={menuItems} activeItem="Orders" />
        <div style={{marginLeft: '280px', padding: '50px', flexGrow: 1}}>
            <div className="alert alert-danger">Order not found. <Link href="/dashboard/owner/orders">Go back</Link></div>
        </div>
    </div>
  );

    return (
        <div style={{ display: 'flex', backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
            <Sidebar items={menuItems} activeItem="Orders" />
            <div style={{ marginLeft: '280px', padding: '0', flexGrow: 1, width: 'calc(100% - 280px)' }}>
                
                {/* Header Section */}
                <header style={{ padding: '60px 48px 32px 48px' }} className="animate-fade-in">
                    <div className="mb-24">
                        <Link href="/dashboard/owner/orders" className="text-decoration-none text-muted small fw-800 text-uppercase d-flex align-items-center gap-8 mb-16" style={{letterSpacing: '0.05em'}}>
                            <i className="fas fa-arrow-left"></i> Back to Orders
                        </Link>
                    </div>

                    <div className="d-flex justify-content-between align-items-end mb-40">
                        <div>
                            <div className="d-flex align-items-center gap-12 mb-8">
                                <h1 className="fw-bold mb-0" style={{ fontSize: '36px', color: 'var(--text-main)', letterSpacing: '-0.04em' }}>Order #{order.id.slice(-6).toUpperCase()}</h1>
                                <span className={`status-pill ${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-muted mb-0" style={{ fontSize: '16px', fontWeight: '500' }}>Placed on {new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}</p>
                        </div>

                        <div className="d-flex align-items-center gap-16">
                            <div className="dropdown">
                                <button className="btn bg-white shadow-sm px-24 py-12 dropdown-toggle border-0 fw-700" type="button" data-bs-toggle="dropdown" 
                                    style={{ borderRadius: 'var(--radius-md)', fontSize: '14px', border: '1px solid var(--border-medium) !important' }}>
                                    Change Status
                                </button>
                                <ul className="dropdown-menu shadow-lg border-0 p-8" style={{ borderRadius: 'var(--radius-lg)' }}>
                                    {['PENDING', 'DELIVERED', 'CANCELLED'].map(s => (
                                        <li key={s}>
                                            <button className="dropdown-item rounded-8 mb-4 fw-600 px-16 py-8" onClick={() => handleStatusUpdate(s)}>
                                                {s}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button className="rr-btn px-28 py-12" style={{ borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '700' }} onClick={() => window.print()}>
                                <i className="fas fa-print me-8"></i> Print Invoice
                            </button>
                        </div>
                    </div>
                </header>

                <div style={{ padding: '0 48px 48px 48px' }} className="animate-fade-in">
                    <div className="row g-32">
                        <div className="col-lg-8">
                            {/* Items List */}
                            <div className="ds-card p-0 overflow-hidden border-0 shadow-md mb-32">
                                <div className="p-32 border-bottom">
                                    <h5 className="fw-900 mb-0" style={{ fontSize: '18px', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>Order Items</h5>
                                </div>
                                <div className="table-responsive">
                                    <table className="table align-middle mb-0">
                                        <thead>
                                            <tr style={{ backgroundColor: '#F9FAFB' }}>
                                                <th className="ps-32 py-16 text-uppercase small fw-bold text-muted border-0" style={{ letterSpacing: '0.1em' }}>Product</th>
                                                <th className="py-16 text-uppercase small fw-bold text-muted border-0 text-center" style={{ letterSpacing: '0.1em' }}>Quantity</th>
                                                <th className="py-16 text-uppercase small fw-bold text-muted border-0 text-end" style={{ letterSpacing: '0.1em' }}>Price</th>
                                                <th className="pe-32 py-16 text-uppercase small fw-bold text-muted border-0 text-end" style={{ letterSpacing: '0.1em' }}>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="border-top-0">
                                            {order.items.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td className="ps-32 py-24 fw-800 text-dark" style={{fontSize: '15px'}}>{item.name}</td>
                                                    <td className="py-24 text-center">
                                                        <span className="qty-badge">{item.quantity} units</span>
                                                    </td>
                                                    <td className="py-24 text-end text-muted fw-600">₹{(order.totalAmount / order.items.reduce((a,b) => a + b.quantity, 0)).toFixed(2)}</td>
                                                    <td className="pe-32 py-24 text-end fw-900" style={{fontSize: '16px'}}>₹{((order.totalAmount / order.items.reduce((a,b) => a + b.quantity, 0)) * item.quantity).toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {/* Summary Section */}
                                <div className="p-32 bg-light border-top">
                                    <div className="d-flex flex-column gap-12 ms-auto" style={{ maxWidth: '300px' }}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="text-muted small fw-700 text-uppercase">Subtotal</span>
                                            <span className="fw-800">₹{order.totalAmount.toLocaleString()}</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="text-muted small fw-700 text-uppercase">Delivery Fee</span>
                                            <span className="text-success fw-800">FREE</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-8 pt-12 border-top">
                                            <span className="text-dark fw-900 text-uppercase">Grand Total</span>
                                            <span className="fw-900 text-success" style={{fontSize: '24px'}}>₹{order.totalAmount.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            {/* Customer Info */}
                            <div className="ds-card p-32 border-0 shadow-md mb-32">
                                <h5 className="fw-900 mb-24 border-bottom pb-16" style={{fontSize: '18px'}}>Customer Info</h5>
                                <div className="d-flex flex-column gap-24">
                                    <div className="d-flex align-items-center gap-16">
                                        <div className="customer-avatar-mini">
                                            {order.customerName.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-muted small fw-800 text-uppercase mb-4">Customer Name</div>
                                            <div className="fw-900 text-dark" style={{fontSize: '16px'}}>{order.customerName}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-muted small fw-800 text-uppercase mb-8">Phone Number</div>
                                        <div className="d-flex align-items-center gap-12">
                                            <i className="fas fa-phone-alt text-muted"></i>
                                            <span className="fw-700">{order.phone}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-muted small fw-800 text-uppercase mb-8">Delivery Address</div>
                                        <div className="d-flex align-items-start gap-12">
                                            <i className="fas fa-location-arrow text-muted mt-4"></i>
                                            <span className="fw-600 text-muted small" style={{lineHeight: '1.5'}}>{order.address || 'No specific address provided'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status Card */}
                            <div className="ds-card p-32 border-0 shadow-md" style={{backgroundColor: '#F0FDF4'}}>
                                <h5 className="fw-900 mb-16 text-success" style={{fontSize: '18px'}}>Fulfillment</h5>
                                <p className="text-muted small fw-600 mb-24" style={{lineHeight: '1.6'}}>
                                    Coordinate with the customer via WhatsApp for precise delivery timing.
                                </p>
                                <div className="d-flex align-items-center gap-12 p-16 rounded-16 bg-white shadow-sm">
                                    <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center" style={{width: '36px', height: '36px'}}>
                                        <i className="fas fa-truck-fast"></i>
                                    </div>
                                    <div>
                                        <div className="text-muted small fw-800 text-uppercase">Current Status</div>
                                        <div className="fw-900 text-success text-uppercase" style={{fontSize: '13px'}}>{order.status}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .status-pill {
                    padding: 6px 14px;
                    border-radius: 10px;
                    font-size: 11px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .status-pill.pending { background-color: #FEF3C7; color: #92400E; }
                .status-pill.delivered { background-color: #DCFCE7; color: #166534; }
                .status-pill.cancelled { background-color: #FEE2E2; color: #991B1B; }
                
                .qty-badge {
                    padding: 4px 10px;
                    background-color: #F3F4F6;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 700;
                    color: #4B5563;
                }
                
                .customer-avatar-mini {
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    background-color: var(--primary-light);
                    color: var(--primary-dark);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 900;
                    font-size: 18px;
                }
            `}</style>
        </div>
    );
}
