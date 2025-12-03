'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Redirect to the role-based profile page
export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    // TODO: Get user role from auth context
    // For now, redirect to candidate profile
    router.replace('/candidate/profile');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#3D80F8] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#676767]">Loading profile...</p>
      </div>
    </div>
  );
}
