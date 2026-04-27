import Sidebar from '@/components/Sidebar';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import AdminHeader from '@/components/AdminHeader';

export const dynamic = "force-dynamic";

export default async function StoreDetails({ params }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const store = await prisma.store.findUnique({
        where: { id },
        include: {
            products: {
                where: { isDeleted: false }
            }
        }
    });

    if (!store) {
        return (
            <div className="p-40 text-center">
                <div className="container">
                    <h2 className="mb-20">Store not found</h2>
                    <Link href="/dashboard/admin" className="rr-btn">
                        <i className="fas fa-arrow-left me-2"></i> Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const owner = await prisma.user.findFirst({
        where: { storeId: id, role: 'OWNER' }
    });

    const menuItems = [
        { name: 'Overview', icon: 'fas fa-chart-line', link: '/dashboard/admin' },
        { name: 'Logout', icon: 'fas fa-sign-out-alt', link: '/logout' },
    ];

    return (
        <div style={{ display: 'flex', backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
            <Sidebar items={menuItems} activeItem="Overview" />
            
            <div className="admin-main-content w-100">
                <div className="container-fluid" style={{ padding: '30px' }}>
                    
                    <AdminHeader title={`Details: ${store.name}`} />

                    <div className="mb-30">
                        <Link href="/dashboard/admin" className="text-secondary d-inline-flex align-items-center gap-2" style={{ textDecoration: 'none', fontSize: '14px' }}>
                            <i className="fas fa-arrow-left"></i> Back to Dashboard
                        </Link>
                    </div>

                    <div className="row g-4">
                        <div className="col-xl-4 col-lg-5">
                            <div className="card shadow-sm border-0 border-radius-16 mb-4">
                                <div className="card-header bg-white py-20 px-30 border-0">
                                    <h5 className="mb-0 fw-bold text-success">Business Profile</h5>
                                </div>
                                <div className="card-body p-30 pt-0">
                                    <div className="d-flex flex-column gap-3">
                                        <div>
                                            <label className="text-muted small fw-bold text-uppercase d-block mb-1">Owner</label>
                                            <p className="mb-0 fw-bold">{owner ? owner.email.split('@')[0].toUpperCase() : 'N/A'}</p>
                                        </div>
                                        <div>
                                            <label className="text-muted small fw-bold text-uppercase d-block mb-1">Email</label>
                                            <p className="mb-0 fw-bold">{owner?.email || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <label className="text-muted small fw-bold text-uppercase d-block mb-1">Phone</label>
                                            <p className="mb-0 fw-bold">{store.phone}</p>
                                        </div>
                                        <div>
                                            <label className="text-muted small fw-bold text-uppercase d-block mb-1">Status</label>
                                            <span className={`badge ${store.status === 'PENDING' ? 'bg-warning text-dark' : 'bg-success'}`}>
                                                {store.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card shadow-sm border-0 border-radius-16">
                                <div className="card-header bg-white py-20 px-30 border-0">
                                    <h5 className="mb-0 fw-bold text-success">Store Location</h5>
                                </div>
                                <div className="card-body p-30 pt-0">
                                    <div className="d-flex flex-column gap-3">
                                        <div>
                                            <label className="text-muted small fw-bold text-uppercase d-block mb-1">Address</label>
                                            <p className="mb-0 fw-bold">{store.address || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <label className="text-muted small fw-bold text-uppercase d-block mb-1">City/State/Pin</label>
                                            <p className="mb-0 fw-bold">{store.city}, {store.state} - {store.pincode}</p>
                                        </div>
                                        {store.latitude && (
                                            <div>
                                                <label className="text-muted small fw-bold text-uppercase d-block mb-1">Coordinates</label>
                                                <p className="mb-0 fw-bold">{store.latitude}, {store.longitude}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-8 col-lg-7">
                            <div className="card shadow-sm border-0 border-radius-16 mb-4">
                                <div className="card-header bg-white py-20 px-30 border-0">
                                    <h5 className="mb-0 fw-bold text-success">Verification Documents</h5>
                                </div>
                                <div className="card-body p-30 pt-0">
                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <label className="text-muted small fw-bold text-uppercase d-block mb-2">Business Type</label>
                                            <p className="mb-0 fw-bold bg-light p-2 px-3 rounded">{store.businessType}</p>
                                        </div>
                                        <div className="col-sm-6">
                                            <label className="text-muted small fw-bold text-uppercase d-block mb-2">License Type</label>
                                            <p className="mb-0 fw-bold bg-light p-2 px-3 rounded">{store.licenseType}</p>
                                        </div>
                                         <div className="col-md-3 col-6">
                                             <label className="text-muted small fw-bold text-uppercase d-block mb-2">Business Proof</label>
                                             <div className="doc-preview bg-light rounded d-flex align-items-center justify-content-center overflow-hidden" style={{height: '120px', border: '1px solid #eee'}}>
                                                 {store.businessProofUrl ? (
                                                     <a href={store.businessProofUrl} target="_blank" rel="noopener noreferrer">
                                                         <img src={store.businessProofUrl} alt="Business Proof" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                                     </a>
                                                 ) : <span className="text-muted small">N/A</span>}
                                             </div>
                                         </div>
                                         <div className="col-md-3 col-6">
                                             <label className="text-muted small fw-bold text-uppercase d-block mb-2">Shop Front</label>
                                             <div className="doc-preview bg-light rounded d-flex align-items-center justify-content-center overflow-hidden" style={{height: '120px', border: '1px solid #eee'}}>
                                                 {store.shopFrontUrl ? (
                                                     <a href={store.shopFrontUrl} target="_blank" rel="noopener noreferrer">
                                                         <img src={store.shopFrontUrl} alt="Shop Front" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                                     </a>
                                                 ) : <span className="text-muted small">N/A</span>}
                                             </div>
                                         </div>
                                         <div className="col-md-3 col-6">
                                             <label className="text-muted small fw-bold text-uppercase d-block mb-2">Shop Interior</label>
                                             <div className="doc-preview bg-light rounded d-flex align-items-center justify-content-center overflow-hidden" style={{height: '120px', border: '1px solid #eee'}}>
                                                 {store.shopInteriorUrl ? (
                                                     <a href={store.shopInteriorUrl} target="_blank" rel="noopener noreferrer">
                                                         <img src={store.shopInteriorUrl} alt="Shop Interior" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                                     </a>
                                                 ) : <span className="text-muted small">N/A</span>}
                                             </div>
                                         </div>
                                         <div className="col-md-3 col-6">
                                             <label className="text-muted small fw-bold text-uppercase d-block mb-2">Owner ID</label>
                                             <div className="doc-preview bg-light rounded d-flex align-items-center justify-content-center overflow-hidden" style={{height: '120px', border: '1px solid #eee'}}>
                                                 {store.ownerIdProofUrl ? (
                                                     <a href={store.ownerIdProofUrl} target="_blank" rel="noopener noreferrer">
                                                         <img src={store.ownerIdProofUrl} alt="Owner ID" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                                     </a>
                                                 ) : <span className="text-muted small">N/A</span>}
                                             </div>
                                         </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card shadow-sm border-0 border-radius-16 overflow-hidden">
                                <div className="card-header bg-white py-20 px-30 border-0 d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0 fw-bold text-success">Product Catalog</h5>
                                    <span className="badge bg-light text-dark">{store.products.length} Items</span>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table table-hover align-middle mb-0">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th className="px-30 border-0">Product</th>
                                                    <th className="border-0 text-end pe-30">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {store.products.map((product) => (
                                                    <tr key={product.id}>
                                                        <td className="px-30 py-15">
                                                            <div className="d-flex align-items-center gap-3">
                                                                <div style={{width: '40px', height: '40px', borderRadius: '8px', backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundColor: '#eee'}}></div>
                                                                <span className="fw-bold">{product.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="text-end pe-30 fw-bold">₹{product.price}</td>
                                                    </tr>
                                                ))}
                                                {store.products.length === 0 && (
                                                    <tr>
                                                        <td colSpan="2" className="text-center py-40 text-muted">No products listed by this store</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
