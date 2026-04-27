import Sidebar from '@/components/Sidebar';
import prisma from '@/lib/prisma';
import ApprovalTable from './ApprovalTable';
import AdminHeader from '@/components/AdminHeader';

export default async function AdminDashboard() {
  const menuItems = [
    { name: 'Overview', icon: 'fas fa-chart-line', link: '/dashboard/admin' },
    { name: 'Logout', icon: 'fas fa-sign-out-alt', link: '/logout' },
  ];

  const totalStores = await prisma.store.count();
  const approvedStores = await prisma.store.count({ where: { status: 'APPROVED' } });
  const pendingStores = await prisma.store.count({ where: { status: 'PENDING' } });
  const stores = await prisma.store.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20
  });

  const stats = {
    total: totalStores,
    active: approvedStores,
    pending: pendingStores,
    revenue: '₹4,52,000' 
  };

  return (
    <div style={{display: 'flex', backgroundColor: '#F8FFF8', minHeight: '100vh'}}>
        <Sidebar items={menuItems} activeItem="Overview" />
        
        <div className="admin-main-content">
            <div className="container-fluid" style={{padding: '30px'}}>
                <AdminHeader title="Platform Admin" />
                
                <div className="row g-4">
                    <div className="col-xl-3 col-md-6">
                        <div className="p-30 bg-white shadow-sm" style={{borderRadius: '15px'}}>
                            <h6 className="text-muted mb-10">Total Stores</h6>
                            <h2 className="mb-0 fw-bold text-success">{stats.total}</h2>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="p-30 bg-white shadow-sm" style={{borderRadius: '15px'}}>
                            <h6 className="text-muted mb-10">Active Stores</h6>
                            <h2 className="mb-0 fw-bold text-success">{stats.active}</h2>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="p-30 bg-white shadow-sm" style={{borderRadius: '15px'}}>
                            <h6 className="text-muted mb-10">Pending Approval</h6>
                            <h2 className="mb-0 fw-bold text-warning">{stats.pending}</h2>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="p-30 bg-white shadow-sm" style={{borderRadius: '15px'}}>
                            <h6 className="text-muted mb-10">Revenue</h6>
                            <h2 className="mb-0 fw-bold text-success">{stats.revenue}</h2>
                        </div>
                    </div>
                </div>

                <div className="mt-40">
                    <ApprovalTable stores={stores} />
                </div>
            </div>
        </div>
    </div>
  );
}
