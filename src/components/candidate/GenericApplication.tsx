'use client';

import React, { useState } from 'react';
import {
  Video,
  FileText,
  FolderOpen,
  Upload,
  Check,
  Loader2,
  RefreshCw,
  Play,
  Info,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TopBar from '@/components/layout/TopBar';
import CircularProgress from '@/components/ui/CircularProgress';
import RadarChart from '@/components/ui/RadarChart';
import ProgressBar from '@/components/ui/ProgressBar';
import {
  GenericApplication as GenericApplicationType,
  GenericApplicationAnalysis,
} from '@/types';

// Mock data for development
const mockGenericApplication: GenericApplicationType = {
  id: '1',
  candidateId: 'user-1',
  videoUrl: '/mock-video.mp4',
  videoFilename: 'my-introduction.mp4',
  videoDurationSeconds: 420,
  resumeUrl: '/mock-resume.pdf',
  resumeFilename: 'sarah-johnson-resume.pdf',
  status: 'analyzed',
  analysisStatus: 'completed',
  createdAt: '2024-11-01T10:00:00Z',
  updatedAt: '2024-12-01T10:00:00Z',
};

const mockAnalysis: GenericApplicationAnalysis = {
  id: '1',
  genericApplicationId: '1',
  videoCommunicationScore: 8.5,
  videoClarityScore: 9.0,
  videoConfidenceScore: 8.0,
  videoOverallScore: 8.5,
  cvPresentationScore: 9.0,
  cvExperienceDepthScore: 8.5,
  cvSkillsBreadthScore: 9.0,
  cvOverallScore: 8.8,
  overallScore: 85,
  aiSummary:
    'Strong candidate with excellent communication skills and a diverse background in product management. Demonstrates confidence and clarity in presentation. Resume shows progressive experience and a broad skill set.',
  suggestedJobTypes: [
    'Senior Product Manager',
    'Product Lead',
    'Director of Product',
    'VP of Product',
  ],
  keyStrengths: [
    'Excellent verbal communication',
    'Strong technical background',
    'Progressive career growth',
    'Diverse industry experience',
  ],
  areasForImprovement: [
    'Could expand on leadership examples',
    'Consider adding more quantitative achievements',
  ],
  createdAt: '2024-12-01T10:00:00Z',
  updatedAt: '2024-12-01T10:00:00Z',
};

interface FileUploadZoneProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  accept: string;
  currentFile?: { name: string; url?: string };
  isUploading?: boolean;
  onUpload: (file: File) => void;
  onReplace?: () => void;
  required?: boolean;
}

function FileUploadZone({
  label,
  description,
  icon,
  accept,
  currentFile,
  isUploading,
  onUpload,
  onReplace,
  required = true,
}: FileUploadZoneProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  if (currentFile) {
    return (
      <div className="border-2 border-[#E8F5E9] bg-[#F8FFF8] rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#E8F5E9] rounded-lg flex items-center justify-center text-[#2E7D32]">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium text-[#1A1A1A]">{label}</p>
              <p className="text-sm text-[#676767]">{currentFile.name}</p>
            </div>
          </div>
          {onReplace && (
            <button
              onClick={onReplace}
              className="flex items-center gap-2 px-4 py-2 text-[#3D80F8] hover:bg-[#EFF5FF] rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Replace
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <label
      className={`block w-full border-2 border-dashed rounded-xl p-8 cursor-pointer transition-colors ${
        isUploading
          ? 'border-[#3D80F8] bg-[#EFF5FF]'
          : 'border-[#EDEDED] hover:border-[#3D80F8] hover:bg-[#FAFAFA]'
      }`}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />
      <div className="flex flex-col items-center text-center">
        {isUploading ? (
          <Loader2 className="w-12 h-12 text-[#3D80F8] animate-spin mb-4" />
        ) : (
          <div className="w-16 h-16 bg-[#F6F6F6] rounded-xl flex items-center justify-center mb-4 text-[#676767]">
            {icon}
          </div>
        )}
        <p className="text-lg font-medium text-[#1A1A1A] mb-2">
          {isUploading ? 'Uploading...' : label}
        </p>
        <p className="text-sm text-[#676767] mb-4">{description}</p>
        {!isUploading && (
          <div className="flex items-center gap-2 px-4 py-2 bg-[#3D80F8] text-white rounded-lg hover:bg-[#2D6DE8] transition-colors">
            <Upload className="w-4 h-4" />
            <span className="text-sm font-medium">
              Choose File {required && <span className="text-red-200">*</span>}
            </span>
          </div>
        )}
      </div>
    </label>
  );
}

export default function GenericApplication() {
  const [application, setApplication] = useState<GenericApplicationType | null>(
    mockGenericApplication
  );
  const [analysis, setAnalysis] = useState<GenericApplicationAnalysis | null>(mockAnalysis);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<string | null>(null);

  // Demo: toggle between states
  const [demoState, setDemoState] = useState<'empty' | 'draft' | 'analyzed'>('analyzed');

  const handleFileUpload = async (fileType: string, file: File) => {
    setUploadingFile(fileType);
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUploadingFile(null);

    // Update application state with the new file (mock for demo)
    setApplication(prev => {
      if (!prev) {
        // Create new application if none exists
        return {
          id: '1',
          candidateId: 'user-1',
          status: 'incomplete',
          analysisStatus: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...(fileType === 'video' && { videoUrl: URL.createObjectURL(file), videoFilename: file.name }),
          ...(fileType === 'resume' && { resumeUrl: URL.createObjectURL(file), resumeFilename: file.name }),
          ...(fileType === 'portfolio' && { portfolioUrl: URL.createObjectURL(file), portfolioFilename: file.name }),
        } as GenericApplicationType;
      }

      // Update existing application
      const updated = { ...prev, updatedAt: new Date().toISOString() };
      if (fileType === 'video') {
        updated.videoUrl = URL.createObjectURL(file);
        updated.videoFilename = file.name;
      } else if (fileType === 'resume') {
        updated.resumeUrl = URL.createObjectURL(file);
        updated.resumeFilename = file.name;
      } else if (fileType === 'portfolio') {
        updated.portfolioUrl = URL.createObjectURL(file);
        updated.portfolioFilename = file.name;
      }

      // Check if we have minimum required files
      if (updated.videoUrl && updated.resumeUrl) {
        updated.status = 'complete';
      }

      return updated;
    });

    // Move to draft state if we were in empty state
    if (demoState === 'empty') {
      setDemoState('draft');
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Update application status to analyzed
    setApplication(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        status: 'analyzed' as const,
        analysisStatus: 'completed' as const,
      };
    });

    // Set the analysis results (mock data for demo)
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    setDemoState('analyzed');
  };

  const handleReplace = (fileType: string) => {
    // Clear the specific file and reset to draft
    setApplication(prev => {
      if (!prev) return prev;
      const updated = { ...prev, status: 'incomplete' as const, analysisStatus: 'pending' as const };
      if (fileType === 'video') {
        updated.videoUrl = undefined;
        updated.videoFilename = undefined;
      } else if (fileType === 'resume') {
        updated.resumeUrl = undefined;
        updated.resumeFilename = undefined;
      } else if (fileType === 'portfolio') {
        updated.portfolioUrl = undefined;
        updated.portfolioFilename = undefined;
      }
      return updated;
    });
    setDemoState('draft');
    setAnalysis(null);
  };

  // Radar chart data for communication skills
  const communicationScores = [
    { label: 'Communication', value: (analysis?.videoCommunicationScore || 0) * 10 },
    { label: 'Clarity', value: (analysis?.videoClarityScore || 0) * 10 },
    { label: 'Confidence', value: (analysis?.videoConfidenceScore || 0) * 10 },
    { label: 'Presentation', value: (analysis?.cvPresentationScore || 0) * 10 },
    { label: 'Experience', value: (analysis?.cvExperienceDepthScore || 0) * 10 },
    { label: 'Skills', value: (analysis?.cvSkillsBreadthScore || 0) * 10 },
  ];

  // Show analysis when we have analysis results (either from demo state or after analyze)
  const showAnalysis = (application?.status === 'analyzed' || demoState === 'analyzed') && analysis;

  return (
    <DashboardLayout userRole="candidate">
      <div className="bg-white min-h-screen rounded-tl-3xl">
        <TopBar title="My Application" />

        <div className="p-4 lg:p-8 max-w-5xl">
          {/* Info Banner */}
          <div className="bg-gradient-to-r from-[#EFF5FF] to-[#F3E8FF] border border-[#3D80F8]/20 rounded-xl p-4 lg:p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#3D80F8] rounded-lg flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-[#1A1A1A] mb-1">Your Master Application</h2>
                <p className="text-sm text-[#676767]">
                  Upload your generic video introduction and resume here. You can reuse these for
                  multiple job applications, or choose to upload custom files for specific jobs.
                </p>
              </div>
            </div>
          </div>

          {/* Demo State Selector */}
          <div className="mb-6 p-4 bg-[#FFF9E6] border border-[#FFD93D] rounded-lg">
            <p className="text-sm text-[#7A6B00] font-medium mb-2">Demo Mode - Select State:</p>
            <div className="flex gap-2 flex-wrap">
              {(['empty', 'draft', 'analyzed'] as const).map((state) => (
                <button
                  key={state}
                  onClick={() => {
                    setDemoState(state);
                    if (state === 'empty') {
                      setApplication(null);
                      setAnalysis(null);
                    } else if (state === 'draft') {
                      setApplication(mockGenericApplication);
                      setAnalysis(null);
                    } else {
                      setApplication(mockGenericApplication);
                      setAnalysis(mockAnalysis);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    demoState === state
                      ? 'bg-[#3D80F8] text-white'
                      : 'bg-white text-[#676767] hover:bg-[#F6F6F6]'
                  }`}
                >
                  {state.charAt(0).toUpperCase() + state.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {showAnalysis ? (
            /* ========== ANALYZED STATE ========== */
            <div className="space-y-8">
              {/* Overall Score Card */}
              <div className="bg-gradient-to-br from-[#3D80F8] to-[#7C3AED] rounded-2xl p-6 lg:p-8 text-white">
                <div className="flex flex-col lg:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <CircularProgress
                      value={analysis.overallScore}
                      size={140}
                      strokeWidth={10}
                      color="#fff"
                      backgroundColor="rgba(255,255,255,0.2)"
                    />
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-2xl font-bold mb-2">Overall Score</h2>
                    <p className="text-white/80 mb-4">{analysis.aiSummary}</p>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                      {analysis.suggestedJobTypes?.slice(0, 3).map((job, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/20 rounded-full text-sm"
                        >
                          {job}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Section */}
              <div className="bg-[#F6F6F6] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#EFF5FF] rounded-lg flex items-center justify-center">
                      <Video className="w-5 h-5 text-[#3D80F8]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1A1A]">Video Introduction</h3>
                      <p className="text-sm text-[#676767]">{application?.videoFilename}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleReplace('video')}
                    className="flex items-center gap-2 px-4 py-2 text-[#3D80F8] hover:bg-white rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Replace
                  </button>
                </div>

                {/* Video Preview */}
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Play className="w-8 h-8 text-[#1A1A1A] ml-1" />
                    </button>
                  </div>
                </div>

                {/* Video Scores */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-[#3D80F8]">
                      {analysis.videoCommunicationScore?.toFixed(1)}
                    </p>
                    <p className="text-sm text-[#676767]">Communication</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-[#3D80F8]">
                      {analysis.videoClarityScore?.toFixed(1)}
                    </p>
                    <p className="text-sm text-[#676767]">Clarity</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-[#3D80F8]">
                      {analysis.videoConfidenceScore?.toFixed(1)}
                    </p>
                    <p className="text-sm text-[#676767]">Confidence</p>
                  </div>
                </div>
              </div>

              {/* Resume Section */}
              <div className="bg-[#F6F6F6] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E8F5E9] rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#2E7D32]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1A1A]">Resume / CV</h3>
                      <p className="text-sm text-[#676767]">{application?.resumeFilename}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleReplace('resume')}
                    className="flex items-center gap-2 px-4 py-2 text-[#3D80F8] hover:bg-white rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Replace
                  </button>
                </div>

                {/* Resume Scores */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <ProgressBar
                      label="Presentation"
                      value={(analysis.cvPresentationScore || 0) * 10}
                      color="#2E7D32"
                    />
                    <ProgressBar
                      label="Experience Depth"
                      value={(analysis.cvExperienceDepthScore || 0) * 10}
                      color="#2E7D32"
                    />
                    <ProgressBar
                      label="Skills Breadth"
                      value={(analysis.cvSkillsBreadthScore || 0) * 10}
                      color="#2E7D32"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <RadarChart data={communicationScores} size={200} />
                  </div>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#E8F5E9] rounded-2xl p-6">
                  <h3 className="font-bold text-[#2E7D32] mb-4">Key Strengths</h3>
                  <ul className="space-y-2">
                    {analysis.keyStrengths?.map((strength, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
                        <span className="text-[#1A1A1A]">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#FFF3E0] rounded-2xl p-6">
                  <h3 className="font-bold text-[#E65100] mb-4">Areas for Improvement</h3>
                  <ul className="space-y-2">
                    {analysis.areasForImprovement?.map((area, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-[#E65100] flex-shrink-0 mt-0.5" />
                        <span className="text-[#1A1A1A]">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suggested Job Types */}
              <div className="bg-[#F6F6F6] rounded-2xl p-6">
                <h3 className="font-bold text-[#1A1A1A] mb-4">Suggested Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.suggestedJobTypes?.map((job, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-white border border-[#EDEDED] rounded-lg text-[#1A1A1A]"
                    >
                      {job}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ========== DRAFT / EMPTY STATE ========== */
            <div className="space-y-6">
              {/* Video Upload */}
              <div>
                <h3 className="font-bold text-[#1A1A1A] mb-2">
                  Video Introduction <span className="text-red-500">*</span>
                </h3>
                <p className="text-sm text-[#676767] mb-4">
                  Record a 5-10 minute video introducing yourself, your background, and career
                  goals.
                </p>
                <FileUploadZone
                  label="Upload Video"
                  description="MP4, MOV up to 500MB, 10 minutes max"
                  icon={<Video className="w-6 h-6" />}
                  accept="video/mp4,video/quicktime"
                  currentFile={
                    application?.videoFilename
                      ? { name: application.videoFilename, url: application.videoUrl }
                      : undefined
                  }
                  isUploading={uploadingFile === 'video'}
                  onUpload={(file) => handleFileUpload('video', file)}
                  onReplace={() => handleReplace('video')}
                />
              </div>

              {/* Resume Upload */}
              <div>
                <h3 className="font-bold text-[#1A1A1A] mb-2">
                  Resume / CV <span className="text-red-500">*</span>
                </h3>
                <p className="text-sm text-[#676767] mb-4">
                  Upload your latest comprehensive resume with all skills and experience.
                </p>
                <FileUploadZone
                  label="Upload Resume"
                  description="PDF up to 5MB"
                  icon={<FileText className="w-6 h-6" />}
                  accept="application/pdf"
                  currentFile={
                    application?.resumeFilename
                      ? { name: application.resumeFilename, url: application.resumeUrl }
                      : undefined
                  }
                  isUploading={uploadingFile === 'resume'}
                  onUpload={(file) => handleFileUpload('resume', file)}
                  onReplace={() => handleReplace('resume')}
                />
              </div>

              {/* Portfolio Upload (Optional) */}
              <div>
                <h3 className="font-bold text-[#1A1A1A] mb-2">Portfolio (Optional)</h3>
                <p className="text-sm text-[#676767] mb-4">
                  Upload work samples or a portfolio document.
                </p>
                <FileUploadZone
                  label="Upload Portfolio"
                  description="PDF up to 10MB"
                  icon={<FolderOpen className="w-6 h-6" />}
                  accept="application/pdf"
                  currentFile={
                    application?.portfolioFilename
                      ? { name: application.portfolioFilename, url: application.portfolioUrl }
                      : undefined
                  }
                  isUploading={uploadingFile === 'portfolio'}
                  onUpload={(file) => handleFileUpload('portfolio', file)}
                  onReplace={() => handleReplace('portfolio')}
                  required={false}
                />
              </div>

              {/* Analyze Button */}
              {application?.videoUrl && application?.resumeUrl && (
                <div className="pt-4">
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full py-4 bg-gradient-to-r from-[#3D80F8] to-[#7C3AED] text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing Your Application...
                      </>
                    ) : (
                      'Analyze My Application'
                    )}
                  </button>
                  <p className="text-sm text-center text-[#676767] mt-2">
                    AI will analyze your video and resume to generate scores and insights.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
