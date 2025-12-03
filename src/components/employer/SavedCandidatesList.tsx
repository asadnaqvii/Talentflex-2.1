'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Star, MapPin, ArrowRight, Heart, Calendar, Filter } from 'lucide-react';
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
      note: 'Great fit for the PM role. Schedule interview soon.',
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
      skills: ['Product Strategy', 'User Research', 'Agile', 'Data Analysis'],
      about:
        'Passionate product manager with 6 years of experience building consumer and B2B products.',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    analysis: {
      id: 'analysis-1',
      applicationId: 'app-1',
      overallScore: 78,
      aiSummary:
        'Strong candidate with excellent communication skills and solid product experience.',
      keyStrengths: ['Communication', 'Strategic thinking', 'User empathy'],
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
      skills: ['Product Design', 'Strategy', 'Leadership', 'UX Research'],
      about: 'Design-focused product leader with experience scaling products from 0 to 1M users.',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    analysis: {
      id: 'analysis-2',
      applicationId: 'app-2',
      overallScore: 85,
      aiSummary: 'Exceptional candidate with strong leadership experience and design background.',
      keyStrengths: ['Leadership', 'Design thinking', 'Scaling products'],
      analysisCount: 1,
      createdAt: '2024-11-28T10:00:00Z',
      updatedAt: '2024-11-28T10:00:00Z',
    },
  },
  {
    decision: {
      id: '3',
      employerUserId: 'employer-1',
      applicationId: 'app-3',
      decision: 'interested',
      createdAt: '2024-11-25T10:00:00Z',
    },
    application: {
      id: 'app-3',
      token: 'ghi789',
      jobTitle: 'VP of Product',
      companyName: 'TechCorp Inc.',
      status: 'submitted',
      analysisStatus: 'completed',
      requiresVideo: true,
      requiresResume: true,
      requiresCaseStudy: true,
      requiresCoverLetter: false,
      createdAt: '2024-11-20T10:00:00Z',
      updatedAt: '2024-11-25T10:00:00Z',
    },
    candidate: {
      id: 'candidate-3',
      userId: 'user-3',
      headline: 'VP Product',
      currentRole: 'VP of Product',
      currentCompany: 'Enterprise Inc.',
      location: 'Austin, TX',
      skills: ['Executive Leadership', 'P&L Management', 'Team Building', 'Strategy'],
      about: 'Seasoned product executive with 15+ years building and leading product teams.',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    analysis: {
      id: 'analysis-3',
      applicationId: 'app-3',
      overallScore: 92,
      aiSummary:
        'Outstanding executive candidate with proven track record of building successful products.',
      keyStrengths: ['Executive presence', 'Strategic vision', 'Team leadership'],
      analysisCount: 1,
      createdAt: '2024-11-25T10:00:00Z',
      updatedAt: '2024-11-25T10:00:00Z',
    },
  },
];

type SortOption = 'recent' | 'score_high' | 'score_low';

export default function SavedCandidatesList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const filteredAndSortedCandidates = mockSavedCandidates
    .filter((saved) => {
      const matchesSearch =
        saved.candidate.headline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        saved.candidate.currentRole?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        saved.candidate.currentCompany?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        saved.application.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'score_high':
          return (b.analysis?.overallScore || 0) - (a.analysis?.overallScore || 0);
        case 'score_low':
          return (a.analysis?.overallScore || 0) - (b.analysis?.overallScore || 0);
        case 'recent':
        default:
          return (
            new Date(b.decision.createdAt).getTime() - new Date(a.decision.createdAt).getTime()
          );
      }
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#2E7D32] bg-[#E8F5E9]';
    if (score >= 60) return 'text-[#F57C00] bg-[#FFF3E0]';
    return 'text-[#C62828] bg-[#FFEBEE]';
  };

  return (
    <DashboardLayout userRole="employer">
      <div className="bg-white min-h-screen rounded-tl-3xl">
        <TopBar title="Saved Candidates" showBack />

        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#1A1A1A]">Saved Candidates</h1>
              <p className="text-[#676767]">
                {filteredAndSortedCandidates.length} candidates you&apos;ve expressed interest in
              </p>
            </div>

            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ACACAF]" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none transition-colors"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 border-2 border-[#EDEDED] rounded-lg focus:border-[#3D80F8] outline-none transition-colors bg-white"
              >
                <option value="recent">Most Recent</option>
                <option value="score_high">Highest Score</option>
                <option value="score_low">Lowest Score</option>
              </select>
            </div>
          </div>

          {/* Candidates List */}
          {filteredAndSortedCandidates.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-[#F6F6F6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#ACACAF]" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">No saved candidates</h3>
              <p className="text-[#676767]">
                {searchQuery
                  ? 'Try adjusting your search'
                  : "You haven't saved any candidates yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSortedCandidates.map((saved) => (
                <div
                  key={saved.decision.id}
                  className="bg-[#F6F6F6] rounded-xl p-4 lg:p-6"
                >
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Avatar and Basic Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#D96570] to-[#4A83F0] rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xl font-bold text-white">
                          {saved.candidate.headline?.charAt(0) || 'C'}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-[#1A1A1A]">
                            {saved.candidate.headline}
                          </h3>
                          {saved.analysis && (
                            <span
                              className={`flex items-center gap-1 px-2 py-0.5 text-sm font-medium rounded-full ${getScoreColor(
                                saved.analysis.overallScore
                              )}`}
                            >
                              <Star className="w-3 h-3" />
                              {saved.analysis.overallScore}
                            </span>
                          )}
                        </div>
                        <p className="text-[#676767]">
                          {saved.candidate.currentRole} at {saved.candidate.currentCompany}
                        </p>
                        {saved.candidate.location && (
                          <p className="text-sm text-[#ACACAF] flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {saved.candidate.location}
                          </p>
                        )}

                        {/* Skills */}
                        {saved.candidate.skills && saved.candidate.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {saved.candidate.skills.slice(0, 4).map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-[#EDEDED] text-[#676767] text-xs font-medium rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                            {saved.candidate.skills.length > 4 && (
                              <span className="px-2 py-1 text-[#676767] text-xs">
                                +{saved.candidate.skills.length - 4} more
                              </span>
                            )}
                          </div>
                        )}

                        {/* Applied For */}
                        <div className="mt-3 pt-3 border-t border-[#EDEDED]">
                          <p className="text-sm text-[#676767]">
                            <span className="font-medium">Applied for:</span>{' '}
                            {saved.application.jobTitle}
                          </p>
                          <p className="text-xs text-[#ACACAF] mt-1">
                            Saved on {formatDate(saved.decision.createdAt)}
                          </p>
                        </div>

                        {/* Note */}
                        {saved.decision.note && (
                          <div className="mt-3 p-3 bg-[#EFF5FF] rounded-lg">
                            <p className="text-sm text-[#1A1A1A]">
                              <span className="font-medium">Your note:</span>{' '}
                              {saved.decision.note}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row lg:flex-col gap-3 lg:w-40">
                      <Link
                        href={`/application/${saved.application.token}?demo=employer`}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#3D80F8] hover:bg-[#2D6DE8] text-white font-medium rounded-lg transition-colors"
                      >
                        View
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#3D80F8] text-[#3D80F8] font-medium rounded-lg hover:bg-[#EFF5FF] transition-colors">
                        <Calendar className="w-4 h-4" />
                        Schedule
                      </button>
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
