'use client';
import React from 'react';

export default function AdminHeader({ title }) {
    const toggleSidebar = () => {
        const sidebar = document.getElementById('admin-sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (sidebar && overlay) {
            sidebar.classList.toggle('opened');
            overlay.classList.toggle('opened');
        }
    };

    return (
        <header className="d-flex justify-content-between align-items-center mb-40">
            <div className="d-flex align-items-center gap-3">
                <button className="btn d-lg-none p-0 border-0 me-2" onClick={toggleSidebar}>
                    <i className="fas fa-bars fa-2x color-primary" style={{color: '#2E7D32'}}></i>
                </button>
                <h1 className="h3 mb-0 fw-bold">{title}</h1>
            </div>
            <div className="admin-status d-none d-sm-block">
                <span className="badge bg-success py-2 px-3">Super Admin Connected</span>
            </div>
        </header>
    );
}
