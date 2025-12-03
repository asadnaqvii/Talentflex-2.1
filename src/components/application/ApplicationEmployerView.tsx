'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  Bell,
  Briefcase,
  Calendar,
  Heart,
  X,
  Loader2,
  Linkedin,
  Globe,
  LogOut,
  User,
  Settings,
  ChevronDown,
} from 'lucide-react';
import {
  JobApplication,
  ApplicationFile,
  ApplicationAnalysis,
  CandidateProfile,
  EmployerDecision,
} from '@/types';
import CircularProgress from '@/components/ui/CircularProgress';
import RadarChart from '@/components/ui/RadarChart';
import ProgressBar from '@/components/ui/ProgressBar';
import VideoPlayer from '@/components/ui/VideoPlayer';

interface ApplicationEmployerViewProps {
  application: JobApplication;
  files: ApplicationFile[];
  analysis?: ApplicationAnalysis;
  candidate?: CandidateProfile;
  existingDecision?: EmployerDecision;
  isAuthenticated: boolean;
  token: string;
  onExpressInterest: (note?: string) => Promise<void>;
  onReject: (note?: string) => Promise<void>;
  onScheduleInterview: () => void;
}

// Mock transcript for demo
const mockTranscript = `JT: Hi Annisa! Thanks for joining us today. Let's start with a simple one—can you tell me a bit about yourself and your background in design?

AM: Sure! I'm a UI/UX and graphic designer based in Sidoarjo, Indonesia. I've been designing for about 4 years now, working on everything from landing pages and mobile apps to brand identities and marketing graphics.

JT: That's great. What tools do you usually use in your design workflow?

AM: I primarily use Figma for UI/UX projects, and Adobe Illustrator or Photoshop for graphic work. I also explore Procreate occasionally for illustrations.

JT: Awesome. Can you share a favorite project you've worked on and why it stood out?

AM: One of my favorites was designing a modern onboarding experience for an HR platform. I loved how it combined thoughtful UX with a friendly and approachable UI. Plus, the team gave me the creative freedom to explore fun layouts and motion ideas.

JT: How do you approach client feedback—especially if it's very different from your design opinion?

AM: I always start by listening carefully and understanding their perspective. Then I try to find a balance—explaining my design decisions clearly while also being open to compromise. It's about collaboration, not conflict.

JT: I love that. Last question—what excites you most about design right now?

AM: Honestly, I'm really into design systems and motion lately. Seeing how micro-interactions improve user experience makes me excited to create more functional and delightful designs.`;

export default function ApplicationEmployerView({
  application,
  files,
  analysis,
  candidate,
  existingDecision,
  isAuthenticated,
  token,
  onExpressInterest,
  onReject,
  onScheduleInterview,
}: ApplicationEmployerViewProps) {
  const [isExpressingInterest, setIsExpressingInterest] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState<'interest' | 'reject' | null>(null);
  const [note, setNote] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleExpressInterest = async () => {
    setIsExpressingInterest(true);
    try {
      await onExpressInterest(note);
      setShowNoteModal(null);
      setNote('');
    } finally {
      setIsExpressingInterest(false);
    }
  };

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      await onReject(note);
      setShowNoteModal(null);
      setNote('');
    } finally {
      setIsRejecting(false);
    }
  };

  const handleSignOut = () => {
    // TODO: Implement actual sign out logic
    window.location.href = '/signin';
  };

  // Mock data for radar chart
  const interviewScores = [
    { label: 'Communication', value: 85 },
    { label: 'Teamwork', value: 75 },
    { label: 'Attitude', value: 80 },
    { label: 'Professionalism', value: 70 },
    { label: 'Leadership', value: 65 },
    { label: 'Creativity', value: 90 },
    { label: 'Sociability', value: 72 },
  ];

  // Mock job fit analysis
  const jobFitScores = [
    { label: 'Technique Skill', value: 80 },
    { label: 'Technical Skill', value: 60 },
    { label: 'Domain Knowledge', value: 100 },
    { label: 'Problem Solving', value: 70 },
    { label: 'Communication', value: 80 },
  ];

  // Sign Up Overlay Component for unauthenticated users
  const SignUpOverlay = ({ message }: { message: string }) => (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-2xl">
      <p className="text-white text-lg font-medium mb-4 text-center px-4">{message}</p>
      <Link
        href={`/signup?redirect=/application/${token}`}
        className="px-6 py-2 bg-[#3D80F8] text-white font-bold rounded-lg hover:bg-[#2D6DE8] transition-colors"
      >
        Sign Up
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white lg:rounded-tl-3xl overflow-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 lg:px-8 py-4 lg:py-6 border-b border-[#EDEDED] sticky top-0 bg-white z-20">
        <div className="flex items-center gap-4">
          <Link href="/employer" className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F6F6F6] transition-colors">
            <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" />
          </Link>
          <h1 className="text-xl lg:text-2xl font-bold text-[#1A1A1A]">
            Candidate Application for {application.jobTitle || '[Name of Position]'}
          </h1>
        </div>

        {/* Auth Buttons / User Menu */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link
                href={`/signup?redirect=/application/${token}`}
                className="px-5 py-2 bg-[#3D80F8] text-white font-bold rounded-lg hover:bg-[#2D6DE8] transition-colors"
              >
                Sign Up
              </Link>
              <Link
                href={`/signin?redirect=/application/${token}`}
                className="px-5 py-2 border-2 border-[#EDEDED] text-[#1A1A1A] font-medium rounded-lg hover:bg-[#F6F6F6] transition-colors"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F6F6F6] transition-colors">
                <Bell className="w-5 h-5 text-[#676767]" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-[#F6F6F6] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3D80F8] to-[#6B9FFA] overflow-hidden flex items-center justify-center">
                    <span className="text-white font-bold">E</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#676767]" />
                </button>

                {/* User Dropdown */}
                {showUserDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#EDEDED] py-2 z-50">
                    <div className="px-4 py-3 border-b border-[#EDEDED]">
                      <p className="font-medium text-[#1A1A1A]">Employer User</p>
                      <p className="text-sm text-[#676767]">employer@company.com</p>
                    </div>
                    <Link
                      href="/employer/profile"
                      className="flex items-center gap-3 px-4 py-3 text-[#676767] hover:bg-[#F6F6F6] transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Company Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-3 text-[#676767] hover:bg-[#F6F6F6] transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[#C62828] hover:bg-[#FFEBEE] transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        {/* Candidate Header with Contact Button */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D96570] to-[#4A83F0] flex items-center justify-center overflow-hidden">
              {candidate?.photoUrl ? (
                <Image src={candidate.photoUrl} alt="Candidate" width={64} height={64} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {candidate?.headline?.charAt(0) || 'J'}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1A1A1A]">{candidate?.headline || 'John Carl'}</h2>
              <p className="text-[#676767]">{candidate?.currentRole || 'Graphic Designer'}</p>
            </div>
          </div>
          <button
            className="px-6 py-3 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold rounded-lg hover:bg-[#F6F6F6] transition-colors disabled:opacity-50"
            disabled={!isAuthenticated}
          >
            Contact Candidate
          </button>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left Column - Candidate Info, Video, and Analysis */}
          <div className="flex-1 space-y-6 max-w-3xl">
            {/* Candidate Profile Card */}
            <div className="bg-[#F6F6F6] rounded-2xl p-6 relative overflow-hidden">
              {!isAuthenticated && <SignUpOverlay message="Sign Up To See Candidate's Details" />}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D96570] to-[#4A83F0] flex items-center justify-center mb-4 overflow-hidden">
                  {candidate?.photoUrl ? (
                    <Image src={candidate.photoUrl} alt="Candidate" width={96} height={96} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-white">JC</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A]">{candidate?.headline || 'John Carl'}</h3>
                <p className="text-[#676767]">{candidate?.currentRole || 'Graphic Designer'}</p>
              </div>

              <p className="text-[#676767] text-center mb-6 leading-relaxed">
                {candidate?.about || 'Proficient in Adobe Creative Suite (Photoshop, Illustrator, InDesign) with a strong eye for aesthetics and a passion for turning ideas into impactful design solutions.'}
              </p>

              <div className="space-y-3 text-sm">
                {candidate?.linkedinUrl && (
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                    <span className="text-[#3D80F8]">{candidate.linkedinUrl}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-[#676767]" />
                  <span className="text-[#3D80F8]">www.behance.net/johncarl</span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-[#EDEDED]">
                  <span className="text-[#676767]">Location:</span>
                  <span className="font-medium text-[#1A1A1A]">{candidate?.location || 'Los Angeles'}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-[#EDEDED]">
                  <span className="text-[#676767]">Experience:</span>
                  <span className="font-medium text-[#1A1A1A]">3+ years</span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-[#EDEDED]">
                  <span className="text-[#676767]">Expected Salary:</span>
                  <span className="font-medium text-[#1A1A1A]">$800</span>
                </div>
              </div>
            </div>

            {/* Video Player */}
            <div className="rounded-2xl overflow-hidden relative">
              {!isAuthenticated && <SignUpOverlay message="Sign Up To Watch Candidate Recording" />}
              <VideoPlayer />
            </div>

            {/* AI Interview Score */}
            <div className="bg-[#F6F6F6] rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-6">AI Interview Score</h3>
              <div className="flex justify-center">
                <RadarChart data={interviewScores} size={250} />
              </div>
            </div>

            {/* Job Fit Analysis */}
            <div className="bg-[#F6F6F6] rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-6">Job Fit Analysis</h3>
              <div className="space-y-4">
                {jobFitScores.map((score, index) => (
                  <ProgressBar key={index} label={score.label} value={score.value} height={12} />
                ))}
              </div>
            </div>

            {/* Resume & Case Study Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resume */}
              <div className="bg-[#F6F6F6] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Resume</h3>
                <div className="flex justify-center gap-4">
                  <div className="text-center">
                    <CircularProgress value={analysis?.cvRelevanceScore ? analysis.cvRelevanceScore * 10 : 85} size={80} color="#3D80F8" />
                    <p className="text-sm text-[#676767] mt-2">Relevance</p>
                  </div>
                  <div className="text-center">
                    <CircularProgress value={85} size={80} color="#3D80F8" />
                    <p className="text-sm text-[#676767] mt-2">Readability</p>
                  </div>
                  <div className="text-center">
                    <CircularProgress value={85} size={80} color="#3D80F8" />
                    <p className="text-sm text-[#676767] mt-2">ATS</p>
                  </div>
                </div>
              </div>

              {/* Case Study */}
              <div className="bg-[#F6F6F6] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Case Study</h3>
                <div className="space-y-3 mb-4">
                  <ProgressBar label="Problem Solving" value={analysis?.caseStudyProblemSolvingScore ? analysis.caseStudyProblemSolvingScore * 10 : 85} height={8} />
                  <ProgressBar label="Analytical Depth" value={analysis?.caseStudyAnalyticalDepthScore ? analysis.caseStudyAnalyticalDepthScore * 10 : 85} height={8} />
                  <ProgressBar label="Presentation" value={analysis?.caseStudyPresentationScore ? analysis.caseStudyPresentationScore * 10 : 85} height={8} />
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F5D0C5] to-[#D4A59A] rounded-lg flex items-center justify-center overflow-hidden">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#1A1A1A]">Case Study</p>
                    <p className="text-sm text-[#676767]">View Analysis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Overall Score & Transcript */}
          <div className="xl:w-96 space-y-6">
            {/* Overall Score Summary */}
            <div className="bg-[#F6F6F6] rounded-2xl p-6">
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-6">Overall Score Summary</h3>
              <div className="flex justify-center mb-6">
                <CircularProgress
                  value={analysis?.overallScore || 85}
                  size={140}
                  strokeWidth={10}
                  color="#8B5CF6"
                  label="Overall Score"
                />
              </div>
              <div className="flex justify-center gap-6">
                <div className="text-center">
                  <CircularProgress value={analysis?.videoOverallScore ? analysis.videoOverallScore * 10 : 85} size={70} color="#3D80F8" />
                  <p className="text-sm text-[#676767] mt-2">Interview</p>
                </div>
                <div className="text-center">
                  <CircularProgress value={analysis?.cvOverallScore ? analysis.cvOverallScore * 10 : 85} size={70} color="#3D80F8" />
                  <p className="text-sm text-[#676767] mt-2">Resume</p>
                </div>
                <div className="text-center">
                  <CircularProgress value={analysis?.caseStudyOverallScore ? analysis.caseStudyOverallScore * 10 : 85} size={70} color="#3D80F8" />
                  <p className="text-sm text-[#676767] mt-2">Case Study</p>
                </div>
              </div>
            </div>

            {/* Interview Transcript */}
            <div className="bg-[#F6F6F6] rounded-2xl p-6 relative overflow-hidden">
              {!isAuthenticated && <SignUpOverlay message="Sign Up To See Interview Transcript" />}
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Interview Transcript</h3>

              {/* Transcript Meta */}
              <div className="grid grid-cols-2 gap-3 text-sm mb-4 p-4 bg-white rounded-xl">
                <div>
                  <span className="text-[#676767]">Role:</span>
                  <p className="font-medium text-[#1A1A1A]">{application.jobTitle || 'Graphic Designer'}</p>
                </div>
                <div>
                  <span className="text-[#676767]">Name:</span>
                  <p className="font-medium text-[#1A1A1A]">{candidate?.headline || 'John Carl'}</p>
                </div>
                <div>
                  <span className="text-[#676767]">Date:</span>
                  <p className="font-medium text-[#1A1A1A]">April 2025</p>
                </div>
                <div>
                  <span className="text-[#676767]">Interviewer:</span>
                  <p className="font-medium text-[#1A1A1A]">AI Interviewer</p>
                </div>
              </div>

              {/* Transcript Content */}
              <div className="max-h-96 overflow-y-auto text-sm text-[#676767] space-y-4 pr-2">
                {mockTranscript.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph.split(': ').map((part, i) => (
                      i === 0 ? (
                        <span key={i} className="font-bold text-[#1A1A1A]">{part}: </span>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    ))}
                  </p>
                ))}
              </div>
            </div>

            {/* Action Buttons - Only for authenticated employers */}
            {isAuthenticated && !existingDecision && (
              <div className="space-y-3">
                <button
                  onClick={() => setShowNoteModal('interest')}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  Express Interest
                </button>
                <button
                  onClick={() => setShowNoteModal('reject')}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-[#C62828] text-[#C62828] font-bold rounded-lg hover:bg-[#FFEBEE] transition-colors"
                >
                  <X className="w-5 h-5" />
                  Reject
                </button>
                <button
                  onClick={onScheduleInterview}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-[#3D80F8] text-[#3D80F8] font-bold rounded-lg hover:bg-[#EFF5FF] transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule Interview
                </button>
              </div>
            )}

            {existingDecision && (
              <div
                className={`p-6 rounded-2xl ${
                  existingDecision.decision === 'interested'
                    ? 'bg-[#E8F5E9]'
                    : 'bg-[#FFEBEE]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {existingDecision.decision === 'interested' ? (
                    <Heart className="w-6 h-6 text-[#2E7D32] fill-current" />
                  ) : (
                    <X className="w-6 h-6 text-[#C62828]" />
                  )}
                  <span
                    className={`text-lg font-bold ${
                      existingDecision.decision === 'interested'
                        ? 'text-[#2E7D32]'
                        : 'text-[#C62828]'
                    }`}
                  >
                    {existingDecision.decision === 'interested'
                      ? 'Interested'
                      : 'Rejected'}
                  </span>
                </div>
                {existingDecision.note && (
                  <p className="text-sm text-[#676767]">{existingDecision.note}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">
              {showNoteModal === 'interest' ? 'Express Interest' : 'Reject Candidate'}
            </h3>
            <p className="text-sm text-[#676767] mb-4">
              Add an optional note (visible to internal team only)
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note..."
              className="w-full p-3 border-2 border-[#EDEDED] rounded-lg resize-none h-24 focus:border-[#3D80F8] outline-none transition-colors"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setShowNoteModal(null);
                  setNote('');
                }}
                className="flex-1 px-4 py-3 border-2 border-[#EDEDED] text-[#676767] font-medium rounded-lg hover:bg-[#F6F6F6] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={showNoteModal === 'interest' ? handleExpressInterest : handleReject}
                disabled={isExpressingInterest || isRejecting}
                className={`flex-1 px-4 py-3 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  showNoteModal === 'interest'
                    ? 'bg-[#2E7D32] hover:bg-[#1B5E20] text-white'
                    : 'bg-[#C62828] hover:bg-[#B71C1C] text-white'
                }`}
              >
                {(isExpressingInterest || isRejecting) && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                {showNoteModal === 'interest' ? 'Express Interest' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showUserDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserDropdown(false)}
        />
      )}
    </div>
  );
}
