'use client';
import React from 'react';
import { approveStore, rejectStore } from './actions';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function ApprovalTable({ stores }) {
    const handleApprove = async (id) => {
        const res = await approveStore(id);
        if (res.success) {
            Swal.fire({
                title: 'Approved!',
                text: 'The store has been successfully approved.',
                icon: 'success',
                confirmButtonColor: '#2E7D32'
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: res.error,
                icon: 'error',
                confirmButtonColor: '#DC2626'
            });
        }
    };

    const handleReject = async (id) => {
        const { isConfirmed } = await Swal.fire({
            title: 'Are you sure?',
            text: "You want to reject this store request?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DC2626',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, reject it!'
        });

        if (isConfirmed) {
            const res = await rejectStore(id);
            if (res.success) {
                Swal.fire({
                    title: 'Rejected',
                    text: 'The store request has been rejected.',
                    icon: 'info',
                    confirmButtonColor: '#2E7D32'
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: res.error,
                    icon: 'error',
                    confirmButtonColor: '#DC2626'
                });
            }
        }
    };

    return (
        <div className="bg-white p-30 mt-30" style={{backgroundColor: 'white', borderRadius: '10px', border: '1px solid #eee'}}>
            <h3 className="mb-20">Store Approval Requests</h3>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Store Name</th>
                            <th>Category</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">No pending requests</td>
                            </tr>
                        ) : (
                            stores.map((store) => (
                                <tr key={store.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            {store.logo && (
                                                <img src={store.logo} alt="" style={{width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px'}} />
                                            )}
                                            <strong>{store.name}</strong>
                                        </div>
                                    </td>
                                    <td>{store.category}</td>
                                    <td>{store.phone}</td>
                                    <td>
                                        <span style={{
                                            padding: '4px 10px', 
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            backgroundColor: store.status === 'PENDING' ? '#FEF3C7' : '#DCFCE7',
                                            color: store.status === 'PENDING' ? '#D97706' : '#166534'
                                        }}>
                                            {store.status}
                                        </span>
                                    </td>
                                    <td>
                                        {store.status === 'PENDING' ? (
                                            <div className="d-flex gap-2">
                                                <button 
                                                    onClick={() => handleApprove(store.id)}
                                                    className="rr-btn" 
                                                    style={{padding: '5px 12px', fontSize: '12px'}}
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    onClick={() => handleReject(store.id)}
                                                    className="rr-btn" 
                                                    style={{padding: '5px 12px', fontSize: '12px', backgroundColor: '#DC2626'}}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <Link 
                                                href={`/dashboard/admin/stores/${store.id}`}
                                                className="rr-btn" 
                                                style={{padding: '5px 12px', fontSize: '12px', textDecoration: 'none', display: 'inline-block'}}
                                            >
                                                View Details
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
