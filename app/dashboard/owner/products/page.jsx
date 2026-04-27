'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { getProducts, createProduct, updateProduct, deleteProduct, getAllProductsForExport, bulkCreateProducts } from './actions';
import Swal from 'sweetalert2';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sourceType, setSourceType] = useState('url'); // 'url' or 'upload'
    const [previewUrl, setPreviewUrl] = useState(null);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [categoryFilter, setCategoryFilter] = useState('');

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
        fetchProducts();
    }, [currentPage, sortBy, sortOrder, categoryFilter]);

    async function fetchProducts() {
        setLoading(true);
        const storeId = localStorage.getItem('storeId');
        const { products, total } = await getProducts({ 
            page: currentPage, 
            pageSize, 
            sortBy, 
            sortOrder, 
            category: categoryFilter,
            storeId 
        });
        setProducts(products);
        setTotal(total);
        setLoading(false);
    }

    const handleExport = async () => {
        const storeId = localStorage.getItem('storeId');
        const allProducts = await getAllProductsForExport(storeId);
        if (allProducts.length === 0) {
            Swal.fire('No Data', 'There are no products to export.', 'info');
            return;
        }

        const headers = ['Name', 'Category', 'Price', 'Description', 'Image URL'];
        const rows = allProducts.map(p => [
            `"${p.name.replace(/"/g, '""')}"`,
            `"${(p.category || '').replace(/"/g, '""')}"`,
            p.price,
            `"${(p.description || '').replace(/"/g, '""')}"`,
            `"${p.image || ''}"`
        ]);
        
        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `products_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const text = event.target.result;
                const lines = text.split('\n').filter(l => l.trim());
                if (lines.length < 2) throw new Error('File is empty or missing data');

                const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
                
                const data = lines.slice(1).map(line => {
                    const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));
                    const obj = {};
                    headers.forEach((h, i) => {
                        if (h.includes('name')) obj.name = values[i];
                        if (h.includes('category')) obj.category = values[i];
                        if (h.includes('price')) obj.price = values[i];
                        if (h.includes('description')) obj.description = values[i];
                        if (h.includes('image')) obj.image = values[i];
                    });
                    return obj;
                }).filter(p => p.name);
                
                if (data.length > 0) {
                    Swal.fire({
                        title: 'Importing...',
                        text: `Found ${data.length} products. Processing...`,
                        allowOutsideClick: false,
                        didOpen: () => Swal.showLoading()
                    });

                    const res = await bulkCreateProducts(data);
                    if (res.success) {
                        Swal.fire('Import Success', `${res.count} products have been added to your store.`, 'success');
                        fetchProducts();
                    }
                } else {
                    throw new Error('No valid product data found in CSV');
                }
            } catch (err) {
                Swal.fire('Import Error', err.message, 'error');
            }
            e.target.value = ''; // Reset input
        };
        reader.readAsText(file);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setSourceType('url');
        setPreviewUrl(product.image);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This product will be permanently removed!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteProduct(id);
                fetchProducts();
                Swal.fire('Deleted!', 'Product has been removed.', 'success');
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        Swal.fire({
            title: editingProduct ? 'Updating...' : 'Creating...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        const storeId = localStorage.getItem('storeId');

        let res;
        if (editingProduct) {
            formData.append('id', editingProduct.id);
            res = await updateProduct(formData);
        } else {
            res = await createProduct(formData, storeId);
        }
        
        if (res?.error) {
            Swal.fire('Error', res.error, 'error');
        } else {
            setIsModalOpen(false);
            setEditingProduct(null);
            setPreviewUrl(null);
            fetchProducts();
            Swal.fire('Success', editingProduct ? 'Product updated' : 'Product created', 'success');
        }
    };

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div style={{ display: 'flex', backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
            <Sidebar items={menuItems} activeItem="Products" />
            
            <main style={{ marginLeft: '280px', flexGrow: 1, width: 'calc(100% - 280px)', minHeight: '100vh' }}>
                {/* Page Header */}
                <header style={{ padding: '60px 48px 32px 48px' }} className="animate-fade-in">
                    <div className="d-flex justify-content-between align-items-end mb-40">
                        <div>
                            <h1 className="fw-bold mb-8" style={{ fontSize: '36px', color: 'var(--text-main)', letterSpacing: '-0.04em' }}>Inventory</h1>
                            <p className="text-muted mb-0" style={{ fontSize: '16px', fontWeight: '500' }}>Manage your product catalog, prices, and stock visibility.</p>
                        </div>
                        <div className="d-flex align-items-center gap-16">
                            <button className="btn bg-white shadow-sm border-0 px-24 py-12" onClick={handleExport} 
                                style={{ borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '14px', border: '1px solid var(--border-medium) !important' }}>
                                <i className="fas fa-arrow-up-from-bracket me-8 text-success"></i> Export
                            </button>
                            <label className="btn bg-white shadow-sm border-0 px-24 py-12 mb-0 d-flex align-items-center" 
                                style={{ borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '14px', border: '1px solid var(--border-medium) !important', cursor: 'pointer' }}>
                                <i className="fas fa-file-csv me-8 text-primary"></i> Import
                                <input type="file" accept=".csv" className="d-none" onChange={handleImport} />
                            </label>
                            <button className="rr-btn px-28 py-12" style={{ borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '700' }} onClick={() => { 
                                setEditingProduct(null); 
                                setSourceType('url');
                                setPreviewUrl(null);
                                setIsModalOpen(true); 
                            }}>
                                <i className="fas fa-plus me-8"></i> Add New Product
                            </button>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="d-flex justify-content-between align-items-center p-12 bg-white border shadow-sm" style={{ borderRadius: 'var(--radius-lg)' }}>
                        <div className="d-flex gap-12 align-items-center ps-8">
                            <i className="fas fa-filter text-muted small"></i>
                            <select 
                                className="form-select border-0 bg-transparent fw-600" 
                                style={{ width: '160px', fontSize: '14px', cursor: 'pointer' }}
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                {[...new Set(products.map(p => p.category))].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex gap-12 align-items-center pe-8">
                            <span className="text-muted small fw-600">Sort by:</span>
                            <select 
                                className="form-select border-0 bg-transparent fw-600 text-end" 
                                style={{ width: '150px', fontSize: '14px', cursor: 'pointer' }}
                                onChange={(e) => {
                                    const [field, order] = e.target.value.split(':');
                                    setSortBy(field);
                                    setSortOrder(order);
                                }}
                            >
                                <option value="createdAt:desc">Newest First</option>
                                <option value="name:asc">Name (A-Z)</option>
                                <option value="price:asc">Price: Low-High</option>
                                <option value="price:desc">Price: High-Low</option>
                            </select>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <div style={{ padding: '0 48px 48px 48px' }} className="animate-fade-in">
                    {loading ? (
                        <div className="ds-card text-center p-64">
                            <div className="ds-loader mx-auto mb-20"></div>
                            <p className="text-muted fw-500">Syncing your inventory...</p>
                        </div>
                    ) : (
                        <>
                            <div className="ds-card p-0 overflow-hidden border-0 shadow-md">
                                <div className="table-responsive">
                                    <table className="table align-middle mb-0">
                                        <thead>
                                            <tr style={{ backgroundColor: '#F9FAFB' }}>
                                                <th className="ps-32 py-20 text-uppercase small fw-bold text-muted border-0" style={{ letterSpacing: '0.1em' }}>Product Details</th>
                                                <th className="py-20 text-uppercase small fw-bold text-muted border-0" style={{ letterSpacing: '0.1em' }}>Category</th>
                                                <th className="py-20 text-uppercase small fw-bold text-muted border-0" style={{ letterSpacing: '0.1em' }}>Price</th>
                                                <th className="py-20 text-uppercase small fw-bold text-muted border-0" style={{ letterSpacing: '0.1em' }}>Status</th>
                                                <th className="pe-32 py-20 text-uppercase small fw-bold text-muted border-0 text-end" style={{ letterSpacing: '0.1em' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="border-top-0">
                                            {products.map((product) => (
                                                <tr key={product.id} className="hover-row">
                                                    <td className="ps-32 py-20">
                                                        <div className="d-flex align-items-center gap-20">
                                                            <div className="product-image-container shadow-sm">
                                                                <img src={product.image || '/assets/imgs/what-we-do/what-we-do__item-1.png'} 
                                                                    alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                            </div>
                                                            <div>
                                                                <div className="fw-bold text-dark mb-2" style={{ fontSize: '15px' }}>{product.name}</div>
                                                                <div className="text-muted small">SKU: {product.id.slice(-8).toUpperCase()}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-20">
                                                        <span className="cat-badge">
                                                            {product.category}
                                                        </span>
                                                    </td>
                                                    <td className="py-20 fw-800 text-dark" style={{fontSize: '15px'}}>₹{product.price.toLocaleString()}</td>
                                                    <td className="py-20">
                                                        <span className="status-indicator">
                                                            <span className="dot"></span>
                                                            In Stock
                                                        </span>
                                                    </td>
                                                    <td className="pe-32 py-20 text-end">
                                                        <div className="d-flex justify-content-end gap-12">
                                                            <button className="action-circle-btn edit" onClick={() => handleEdit(product)} title="Edit">
                                                                <i className="fas fa-pen"></i>
                                                            </button>
                                                            <button className="action-circle-btn delete" onClick={() => handleDelete(product.id)} title="Delete">
                                                                <i className="fas fa-trash-can"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {products.length === 0 && (
                                                <tr>
                                                    <td colSpan="5" className="text-center py-80">
                                                        <div className="mb-20 text-muted opacity-20">
                                                            <i className="fas fa-box-open fa-5x"></i>
                                                        </div>
                                                        <h5 className="fw-bold mb-8">No Products Found</h5>
                                                        <p className="text-muted">Your store's inventory is empty. Click "Add New Product" to start.</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="px-32 py-24 d-flex justify-content-between align-items-center border-top" style={{ backgroundColor: '#F9FAFB' }}>
                                        <div className="text-muted small fw-600">
                                            Page <span className="text-dark">{currentPage}</span> of <span className="text-dark">{totalPages}</span>
                                        </div>
                                        <div className="d-flex gap-12">
                                            <button 
                                                className="btn bg-white shadow-sm border px-20 py-8 small fw-700"
                                                style={{ borderRadius: '10px' }}
                                                disabled={currentPage === 1}
                                                onClick={() => setCurrentPage(prev => prev - 1)}
                                            >
                                                <i className="fas fa-chevron-left me-8"></i> Previous
                                            </button>
                                            <button 
                                                className="btn bg-white shadow-sm border px-20 py-8 small fw-700"
                                                style={{ borderRadius: '10px' }}
                                                disabled={currentPage === totalPages}
                                                onClick={() => setCurrentPage(prev => prev + 1)}
                                            >
                                                Next <i className="fas fa-chevron-right ms-8"></i>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </main>

            <style jsx>{`
                .product-image-container {
                    width: 56px; 
                    height: 56px; 
                    border-radius: 14px; 
                    overflow: hidden; 
                    background-color: #F3F4F6; 
                    border: 1px solid var(--border-medium); 
                    flex-shrink: 0;
                }
                .hover-row:hover {
                    background-color: #FAFBFC;
                }
                .cat-badge {
                    padding: 6px 14px;
                    border-radius: 10px;
                    background-color: #F3F4F6;
                    color: #4B5563;
                    font-size: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.02em;
                }
                .status-indicator {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--primary-dark);
                    font-size: 13px;
                    font-weight: 700;
                    background-color: var(--primary-light);
                    padding: 4px 12px;
                    border-radius: 20px;
                }
                .status-indicator .dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background-color: var(--primary);
                }
                .action-circle-btn {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid var(--border-medium);
                    background-color: white;
                    color: var(--text-muted);
                    font-size: 14px;
                    transition: 0.2s;
                }
                .action-circle-btn:hover {
                    transform: scale(1.1);
                    box-shadow: var(--shadow-md);
                }
                .action-circle-btn.edit:hover {
                    border-color: var(--primary);
                    color: var(--primary);
                }
                .action-circle-btn.delete:hover {
                    border-color: #EF4444;
                    color: #EF4444;
                }
            `}</style>

            {/* Premium Product Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(17, 24, 39, 0.7)', zIndex: 9999, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', padding: '20px',
                    backdropFilter: 'blur(8px)'
                }} className="animate-fade-in">
                    <div style={{
                        backgroundColor: 'white', maxWidth: '650px', width: '100%', 
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
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <p className="text-muted fw-500">Provide the essential details to list your product.</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row g-24">
                                <div className="col-12">
                                    <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Product Identity</label>
                                    <input name="name" type="text" required defaultValue={editingProduct?.name} 
                                        className="form-control px-20 py-14"
                                        style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }}
                                        placeholder="e.g. Organic Brown Eggs" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Category</label>
                                    <input name="category" type="text" required defaultValue={editingProduct?.category}
                                        className="form-control px-20 py-14"
                                        style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }}
                                        placeholder="e.g. Groceries" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Price Unit (₹)</label>
                                    <input name="price" type="number" step="0.01" required defaultValue={editingProduct?.price}
                                        className="form-control px-20 py-14"
                                        style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }}
                                        placeholder="0.00" />
                                </div>
                                <div className="col-12">
                                    <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Product Visuals</label>
                                    
                                    <div className="d-flex gap-8 mb-16 p-6 bg-light rounded-12 w-fit-content" style={{ backgroundColor: '#F3F4F6' }}>
                                        <button type="button" 
                                            onClick={() => setSourceType('url')}
                                            className={`btn btn-sm px-20 py-8 border-0 fw-700 ${sourceType === 'url' ? 'bg-white shadow-sm text-success' : 'text-muted'}`}
                                            style={{ borderRadius: '8px', fontSize: '12px' }}>Image URL</button>
                                        <button type="button" 
                                            onClick={() => setSourceType('upload')}
                                            className={`btn btn-sm px-20 py-8 border-0 fw-700 ${sourceType === 'upload' ? 'bg-white shadow-sm text-success' : 'text-muted'}`}
                                            style={{ borderRadius: '8px', fontSize: '12px' }}>Local Upload</button>
                                    </div>

                                    {sourceType === 'url' ? (
                                        <input name="image" type="text" defaultValue={editingProduct?.image}
                                            className="form-control px-20 py-14"
                                            style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }} 
                                            placeholder="https://example.com/image.jpg" />
                                    ) : (
                                        <div className="upload-zone p-32 text-center" style={{
                                            border: '2px dashed var(--border-medium)', borderRadius: 'var(--radius-lg)',
                                            backgroundColor: '#F9FAFB', position: 'relative', transition: '0.3s'
                                        }}>
                                            <input name="file" type="file" accept="image/*" 
                                                style={{position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%'}} 
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) setPreviewUrl(URL.createObjectURL(file));
                                                }}
                                            />
                                            {previewUrl ? (
                                                <img src={previewUrl} alt="Preview" style={{maxHeight: '120px', borderRadius: '12px', boxShadow: 'var(--shadow-md)'}} />
                                            ) : (
                                                <div>
                                                    <i className="fas fa-cloud-arrow-up mb-12 text-muted" style={{fontSize: '32px'}}></i>
                                                    <p className="mb-0 small fw-600 text-muted">Drop image or <span className="text-success">browse files</span></p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="col-12">
                                    <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Description</label>
                                    <textarea name="description" rows="3" defaultValue={editingProduct?.description}
                                        className="form-control px-20 py-14"
                                        style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px', resize: 'none' }}
                                        placeholder="Add a short description..."></textarea>
                                </div>
                            </div>
                            
                            <div className="d-flex gap-16 mt-40">
                                <button type="submit" className="rr-btn flex-grow-1 py-16" style={{borderRadius: '14px', fontSize: '16px', fontWeight: '800'}}>
                                    {editingProduct ? 'Save Changes' : 'Create Product'}
                                </button>
                                <button type="button" onClick={() => setIsModalOpen(false)} 
                                    className="btn btn-white px-28"
                                    style={{borderRadius: '14px', fontWeight: '700', border: '1px solid var(--border-medium)', color: 'var(--text-muted)'}}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
