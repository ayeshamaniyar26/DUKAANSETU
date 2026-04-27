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
    <div style={{display: 'flex', backgroundColor: '#F8FFF8', minHeight: '100vh'}}>
        <Sidebar items={menuItems} activeItem="Orders" />
        <div style={{marginLeft: '280px', padding: '50px', flexGrow: 1}}>
            <div className="mb-30">
                <Link href="/dashboard/owner/orders" className="text-decoration-none text-muted small fw-bold">
                    <i className="fas fa-arrow-left me-2"></i> Back to Orders
                </Link>
            </div>

            <div className="d-flex justify-content-between align-items-start mb-40">
                <div>
                    <h1 className="mb-10 fw-bold" style={{fontSize: '32px'}}>Order #{order.id.slice(-6).toUpperCase()}</h1>
                    <p className="text-muted mb-0">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="d-flex gap-3">
                    <div className="dropdown">
                        <button className="btn btn-lg btn-white shadow-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" style={{borderRadius: '12px', border: '1px solid #eee', fontSize: '15px', fontWeight: '600'}}>
                           Status: {order.status}
                        </button>
                        <ul className="dropdown-menu shadow-lg border-0 p-8" style={{borderRadius: '12px'}}>
                            <li><button className="dropdown-item rounded-8 mb-4" onClick={() => handleStatusUpdate('PENDING')}>Pending</button></li>
                            <li><button className="dropdown-item rounded-8 mb-4 text-success" onClick={() => handleStatusUpdate('DELIVERED')}>Delivered</button></li>
                            <li><button className="dropdown-item rounded-8 text-danger" onClick={() => handleStatusUpdate('CANCELLED')}>Cancelled</button></li>
                        </ul>
                    </div>
                    <button className="rr-btn px-25" onClick={() => window.print()} style={{borderRadius: '12px'}}>
                        <i className="fas fa-print me-2"></i> Print Invoice
                    </button>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="bg-white p-40 mb-30" style={{borderRadius: '24px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.02)'}}>
                        <h4 className="mb-30 fw-bold border-bottom pb-20">Order Items</h4>
                        <table className="table align-middle">
                            <thead>
                                <tr className="text-muted small text-uppercase">
                                    <th className="border-0">Item Description</th>
                                    <th className="border-0 text-center">Quantity</th>
                                    <th className="border-0 text-end">Price</th>
                                    <th className="border-0 text-end">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="py-20 fw-600">{item.name}</td>
                                        <td className="py-20 text-center">{item.quantity}</td>
                                        <td className="py-20 text-end text-muted">₹{(order.totalAmount / order.items.reduce((a,b) => a + b.quantity, 0)).toFixed(2)}</td>
                                        <td className="py-20 text-end fw-bold">₹{((order.totalAmount / order.items.reduce((a,b) => a + b.quantity, 0)) * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                                <tr className="border-top" style={{borderTop: '2px solid #f8fafc !important'}}>
                                    <td colSpan="3" className="pt-30 text-end fw-bold text-muted">Subtotal</td>
                                    <td className="pt-30 text-end fw-bold">₹{order.totalAmount.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td colSpan="3" className="py-10 text-end fw-bold text-muted">Tax (GST 0%)</td>
                                    <td className="py-10 text-end fw-bold">₹0.00</td>
                                </tr>
                                <tr>
                                    <td colSpan="3" className="py-20 text-end fw-bold" style={{fontSize: '20px'}}>Grand Total</td>
                                    <td className="py-20 text-end fw-bold text-success" style={{fontSize: '24px'}}>₹{order.totalAmount.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="bg-white p-30 mb-30" style={{borderRadius: '24px', border: '1px solid #eee'}}>
                        <h5 className="mb-20 fw-bold"><i className="fas fa-user-circle me-2 text-primary"></i> Customer Details</h5>
                        <div className="mb-20">
                            <label className="text-muted small fw-bold text-uppercase d-block mb-1">Name</label>
                            <div className="fw-600">{order.customerName}</div>
                        </div>
                        <div className="mb-20">
                            <label className="text-muted small fw-bold text-uppercase d-block mb-1">Phone</label>
                            <div className="fw-600">{order.phone}</div>
                        </div>
                        <div className="mb-0">
                            <label className="text-muted small fw-bold text-uppercase d-block mb-1">Delivery Address</label>
                            <div className="fw-600">{order.address || 'No address provided'}</div>
                        </div>
                    </div>

                    <div className="bg-white p-30" style={{borderRadius: '24px', border: '1px solid #eee', backgroundColor: '#F0FDF4'}}>
                        <h5 className="mb-20 fw-bold text-success"><i className="fas fa-truck me-2"></i> Shipping Status</h5>
                        <p className="small mb-20 text-muted">This order is being processed and will be delivered to the customer via WhatsApp coordination.</p>
                        <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-12" style={{width: '32px', height: '32px'}}>
                                <i className="fas fa-check small"></i>
                            </div>
                            <div className="fw-bold text-success">Status: {order.status}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
