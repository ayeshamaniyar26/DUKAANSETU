'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { getOrdersData, updateOrderStatus, createOrder, updateOrder, deleteOrder } from './actions';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function OrdersPage() {
  const [data, setData] = useState({ orders: [], stats: { daily: 0, monthly: 0, yearly: 0, totalOrders: 0 } });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [items, setItems] = useState([{ name: '', quantity: 1 }]);

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
    const orderData = await getOrdersData();
    setData(orderData);
    setLoading(false);
  }

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
    
    let res;
    if (editingOrder) {
        formData.append('id', editingOrder.id);
        res = await updateOrder(formData);
    } else {
        res = await createOrder(formData);
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
    <div style={{display: 'flex', backgroundColor: '#F8FFF8', minHeight: '100vh'}}>
        <Sidebar items={menuItems} activeItem="Orders" />
        <div style={{marginLeft: '280px', padding: '40px', flexGrow: 1}}>
            <div className="d-flex justify-content-between align-items-center mb-30">
                <div>
                    <h1 className="mb-0">Order Management</h1>
                    <p className="text-muted">Monitor and fulfill your business orders</p>
                </div>
                <div className="d-flex gap-3">
                    <button className="btn btn-outline-success px-24 py-12" onClick={fetchData} style={{borderRadius: '12px', height: '48px', fontWeight: '600'}}>
                        <i className="fas fa-sync-alt me-2"></i> Refresh
                    </button>
                    <button className="rr-btn" onClick={() => { setEditingOrder(null); setItems([{ name: '', quantity: 1 }]); setIsModalOpen(true); }}>
                        <i className="fas fa-plus me-2"></i> Create New Order
                    </button>
                </div>
            </div>

            {/* Stats Section */}
            <div className="row mb-30 g-4">
                <div className="col-md-3">
                    <div className="bg-white p-24" style={{borderRadius: '10px', border: '1px solid #eee'}}>
                        <div className="text-muted small fw-bold text-uppercase mb-10">Total Orders</div>
                        <h2 className="mb-0 fw-bold">{data.stats.totalOrders}</h2>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="bg-white p-24" style={{borderRadius: '10px', border: '1px solid #eee'}}>
                        <div className="text-muted small fw-bold text-uppercase mb-10">Today's Orders</div>
                        <h2 className="mb-0 fw-bold text-success">{data.stats.daily}</h2>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="bg-white p-24" style={{borderRadius: '10px', border: '1px solid #eee'}}>
                        <div className="text-muted small fw-bold text-uppercase mb-10">Monthly Volume</div>
                        <h2 className="mb-0 fw-bold">{data.stats.monthly}</h2>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="bg-white p-24" style={{borderRadius: '10px', border: '1px solid #eee'}}>
                        <div className="text-muted small fw-bold text-uppercase mb-10">Total Sales</div>
                        <h2 className="mb-0 fw-bold text-success">₹{data.orders.reduce((acc, o) => acc + o.totalAmount, 0).toLocaleString()}</h2>
                    </div>
                </div>
            </div>

            <div className="bg-white p-30" style={{borderRadius: '10px', border: '1px solid #eee'}}>
                <div className="d-flex justify-content-between align-items-center mb-20">
                    <h5 className="mb-0 fw-bold">Recent Orders</h5>
                    <select 
                        className="form-select form-select-sm" 
                        style={{width: '150px'}}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="7" className="text-center py-40">Loading orders...</td></tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td>
                                            <Link href={`/dashboard/owner/orders/${order.id}`} className="fw-bold text-decoration-none text-success">
                                                #{order.id.slice(-6).toUpperCase()}
                                            </Link>
                                        </td>
                                        <td className="text-muted small">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <strong>{order.customerName}</strong>
                                            <div className="text-muted x-small">{order.phone}</div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-wrap gap-1">
                                                {order.items.map((item, idx) => (
                                                    <span key={idx} className="badge bg-light text-dark fw-normal border" style={{fontSize: '11px'}}>
                                                        {item.name} x{item.quantity}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="fw-bold">₹{order.totalAmount.toLocaleString()}</td>
                                        <td>{getStatusBadge(order.status)}</td>
                                        <td className="text-end">
                                            <div className="dropdown d-inline-block">
                                                <button className="btn btn-sm btn-light" data-bs-toggle="dropdown">
                                                    <i className="fas fa-ellipsis-v"></i>
                                                </button>
                                                <ul className="dropdown-menu shadow border-0">
                                                    <li><Link className="dropdown-item" href={`/dashboard/owner/orders/${order.id}`}><i className="fas fa-eye me-2"></i> View</Link></li>
                                                    <li><button className="dropdown-item" onClick={() => handleEdit(order)}><i className="fas fa-edit me-2"></i> Edit</button></li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li><button className="dropdown-item" onClick={() => handleStatusUpdate(order.id, 'PENDING')}>Set Pending</button></li>
                                                    <li><button className="dropdown-item text-success" onClick={() => handleStatusUpdate(order.id, 'DELIVERED')}>Set Delivered</button></li>
                                                    <li><button className="dropdown-item text-danger" onClick={() => handleStatusUpdate(order.id, 'CANCELLED')}>Set Cancelled</button></li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li><button className="dropdown-item text-danger" onClick={() => handleDelete(order.id)}><i className="fas fa-trash me-2"></i> Delete</button></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            {!loading && filteredOrders.length === 0 && (
                                <tr><td colSpan="7" className="text-center py-40 text-muted">No orders found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>





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
                                        <div className="flex-grow-1">
                                            <input 
                                                type="text" 
                                                className="form-control form-control-sm" 
                                                placeholder="Item name (e.g. Basmati Rice)" 
                                                value={item.name} 
                                                onChange={(e) => updateItem(index, 'name', e.target.value)}
                                                style={{padding: '10px 12px', borderRadius: '10px', fontSize: '14px'}}
                                            />
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
