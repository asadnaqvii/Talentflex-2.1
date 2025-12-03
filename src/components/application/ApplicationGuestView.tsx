'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Building2, ChevronLeft, Bell } from 'lucide-react';
import { JobApplication } from '@/types';

interface ApplicationGuestViewProps {
  application: JobApplication;
  token: string;
}

export default function ApplicationGuestView({ application, token }: ApplicationGuestViewProps) {
  // Parse requirements into array for checklist display
  const requirementsList = application.requirements
    ? application.requirements.split('\n').filter(r => r.trim())
    : [];

  return (
    <div className="flex min-h-screen bg-[#010917]">
      {/* Sidebar */}
      <div className="hidden lg:flex w-64 flex-col p-5">
        <h1 className="text-3xl font-bold text-white mb-10">Talent Flex</h1>

        <div className="space-y-2">
          <p className="text-xs text-[#C3C3C3] uppercase tracking-wide mb-3">Main Menu</p>
          <div className="flex items-center gap-3 px-3 py-3 text-[#E2E2E2] hover:bg-gray-800 rounded-lg cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>My Profile</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-3 text-[#E2E2E2] hover:bg-gray-800 rounded-lg cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>My Applications</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-3 text-[#E2E2E2] hover:bg-gray-800 rounded-lg cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>My Settings</span>
          </div>
        </div>

        {/* Premium Banner */}
        <div className="mt-auto">
          <div className="bg-gradient-to-br from-[#D96570] to-[#8B5CF6] rounded-2xl p-5">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-white font-bold mb-1">Go to Premium</p>
            <p className="text-white/80 text-sm mb-4">Unlock and maximize your experience!</p>
            <button className="w-full bg-white text-[#1A1A1A] font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white lg:rounded-tl-3xl min-h-screen">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 lg:px-8 py-4 lg:py-6 border-b border-[#EDEDED]">
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F6F6F6] transition-colors">
              <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" />
            </button>
            <h1 className="text-xl lg:text-2xl font-bold text-[#1A1A1A]">My Profile</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F6F6F6] transition-colors">
              <Bell className="w-5 h-5 text-[#676767]" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3D80F8] to-[#6B9FFA] flex items-center justify-center text-white font-bold">
              ?
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Job Details */}
            <div className="flex-1 max-w-2xl">
              {/* Job Title and Tags */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A]">
                    {application.jobTitle}
                  </h2>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-[#F6F6F6] text-[#676767] text-sm rounded-full">LinkedIn</span>
                    <span className="px-3 py-1 bg-[#F6F6F6] text-[#676767] text-sm rounded-full">Full Time</span>
                    <span className="px-3 py-1 bg-[#F6F6F6] text-[#676767] text-sm rounded-full">
                      {application.location || 'Remote'}
                    </span>
                  </div>
                </div>

                {/* Job Description */}
                <p className="text-[#676767] leading-relaxed mb-6">
                  {application.jobDescription ||
                    `${application.companyName} is looking for a ${application.jobTitle} to join our team. If you have relevant experience and a passion for excellence, we'd love to hear from you.`
                  }
                </p>

                {/* Company */}
                <div className="flex items-center gap-2 mb-6">
                  <Building2 className="w-5 h-5 text-[#3D80F8]" />
                  <span className="text-[#1A1A1A] font-medium">{application.companyName}</span>
                </div>

                {/* Salary (mock) */}
                <div className="mb-8">
                  <span className="text-4xl font-bold text-[#1A1A1A]">$4,000</span>
                  <span className="text-[#676767]">/mo</span>
                </div>
              </div>

              {/* About Company */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">About {application.companyName}</h3>
                <p className="text-[#676767] leading-relaxed mb-4">
                  {application.companyName} is a leading company in the industry, offering innovative solutions and a great work environment for professionals who are passionate about making an impact.
                </p>
                <div className="flex gap-3">
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-[#F6F6F6] text-[#676767] text-sm rounded-lg">
                    <Building2 className="w-4 h-4" />
                    {application.jobTitle}
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-[#F6F6F6] text-[#676767] text-sm rounded-lg">
                    <Building2 className="w-4 h-4" />
                    Product Manager
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#EDEDED] mb-8" />

              {/* Requirements */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Requirements</h3>
                <div className="space-y-3">
                  {requirementsList.length > 0 ? (
                    requirementsList.map((req, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-[#EDEDED] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#676767]" />
                        </div>
                        <span className="text-[#676767]">{req}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-[#EDEDED] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#676767]" />
                        </div>
                        <span className="text-[#676767]">2+ years of experience in relevant field</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-[#EDEDED] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#676767]" />
                        </div>
                        <span className="text-[#676767]">Proficiency in industry-standard tools and software</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-[#EDEDED] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#676767]" />
                        </div>
                        <span className="text-[#676767]">Strong portfolio showcasing relevant work</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-[#EDEDED] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#676767]" />
                        </div>
                        <span className="text-[#676767]">Ability to work in a fast-paced environment and meet deadlines</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Application Type Tags */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button className="px-4 py-2 border-2 border-[#3D80F8] text-[#3D80F8] font-medium rounded-lg hover:bg-[#EFF5FF] transition-colors">
                  Auto Apply
                </button>
                <button className="px-4 py-2 border-2 border-[#EDEDED] text-[#676767] font-medium rounded-lg hover:border-[#D3D3D3] transition-colors">
                  AI Apply
                </button>
                <button className="px-4 py-2 border-2 border-[#EDEDED] text-[#676767] font-medium rounded-lg hover:border-[#D3D3D3] transition-colors">
                  Interview+Apply
                </button>
                <button className="px-4 py-2 border-2 border-[#EDEDED] text-[#676767] font-medium rounded-lg hover:border-[#D3D3D3] transition-colors">
                  Common Application
                </button>
              </div>

              {/* Apply Now Button */}
              <Link
                href={`/signup?role=candidate&redirect=/application/${token}`}
                className="block w-full py-4 bg-[#3D80F8] hover:bg-[#2D6DE8] text-white font-bold rounded-lg text-center transition-colors"
              >
                Apply Now
              </Link>

              <p className="text-center mt-4 text-[#676767]">
                Already have an account?{' '}
                <Link href={`/signin?redirect=/application/${token}`} className="text-[#3D80F8] font-medium hover:underline">
                  Sign In
                </Link>
              </p>
            </div>

            {/* Right Column - Visual Banner */}
            <div className="hidden lg:block w-96 flex-shrink-0">
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF]">
                {/* Placeholder creative imagery */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#3D80F8] to-[#6B9FFA] flex items-center justify-center">
                      <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-2xl font-bold text-[#1A1A1A] mb-2">Join Our Team</p>
                    <p className="text-[#676767]">Start your journey with {application.companyName}</p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-[#1A1A1A]">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
