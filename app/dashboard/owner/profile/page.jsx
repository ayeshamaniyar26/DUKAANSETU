'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { getStoreSettings, updateSettings } from './actions';
import Swal from 'sweetalert2';

export default function ProfilePage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('shop'); // 'shop' or 'account'

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
        const res = await getStoreSettings();
        setData(res);
        setLoading(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        const formData = new FormData(e.target);
        formData.append('storeId', data.store.id);
        formData.append('userId', data.user.id);

        const res = await updateSettings(formData);
        if (res.success) {
            Swal.fire({
                title: 'Success!',
                text: 'Your profile and shop settings have been updated.',
                icon: 'success',
                confirmButtonColor: '#2E7D32'
            });
            fetchData();
        } else {
            Swal.fire('Error', res.error, 'error');
        }
        setSaving(false);
    }

    if (loading) return (
        <div style={{ display: 'flex', backgroundColor: '#F8FFF8', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <div className="text-muted fw-500">Loading your profile...</div>
        </div>
    );

    return (
        <div style={{ display: 'flex', backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <Sidebar items={menuItems} activeItem="Profile" />
            
            <main style={{ marginLeft: '280px', flexGrow: 1, width: 'calc(100% - 280px)', minHeight: '100vh' }}>
                {/* Page Header */}
                <header style={{ padding: '40px 48px 32px 48px' }}>
                    <div className="mb-32">
                        <h1 className="fw-bold mb-8" style={{ fontSize: '32px', color: '#111827', letterSpacing: '-0.025em' }}>Store Profile</h1>
                        <p className="text-muted mb-0" style={{ fontSize: '16px', maxWidth: '800px' }}>Manage your store's public identity, business details, and security credentials in one place.</p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="d-flex gap-8 p-6 bg-white shadow-sm" style={{ borderRadius: '14px', border: '1px solid #F3F4F6', width: 'fit-content' }}>
                        <button 
                            onClick={() => setActiveTab('shop')}
                            className={`px-24 py-12 border-0 d-flex align-items-center gap-12 ${activeTab === 'shop' ? 'text-success' : 'text-muted'}`}
                            style={{ borderRadius: '10px', fontWeight: '600', transition: '0.2s', backgroundColor: activeTab === 'shop' ? '#F0FDF4' : 'transparent', fontSize: '14px' }}
                        >
                            <i className="fas fa-store"></i> 
                            <span>Store Identity</span>
                        </button>
                        <button 
                            onClick={() => setActiveTab('account')}
                            className={`px-24 py-12 border-0 d-flex align-items-center gap-12 ${activeTab === 'account' ? 'text-success' : 'text-muted'}`}
                            style={{ borderRadius: '10px', fontWeight: '600', transition: '0.2s', backgroundColor: activeTab === 'account' ? '#F0FDF4' : 'transparent', fontSize: '14px' }}
                        >
                            <i className="fas fa-shield-alt"></i> 
                            <span>Security & Login</span>
                        </button>
                    </div>
                </header>

                {/* Main Content Area */}
                <div style={{ padding: '0 48px 48px 48px' }}>
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="storeId" value={data.store.id} />
                        <input type="hidden" name="userId" value={data.user?.id || ''} />

                        {activeTab === 'shop' ? (
                            <div className="animate-fade-in d-flex flex-column gap-32">
                                {/* Section 1: Business Details */}
                                <div className="bg-white shadow-sm" style={{ borderRadius: '16px', border: '1px solid #F3F4F6', padding: '32px' }}>
                                    <div className="d-flex align-items-center gap-12 mb-32">
                                        <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', fontSize: '12px', fontWeight: 'bold' }}>1</div>
                                        <h4 className="fw-bold mb-0" style={{ fontSize: '18px', color: '#111827' }}>Business Details</h4>
                                    </div>
                                    
                                    <div className="row g-24">
                                        <div className="col-lg-4 col-md-6">
                                            <label className="auth-label">Shop Name</label>
                                            <input name="shopName" type="text" defaultValue={data.store.name} required className="form-control auth-input-clean" placeholder="Enter shop name" />
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <label className="auth-label">Store Handle (URL Slug)</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '10px 0 0 10px', fontSize: '13px', color: '#6B7280' }}>/shop/</span>
                                                <input name="slug" type="text" defaultValue={data.store.slug} required className="form-control auth-input-clean" style={{ borderRadius: '0 10px 10px 0' }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <label className="auth-label">Primary Category</label>
                                            <select name="category" defaultValue={data.store.category} className="form-select auth-input-clean">
                                                <option value="Kirana/Grocery">Kirana/Grocery</option>
                                                <option value="Medical/Pharmacy">Medical/Pharmacy</option>
                                                <option value="Restaurant/Cafe">Restaurant/Cafe</option>
                                                <option value="Clothing/Apparel">Clothing/Apparel</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <label className="auth-label">Business Structure</label>
                                            <input name="businessType" type="text" defaultValue={data.store.businessType} className="form-control auth-input-clean" placeholder="e.g. Proprietorship" />
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <label className="auth-label">GST/License Number</label>
                                            <input name="licenseType" type="text" defaultValue={data.store.licenseType} className="form-control auth-input-clean" placeholder="Registration ID" />
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <label className="auth-label">Business Helpline</label>
                                            <input name="shopPhone" type="text" defaultValue={data.store.phone} className="form-control auth-input-clean" placeholder="+91 XXX XXX XXXX" />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Address */}
                                <div className="bg-white shadow-sm" style={{ borderRadius: '16px', border: '1px solid #F3F4F6', padding: '32px' }}>
                                    <div className="d-flex align-items-center gap-12 mb-32">
                                        <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', fontSize: '12px', fontWeight: 'bold' }}>2</div>
                                        <h4 className="fw-bold mb-0" style={{ fontSize: '18px', color: '#111827' }}>Location & Fulfillment</h4>
                                    </div>
                                    <div className="row g-24">
                                        <div className="col-12">
                                            <label className="auth-label">Complete Physical Address</label>
                                            <textarea name="address" rows="3" defaultValue={data.store.address} className="form-control auth-input-clean" style={{ minHeight: '100px', padding: '16px' }}></textarea>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="auth-label">City</label>
                                            <input name="city" type="text" defaultValue={data.store.city} className="form-control auth-input-clean" />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="auth-label">State / Region</label>
                                            <input name="state" type="text" defaultValue={data.store.state} className="form-control auth-input-clean" />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="auth-label">Zip / Postal Code</label>
                                            <input name="pincode" type="text" defaultValue={data.store.pincode} className="form-control auth-input-clean" />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Documents */}
                                <div className="bg-white shadow-sm" style={{ borderRadius: '16px', border: '1px solid #F3F4F6', padding: '32px' }}>
                                    <div className="d-flex align-items-center gap-12 mb-32">
                                        <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', fontSize: '12px', fontWeight: 'bold' }}>3</div>
                                        <h4 className="fw-bold mb-0" style={{ fontSize: '18px', color: '#111827' }}>Verification Proofs</h4>
                                    </div>
                                    <div className="row g-24">
                                        {[
                                            { label: 'Trade License', key: 'businessProofUrl', name: 'businessProof', icon: 'fa-file-invoice' },
                                            { label: 'Shop Entrance', key: 'shopFrontUrl', name: 'shopFront', icon: 'fa-store-alt' },
                                            { label: 'Store Interior', key: 'shopInteriorUrl', name: 'shopInterior', icon: 'fa-couch' },
                                            { label: 'Aadhar/PAN Card', key: 'ownerIdProofUrl', name: 'ownerIdProof', icon: 'fa-id-card' }
                                        ].map((doc) => (
                                            <div className="col-xl-3 col-md-6" key={doc.key}>
                                                <div className="document-card text-center p-24" style={{ border: '2px dashed #E5E7EB', borderRadius: '14px', transition: '0.3s', backgroundColor: '#F9FAFB' }}>
                                                    <div className="mb-16">
                                                        <i className={`fas ${doc.icon} text-success opacity-75 fa-2x`}></i>
                                                    </div>
                                                    <div className="small fw-bold mb-4 text-dark">{doc.label}</div>
                                                    <div className="text-muted x-small text-truncate px-10 mb-20" style={{ maxWidth: '100%' }}>
                                                        {data.store[doc.key] || 'No file selected'}
                                                    </div>
                                                    <label className="btn btn-white btn-sm px-20 border shadow-sm w-100" style={{ borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                                                        <i className="fas fa-upload me-6"></i> Update
                                                        <input type="file" name={doc.name} className="d-none" />
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="animate-fade-in d-flex flex-column gap-32">
                                {/* Account Card */}
                                <div className="bg-white shadow-sm" style={{ borderRadius: '16px', border: '1px solid #F3F4F6', padding: '32px' }}>
                                    <div className="d-flex align-items-center gap-12 mb-32">
                                        <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', fontSize: '12px', fontWeight: 'bold' }}>1</div>
                                        <h4 className="fw-bold mb-0" style={{ fontSize: '18px', color: '#111827' }}>Owner Credentials</h4>
                                    </div>
                                    <div className="row g-24 mb-32">
                                        <div className="col-md-6">
                                            <label className="auth-label">Owner First Name</label>
                                            <input name="firstName" type="text" defaultValue={data.user?.firstName || ''} required className="form-control auth-input-clean" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="auth-label">Owner Last Name</label>
                                            <input name="lastName" type="text" defaultValue={data.user?.lastName || ''} required className="form-control auth-input-clean" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="auth-label">Email Address (Login ID)</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0"><i className="far fa-envelope text-muted"></i></span>
                                                <input name="email" type="email" defaultValue={data.user?.email || ''} required className="form-control auth-input-clean" style={{ borderRadius: '0 10px 10px 0' }} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="auth-label">Update Login Password</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0"><i className="fas fa-lock text-muted"></i></span>
                                                <input name="password" type="password" className="form-control auth-input-clean" style={{ borderRadius: '0 10px 10px 0' }} placeholder="Minimum 8 characters" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-24 rounded-14 border-0 d-flex gap-16 align-items-start" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FEF3C7 !important' }}>
                                        <i className="fas fa-exclamation-triangle text-warning mt-4 fa-lg"></i>
                                        <div>
                                            <h6 className="fw-bold mb-4 text-warning-emphasis" style={{ fontSize: '14px' }}>Security Session Warning</h6>
                                            <p className="mb-0 small text-warning-emphasis" style={{ opacity: '0.8' }}>Modifying your email or password will immediately invalidate all active sessions. You will need to log back in to all devices using your new credentials.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sticky Action Footer */}
                        <div className="d-flex justify-content-end align-items-center gap-16 mt-40 pb-40">
                            <button type="button" onClick={() => fetchData()} className="btn btn-white px-32 py-14 shadow-sm" style={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontWeight: '600', color: '#4B5563', fontSize: '15px' }}>
                                Cancel & Discard
                            </button>
                            <button type="submit" disabled={saving} className="rr-btn px-48 py-14 shadow-md" style={{ borderRadius: '12px', fontSize: '16px', fontWeight: '700', minWidth: '220px' }}>
                                {saving ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-10" role="status" aria-hidden="true"></span>
                                        Saving Changes...
                                    </>
                                ) : 'Sync Profile Updates'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <style jsx>{`
                .auth-label {
                    display: block;
                    font-size: 13px;
                    font-weight: 600;
                    color: #4B5563;
                    margin-bottom: 8px;
                    letter-spacing: 0.01em;
                }
                .auth-input-clean {
                    height: 48px;
                    border-radius: 10px;
                    border: 1px solid #E5E7EB;
                    background-color: #fff;
                    padding: 0 16px;
                    font-size: 15px;
                    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .auth-input-clean:focus {
                    border-color: #10B981;
                    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
                    outline: none;
                }
                .document-card:hover {
                    border-color: #10B981 !important;
                    background-color: #F0FDF4 !important;
                    transform: translateY(-4px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
                }
                .animate-fade-in {
                    animation: profileFadeIn 0.4s ease-out forwards;
                }
                @keyframes profileFadeIn {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @media (max-width: 1200px) {
                    .col-lg-4 { width: 50% !important; }
                }
                @media (max-width: 768px) {
                    .col-lg-4 { width: 100% !important; }
                    main { margin-left: 0 !important; width: 100% !important; }
                }
            `}</style>
        </div>
    );
}
