'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronDown,
  Upload,
  Video,
  FileText,
  Check,
  AlertCircle,
  Loader2,
  RefreshCw,
  Play,
} from 'lucide-react';
import { JobApplication, ApplicationFile, ApplicationAnalysis, ApplicationStatus } from '@/types';
import CircularProgress from '@/components/ui/CircularProgress';
import RadarChart from '@/components/ui/RadarChart';
import ProgressBar from '@/components/ui/ProgressBar';

interface ApplicationCandidateViewProps {
  application: JobApplication;
  files: ApplicationFile[];
  analysis?: ApplicationAnalysis;
  onFileUpload: (fileType: string, file: File) => Promise<void>;
  onAnalyze: () => Promise<void>;
  onSubmit: () => Promise<void>;
  onReplaceFile: (fileType: string) => void;
}

export default function ApplicationCandidateView({
  application,
  files,
  analysis,
  onFileUpload,
  onAnalyze,
  onSubmit,
  onReplaceFile,
}: ApplicationCandidateViewProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<string | null>(null);
  const [jobDropdownOpen, setJobDropdownOpen] = useState(false);

  const getFileByType = (type: string) => files.find((f) => f.fileType === type);
  const videoFile = getFileByType('video');
  const resumeFile = getFileByType('resume');
  const caseStudyFile = getFileByType('case_study');

  const allRequiredFilesUploaded =
    (!application.requiresVideo || videoFile) &&
    (!application.requiresResume || resumeFile) &&
    (!application.requiresCaseStudy || caseStudyFile);

  const handleFileChange = async (fileType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingFile(fileType);
      try {
        await onFileUpload(fileType, file);
      } finally {
        setUploadingFile(null);
      }
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      await onAnalyze();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock data for radar chart (will come from analysis in production)
  const interviewScores = [
    { label: 'Communication', value: analysis?.videoCommunicationScore ? analysis.videoCommunicationScore * 10 : 85 },
    { label: 'Teamwork', value: 75 },
    { label: 'Attitude', value: 80 },
    { label: 'Professionalism', value: 70 },
    { label: 'Leadership', value: 65 },
    { label: 'Creativity', value: 90 },
    { label: 'Sociability', value: 72 },
  ];

  // Job fit analysis scores
  const jobFitScores = [
    { label: 'Technical Skill', value: analysis?.cvSkillsMatchScore ? analysis.cvSkillsMatchScore * 10 : 80 },
    { label: 'Experience Match', value: analysis?.cvExperienceMatchScore ? analysis.cvExperienceMatchScore * 10 : 60 },
    { label: 'Domain Knowledge', value: 100 },
    { label: 'Problem Solving', value: analysis?.caseStudyProblemSolvingScore ? analysis.caseStudyProblemSolvingScore * 10 : 70 },
    { label: 'Communication', value: analysis?.videoCommunicationScore ? analysis.videoCommunicationScore * 10 : 80 },
  ];

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'draft':
        return (
          <span className="px-3 py-1 bg-[#FFF3E0] text-[#E65100] text-sm font-medium rounded-full">
            Draft
          </span>
        );
      case 'analyzed':
        return (
          <span className="px-3 py-1 bg-[#E3F2FD] text-[#1565C0] text-sm font-medium rounded-full">
            Analyzed - Review Your Scores
          </span>
        );
      case 'submitted':
        return (
          <span className="px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-sm font-medium rounded-full">
            Submitted
          </span>
        );
      default:
        return null;
    }
  };

  // Show rich analysis view for analyzed/submitted states
  const showAnalysisView = (application.status === 'analyzed' || application.status === 'submitted') && analysis;

  return (
    <div className="min-h-screen bg-white rounded-tl-3xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 lg:px-8 py-4 lg:py-6 border-b border-[#EDEDED] sticky top-0 bg-white z-20 rounded-tl-3xl">
        <div className="flex items-center gap-4">
          <Link href="/candidate" className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F6F6F6] transition-colors">
            <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" />
          </Link>
          <h1 className="text-xl lg:text-2xl font-bold text-[#1A1A1A]">Job Details</h1>

          {/* Job Title Dropdown */}
          <div className="relative">
            <button
              onClick={() => setJobDropdownOpen(!jobDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-[#EDEDED] rounded-lg hover:bg-[#F6F6F6] transition-colors"
            >
              <span className="text-[#1A1A1A]">{application.jobTitle}</span>
              <ChevronDown className="w-4 h-4 text-[#676767]" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {getStatusBadge(application.status)}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        {/* Job Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A]">{application.jobTitle}, {application.companyName}</h2>
            <p className="text-[#676767]">{application.location}</p>
          </div>
          {application.status === 'analyzed' && (
            <Link
              href="#"
              className="px-6 py-3 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold rounded-lg hover:bg-[#F6F6F6] transition-colors"
            >
              Go To Room
            </Link>
          )}
        </div>

        {showAnalysisView ? (
          /* Rich Analysis View - Similar to Employer View */
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Left Column */}
            <div className="flex-1 space-y-6 max-w-3xl">
              {/* Video Player with Completion Overlay */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a2a3a] to-[#0d1520] aspect-video">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="text-xl font-bold mb-2">You&apos;ve Finished the Interview!</h3>
                  <p className="text-white/70 mb-4">Want to give it another shot?</p>
                  <button
                    onClick={() => onReplaceFile('video')}
                    className="px-6 py-2 bg-[#3D80F8] text-white font-bold rounded-lg hover:bg-[#2D6DE8] transition-colors"
                  >
                    Interview Again
                  </button>
                </div>
                {/* Video Controls Placeholder */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l-4-4m4 4l4-4" />
                    </svg>
                  </button>
                  <button className="w-12 h-12 rounded-full bg-[#E74C3C] flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
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
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#1A1A1A]">Resume</h3>
                    <button
                      onClick={() => onReplaceFile('resume')}
                      className="px-4 py-1 border border-[#EDEDED] text-sm text-[#676767] rounded-lg hover:bg-white transition-colors"
                    >
                      Change
                    </button>
                  </div>
                  <div className="flex justify-center gap-4 mb-4">
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
                  {/* Resume Preview */}
                  <div className="p-3 bg-white rounded-xl">
                    <div className="aspect-[8.5/11] bg-[#F0F4FF] rounded-lg flex items-center justify-center border border-[#E0E7FF] overflow-hidden">
                      <div className="text-center p-4">
                        <FileText className="w-8 h-8 text-[#3D80F8] mx-auto mb-2" />
                        <p className="text-xs text-[#676767]">{resumeFile?.originalFilename || 'resume.pdf'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Case Study */}
                <div className="bg-[#F6F6F6] rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#1A1A1A]">Case Study</h3>
                    <button className="w-8 h-8 flex items-center justify-center border border-[#EDEDED] rounded-lg hover:bg-white transition-colors">
                      <span className="text-[#676767]">+</span>
                    </button>
                  </div>
                  <div className="space-y-3 mb-4">
                    <ProgressBar label="Problem Solving" value={analysis?.caseStudyProblemSolvingScore ? analysis.caseStudyProblemSolvingScore * 10 : 85} height={8} />
                    <ProgressBar label="Analytical Depth" value={analysis?.caseStudyAnalyticalDepthScore ? analysis.caseStudyAnalyticalDepthScore * 10 : 85} height={8} />
                    <ProgressBar label="Presentation" value={analysis?.caseStudyPresentationScore ? analysis.caseStudyPresentationScore * 10 : 85} height={8} />
                  </div>
                  {/* Case Study Item */}
                  <div className="space-y-2">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#F5D0C5] to-[#D4A59A] rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#1A1A1A] text-sm">Case Study {item}</p>
                          <p className="text-xs text-[#676767]">Analysis</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#676767]">
                          <span>👍</span>
                          <span>648</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {application.status === 'analyzed' && (
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={() => onReplaceFile('all')}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-[#3D80F8] text-[#3D80F8] font-bold rounded-lg hover:bg-[#EFF5FF] transition-colors"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Replace Files & Re-Analyze
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold rounded-lg transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Submit to Employers
                      </>
                    )}
                  </button>
                </div>
              )}

              {application.status === 'submitted' && (
                <div className="flex items-center gap-4 p-4 bg-[#E8F5E9] rounded-xl">
                  <div className="w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A1A]">Application Submitted!</h3>
                    <p className="text-sm text-[#676767]">
                      Your application has been sent to the employer. You&apos;ll be notified when they respond.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Overall Score & Analysis */}
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

              {/* Overall Application Analysis */}
              <div className="bg-[#F6F6F6] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">Overall Application Analysis</h3>

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-3 text-sm mb-4 p-4 bg-white rounded-xl">
                  <div>
                    <span className="text-[#676767]">Role:</span>
                    <p className="font-medium text-[#1A1A1A]">{application.jobTitle}</p>
                  </div>
                  <div>
                    <span className="text-[#676767]">Company:</span>
                    <p className="font-medium text-[#1A1A1A]">{application.companyName}</p>
                  </div>
                  <div>
                    <span className="text-[#676767]">Date:</span>
                    <p className="font-medium text-[#1A1A1A]">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <span className="text-[#676767]">Status:</span>
                    <p className="font-medium text-[#1A1A1A] capitalize">{application.status}</p>
                  </div>
                </div>

                {/* AI Summary */}
                {analysis?.aiSummary && (
                  <div className="mb-4">
                    <h4 className="font-medium text-[#1A1A1A] mb-2">AI Summary</h4>
                    <p className="text-sm text-[#676767] leading-relaxed">{analysis.aiSummary}</p>
                  </div>
                )}

                {/* Key Strengths */}
                {analysis?.keyStrengths && analysis.keyStrengths.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-[#1A1A1A] mb-2">Key Strengths</h4>
                    <ul className="space-y-2">
                      {analysis.keyStrengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-[#676767]">
                          <Check className="w-4 h-4 text-[#2E7D32] mt-0.5 flex-shrink-0" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Areas of Concern */}
                {analysis?.areasOfConcern && analysis.areasOfConcern.length > 0 && (
                  <div>
                    <h4 className="font-medium text-[#1A1A1A] mb-2">Areas to Improve</h4>
                    <ul className="space-y-2">
                      {analysis.areasOfConcern.map((concern, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-[#676767]">
                          <AlertCircle className="w-4 h-4 text-[#E65100] mt-0.5 flex-shrink-0" />
                          <span>{concern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Upload/Draft View */
          <div className="max-w-3xl">
            {/* File Upload Section */}
            <div className="bg-[#F6F6F6] rounded-2xl p-6 lg:p-8 mb-6">
              <h2 className="text-lg font-bold text-[#1A1A1A] mb-6">Upload Your Documents</h2>

              <div className="space-y-4">
                {/* Video Upload */}
                {application.requiresVideo && (
                  <FileUploadCard
                    title="Video Introduction"
                    description="Upload a 5-10 minute video (max 500MB)"
                    icon={<Video className="w-6 h-6" />}
                    file={videoFile}
                    fileType="video"
                    accept="video/*"
                    isUploading={uploadingFile === 'video'}
                    onFileChange={(e) => handleFileChange('video', e)}
                    onReplace={() => onReplaceFile('video')}
                  />
                )}

                {/* Resume Upload */}
                {application.requiresResume && (
                  <FileUploadCard
                    title="Resume / CV"
                    description="Upload your resume in PDF format (max 5MB)"
                    icon={<FileText className="w-6 h-6" />}
                    file={resumeFile}
                    fileType="resume"
                    accept=".pdf"
                    isUploading={uploadingFile === 'resume'}
                    onFileChange={(e) => handleFileChange('resume', e)}
                    onReplace={() => onReplaceFile('resume')}
                  />
                )}

                {/* Case Study Upload */}
                {application.requiresCaseStudy && (
                  <FileUploadCard
                    title="Case Study"
                    description="Upload your case study in PDF format (max 10MB)"
                    icon={<FileText className="w-6 h-6" />}
                    file={caseStudyFile}
                    fileType="case_study"
                    accept=".pdf"
                    isUploading={uploadingFile === 'case_study'}
                    onFileChange={(e) => handleFileChange('case_study', e)}
                    onReplace={() => onReplaceFile('case_study')}
                    instructions={application.caseStudyInstructions}
                  />
                )}
              </div>
            </div>

            {/* Analyze Button */}
            <div className="bg-[#F6F6F6] rounded-2xl p-6 lg:p-8">
              <div className="space-y-4">
                {!allRequiredFilesUploaded && (
                  <div className="flex items-center gap-3 p-4 bg-[#FFF3E0] rounded-xl">
                    <AlertCircle className="w-5 h-5 text-[#E65100]" />
                    <p className="text-sm text-[#E65100]">
                      Please upload all required files before analyzing your application.
                    </p>
                  </div>
                )}
                <button
                  onClick={handleAnalyze}
                  disabled={!allRequiredFilesUploaded || isAnalyzing}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-bold transition-colors ${
                    allRequiredFilesUploaded && !isAnalyzing
                      ? 'bg-[#3D80F8] hover:bg-[#2D6DE8] text-white'
                      : 'bg-[#EDEDED] text-[#ACACAF] cursor-not-allowed'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing Your Application...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Analyze My Application
                    </>
                  )}
                </button>
                <p className="text-sm text-[#676767] text-center">
                  AI will analyze your documents and generate scores. You can review and replace files before final submission.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// File Upload Card Component
interface FileUploadCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  file?: ApplicationFile;
  fileType: string;
  accept: string;
  isUploading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReplace: () => void;
  instructions?: string;
}

function FileUploadCard({
  title,
  description,
  icon,
  file,
  fileType,
  accept,
  isUploading,
  onFileChange,
  onReplace,
  instructions,
}: FileUploadCardProps) {
  const inputId = `file-upload-${fileType}`;

  return (
    <div className="bg-white rounded-xl p-4 lg:p-6">
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            file ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#EFF5FF] text-[#3D80F8]'
          }`}
        >
          {file ? <Check className="w-6 h-6" /> : icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-[#1A1A1A]">{title}</h3>
            {file && (
              <button
                onClick={onReplace}
                className="text-sm text-[#3D80F8] hover:underline"
              >
                Replace
              </button>
            )}
          </div>
          <p className="text-sm text-[#676767] mb-3">{description}</p>

          {instructions && (
            <div className="mb-3 p-3 bg-[#FFF8F0] rounded-lg">
              <p className="text-sm text-[#676767]">
                <strong>Instructions:</strong> {instructions}
              </p>
            </div>
          )}

          {file ? (
            <div className="flex items-center gap-2 p-3 bg-[#F6F6F6] rounded-lg">
              <FileText className="w-4 h-4 text-[#676767]" />
              <span className="text-sm text-[#1A1A1A] truncate">{file.originalFilename}</span>
              <span className="text-xs text-[#676767]">
                ({(file.sizeBytes / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          ) : (
            <label
              htmlFor={inputId}
              className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-[#EDEDED] rounded-lg cursor-pointer hover:border-[#3D80F8] hover:bg-[#F6F6F6] transition-colors"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 text-[#3D80F8] animate-spin" />
                  <span className="text-sm text-[#676767]">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 text-[#3D80F8]" />
                  <span className="text-sm text-[#676767]">
                    Click to upload or drag and drop
                  </span>
                </>
              )}
              <input
                id={inputId}
                type="file"
                accept={accept}
                onChange={onFileChange}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
