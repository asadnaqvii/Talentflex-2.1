'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page redirects to the appropriate role-based dashboard
// In production, the user role would come from the auth context/session
export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // TODO: Get user role from auth context
    // For now, default to candidate dashboard
    // In production, this would be: const userRole = getUserRole();

    // Map roles to their dashboard paths
    const rolePathMap: Record<string, string> = {
      employer: '/employer',
      internal: '/admin',
      candidate: '/candidate',
    };

    // Default to candidate for now
    const userRole = 'candidate';
    router.replace(rolePathMap[userRole] || '/candidate');
  }, [router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#3D80F8] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#676767]">Loading your dashboard...</p>
      </div>
    </div>
  );
}
