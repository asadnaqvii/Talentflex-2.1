'use client';

import React from 'react';
import Link from 'next/link';
import { Users, Heart, Calendar, Building2, ArrowRight, Star } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/layout/TopBar';
import { SavedCandidate } from '@/types';

// Mock data
const mockSavedCandidates: SavedCandidate[] = [
  {
    decision: {
      id: '1',
      employerUserId: 'employer-1',
      applicationId: 'app-1',
      decision: 'interested',
      createdAt: '2024-12-01T10:00:00Z',
    },
    application: {
      id: 'app-1',
      token: 'abc123',
      jobTitle: 'Senior Product Manager',
      companyName: 'TechCorp Inc.',
      status: 'submitted',
      analysisStatus: 'completed',
      requiresVideo: true,
      requiresResume: true,
      requiresCaseStudy: true,
      requiresCoverLetter: false,
      createdAt: '2024-11-28T10:00:00Z',
      updatedAt: '2024-12-01T10:00:00Z',
    },
    candidate: {
      id: 'candidate-1',
      userId: 'user-1',
      headline: 'Product Manager',
      currentRole: 'Senior PM',
      currentCompany: 'StartupXYZ',
      location: 'San Francisco, CA',
      skills: ['Product Strategy', 'User Research', 'Agile'],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    analysis: {
      id: 'analysis-1',
      applicationId: 'app-1',
      overallScore: 78,
      aiSummary: 'Strong candidate with excellent communication skills.',
      analysisCount: 1,
      createdAt: '2024-12-01T10:00:00Z',
      updatedAt: '2024-12-01T10:00:00Z',
    },
  },
  {
    decision: {
      id: '2',
      employerUserId: 'employer-1',
      applicationId: 'app-2',
      decision: 'interested',
      createdAt: '2024-11-28T10:00:00Z',
    },
    application: {
      id: 'app-2',
      token: 'def456',
      jobTitle: 'Product Lead',
      companyName: 'TechCorp Inc.',
      status: 'submitted',
      analysisStatus: 'completed',
      requiresVideo: true,
      requiresResume: true,
      requiresCaseStudy: false,
      requiresCoverLetter: false,
      createdAt: '2024-11-25T10:00:00Z',
      updatedAt: '2024-11-28T10:00:00Z',
    },
    candidate: {
      id: 'candidate-2',
      userId: 'user-2',
      headline: 'Product Designer & Strategist',
      currentRole: 'Head of Product',
      currentCompany: 'DesignCo',
      location: 'New York, NY',
      skills: ['Product Design', 'Strategy', 'Leadership'],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    analysis: {
      id: 'analysis-2',
      applicationId: 'app-2',
      overallScore: 85,
      aiSummary: 'Exceptional candidate with strong leadership experience.',
      analysisCount: 1,
      createdAt: '2024-11-28T10:00:00Z',
      updatedAt: '2024-11-28T10:00:00Z',
    },
  },
];

export default function EmployerDashboard() {
  const stats = {
    savedCandidates: mockSavedCandidates.length,
    interviewsScheduled: 1,
    pendingReview: 3,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <DashboardLayout userRole="employer">
      <div className="bg-white min-h-screen rounded-tl-3xl">
        <TopBar title="Dashboard" />

        <div className="p-4 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-2">
              Welcome back!
            </h1>
            <p className="text-[#676767]">Here&apos;s an overview of your recruiting activity.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#F6F6F6] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#FCE4EC] rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#D81B60]" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1A1A1A]">{stats.savedCandidates}</p>
              <p className="text-sm text-[#676767]">Saved Candidates</p>
            </div>

            <div className="bg-[#F6F6F6] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#E3F2FD] rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#1565C0]" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1A1A1A]">{stats.interviewsScheduled}</p>
              <p className="text-sm text-[#676767]">Interviews Scheduled</p>
            </div>

            <div className="bg-[#F6F6F6] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#FFF3E0] rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#E65100]" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1A1A1A]">{stats.pendingReview}</p>
              <p className="text-sm text-[#676767]">Pending Review</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Saved Candidates */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#1A1A1A]">Saved Candidates</h2>
                <Link
                  href="/employer/saved-candidates"
                  className="text-sm text-[#3D80F8] hover:underline flex items-center gap-1"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {mockSavedCandidates.map((saved) => (
                  <Link
                    key={saved.decision.id}
                    href={`/application/${saved.application.token}?demo=employer`}
                    className="block bg-[#F6F6F6] rounded-xl p-4 hover:bg-[#EDEDED] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-br from-[#D96570] to-[#4A83F0] rounded-xl flex items-center justify-center">
                        <span className="text-lg font-bold text-white">
                          {saved.candidate.headline?.charAt(0) || 'C'}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-[#1A1A1A] truncate">
                            {saved.candidate.headline}
                          </h3>
                          {saved.analysis && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-[#EFF5FF] text-[#3D80F8] text-xs font-medium rounded-full">
                              <Star className="w-3 h-3" />
                              {saved.analysis.overallScore}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#676767] truncate">
                          {saved.candidate.currentRole} at {saved.candidate.currentCompany}
                        </p>
                        <p className="text-xs text-[#ACACAF] mt-1">
                          For: {saved.application.jobTitle}
                        </p>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="w-5 h-5 text-[#ACACAF] flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Profile */}
              <div className="bg-gradient-to-br from-[#3D80F8] to-[#1565C0] rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Complete Your Profile</h3>
                    <p className="text-sm opacity-80">Add company details</p>
                  </div>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full mb-2">
                  <div className="w-1/3 h-full bg-white rounded-full" />
                </div>
                <p className="text-sm opacity-80 mb-4">33% complete</p>
                <Link
                  href="/employer/profile"
                  className="block w-full py-2 bg-white text-[#3D80F8] font-bold text-center rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Edit Company Profile
                </Link>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link
                    href="/employer/saved-candidates"
                    className="flex items-center gap-3 p-4 bg-[#F6F6F6] rounded-xl hover:bg-[#EDEDED] transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#FCE4EC] rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-[#D81B60]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#1A1A1A]">View Saved Candidates</p>
                      <p className="text-sm text-[#676767]">
                        {stats.savedCandidates} candidates
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#ACACAF]" />
                  </Link>

                  <Link
                    href="/notifications"
                    className="flex items-center gap-3 p-4 bg-[#F6F6F6] rounded-xl hover:bg-[#EDEDED] transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#E3F2FD] rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#1565C0]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#1A1A1A]">Scheduled Interviews</p>
                      <p className="text-sm text-[#676767]">
                        {stats.interviewsScheduled} upcoming
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#ACACAF]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
