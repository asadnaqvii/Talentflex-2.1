'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Briefcase,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/layout/TopBar';
import { JobApplication } from '@/types';

// Mock data
const mockApplications: JobApplication[] = [
  {
    id: '1',
    token: 'abc123',
    jobTitle: 'Senior Product Manager',
    companyName: 'TechCorp Inc.',
    location: 'San Francisco, CA',
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
    location: 'New York, NY',
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
    location: 'Austin, TX',
    status: 'draft',
    analysisStatus: 'pending',
    requiresVideo: true,
    requiresResume: true,
    requiresCaseStudy: true,
    requiresCoverLetter: true,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
  },
  {
    id: '4',
    token: 'jkl012',
    jobTitle: 'Head of Product',
    companyName: 'GrowthCo',
    location: 'Remote',
    status: 'submitted',
    analysisStatus: 'completed',
    requiresVideo: true,
    requiresResume: true,
    requiresCaseStudy: true,
    requiresCoverLetter: false,
    submittedAt: '2024-11-15T10:00:00Z',
    createdAt: '2024-11-10T10:00:00Z',
    updatedAt: '2024-11-15T10:00:00Z',
  },
];

type StatusFilter = 'all' | 'draft' | 'analyzed' | 'submitted';

export default function ApplicationsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: JobApplication['status']) => {
    switch (status) {
      case 'draft':
        return (
          <span className="px-3 py-1 bg-[#FFF3E0] text-[#E65100] text-sm font-medium rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Draft
          </span>
        );
      case 'analyzed':
        return (
          <span className="px-3 py-1 bg-[#E3F2FD] text-[#1565C0] text-sm font-medium rounded-full flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Ready to Submit
          </span>
        );
      case 'submitted':
        return (
          <span className="px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-sm font-medium rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
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

  const getActionText = (status: JobApplication['status']) => {
    switch (status) {
      case 'draft':
        return 'Continue Application';
      case 'analyzed':
        return 'Review & Submit';
      case 'submitted':
        return 'View Application';
      default:
        return 'View';
    }
  };

  return (
    <DashboardLayout userRole="candidate">
      <div className="bg-white min-h-screen rounded-tl-3xl">
        <TopBar title="My Applications" showBack />

        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#1A1A1A]">My Applications</h1>
              <p className="text-[#676767]">{filteredApplications.length} applications</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ACACAF]" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none transition-colors"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="px-4 py-2 border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none transition-colors bg-white"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="analyzed">Ready to Submit</option>
                <option value="submitted">Submitted</option>
              </select>
            </div>
          </div>

          {/* Applications List */}
          {filteredApplications.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-[#F6F6F6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-[#ACACAF]" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">No applications found</h3>
              <p className="text-[#676767]">
                {searchQuery || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : "You haven't received any application links yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-[#F6F6F6] rounded-xl p-4 lg:p-6 hover:bg-[#EDEDED] transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-[#1A1A1A]">{app.jobTitle}</h3>
                        {getStatusBadge(app.status)}
                      </div>
                      <p className="text-[#676767] mb-1">{app.companyName}</p>
                      {app.location && (
                        <p className="text-sm text-[#ACACAF]">{app.location}</p>
                      )}
                    </div>

                    {/* Requirements */}
                    <div className="flex items-center gap-4 text-sm text-[#676767]">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Required:</span>
                        <div className="flex gap-1">
                          {app.requiresVideo && (
                            <span className="px-2 py-0.5 bg-[#EDEDED] rounded text-xs">
                              Video
                            </span>
                          )}
                          {app.requiresResume && (
                            <span className="px-2 py-0.5 bg-[#EDEDED] rounded text-xs">CV</span>
                          )}
                          {app.requiresCaseStudy && (
                            <span className="px-2 py-0.5 bg-[#EDEDED] rounded text-xs">
                              Case Study
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Date and Action */}
                    <div className="flex items-center justify-between lg:justify-end gap-4">
                      <div className="text-sm text-[#ACACAF]">
                        {app.submittedAt ? (
                          <>Submitted {formatDate(app.submittedAt)}</>
                        ) : (
                          <>Updated {formatDate(app.updatedAt)}</>
                        )}
                      </div>
                      <Link
                        href={`/application/${app.token}?demo=candidate`}
                        className="flex items-center gap-2 px-4 py-2 bg-[#3D80F8] hover:bg-[#2D6DE8] text-white font-medium rounded-lg transition-colors"
                      >
                        {getActionText(app.status)}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
