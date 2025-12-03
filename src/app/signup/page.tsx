import { Suspense } from 'react';
import SignUpPage from "@/components/auth/SignUpPage";

function SignUpFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#3D80F8] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function SignUp() {
  return (
    <Suspense fallback={<SignUpFallback />}>
      <SignUpPage />
    </Suspense>
  );
}
