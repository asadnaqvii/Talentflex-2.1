'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, ArrowRight, Users, FileText, Clock, CheckCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/layout/TopBar';
import { ApplicationStatus } from '@/types';

interface RecentApplication {
  id: string;
  token: string;
  jobTitle: string;
  companyName: string;
  candidateName: string | null;
  status: ApplicationStatus;
  createdAt: string;
}

// Mock data
const mockStats = {
  totalApplications: 47,
  unclaimed: 8,
  inProgress: 12,
  submitted: 27,
  interestedEmployers: 15,
};

const mockRecentApplications: RecentApplication[] = [
  {
    id: '1',
    token: 'abc123',
    jobTitle: 'Senior Product Manager',
    companyName: 'TechCorp',
    candidateName: 'Sarah Johnson',
    status: 'submitted',
    createdAt: '2 hours ago',
  },
  {
    id: '2',
    token: 'def456',
    jobTitle: 'UX Designer',
    companyName: 'DesignHub',
    candidateName: 'Mike Chen',
    status: 'analyzed',
    createdAt: '4 hours ago',
  },
  {
    id: '3',
    token: 'ghi789',
    jobTitle: 'Full Stack Developer',
    companyName: 'StartupXYZ',
    candidateName: null,
    status: 'unclaimed',
    createdAt: '1 day ago',
  },
  {
    id: '4',
    token: 'jkl012',
    jobTitle: 'Data Analyst',
    companyName: 'Analytics Pro',
    candidateName: 'Emily Davis',
    status: 'draft',
    createdAt: '1 day ago',
  },
];

const statusColors: Record<ApplicationStatus, { bg: string; text: string }> = {
  unclaimed: { bg: 'bg-gray-100', text: 'text-gray-600' },
  draft: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  analyzed: { bg: 'bg-blue-100', text: 'text-blue-700' },
  submitted: { bg: 'bg-green-100', text: 'text-green-700' },
};

const statusLabels: Record<ApplicationStatus, string> = {
  unclaimed: 'Unclaimed',
  draft: 'Draft',
  analyzed: 'Analyzed',
  submitted: 'Submitted',
};

export default function AdminDashboard() {
  return (
    <DashboardLayout userRole="internal">
      <div className="bg-white min-h-screen rounded-tl-3xl">
        <TopBar title="Admin Dashboard" />

        <div className="p-4 lg:p-8 space-y-6">
          {/* Quick Action */}
          <Link
            href="/admin/create-application"
            className="flex items-center justify-between p-4 bg-gradient-to-r from-[#3D80F8] to-[#6B9FFA] rounded-2xl text-white hover:opacity-95 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Create New Application Link</h2>
                <p className="text-sm text-white/80">Generate a unique link for a new job opportunity</p>
              </div>
            </div>
            <ArrowRight className="w-6 h-6" />
          </Link>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#F6F6F6] rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#3D80F8]/10 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#3D80F8]" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1A1A1A]">{mockStats.totalApplications}</p>
              <p className="text-sm text-[#676767]">Total Applications</p>
            </div>

            <div className="bg-[#F6F6F6] rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1A1A1A]">{mockStats.unclaimed}</p>
              <p className="text-sm text-[#676767]">Unclaimed Links</p>
            </div>

            <div className="bg-[#F6F6F6] rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1A1A1A]">{mockStats.inProgress}</p>
              <p className="text-sm text-[#676767]">In Progress</p>
            </div>

            <div className="bg-[#F6F6F6] rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1A1A1A]">{mockStats.submitted}</p>
              <p className="text-sm text-[#676767]">Submitted</p>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#1A1A1A]">Recent Applications</h2>
              <Link
                href="/admin/pipeline"
                className="text-sm font-medium text-[#3D80F8] hover:underline flex items-center gap-1"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {mockRecentApplications.map((app) => (
                <Link
                  key={app.id}
                  href={`/application/${app.token}`}
                  className="flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-sm transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-medium text-[#1A1A1A]">{app.jobTitle}</p>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[app.status].bg} ${statusColors[app.status].text}`}
                      >
                        {statusLabels[app.status]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#676767]">
                      <span>{app.companyName}</span>
                      <span>•</span>
                      {app.candidateName ? (
                        <span>{app.candidateName}</span>
                      ) : (
                        <span className="italic text-[#ACACAF]">Awaiting candidate</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#ACACAF]">{app.createdAt}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Pipeline Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status Breakdown */}
            <div className="bg-[#F6F6F6] rounded-2xl p-6">
              <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Application Status</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#676767]">Unclaimed</span>
                    <span className="text-sm font-medium text-[#1A1A1A]">{mockStats.unclaimed}</span>
                  </div>
                  <div className="h-2 bg-[#EDEDED] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-400 rounded-full"
                      style={{ width: `${(mockStats.unclaimed / mockStats.totalApplications) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#676767]">In Progress</span>
                    <span className="text-sm font-medium text-[#1A1A1A]">{mockStats.inProgress}</span>
                  </div>
                  <div className="h-2 bg-[#EDEDED] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 rounded-full"
                      style={{ width: `${(mockStats.inProgress / mockStats.totalApplications) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#676767]">Submitted</span>
                    <span className="text-sm font-medium text-[#1A1A1A]">{mockStats.submitted}</span>
                  </div>
                  <div className="h-2 bg-[#EDEDED] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-400 rounded-full"
                      style={{ width: `${(mockStats.submitted / mockStats.totalApplications) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Employer Interest */}
            <div className="bg-[#F6F6F6] rounded-2xl p-6">
              <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Employer Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                  <div>
                    <p className="text-2xl font-bold text-[#3D80F8]">{mockStats.interestedEmployers}</p>
                    <p className="text-sm text-[#676767]">Employers showing interest</p>
                  </div>
                  <div className="w-12 h-12 bg-[#EFF5FF] rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#3D80F8]" />
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl">
                  <p className="text-sm text-[#676767] mb-2">Top performing applications</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-[#EDEDED] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#3D80F8] to-[#6B9FFA] rounded-full" style={{ width: '75%' }} />
                    </div>
                    <span className="text-sm font-medium text-[#3D80F8]">75%</span>
                  </div>
                  <p className="text-xs text-[#ACACAF] mt-1">of submitted applications received interest</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
