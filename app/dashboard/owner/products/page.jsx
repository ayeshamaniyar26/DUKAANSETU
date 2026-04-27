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
    }, [currentPage]);

    async function fetchProducts() {
        setLoading(true);
        const { products, total } = await getProducts(currentPage, pageSize);
        setProducts(products);
        setTotal(total);
        setLoading(false);
    }

    const handleExport = async () => {
        const allProducts = await getAllProductsForExport();
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

        if (editingProduct) {
            formData.append('id', editingProduct.id);
            await updateProduct(formData);
        } else {
            await createProduct(formData);
        }
        
        setIsModalOpen(false);
        setEditingProduct(null);
        setPreviewUrl(null);
        fetchProducts();
        Swal.fire('Success', editingProduct ? 'Product updated' : 'Product created', 'success');
    };

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div style={{ display: 'flex', backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <Sidebar items={menuItems} activeItem="Products" />
            
            <main style={{ marginLeft: '280px', flexGrow: 1, width: 'calc(100% - 280px)', minHeight: '100vh' }}>
                {/* Page Header */}
                <header style={{ padding: '40px 48px 32px 48px' }}>
                    <div className="d-flex justify-content-between align-items-end">
                        <div>
                            <h1 className="fw-bold mb-8" style={{ fontSize: '32px', color: '#111827', letterSpacing: '-0.025em' }}>Inventory Management</h1>
                            <p className="text-muted mb-0" style={{ fontSize: '16px' }}>Manage your store catalog, import products in bulk, or export your inventory.</p>
                        </div>
                        <div className="d-flex gap-12">
                            <button className="btn btn-white shadow-sm border-0 px-20 py-12" onClick={handleExport} 
                                style={{ borderRadius: '12px', fontWeight: '600', backgroundColor: '#fff', fontSize: '14px', border: '1px solid #E5E7EB !important' }}>
                                <i className="fas fa-file-export me-8 text-success"></i> Export Data
                            </button>
                            <label className="btn btn-white shadow-sm border-0 px-20 py-12 mb-0 d-flex align-items-center" 
                                style={{ borderRadius: '12px', fontWeight: '600', backgroundColor: '#fff', fontSize: '14px', border: '1px solid #E5E7EB !important', cursor: 'pointer' }}>
                                <i className="fas fa-file-import me-8 text-primary"></i> Import CSV
                                <input type="file" accept=".csv" className="d-none" onChange={handleImport} />
                            </label>
                            <button className="rr-btn px-24 py-12" style={{ borderRadius: '12px', fontSize: '14px', fontWeight: '600' }} onClick={() => { 
                                setEditingProduct(null); 
                                setSourceType('url');
                                setPreviewUrl(null);
                                setIsModalOpen(true); 
                            }}>
                                <i className="fas fa-plus me-8"></i> Add Product
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <div style={{ padding: '0 48px 48px 48px' }}>
                    <div className="bg-white shadow-sm" style={{ borderRadius: '16px', border: '1px solid #F3F4F6', overflow: 'hidden' }}>
                        {loading ? (
                            <div className="p-48 text-center">
                                <div className="spinner-border text-success mb-16" role="status"></div>
                                <p className="text-muted mb-0">Loading your inventory...</p>
                            </div>
                        ) : (
                            <>
                                <div className="table-responsive">
                                    <table className="table align-middle mb-0">
                                        <thead style={{ backgroundColor: '#F9FAFB' }}>
                                            <tr>
                                                <th className="ps-32 py-16 text-uppercase small fw-bold text-muted" style={{ letterSpacing: '0.05em' }}>Product</th>
                                                <th className="py-16 text-uppercase small fw-bold text-muted" style={{ letterSpacing: '0.05em' }}>Category</th>
                                                <th className="py-16 text-uppercase small fw-bold text-muted" style={{ letterSpacing: '0.05em' }}>Price</th>
                                                <th className="py-16 text-uppercase small fw-bold text-muted" style={{ letterSpacing: '0.05em' }}>Status</th>
                                                <th className="py-16 text-uppercase small fw-bold text-muted" style={{ letterSpacing: '0.05em' }}>Created</th>
                                                <th className="pe-32 py-16 text-uppercase small fw-bold text-muted text-end" style={{ letterSpacing: '0.05em' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="border-top-0">
                                            {products.map((product) => (
                                                <tr key={product.id} style={{ transition: '0.2s' }} className="hover-bg-light">
                                                    <td className="ps-32 py-20">
                                                        <div className="d-flex align-items-center gap-16">
                                                            <div style={{ width: '48px', height: '48px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#F3F4F6', border: '1px solid #E5E7EB', flexShrink: 0 }}>
                                                                <img src={product.image || '/assets/imgs/what-we-do/what-we-do__item-1.png'} 
                                                                    alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                            </div>
                                                            <div>
                                                                <div className="fw-bold text-dark" style={{ fontSize: '15px' }}>{product.name}</div>
                                                                <div className="text-muted small">ID: {product.id.slice(-6).toUpperCase()}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-20">
                                                        <span className="px-12 py-4 rounded-pill small fw-600" style={{ backgroundColor: '#F3F4F6', color: '#374151' }}>
                                                            {product.category}
                                                        </span>
                                                    </td>
                                                    <td className="py-20 fw-bold text-dark">₹{product.price.toLocaleString()}</td>
                                                    <td className="py-20">
                                                        <span className="d-flex align-items-center gap-6 text-success small fw-600">
                                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
                                                            Active
                                                        </span>
                                                    </td>
                                                    <td className="py-20 text-muted small">{new Date(product.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                                    <td className="pe-32 py-20 text-end">
                                                        <div className="d-flex justify-content-end gap-8">
                                                            <button className="btn btn-icon-hover p-8" onClick={() => handleEdit(product)} title="Edit Product">
                                                                <i className="far fa-edit text-primary"></i>
                                                            </button>
                                                            <button className="btn btn-icon-hover p-8" onClick={() => handleDelete(product.id)} title="Delete Product">
                                                                <i className="far fa-trash-alt text-danger"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {products.length === 0 && (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-64">
                                                        <i className="fas fa-box-open fa-3x text-light mb-16"></i>
                                                        <p className="text-muted">No products found. Start by adding your first product!</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="px-32 py-24 d-flex justify-content-between align-items-center border-top bg-light-soft">
                                        <div className="text-muted small fw-500">
                                            Showing <span className="text-dark">{(currentPage - 1) * pageSize + 1}</span> to <span className="text-dark">{Math.min(currentPage * pageSize, total)}</span> of <span className="text-dark">{total}</span> products
                                        </div>
                                        <div className="d-flex gap-8">
                                            <button 
                                                className="btn btn-white shadow-sm border px-16 py-8 small fw-600"
                                                style={{ borderRadius: '10px' }}
                                                disabled={currentPage === 1}
                                                onClick={() => setCurrentPage(prev => prev - 1)}
                                            >
                                                Previous
                                            </button>
                                            <button 
                                                className="btn btn-white shadow-sm border px-16 py-8 small fw-600"
                                                style={{ borderRadius: '10px' }}
                                                disabled={currentPage === totalPages}
                                                onClick={() => setCurrentPage(prev => prev + 1)}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>

            <style jsx>{`
                .btn-icon-hover {
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    background: transparent;
                    border: none;
                    transition: 0.2s;
                }
                .btn-icon-hover:hover {
                    background: #F3F4F6;
                }
                .hover-bg-light:hover {
                    background-color: #F9FAFB;
                }
                .bg-light-soft {
                    background-color: #FAFBFC;
                }
            `}</style>
            {/* Product Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex',
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
                    padding: '60px 20px', overflowY: 'auto'
                }}>
                    <div style={{
                        backgroundColor: 'white', maxWidth: '650px', width: '100%', 
                        borderRadius: '15px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        position: 'relative'
                    }}>
                        <button onClick={() => setIsModalOpen(false)} style={{
                            position: 'absolute', top: '20px', right: '20px', border: 'none', 
                            background: '#f5f5f5', width: '35px', height: '35px', borderRadius: '50%',
                            fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>&times;</button>

                        <h2 className="mb-30" style={{fontSize: '24px', fontWeight: '700', color: '#15181B'}}>
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12 mb-20">
                                    <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#4b5563'}}>Product Name</label>
                                    <input name="name" type="text" required defaultValue={editingProduct?.name} 
                                        style={{width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f9fafb', outline: 'none'}} />
                                </div>
                                <div className="col-md-6 mb-20">
                                    <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#4b5563'}}>Category</label>
                                    <input name="category" type="text" required defaultValue={editingProduct?.category}
                                        style={{width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f9fafb'}} placeholder="e.g. Snacks" />
                                </div>
                                <div className="col-md-6 mb-20">
                                    <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#4b5563'}}>Price (₹)</label>
                                    <input name="price" type="number" step="0.01" required defaultValue={editingProduct?.price}
                                        style={{width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f9fafb'}} />
                                </div>
                                <div className="col-md-12 mb-20">
                                    <label style={{display: 'block', marginBottom: '15px', fontSize: '14px', fontWeight: '600', color: '#4b5563'}}>
                                        Product Image
                                    </label>
                                    
                                    <div style={{display: 'flex', gap: '10px', marginBottom: '15px'}}>
                                        <button type="button" 
                                            onClick={() => setSourceType('url')}
                                            style={{
                                                padding: '8px 15px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer',
                                                border: '1px solid #e2e8f0',
                                                backgroundColor: sourceType === 'url' ? '#2E7D32' : 'white',
                                                color: sourceType === 'url' ? 'white' : '#64748b',
                                                fontWeight: '600'
                                            }}>Image URL</button>
                                        <button type="button" 
                                            onClick={() => setSourceType('upload')}
                                            style={{
                                                padding: '8px 15px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer',
                                                border: '1px solid #e2e8f0',
                                                backgroundColor: sourceType === 'upload' ? '#2E7D32' : 'white',
                                                color: sourceType === 'upload' ? 'white' : '#64748b',
                                                fontWeight: '600'
                                            }}>Upload File</button>
                                    </div>

                                    {sourceType === 'url' ? (
                                        <input name="image" type="text" defaultValue={editingProduct?.image}
                                            style={{width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f9fafb'}} placeholder="Link to product image (HTTPS)" />
                                    ) : (
                                        <div style={{
                                            border: '2px dashed #e2e8f0', borderRadius: '10px', padding: '20px', textAlign: 'center',
                                            backgroundColor: '#f9fafb', position: 'relative'
                                        }}>
                                            <input name="file" type="file" accept="image/*" 
                                                style={{position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%'}} 
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) setPreviewUrl(URL.createObjectURL(file));
                                                }}
                                            />
                                            {previewUrl ? (
                                                <img src={previewUrl} alt="Preview" style={{maxHeight: '150px', borderRadius: '8px'}} />
                                            ) : (
                                                <div>
                                                    <i className="fas fa-cloud-upload-alt mb-10" style={{fontSize: '30px', color: '#64748b'}}></i>
                                                    <p style={{fontSize: '14px', color: '#64748b', margin: 0}}>Click or drag to upload image</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-12 mb-30">
                                    <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#4b5563'}}>Description</label>
                                    <textarea name="description" rows="3" defaultValue={editingProduct?.description}
                                        style={{width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f9fafb', minHeight: '100px'}}></textarea>
                                </div>
                            </div>
                            
                            <div className="d-flex gap-15 mt-10">
                                <button type="submit" className="rr-btn flex-grow-1" style={{padding: '15px', borderRadius: '10px', fontSize: '16px'}}>
                                    {editingProduct ? 'Update Product' : 'Create Product'}
                                </button>
                                <button type="button" onClick={() => setIsModalOpen(false)} 
                                    style={{padding: '15px 25px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: 'transparent', color: '#64748b', fontWeight: '600'}}>
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
