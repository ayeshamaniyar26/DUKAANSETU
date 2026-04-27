'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { getOrders, updateOrderStatus, createOrder, updateOrder, deleteOrder, searchStoreProducts } from './actions';
import { getStoreSettings } from '../profile/actions';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function OrdersPage() {
  const [data, setData] = useState({ orders: [], stats: { daily: 0, monthly: 0, yearly: 0, totalOrders: 0 } });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [items, setItems] = useState([{ name: '', quantity: 1 }]);
  const [suggestions, setSuggestions] = useState({}); // {index: [products]}
  const [store, setStore] = useState(null);

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
    const orderData = await getOrders(storeId);
    setData(orderData);
    
    // Fetch store details for the placeholder/category
    const storeRes = await getStoreSettings(storeId);
    if (storeRes) {
        setStore(storeRes.store);
    }

    setLoading(false);
  }

  const handleSearch = async (index, query) => {
    updateItem(index, 'name', query);
    if (query.length < 2) {
        setSuggestions(prev => ({ ...prev, [index]: [] }));
        return;
    }
    const storeId = localStorage.getItem('storeId');
    const matches = await searchStoreProducts(query, storeId);
    setSuggestions(prev => ({ ...prev, [index]: matches }));
  };

  const selectSuggestion = (index, product) => {
    const newItems = [...items];
    newItems[index].name = product.name;
    newItems[index].price = product.price; // Optional: store price too
    setItems(newItems);
    setSuggestions(prev => ({ ...prev, [index]: [] }));
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    const res = await updateOrderStatus(orderId, newStatus);
    if (res.success) {
        Swal.fire({
            title: 'Updated!',
            text: `Order status changed to ${newStatus}`,
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
        fetchData();
    }
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DC2626',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Yes, delete it!'
    });

    if (isConfirmed) {
        const res = await deleteOrder(id);
        if (res.success) {
            Swal.fire('Deleted!', 'Order has been deleted.', 'success');
            fetchData();
        }
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setItems(order.items || [{ name: '', quantity: 1 }]);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('items', JSON.stringify(items.filter(i => i.name)));
    
    const storeId = localStorage.getItem('storeId');
    
    let res;
    if (editingOrder) {
        formData.append('id', editingOrder.id);
        res = await updateOrder(formData);
    } else {
        res = await createOrder(formData, storeId);
    }

    if (res.success) {
        Swal.fire('Success', editingOrder ? 'Order updated' : 'Order created', 'success');
        setIsModalOpen(false);
        setEditingOrder(null);
        setItems([{ name: '', quantity: 1 }]);
        fetchData();
    }
  };

  const addItem = () => setItems([...items, { name: '', quantity: 1 }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));
  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const filteredOrders = data.orders.filter(order => {
    if (filter === 'all') return true;
    return order.status.toLowerCase() === filter;
  });

  const getStatusBadge = (status) => {
    switch(status.toUpperCase()) {
        case 'DELIVERED': return <span className="badge bg-success-light text-success" style={{backgroundColor: '#DCFCE7', color: '#166534', padding: '6px 12px'}}>Delivered</span>;
        case 'PENDING': return <span className="badge bg-warning-light text-warning" style={{backgroundColor: '#FEF3C7', color: '#92400E', padding: '6px 12px'}}>Pending</span>;
        case 'CANCELLED': return <span className="badge bg-danger-light text-danger" style={{backgroundColor: '#FEE2E2', color: '#991B1B', padding: '6px 12px'}}>Cancelled</span>;
        default: return <span className="badge bg-light text-dark" style={{padding: '6px 12px'}}>{status}</span>;
    }
  };

  return (
    <div style={{display: 'flex', backgroundColor: 'var(--bg-main)', minHeight: '100vh'}}>
        <Sidebar items={menuItems} activeItem="Orders" />
        <div style={{marginLeft: '280px', padding: '0', flexGrow: 1, width: 'calc(100% - 280px)'}}>
            
            {/* Page Header */}
            <header style={{ padding: '60px 48px 32px 48px' }} className="animate-fade-in">
                <div className="d-flex justify-content-between align-items-end mb-40">
                    <div>
                        <h1 className="fw-bold mb-8" style={{ fontSize: '36px', color: 'var(--text-main)', letterSpacing: '-0.04em' }}>Orders</h1>
                        <p className="text-muted mb-0" style={{ fontSize: '16px', fontWeight: '500' }}>Manage customer orders, fulfillment, and sales history.</p>
                    </div>
                    <div className="d-flex align-items-center gap-16">
                        <button className="btn bg-white shadow-sm border-0 px-24 py-12" onClick={fetchData} 
                            style={{ borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '14px', border: '1px solid var(--border-medium) !important' }}>
                            <i className="fas fa-sync-alt me-8 text-success"></i> Sync Orders
                        </button>
                        <button className="rr-btn px-28 py-12" style={{ borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '700' }} 
                            onClick={() => { setEditingOrder(null); setItems([{ name: '', quantity: 1 }]); setIsModalOpen(true); }}>
                            <i className="fas fa-plus me-8"></i> Create Manual Order
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="row g-24 mb-40">
                    <div className="col-md-3">
                        <div className="ds-card border-0 shadow-sm p-24" style={{borderLeft: '4px solid var(--primary)'}}>
                            <div className="text-muted small fw-800 text-uppercase mb-12" style={{letterSpacing: '0.05em'}}>Today</div>
                            <div className="d-flex align-items-end gap-12">
                                <h2 className="mb-0 fw-800">{data.stats.daily}</h2>
                                <span className="text-success small fw-700 mb-4">Orders</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="ds-card border-0 shadow-sm p-24" style={{borderLeft: '4px solid #3B82F6'}}>
                            <div className="text-muted small fw-800 text-uppercase mb-12" style={{letterSpacing: '0.05em'}}>This Month</div>
                            <div className="d-flex align-items-end gap-12">
                                <h2 className="mb-0 fw-800">{data.stats.monthly}</h2>
                                <span className="text-primary small fw-700 mb-4">Volume</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="ds-card border-0 shadow-sm p-24" style={{borderLeft: '4px solid #F59E0B'}}>
                            <div className="text-muted small fw-800 text-uppercase mb-12" style={{letterSpacing: '0.05em'}}>Total Lifecycle</div>
                            <div className="d-flex align-items-end gap-12">
                                <h2 className="mb-0 fw-800">{data.stats.totalOrders}</h2>
                                <span className="text-warning small fw-700 mb-4">Count</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="ds-card border-0 shadow-sm p-24" style={{borderLeft: '4px solid #8B5CF6'}}>
                            <div className="text-muted small fw-800 text-uppercase mb-12" style={{letterSpacing: '0.05em'}}>Revenue (INR)</div>
                            <div className="d-flex align-items-end gap-12">
                                <h2 className="mb-0 fw-800">₹{data.orders.reduce((acc, o) => acc + o.totalAmount, 0).toLocaleString()}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="d-flex justify-content-between align-items-center p-12 bg-white border shadow-sm" style={{ borderRadius: 'var(--radius-lg)' }}>
                    <div className="d-flex gap-12 align-items-center ps-8">
                        <i className="fas fa-filter text-muted small"></i>
                        <div className="d-flex gap-8">
                            {['all', 'pending', 'delivered', 'cancelled'].map(s => (
                                <button 
                                    key={s}
                                    onClick={() => setFilter(s)}
                                    className={`btn btn-sm px-16 py-6 border-0 fw-700 text-uppercase`}
                                    style={{ 
                                        borderRadius: '8px', 
                                        fontSize: '11px',
                                        backgroundColor: filter === s ? 'var(--primary-light)' : 'transparent',
                                        color: filter === s ? 'var(--primary-dark)' : 'var(--text-muted)'
                                    }}
                                >
                                    {s}
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
                                    <th className="ps-32 py-20 text-uppercase small fw-bold text-muted border-0" style={{ letterSpacing: '0.1em' }}>Order Info</th>
                                    <th className="py-20 text-uppercase small fw-bold text-muted border-0" style={{ letterSpacing: '0.1em' }}>Customer</th>
                                    <th className="py-20 text-uppercase small fw-bold text-muted border-0" style={{ letterSpacing: '0.1em' }}>Items</th>
                                    <th className="py-20 text-uppercase small fw-bold text-muted border-0" style={{ letterSpacing: '0.1em' }}>Amount</th>
                                    <th className="py-20 text-uppercase small fw-bold text-muted border-0" style={{ letterSpacing: '0.1em' }}>Status</th>
                                    <th className="pe-32 py-20 text-uppercase small fw-bold text-muted border-0 text-end" style={{ letterSpacing: '0.1em' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="border-top-0">
                                {loading ? (
                                    <tr><td colSpan="6" className="text-center py-80"><div className="ds-loader mx-auto"></div></td></tr>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover-row">
                                            <td className="ps-32 py-20">
                                                <Link href={`/dashboard/owner/orders/${order.id}`} className="text-decoration-none">
                                                    <div className="fw-800 text-primary mb-2" style={{ fontSize: '15px' }}>#{order.id.slice(-6).toUpperCase()}</div>
                                                    <div className="text-muted small">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</div>
                                                </Link>
                                            </td>
                                            <td className="py-20">
                                                <div className="fw-700 text-dark mb-2">{order.customerName}</div>
                                                <div className="text-muted small">{order.phone}</div>
                                            </td>
                                            <td className="py-20">
                                                <div className="d-flex flex-wrap gap-6">
                                                    {order.items.slice(0, 2).map((item, idx) => (
                                                        <span key={idx} className="item-tag">
                                                            {item.name} <span className="text-muted ms-4">x{item.quantity}</span>
                                                        </span>
                                                    ))}
                                                    {order.items.length > 2 && (
                                                        <span className="item-tag">+{order.items.length - 2} more</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-20 fw-800 text-dark">₹{order.totalAmount.toLocaleString()}</td>
                                            <td className="py-20">{getStatusBadge(order.status)}</td>
                                            <td className="pe-32 py-20 text-end">
                                                <div className="dropdown">
                                                    <button className="action-circle-btn" data-bs-toggle="dropdown">
                                                        <i className="fas fa-ellipsis-h"></i>
                                                    </button>
                                                    <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 p-8" style={{borderRadius: '12px'}}>
                                                        <li><Link className="dropdown-item py-10 px-16 rounded-8 small fw-600" href={`/dashboard/owner/orders/${order.id}`}><i className="fas fa-eye me-8 text-primary"></i> View Details</Link></li>
                                                        <li><button className="dropdown-item py-10 px-16 rounded-8 small fw-600" onClick={() => handleEdit(order)}><i className="fas fa-pen me-8 text-warning"></i> Edit Order</button></li>
                                                        <li><hr className="dropdown-divider opacity-10" /></li>
                                                        <li className="dropdown-header small fw-800 text-uppercase text-muted pt-8 pb-4">Update Status</li>
                                                        <li><button className="dropdown-item py-8 px-16 rounded-8 small fw-600" onClick={() => handleStatusUpdate(order.id, 'PENDING')}>Mark Pending</button></li>
                                                        <li><button className="dropdown-item py-8 px-16 rounded-8 small fw-600 text-success" onClick={() => handleStatusUpdate(order.id, 'DELIVERED')}>Mark Delivered</button></li>
                                                        <li><button className="dropdown-item py-8 px-16 rounded-8 small fw-600 text-danger" onClick={() => handleStatusUpdate(order.id, 'CANCELLED')}>Mark Cancelled</button></li>
                                                        <li><hr className="dropdown-divider opacity-10" /></li>
                                                        <li><button className="dropdown-item py-10 px-16 rounded-8 small fw-600 text-danger" onClick={() => handleDelete(order.id)}><i className="fas fa-trash-can me-8"></i> Delete Order</button></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                {!loading && filteredOrders.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-80">
                                            <div className="mb-20 text-muted opacity-20">
                                                <i className="fas fa-shopping-bag fa-5x"></i>
                                            </div>
                                            <h5 className="fw-bold mb-8">No Orders Found</h5>
                                            <p className="text-muted">You haven't received any orders yet.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <style jsx>{`
            .hover-row:hover { background-color: #FAFBFC; }
            .item-tag {
                padding: 4px 10px;
                background-color: #F3F4F6;
                border-radius: 8px;
                font-size: 11px;
                font-weight: 700;
                color: #374151;
                border: 1px solid var(--border-medium);
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
            .cursor-pointer { cursor: pointer; }
            .hover-bg-light:hover { background-color: var(--bg-main); }
            .rounded-10 { border-radius: 10px; }
        `}</style>

        {/* Premium Order Modal */}
        {isModalOpen && (
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: 'rgba(17, 24, 39, 0.7)', zIndex: 9999, display: 'flex',
                alignItems: 'center', justifyContent: 'center', padding: '20px',
                backdropFilter: 'blur(8px)'
            }} className="animate-fade-in">
                <div style={{
                    backgroundColor: 'white', maxWidth: '700px', width: '100%', 
                    borderRadius: 'var(--radius-xl)', padding: '48px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                    position: 'relative', maxHeight: '90vh', overflowY: 'auto'
                }}>
                    <button onClick={() => setIsModalOpen(false)} style={{
                        position: 'absolute', top: '30px', right: '30px', border: 'none', 
                        background: '#F3F4F6', width: '40px', height: '40px', borderRadius: '50%',
                        fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--text-muted)'
                    }}><i className="fas fa-times"></i></button>

                    <div className="mb-40">
                        <h2 className="mb-8" style={{fontSize: '28px', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.03em'}}>
                            {editingOrder ? 'Edit Order' : 'New Manual Order'}
                        </h2>
                        <p className="text-muted fw-500">Capture customer details and items for this order.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="row g-24 mb-32">
                            <div className="col-md-6">
                                <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Customer Name</label>
                                <input name="customerName" type="text" required defaultValue={editingOrder?.customerName} 
                                    className="form-control px-20 py-14"
                                    style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }}
                                    placeholder="e.g. Rahul Sharma" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Contact Number</label>
                                <input name="phone" type="text" required defaultValue={editingOrder?.phone} 
                                    className="form-control px-20 py-14"
                                    style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }}
                                    placeholder="10-digit number" />
                            </div>
                            <div className="col-12">
                                <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Delivery Address</label>
                                <textarea name="address" rows="2" defaultValue={editingOrder?.address}
                                    className="form-control px-20 py-14"
                                    style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px', resize: 'none' }}
                                    placeholder="Full street address..."></textarea>
                            </div>
                        </div>

                        <div className="mb-32 p-32" style={{backgroundColor: '#F9FAFB', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-medium)'}}>
                            <div className="d-flex justify-content-between align-items-center mb-24">
                                <label className="form-label small fw-800 text-muted text-uppercase mb-0">Order Items</label>
                                <button type="button" className="btn btn-sm bg-white shadow-sm border px-16 py-8 fw-700 text-success" onClick={addItem} style={{borderRadius: '10px'}}>
                                    <i className="fas fa-plus me-8"></i> Add Item
                                </button>
                            </div>
                            
                            <div className="d-flex flex-column gap-12">
                                {items.map((item, index) => (
                                    <div key={index} className="d-flex gap-12 align-items-start">
                                         <div className="flex-grow-1 position-relative">
                                             <input 
                                                 type="text" 
                                                 className="form-control px-16 py-12" 
                                                 placeholder={`Item name (e.g. ${store?.category === 'Bakery' ? 'Pastry' : 'Rice'})`} 
                                                 value={item.name} 
                                                 onChange={(e) => handleSearch(index, e.target.value)}
                                                 style={{padding: '10px 12px', borderRadius: '12px', fontSize: '14px', border: '1px solid var(--border-medium)'}}
                                                 autoComplete="off"
                                             />
                                             {suggestions[index]?.length > 0 && (
                                                 <div className="position-absolute w-100 bg-white shadow-xl border-0 rounded-12 mt-4 overflow-hidden" style={{zIndex: 100, top: '100%'}}>
                                                     {suggestions[index].map(p => (
                                                         <div 
                                                             key={p.id} 
                                                             className="px-20 py-12 cursor-pointer hover-bg-light border-bottom last-border-0"
                                                             onClick={() => selectSuggestion(index, p)}
                                                         >
                                                             <div className="fw-700 text-dark small">{p.name}</div>
                                                             <div className="text-muted" style={{fontSize: '11px'}}>Price: ₹{p.price}</div>
                                                         </div>
                                                     ))}
                                                 </div>
                                             )}
                                         </div>
                                        <div style={{width: '90px'}}>
                                            <input 
                                                type="number" 
                                                className="form-control px-12 py-12 text-center" 
                                                value={item.quantity} 
                                                onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                                                style={{borderRadius: '12px', fontSize: '14px', border: '1px solid var(--border-medium)'}}
                                            />
                                        </div>
                                        {items.length > 1 && (
                                            <button type="button" className="btn text-danger px-8 py-12" onClick={() => removeItem(index)}>
                                                <i className="fas fa-trash-can"></i>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="row justify-content-end mb-40">
                            <div className="col-md-6">
                                <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Grand Total (₹)</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0 fw-800" style={{borderRadius: '12px 0 0 12px'}}>₹</span>
                                    <input name="totalAmount" type="number" step="0.01" required defaultValue={editingOrder?.totalAmount}
                                        className="form-control px-20 py-14 border-0"
                                        style={{ backgroundColor: '#F3F4F6', fontSize: '18px', fontWeight: '800', borderRadius: '0 12px 12px 0' }} 
                                        placeholder="0.00" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="d-flex gap-16">
                            <button type="submit" className="rr-btn flex-grow-1 py-18" style={{borderRadius: '16px', fontSize: '16px', fontWeight: '800'}}>
                                {editingOrder ? 'Update Order Details' : 'Generate Manual Order'}
                            </button>
                            <button type="button" onClick={() => setIsModalOpen(false)} 
                                className="btn btn-white px-32"
                                style={{borderRadius: '16px', fontWeight: '700', border: '1px solid var(--border-medium)', color: 'var(--text-muted)'}}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}






        {/* Create/Edit Order Modal */}
        {isModalOpen && (
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex',
                alignItems: 'center', justifyContent: 'center', padding: '20px',
                backdropFilter: 'blur(4px)'
            }}>
                <div className="bg-white" style={{
                    maxWidth: '650px', width: '100%', borderRadius: '24px', 
                    position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                    padding: '40px', maxHeight: '90vh', overflowY: 'auto'
                }}>
                    <div className="d-flex justify-content-between align-items-center mb-32">
                        <h3 className="mb-0 fw-bold" style={{fontSize: '24px', color: '#111827'}}>
                            {editingOrder ? 'Edit Order Details' : 'Create New Order'}
                        </h3>
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
                        <div className="row g-4 mb-24">
                            <div className="col-md-6">
                                <label className="form-label fw-bold mb-8 d-block" style={{color: '#374151', fontSize: '14px'}}>Customer Name</label>
                                <input 
                                    name="customerName" 
                                    type="text" 
                                    className="form-control" 
                                    defaultValue={editingOrder?.customerName} 
                                    required 
                                    style={{padding: '12px 16px', borderRadius: '12px', border: '1px solid #d1d5db'}} 
                                    placeholder="e.g. Rajesh Kumar"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold mb-8 d-block" style={{color: '#374151', fontSize: '14px'}}>Phone Number</label>
                                <input 
                                    name="phone" 
                                    type="text" 
                                    className="form-control" 
                                    defaultValue={editingOrder?.phone} 
                                    required 
                                    style={{padding: '12px 16px', borderRadius: '12px', border: '1px solid #d1d5db'}} 
                                    placeholder="10 digit mobile number"
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label fw-bold mb-8 d-block" style={{color: '#374151', fontSize: '14px'}}>Delivery Address</label>
                                <textarea 
                                    name="address" 
                                    className="form-control" 
                                    defaultValue={editingOrder?.address} 
                                    rows="2" 
                                    style={{padding: '12px 16px', borderRadius: '12px', border: '1px solid #d1d5db', resize: 'none'}}
                                    placeholder="Enter full delivery address"
                                ></textarea>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold mb-8 d-block" style={{color: '#374151', fontSize: '14px'}}>Total Amount (₹)</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0" style={{borderRadius: '12px 0 0 12px'}}>₹</span>
                                    <input 
                                        name="totalAmount" 
                                        type="number" 
                                        className="form-control border-start-0" 
                                        defaultValue={editingOrder?.totalAmount} 
                                        required 
                                        style={{padding: '12px 16px', borderRadius: '0 12px 12px 0', border: '1px solid #d1d5db'}} 
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-32 p-20" style={{backgroundColor: '#f9fafb', borderRadius: '16px', border: '1px solid #e5e7eb'}}>
                            <div className="d-flex justify-content-between align-items-center mb-20">
                                <label className="form-label fw-bold mb-0" style={{color: '#111827'}}>Order Items</label>
                                <button 
                                    type="button" 
                                    className="btn btn-sm btn-success px-15" 
                                    onClick={addItem}
                                    style={{borderRadius: '8px', fontSize: '13px', fontWeight: '600'}}
                                >
                                    <i className="fas fa-plus me-1"></i> Add Item
                                </button>
                            </div>
                            
                            <div className="items-list" style={{maxHeight: '200px', overflowY: 'auto', paddingRight: '5px'}}>
                                {items.map((item, index) => (
                                    <div key={index} className="d-flex gap-3 mb-12 align-items-center">
                                         <div className="flex-grow-1 position-relative">
                                             <input 
                                                 type="text" 
                                                 className="form-control form-control-sm" 
                                                 placeholder={`Item name (e.g. ${store?.category === 'Bakery' ? 'Chocolate Cake' : 'Basmati Rice'})`} 
                                                 value={item.name} 
                                                 onChange={(e) => handleSearch(index, e.target.value)}
                                                 style={{padding: '10px 12px', borderRadius: '10px', fontSize: '14px'}}
                                                 autoComplete="off"
                                             />
                                             {suggestions[index]?.length > 0 && (
                                                 <div className="position-absolute w-100 bg-white shadow-sm border rounded-10 mt-1" style={{zIndex: 10, top: '100%'}}>
                                                     {suggestions[index].map(p => (
                                                         <div 
                                                             key={p.id} 
                                                             className="px-15 py-10 cursor-pointer hover-bg-light small"
                                                             onClick={() => selectSuggestion(index, p)}
                                                             style={{cursor: 'pointer'}}
                                                         >
                                                             <div className="fw-bold">{p.name}</div>
                                                             <div className="text-muted" style={{fontSize: '11px'}}>₹{p.price}</div>
                                                         </div>
                                                     ))}
                                                 </div>
                                             )}
                                         </div>
                                        <div style={{width: '100px'}}>
                                            <input 
                                                type="number" 
                                                className="form-control form-control-sm" 
                                                placeholder="Qty" 
                                                value={item.quantity} 
                                                onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                                                style={{padding: '10px 12px', borderRadius: '10px', fontSize: '14px'}}
                                            />
                                        </div>
                                        {items.length > 1 && (
                                            <button 
                                                type="button" 
                                                className="btn btn-link text-danger p-0" 
                                                onClick={() => removeItem(index)}
                                                style={{fontSize: '18px', textDecoration: 'none'}}
                                            >
                                                <i className="fas fa-minus-circle"></i>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="rr-btn w-100 py-16" 
                            style={{fontSize: '16px', borderRadius: '14px', fontWeight: '700', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                        >
                            {editingOrder ? 'Update Order Details' : 'Generate New Order'}
                        </button>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
}
