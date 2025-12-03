'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log({ email, password });

    // For demo purposes, redirect to candidate dashboard
    // In production, this would check user role from auth response
    if (redirectUrl) {
      router.push(redirectUrl);
    } else {
      // Default redirect - in production this would depend on user role
      router.push('/candidate');
    }
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in
    console.log('Google sign in');
    // TODO: Implement Google OAuth
    if (redirectUrl) {
      router.push(redirectUrl);
    } else {
      router.push('/candidate');
    }
  };

  const handleLinkedInSignIn = () => {
    // Handle LinkedIn sign in
    console.log('LinkedIn sign in');
    // TODO: Implement LinkedIn OAuth
    if (redirectUrl) {
      router.push(redirectUrl);
    } else {
      router.push('/candidate');
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-white">
      {/* Left Section */}
      <div className="flex flex-col items-center justify-center w-full lg:w-[520px] px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-6 mb-8">
          {/* Logo */}
          <div className="relative w-56 h-16 flex items-center justify-center">
            <h1
              className="text-4xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #D96570 0%, #4A83F0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.05em'
              }}
            >
              Talent Flex
            </h1>
          </div>

          {/* Title and Description */}
          <div className="flex flex-col items-center gap-2 max-w-[314px]">
            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#1A1A1A] leading-[1.25] tracking-[-0.02em] text-center">
              Welcome Back
            </h2>
            <p className="text-base font-normal text-[#676767] leading-[1.5] tracking-[-0.02em] text-center">
              Sign in to access your account
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex flex-col w-full max-w-[400px] gap-6">
          {/* OAuth Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-3 w-full py-3 px-4 border-2 border-[#EDEDED] rounded-lg hover:bg-[#F6F6F6] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium text-[#1A1A1A]">Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={handleLinkedInSignIn}
              className="flex items-center justify-center gap-3 w-full py-3 px-4 border-2 border-[#EDEDED] rounded-lg hover:bg-[#F6F6F6] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-sm font-medium text-[#1A1A1A]">Continue with LinkedIn</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#EDEDED]" />
            <span className="text-sm text-[#ACACAF]">or</span>
            <div className="flex-1 h-px bg-[#EDEDED]" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#676767] leading-[1.43] tracking-[-0.02em]">
                Email
              </label>
              <div className="flex items-center gap-4 px-4 py-3 border-2 border-[#EDEDED] rounded-[10px] focus-within:border-[#3D80F8] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 text-base font-normal text-[#1A1A1A] leading-[1.5] tracking-[-0.02em] bg-transparent border-none outline-none placeholder:text-[#ACACAF]"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-[#676767] leading-[1.43] tracking-[-0.02em]">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#3D80F8] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="flex items-center gap-4 px-4 py-3 border-2 border-[#EDEDED] rounded-[10px] focus-within:border-[#3D80F8] transition-colors">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="flex-1 text-base font-normal text-[#1A1A1A] leading-[1.5] tracking-[-0.02em] bg-transparent border-none outline-none placeholder:text-[#ACACAF]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-6 h-6 flex items-center justify-center"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5 text-[#676767]" strokeWidth={2} />
                  ) : (
                    <EyeOff className="w-5 h-5 text-[#676767]" strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="flex items-center justify-center w-full gap-2.5 px-8 py-4 bg-[#3D80F8] hover:bg-[#2D6DE8] rounded-lg transition-colors"
            >
              <span className="text-base font-bold text-white leading-[1.5] tracking-[-0.02em]">
                Sign In
              </span>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="flex items-center justify-center gap-2 w-full">
            <span className="text-sm font-normal text-[#676767] leading-[1.43] tracking-[-0.02em]">
              Don&apos;t have an account?
            </span>
            <Link
              href={redirectUrl ? `/signup?redirect=${encodeURIComponent(redirectUrl)}` : '/signup'}
              className="text-sm font-bold text-[#3D80F8] leading-[1.43] tracking-[-0.02em] hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section - Background Image (hidden on mobile) */}
      <div
        className="hidden lg:block flex-1 h-screen bg-[#EDEDED] rounded-l-3xl"
        style={{
          backgroundImage: 'url(/assets/signin-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </div>
  );
};

export default SignInPage;
