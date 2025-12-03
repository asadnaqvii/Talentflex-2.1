'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Eye, MoreVertical, ChevronDown } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/layout/TopBar';
import { ApplicationStatus } from '@/types';

interface PipelineApplication {
  id: string;
  token: string;
  jobTitle: string;
  companyName: string;
  candidateName: string | null;
  candidateEmail: string | null;
  status: ApplicationStatus;
  overallScore: number | null;
  createdAt: string;
  submittedAt: string | null;
  interestedEmployers: number;
}

// Mock data for development
const mockApplications: PipelineApplication[] = [
  {
    id: '1',
    token: 'abc123def456',
    jobTitle: 'Senior Product Manager',
    companyName: 'TechCorp Inc.',
    candidateName: 'Sarah Johnson',
    candidateEmail: 'sarah@example.com',
    status: 'submitted',
    overallScore: 87,
    createdAt: '2024-01-15',
    submittedAt: '2024-01-18',
    interestedEmployers: 3,
  },
  {
    id: '2',
    token: 'xyz789ghi012',
    jobTitle: 'UX Designer',
    companyName: 'DesignHub',
    candidateName: 'Mike Chen',
    candidateEmail: 'mike@example.com',
    status: 'analyzed',
    overallScore: 72,
    createdAt: '2024-01-16',
    submittedAt: null,
    interestedEmployers: 0,
  },
  {
    id: '3',
    token: 'mno345pqr678',
    jobTitle: 'Full Stack Developer',
    companyName: 'StartupXYZ',
    candidateName: 'Emily Davis',
    candidateEmail: 'emily@example.com',
    status: 'draft',
    overallScore: null,
    createdAt: '2024-01-17',
    submittedAt: null,
    interestedEmployers: 0,
  },
  {
    id: '4',
    token: 'stu901vwx234',
    jobTitle: 'Data Analyst',
    companyName: 'Analytics Pro',
    candidateName: null,
    candidateEmail: null,
    status: 'unclaimed',
    overallScore: null,
    createdAt: '2024-01-18',
    submittedAt: null,
    interestedEmployers: 0,
  },
  {
    id: '5',
    token: 'yza567bcd890',
    jobTitle: 'Marketing Manager',
    companyName: 'BrandBoost',
    candidateName: 'Alex Rivera',
    candidateEmail: 'alex@example.com',
    status: 'submitted',
    overallScore: 91,
    createdAt: '2024-01-14',
    submittedAt: '2024-01-17',
    interestedEmployers: 5,
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

export default function PipelineTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.candidateName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      app.token.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleCopyLink = (token: string) => {
    const link = `${window.location.origin}/application/${token}`;
    navigator.clipboard.writeText(link);
  };

  return (
    <DashboardLayout userRole="internal">
      <div className="bg-white min-h-screen rounded-tl-3xl">
        <TopBar title="Application Pipeline" />

        <div className="p-4 lg:p-8">
          {/* Stats Summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-[#676767]">Total Applications</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">{mockApplications.length}</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4">
              <p className="text-sm text-[#676767]">Unclaimed</p>
              <p className="text-2xl font-bold text-yellow-600">
                {mockApplications.filter((a) => a.status === 'unclaimed').length}
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-[#676767]">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {mockApplications.filter((a) => a.status === 'draft' || a.status === 'analyzed').length}
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm text-[#676767]">Submitted</p>
              <p className="text-2xl font-bold text-green-600">
                {mockApplications.filter((a) => a.status === 'submitted').length}
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ACACAF]" />
              <input
                type="text"
                placeholder="Search by job title, company, candidate, or token..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none transition-colors"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="flex items-center gap-2 px-4 py-3 border-2 border-[#EDEDED] rounded-lg hover:border-[#D3D3D3] transition-colors min-w-[150px]"
              >
                <Filter className="w-5 h-5 text-[#676767]" />
                <span className="text-[#1A1A1A]">
                  {statusFilter === 'all' ? 'All Status' : statusLabels[statusFilter]}
                </span>
                <ChevronDown className="w-4 h-4 text-[#676767] ml-auto" />
              </button>

              {showStatusDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#EDEDED] rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      setStatusFilter('all');
                      setShowStatusDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-[#F6F6F6] transition-colors"
                  >
                    All Status
                  </button>
                  {(Object.keys(statusLabels) as ApplicationStatus[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setShowStatusDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-[#F6F6F6] transition-colors"
                    >
                      {statusLabels[status]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#F6F6F6] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#EDEDED]">
                    <th className="text-left px-4 py-4 text-sm font-bold text-[#676767]">
                      Job / Company
                    </th>
                    <th className="text-left px-4 py-4 text-sm font-bold text-[#676767]">
                      Candidate
                    </th>
                    <th className="text-left px-4 py-4 text-sm font-bold text-[#676767]">
                      Status
                    </th>
                    <th className="text-left px-4 py-4 text-sm font-bold text-[#676767]">
                      Score
                    </th>
                    <th className="text-left px-4 py-4 text-sm font-bold text-[#676767]">
                      Interest
                    </th>
                    <th className="text-left px-4 py-4 text-sm font-bold text-[#676767]">
                      Created
                    </th>
                    <th className="text-right px-4 py-4 text-sm font-bold text-[#676767]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <tr
                      key={app.id}
                      className="border-b border-[#EDEDED] last:border-b-0 bg-white hover:bg-[#FAFAFA] transition-colors"
                    >
                      <td className="px-4 py-4">
                        <p className="font-medium text-[#1A1A1A]">{app.jobTitle}</p>
                        <p className="text-sm text-[#676767]">{app.companyName}</p>
                      </td>
                      <td className="px-4 py-4">
                        {app.candidateName ? (
                          <>
                            <p className="font-medium text-[#1A1A1A]">{app.candidateName}</p>
                            <p className="text-sm text-[#676767]">{app.candidateEmail}</p>
                          </>
                        ) : (
                          <span className="text-sm text-[#ACACAF] italic">Not claimed</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[app.status].bg} ${statusColors[app.status].text}`}
                        >
                          {statusLabels[app.status]}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {app.overallScore !== null ? (
                          <span className={`font-bold ${getScoreColor(app.overallScore)}`}>
                            {app.overallScore}
                          </span>
                        ) : (
                          <span className="text-sm text-[#ACACAF]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {app.interestedEmployers > 0 ? (
                          <span className="font-medium text-[#3D80F8]">
                            {app.interestedEmployers} interested
                          </span>
                        ) : (
                          <span className="text-sm text-[#ACACAF]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-[#676767]">{app.createdAt}</p>
                        {app.submittedAt && (
                          <p className="text-xs text-[#ACACAF]">Submitted: {app.submittedAt}</p>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/application/${app.token}`}
                            className="p-2 text-[#3D80F8] hover:bg-[#EFF5FF] rounded-lg transition-colors"
                            title="View Application"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleCopyLink(app.token)}
                            className="p-2 text-[#676767] hover:bg-[#F6F6F6] rounded-lg transition-colors"
                            title="Copy Link"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredApplications.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-[#676767]">No applications found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
