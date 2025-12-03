'use client';

import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  User,
  Bell,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/layout/TopBar';
import { JobApplication, Notification } from '@/types';

// Mock data for development
const mockApplications: JobApplication[] = [
  {
    id: '1',
    token: 'abc123',
    jobTitle: 'Senior Product Manager',
    companyName: 'TechCorp Inc.',
    status: 'submitted',
    analysisStatus: 'completed',
    requiresVideo: true,
    requiresResume: true,
    requiresCaseStudy: true,
    requiresCoverLetter: false,
    submittedAt: '2024-12-01T10:00:00Z',
    createdAt: '2024-11-28T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z',
  },
  {
    id: '2',
    token: 'def456',
    jobTitle: 'Product Lead',
    companyName: 'StartupXYZ',
    status: 'analyzed',
    analysisStatus: 'completed',
    requiresVideo: true,
    requiresResume: true,
    requiresCaseStudy: false,
    requiresCoverLetter: false,
    createdAt: '2024-11-25T10:00:00Z',
    updatedAt: '2024-11-30T10:00:00Z',
  },
  {
    id: '3',
    token: 'ghi789',
    jobTitle: 'VP of Product',
    companyName: 'Enterprise Co.',
    status: 'draft',
    analysisStatus: 'pending',
    requiresVideo: true,
    requiresResume: true,
    requiresCaseStudy: true,
    requiresCoverLetter: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
  },
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'employer_interested',
    title: 'Employer Interested!',
    message: 'TechCorp Inc. has expressed interest in your application.',
    read: false,
    createdAt: '2024-12-03T10:00:00Z',
  },
  {
    id: '2',
    userId: '1',
    type: 'analysis_complete',
    title: 'Analysis Complete',
    message: 'Your application for Product Lead has been analyzed.',
    read: true,
    createdAt: '2024-11-30T14:00:00Z',
  },
];

export default function CandidateDashboard() {
  const stats = {
    total: mockApplications.length,
    submitted: mockApplications.filter((a) => a.status === 'submitted').length,
    pending: mockApplications.filter((a) => a.status === 'draft' || a.status === 'analyzed')
      .length,
    interestReceived: 1,
  };

  const getStatusBadge = (status: JobApplication['status']) => {
    switch (status) {
      case 'draft':
        return (
          <span className="px-2 py-1 bg-[#FFF3E0] text-[#E65100] text-xs font-medium rounded-full">
            Draft
          </span>
        );
      case 'analyzed':
        return (
          <span className="px-2 py-1 bg-[#E3F2FD] text-[#1565C0] text-xs font-medium rounded-full">
            Ready to Submit
          </span>
        );
      case 'submitted':
        return (
          <span className="px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-medium rounded-full">
            Submitted
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <DashboardLayout userRole="candidate">
      <div className="bg-white min-h-screen rounded-tl-3xl">
        <TopBar title="Dashboard" />

        <div className="p-4 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-2">
              Welcome back!
            </h1>
            <p className="text-[#676767]">
              Here&apos;s an overview of your applications and activity.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#F6F6F6] rounded-xl p-4 lg:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#EFF5FF] rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-[#3D80F8]" />
                </div>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-[#1A1A1A]">{stats.total}</p>
              <p className="text-sm text-[#676767]">Total Applications</p>
            </div>

            <div className="bg-[#F6F6F6] rounded-xl p-4 lg:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#E8F5E9] rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#2E7D32]" />
                </div>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-[#1A1A1A]">{stats.submitted}</p>
              <p className="text-sm text-[#676767]">Submitted</p>
            </div>

            <div className="bg-[#F6F6F6] rounded-xl p-4 lg:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#FFF3E0] rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#E65100]" />
                </div>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-[#1A1A1A]">{stats.pending}</p>
              <p className="text-sm text-[#676767]">Pending</p>
            </div>

            <div className="bg-[#F6F6F6] rounded-xl p-4 lg:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#FCE4EC] rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#D81B60]" />
                </div>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-[#1A1A1A]">
                {stats.interestReceived}
              </p>
              <p className="text-sm text-[#676767]">Interest Received</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Applications */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#1A1A1A]">Recent Applications</h2>
                <Link
                  href="/candidate/applications"
                  className="text-sm text-[#3D80F8] hover:underline flex items-center gap-1"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {mockApplications.map((app) => (
                  <Link
                    key={app.id}
                    href={`/application/${app.token}`}
                    className="block bg-[#F6F6F6] rounded-xl p-4 hover:bg-[#EDEDED] transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-[#1A1A1A]">{app.jobTitle}</h3>
                          {getStatusBadge(app.status)}
                        </div>
                        <p className="text-sm text-[#676767] mb-2">{app.companyName}</p>
                        <p className="text-xs text-[#ACACAF]">
                          {app.submittedAt
                            ? `Submitted ${formatDate(app.submittedAt)}`
                            : `Last updated ${formatDate(app.updatedAt)}`}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#ACACAF]" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Completion */}
              <div className="bg-gradient-to-br from-[#D96570] to-[#4A83F0] rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Complete Your Profile</h3>
                    <p className="text-sm opacity-80">Stand out to employers</p>
                  </div>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full mb-2">
                  <div className="w-2/3 h-full bg-white rounded-full" />
                </div>
                <p className="text-sm opacity-80 mb-4">66% complete</p>
                <Link
                  href="/candidate/profile"
                  className="block w-full py-2 bg-white text-[#3D80F8] font-bold text-center rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Edit Profile
                </Link>
              </div>

              {/* Recent Notifications */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[#1A1A1A]">Notifications</h2>
                  <Link
                    href="/notifications"
                    className="text-sm text-[#3D80F8] hover:underline"
                  >
                    View All
                  </Link>
                </div>

                <div className="space-y-3">
                  {mockNotifications.slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-xl ${
                        notification.read ? 'bg-[#F6F6F6]' : 'bg-[#EFF5FF]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            notification.type === 'employer_interested'
                              ? 'bg-[#FCE4EC]'
                              : 'bg-[#E8F5E9]'
                          }`}
                        >
                          {notification.type === 'employer_interested' ? (
                            <Bell className="w-4 h-4 text-[#D81B60]" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#1A1A1A] text-sm">
                            {notification.title}
                          </p>
                          <p className="text-xs text-[#676767]">{notification.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
