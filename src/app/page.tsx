import { Suspense } from 'react';
import SignInPage from "@/components/auth/SignInPage";

function HomeFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#3D80F8] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <SignInPage />
    </Suspense>
  );
}
