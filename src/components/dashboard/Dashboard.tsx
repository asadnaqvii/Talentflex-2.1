// This component is deprecated.
// The /dashboard route now redirects to role-specific dashboards:
// - /candidate for candidates
// - /employer for employers
// - /admin for internal users

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to candidate dashboard by default
    router.replace('/candidate');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#3D80F8] border-t-transparent rounded-full animate-spin mx-auto" />
    </div>
  );
}
