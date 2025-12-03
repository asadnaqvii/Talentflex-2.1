// This component is deprecated. Use CandidateProfile or CompanyProfile instead.
// Keeping for backwards compatibility with any legacy imports.

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/candidate/profile');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#3D80F8] border-t-transparent rounded-full animate-spin mx-auto" />
    </div>
  );
}
