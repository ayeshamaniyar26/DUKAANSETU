'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear any local storage or session cookies here if they exist
    localStorage.clear();
    sessionStorage.clear();
    
    // Redirect to login page
    router.push('/login');
  }, [router]);

  return (
    <div style={{
      display: 'flex', 
      height: '100vh', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#F8FFF8'
    }}>
      <div style={{textAlign: 'center'}}>
        <h2 style={{color: '#2E7D32'}}>Logging you out...</h2>
        <p>Please wait while we secure your account.</p>
      </div>
    </div>
  );
}
