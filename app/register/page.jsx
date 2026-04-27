'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { registerStore } from './actions';
import Swal from 'sweetalert2';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [coords, setCoords] = useState({ lat: null, lng: null });
    const [loadingLocation, setLoadingLocation] = useState(false);

    const handleVerify = () => {
        setIsPhoneVerified(true);
        Swal.fire({
            title: 'Verified!',
            text: 'Your mobile number has been successfully verified.',
            icon: 'success',
            confirmButtonColor: '#2E7D32'
        });
    };

    const captureLocation = () => {
        setLoadingLocation(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCoords({ lat: latitude, lng: longitude });
                setLoadingLocation(false);
                Swal.fire('Success', 'Shop location captured!', 'success');
            }, () => {
                setLoadingLocation(false);
                Swal.fire('Error', 'Unable to fetch location', 'error');
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isPhoneVerified) {
            Swal.fire('Wait!', 'Please verify your phone number first.', 'warning');
            return;
        }
        
        const formData = new FormData(e.target);
        if (coords.lat) formData.append('latitude', coords.lat);
        if (coords.lng) formData.append('longitude', coords.lng);

        const res = await registerStore(formData);
        if (res.success) {
            setShowSuccessModal(true);
        } else {
            Swal.fire('System Error', res.error, 'error');
        }
    };

    return (
        <div className="auth-wrapper">
            {/* Success Modal remains the same */}
            {showSuccessModal && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', padding: '20px',
                    backdropFilter: 'blur(5px)'
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: 'white', maxWidth: '500px', width: '100%', 
                        borderRadius: '24px', padding: '40px', textAlign: 'center',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                        borderTop: '8px solid #2E7D32'
                    }}>
                        <div style={{
                            width: '80px', height: '80px', backgroundColor: '#DCFCE7', 
                            borderRadius: '50%', display: 'flex', alignItems: 'center', 
                            justifyContent: 'center', margin: '0 auto 24px'
                        }}>
                            <i className="fas fa-check-circle" style={{color: '#166534', fontSize: '40px'}}></i>
                        </div>
                        <h3 className="mb-10 fw-bold">Registration Successful!</h3>
                        <p className="text-muted mb-30">
                            Please wait, you will receive a message on your WhatsApp about approval. Once approved, you can sell your products on Dukaan Setu.
                        </p>
                        <Link href="/login" className="rr-btn w-100" style={{ textDecoration: 'none' }}>
                            Back to Login
                        </Link>
                    </div>
                </div>
            )}

            <div className="auth-card">
                {/* Left Side - Illustration Panel */}
                <div className="auth-illustration-container d-none d-lg-flex">
                    <div className="auth-illustration-content">
                        {/* Logo overlaid on top of the illustration */}
                        <div className="auth-illus-wrapper">
                            <img src="/images/dukaan-setu-logo.png" alt="Dukkan Setu" className="auth-logo-img" />
                            <img src="/images/auth-illustration.png" alt="Onboarding" className="auth-main-img" />
                        </div>
                    </div>
                </div>

                {/* Right Side - Expanded Registration Form */}
                <div className="auth-form-container">
                    <div className="auth-form-header">
                        <h2>Create Account</h2>
                        <p>Launch your shop on India's most trusted platform</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit} style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto', paddingRight: '10px' }}>
                        
                        {/* Basic Information */}
                        <div className="auth-section-label">Basic Information</div>
                        <div className="mb-20">
                            <label className="auth-label">Store / Shop Name</label>
                            <div className="auth-input-group">
                                <span className="icon"><i className="fas fa-store"></i></span>
                                <input type="text" name="storeName" placeholder="Enter shop name" required />
                            </div>
                        </div>

                        <div className="row g-3">
                            <div className="col-6 mb-20">
                                <label className="auth-label">First Name</label>
                                <div className="auth-input-group">
                                    <span className="icon"><i className="far fa-user"></i></span>
                                    <input type="text" name="firstName" placeholder="First Name" required />
                                </div>
                            </div>
                            <div className="col-6 mb-20">
                                <label className="auth-label">Last Name</label>
                                <div className="auth-input-group">
                                    <span className="icon"><i className="far fa-user"></i></span>
                                    <input type="text" name="lastName" placeholder="Last Name" required />
                                </div>
                            </div>
                        </div>

                        <div className="mb-20">
                            <label className="auth-label">Email Address (Required)</label>
                            <div className="auth-input-group">
                                <span className="icon"><i className="far fa-envelope"></i></span>
                                <input type="email" name="email" placeholder="email@example.com" required />
                            </div>
                        </div>

                        <div className="mb-20">
                            <label className="auth-label">Mobile Number</label>
                            <div className="auth-input-group">
                                <span className="icon"><i className="fas fa-phone-alt"></i></span>
                                <input type="text" name="phone" placeholder="10 Digit Number" required />
                                <button type="button" className="inner-action-btn" onClick={handleVerify} 
                                    style={{ backgroundColor: isPhoneVerified ? '#DCFCE7' : '#2E7D32', color: isPhoneVerified ? '#166534' : 'white' }}>
                                    {isPhoneVerified ? 'Verified' : 'Verify'}
                                </button>
                            </div>
                        </div>

                        {/* Shop Details */}
                        <div className="auth-section-label">Shop Details</div>
                        <div className="mb-20">
                            <label className="auth-label">Full Address</label>
                            <div className="auth-input-group">
                                <span className="icon"><i className="fas fa-map-pin"></i></span>
                                <input type="text" name="address" placeholder="Bldg/Street/Area" required />
                            </div>
                        </div>

                        <div className="row g-3">
                            <div className="col-4 mb-20">
                                <label className="auth-label">City</label>
                                <input type="text" name="city" className="form-control-custom" required />
                            </div>
                            <div className="col-4 mb-20">
                                <label className="auth-label">State</label>
                                <input type="text" name="state" className="form-control-custom" required />
                            </div>
                            <div className="col-4 mb-20">
                                <label className="auth-label">Pincode</label>
                                <input type="text" name="pincode" className="form-control-custom" required />
                            </div>
                        </div>

                        <div className="mb-20">
                            <button type="button" onClick={captureLocation} className="btn-location-capture">
                                <i className="fas fa-crosshairs me-2"></i> 
                                {coords.lat ? 'Location Captured ✓' : 'Capture Live Shop Location'}
                            </button>
                        </div>

                        {/* Business Information */}
                        <div className="auth-section-label">Business Information</div>
                        <div className="row g-3">
                            <div className="col-6 mb-20">
                                <label className="auth-label">Business Type</label>
                                <select name="businessType" className="form-select-custom" required>
                                    <option value="">Select Type</option>
                                    <option value="Kirana Store">Kirana Store</option>
                                    <option value="Supermarket">Supermarket</option>
                                    <option value="Pharmacy">Pharmacy</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div className="col-6 mb-20">
                                <label className="auth-label">License Type</label>
                                <select name="licenseType" className="form-select-custom" required>
                                    <option value="">Select License</option>
                                    <option value="Shop License">Shop License</option>
                                    <option value="Trade License">Trade License</option>
                                    <option value="GST">GST</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-20">
                            <label className="auth-label">Upload Business Proof</label>
                            <input type="file" name="businessProof" className="auth-file-input" required />
                        </div>

                        {/* Verification Section */}
                        <div className="auth-section-label">Verification Section</div>
                        <div className="row g-3">
                            <div className="col-6 mb-20">
                                <label className="auth-label">Shop Front Photo</label>
                                <input type="file" name="shopFront" className="auth-file-input" required />
                            </div>
                            <div className="col-6 mb-20">
                                <label className="auth-label">Shop Interior Photo</label>
                                <input type="file" name="shopInterior" className="auth-file-input" required />
                            </div>
                        </div>
                        <div className="mb-20">
                            <label className="auth-label">Owner ID Proof (Aadhaar/PAN)</label>
                            <input type="file" name="ownerIdProof" className="auth-file-input" required />
                        </div>

                        {/* Security */}
                        <div className="auth-section-label">Security</div>
                        <div className="mb-20">
                            <label className="auth-label">Password</label>
                            <div className="auth-input-group">
                                <span className="icon"><i className="fas fa-lock"></i></span>
                                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Min 8 characters" required />
                                <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                    <i className={showPassword ? "far fa-eye-slash" : "far fa-eye"}></i>
                                </span>
                            </div>
                        </div>

                        <div className="mb-20">
                            <label className="auth-label">Confirm Password</label>
                            <div className="auth-input-group">
                                <span className="icon"><i className="fas fa-lock"></i></span>
                                <input type={showPassword ? 'text' : 'password'} placeholder="Repeat password" required />
                            </div>
                        </div>

                        {/* Consent */}
                        <div className="auth-consent-box mt-10">
                            <label className="d-flex align-items-center">
                                <input type="checkbox" required className="me-2" />
                                <span className="small">I confirm that the provided information is accurate and my business is genuine.</span>
                            </label>
                        </div>

                        <button type="submit" className="auth-submit-btn mt-30">Register Now</button>

                        <div className="auth-footer py-20 text-center">
                            Already have an account? <Link href="/login">Login Here</Link>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
                .auth-section-label {
                    background: #f8f9fa;
                    padding: 8px 15px;
                    border-radius: 6px;
                    font-size: 13px;
                    font-weight: 800;
                    color: #2E7D32;
                    text-transform: uppercase;
                    margin: 30px 0 20px 0;
                    border-left: 3px solid #2E7D32;
                }
                .form-control-custom, .form-select-custom {
                    width: 100%;
                    padding: 11px 15px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    font-size: 14px;
                }
                .auth-file-input {
                    font-size: 12px;
                    color: #666;
                }
                .btn-location-capture {
                    width: 100%;
                    padding: 10px;
                    background: #f0fff4;
                    border: 1px dashed #2E7D32;
                    color: #2E7D32;
                    border-radius: 8px;
                    font-weight: 600;
                    transition: all 0.3s;
                }
                .btn-location-capture:hover {
                    background: #e6ffec;
                }
                .auth-consent-box {
                    background: #fffcf0;
                    padding: 15px;
                    border-radius: 8px;
                    border: 1px solid #ffeeba;
                }
                /* Hide scrollbar for cleaner look */
                .auth-form::-webkit-scrollbar {
                    width: 6px;
                }
                .auth-form::-webkit-scrollbar-thumb {
                    background: #e0e0e0;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}
