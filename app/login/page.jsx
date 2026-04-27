'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { login } from './actions';
import Swal from 'sweetalert2';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');

    React.useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleForgotPassword = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Forgot Password?',
            text: 'Enter your email to receive a password reset link',
            input: 'email',
            inputPlaceholder: 'Enter your email',
            showCancelButton: true,
            confirmButtonText: 'Send Link',
            confirmButtonColor: '#2E7D32',
            preConfirm: (email) => {
                if (!email) {
                    Swal.showValidationMessage('Please enter an email address');
                }
                return email;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Sent!', 'Password reset link has been sent to your email.', 'success');
            }
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', formData.get('email'));
        } else {
            localStorage.removeItem('rememberedEmail');
        }

        const result = await login(formData);
        if (result?.error) {
            Swal.fire('Error', result.error, 'error');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                {/* Left Side - Illustration Panel */}
                <div className="auth-illustration-container d-none d-lg-flex">
                    <div className="auth-illustration-content">
                        {/* Logo overlaid on top of the illustration — same as register page */}
                        <div className="auth-illus-wrapper">
                            <img src="/images/dukaan-setu-logo.png" alt="Dukkan Setu" className="auth-logo-img" />
                            <img src="/images/auth-illustration.png" alt="Welcome Back" className="auth-main-img" />
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="auth-form-container">
                    <div className="auth-mobile-logo d-lg-none text-center mb-30">
                        <img src="/images/dukaan-setu-logo.png" alt="Dukkan Setu" className="auth-logo-img-mobile" />
                    </div>

                    <div className="auth-form-header">
                        <h2>Welcome Back</h2>
                        <p>Login to your account to manage your shop</p>
                    </div>

                    <form className="auth-form" onSubmit={handleLogin}>
                        <div className="mb-20">
                            <label className="auth-label">Email or Phone</label>
                            <div className="auth-input-group">
                                <span className="icon"><i className="far fa-user"></i></span>
                                <input name="email" type="text" placeholder="Enter email or phone" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
 
                        <div className="mb-20">
                            <label className="auth-label">Password</label>
                            <div className="auth-input-group">
                                <span className="icon"><i className="fas fa-lock"></i></span>
                                <input 
                                    name="password"
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter password" 
                                    required 
                                />
                                <span 
                                    className="toggle-password" 
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={showPassword ? "far fa-eye-slash" : "far fa-eye"}></i>
                                </span>
                            </div>
                        </div>

                        <div className="mb-30 d-flex justify-content-between align-items-center">
                            <div className="auth-remember d-flex align-items-center">
                                <input type="checkbox" id="remember" className="mr-10" style={{accentColor: '#16a34a'}} checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                                <label htmlFor="remember" style={{fontSize: '14px', color: '#4b5563', marginLeft: '8px'}}>Remember Me</label>
                            </div>
                            <a href="#" onClick={handleForgotPassword} className="color-primary" style={{fontSize: '14px', fontWeight: 600, color: '#2E7D32', textDecoration: 'none'}}>Forgot Password?</a>
                        </div>

                        <button type="submit" className="auth-submit-btn">Login Now</button>

                        <div className="auth-footer">
                            Don't have an account? <Link href="/register">Register Here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
