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
        const storeId = localStorage.getItem('storeId');
        const res = await getStoreSettings(storeId);
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
        <div style={{ display: 'flex', backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
            <Sidebar items={menuItems} activeItem="Profile" />
            
            <main style={{ marginLeft: '280px', flexGrow: 1, width: 'calc(100% - 280px)', minHeight: '100vh' }}>
                {/* Page Header */}
                <header style={{ padding: '60px 48px 32px 48px' }} className="animate-fade-in">
                    <div className="mb-40">
                        <h1 className="fw-bold mb-8" style={{ fontSize: '36px', color: 'var(--text-main)', letterSpacing: '-0.04em' }}>Profile & Settings</h1>
                        <p className="text-muted mb-0" style={{ fontSize: '16px', fontWeight: '500' }}>Manage your business identity, store location, and security settings.</p>
                    </div>

                    {/* Modern Tabs */}
                    <div className="d-flex gap-12 p-8 bg-white shadow-sm" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-medium)', width: 'fit-content' }}>
                        {[
                            { id: 'shop', label: 'Shop Details', icon: 'fa-store' },
                            { id: 'account', label: 'Account Security', icon: 'fa-shield-halved' }
                        ].map(tab => (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`btn px-24 py-12 d-flex align-items-center gap-12 border-0 fw-800 text-uppercase`}
                                style={{ 
                                    borderRadius: '12px', 
                                    fontSize: '12px',
                                    backgroundColor: activeTab === tab.id ? 'var(--primary-light)' : 'transparent',
                                    color: activeTab === tab.id ? 'var(--primary-dark)' : 'var(--text-muted)',
                                    transition: '0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                <i className={`fas ${tab.icon} fa-lg`}></i> 
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </header>

                <div style={{ padding: '0 48px 48px 48px' }} className="animate-fade-in">
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="storeId" value={data.store.id} />
                        <input type="hidden" name="userId" value={data.user?.id || ''} />

                        {activeTab === 'shop' ? (
                            <div className="d-flex flex-column gap-32">
                                {/* Section 1: Business Details */}
                                <div className="ds-card p-40 border-0 shadow-md">
                                    <div className="d-flex align-items-center gap-16 mb-40 border-bottom pb-20">
                                        <div className="rounded-12 d-flex align-items-center justify-content-center bg-light text-primary" style={{ width: '40px', height: '40px' }}>
                                            <i className="fas fa-briefcase"></i>
                                        </div>
                                        <h4 className="fw-900 mb-0" style={{ fontSize: '20px', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>Business Identity</h4>
                                    </div>
                                    
                                    <div className="row g-32">
                                        <div className="col-lg-4 col-md-6">
                                            <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Store Name</label>
                                            <input name="shopName" type="text" defaultValue={data.store.name} required className="form-control px-20 py-14" 
                                                style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }} />
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Store Handle</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-0 fw-700" style={{ borderRadius: '12px 0 0 12px', fontSize: '13px' }}>/shop/</span>
                                                <input name="slug" type="text" defaultValue={data.store.slug} required className="form-control px-20 py-14 border-0" 
                                                    style={{ backgroundColor: '#F3F4F6', fontSize: '15px', borderRadius: '0 12px 12px 0', fontWeight: '600' }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Business Category</label>
                                            <select name="category" defaultValue={data.store.category} className="form-select px-20 py-14"
                                                style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }}>
                                                <option value="Kirana/Grocery">Kirana/Grocery</option>
                                                <option value="Medical/Pharmacy">Medical/Pharmacy</option>
                                                <option value="Restaurant/Cafe">Restaurant/Cafe</option>
                                                <option value="Bakery">Bakery & Sweets</option>
                                                <option value="Clothing/Apparel">Clothing/Apparel</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Business Type</label>
                                            <input name="businessType" type="text" defaultValue={data.store.businessType} className="form-control px-20 py-14" 
                                                style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }} />
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">GST / License No.</label>
                                            <input name="licenseType" type="text" defaultValue={data.store.licenseType} className="form-control px-20 py-14" 
                                                style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }} />
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Business Phone</label>
                                            <input name="shopPhone" type="text" defaultValue={data.store.phone} className="form-control px-20 py-14" 
                                                style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Address */}
                                <div className="ds-card p-40 border-0 shadow-md">
                                    <div className="d-flex align-items-center gap-16 mb-40 border-bottom pb-20">
                                        <div className="rounded-12 d-flex align-items-center justify-content-center bg-light text-primary" style={{ width: '40px', height: '40px' }}>
                                            <i className="fas fa-location-dot"></i>
                                        </div>
                                        <h4 className="fw-900 mb-0" style={{ fontSize: '20px', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>Location Details</h4>
                                    </div>
                                    <div className="row g-32">
                                        <div className="col-12">
                                            <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Full Address</label>
                                            <textarea name="address" rows="2" defaultValue={data.store.address} className="form-control px-20 py-14" 
                                                style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px', resize: 'none' }}></textarea>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">City</label>
                                            <input name="city" type="text" defaultValue={data.store.city} className="form-control px-20 py-14" 
                                                style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">State</label>
                                            <input name="state" type="text" defaultValue={data.store.state} className="form-control px-20 py-14" 
                                                style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Pincode</label>
                                            <input name="pincode" type="text" defaultValue={data.store.pincode} className="form-control px-20 py-14" 
                                                style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Verification */}
                                <div className="ds-card p-40 border-0 shadow-md">
                                    <div className="d-flex align-items-center gap-16 mb-40 border-bottom pb-20">
                                        <div className="rounded-12 d-flex align-items-center justify-content-center bg-light text-primary" style={{ width: '40px', height: '40px' }}>
                                            <i className="fas fa-certificate"></i>
                                        </div>
                                        <h4 className="fw-900 mb-0" style={{ fontSize: '20px', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>Verification Documents</h4>
                                    </div>
                                    <div className="row g-24">
                                        {[
                                            { label: 'Trade License', key: 'businessProofUrl', name: 'businessProof', icon: 'fa-file-signature' },
                                            { label: 'Shop Front', key: 'shopFrontUrl', name: 'shopFront', icon: 'fa-store-alt' },
                                            { label: 'Shop Interior', key: 'shopInteriorUrl', name: 'shopInterior', icon: 'fa-couch' },
                                            { label: 'Owner ID Proof', key: 'ownerIdProofUrl', name: 'ownerIdProof', icon: 'fa-id-card' }
                                        ].map((doc) => (
                                            <div className="col-md-3 col-sm-6" key={doc.key}>
                                                <div className="upload-hub-card text-center p-32">
                                                    <div className="mb-20">
                                                        <i className={`fas ${doc.icon} text-primary opacity-50 fa-3x`}></i>
                                                    </div>
                                                    <div className="small fw-900 mb-4 text-dark text-uppercase" style={{letterSpacing: '0.05em'}}>{doc.label}</div>
                                                    <div className="text-muted x-small text-truncate mb-24 px-12">
                                                        {data.store[doc.key] ? 'Document Uploaded ✓' : 'No document found'}
                                                    </div>
                                                    <label className="rr-btn-outline w-100 py-12" style={{ cursor: 'pointer', borderRadius: '12px', fontSize: '12px', fontWeight: '800' }}>
                                                        <i className="fas fa-cloud-upload-alt me-8"></i> Replace File
                                                        <input type="file" name={doc.name} className="d-none" />
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="d-flex flex-column gap-32">
                                {/* Account Card */}
                                <div className="ds-card p-40 border-0 shadow-md">
                                    <div className="d-flex align-items-center gap-16 mb-40 border-bottom pb-20">
                                        <div className="rounded-12 d-flex align-items-center justify-content-center bg-light text-primary" style={{ width: '40px', height: '40px' }}>
                                            <i className="fas fa-user-lock"></i>
                                        </div>
                                        <h4 className="fw-900 mb-0" style={{ fontSize: '20px', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>Security Credentials</h4>
                                    </div>
                                    <div className="row g-32 mb-40">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Owner First Name</label>
                                            <input name="firstName" type="text" defaultValue={data.user?.firstName || ''} required className="form-control px-20 py-14"
                                                style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Owner Last Name</label>
                                            <input name="lastName" type="text" defaultValue={data.user?.lastName || ''} required className="form-control px-20 py-14"
                                                style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Login Email</label>
                                            <input name="email" type="email" defaultValue={data.user?.email || ''} required className="form-control px-20 py-14"
                                                style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-800 text-muted text-uppercase mb-12 d-block">Change Password</label>
                                            <input name="password" type="password" className="form-control px-20 py-14"
                                                style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', backgroundColor: '#F9FAFB', fontSize: '15px' }} 
                                                placeholder="Enter new password to change" />
                                        </div>
                                    </div>

                                    <div className="p-24 rounded-16 d-flex gap-20 align-items-center" style={{ backgroundColor: '#fff7ed', border: '1px solid #ffedd5' }}>
                                        <div className="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center" style={{width: '44px', height: '44px', flexShrink: 0}}>
                                            <i className="fas fa-triangle-exclamation"></i>
                                        </div>
                                        <div>
                                            <h6 className="fw-900 mb-4 text-dark" style={{ fontSize: '14px' }}>Important Notice</h6>
                                            <p className="mb-0 small text-muted" style={{ fontWeight: '500' }}>Updating your email or password will log you out from all active sessions across all your devices.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sticky Footer */}
                        <div className="d-flex justify-content-end align-items-center gap-16 mt-48 pb-48">
                            <button type="button" onClick={() => fetchData()} className="btn px-32 py-16" style={{ borderRadius: '16px', fontWeight: '800', border: '1px solid var(--border-medium)', color: 'var(--text-muted)', fontSize: '14px' }}>
                                Discard Changes
                            </button>
                            <button type="submit" disabled={saving} className="rr-btn px-48 py-16 shadow-lg" style={{ borderRadius: '16px', fontSize: '15px', fontWeight: '800', minWidth: '240px' }}>
                                {saving ? (
                                    <><span className="spinner-border spinner-border-sm me-12"></span>Saving Settings...</>
                                ) : 'Save & Sync Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <style jsx>{`
                .upload-hub-card {
                    background-color: #F9FAFB;
                    border: 2px dashed var(--border-medium);
                    border-radius: 20px;
                    transition: 0.3s;
                }
                .upload-hub-card:hover {
                    border-color: var(--primary);
                    background-color: var(--primary-light);
                    transform: translateY(-4px);
                }
                .rr-btn-outline {
                    border: 2px solid var(--primary);
                    background: transparent;
                    color: var(--primary);
                    transition: 0.2s;
                }
                .rr-btn-outline:hover {
                    background-color: var(--primary);
                    color: white;
                }
            `}</style>
        </div>
    );
}
