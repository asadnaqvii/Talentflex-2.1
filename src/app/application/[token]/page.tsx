'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ApplicationGuestView from '@/components/application/ApplicationGuestView';
import ApplicationCandidateView from '@/components/application/ApplicationCandidateView';
import ApplicationEmployerView from '@/components/application/ApplicationEmployerView';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  JobApplication,
  ApplicationFile,
  ApplicationAnalysis,
  CandidateProfile,
  EmployerDecision,
  UserRole,
} from '@/types';

// Mock data for development - will be replaced with API calls
const mockApplication: JobApplication = {
  id: '1',
  token: 'abc123xyz',
  jobTitle: 'Senior Product Manager',
  companyName: 'TechCorp Inc.',
  location: 'San Francisco, CA (Remote OK)',
  jobDescription: `We're looking for a Senior Product Manager to lead our core product initiatives. You'll work closely with engineering, design, and business teams to define and execute our product roadmap.

Key Responsibilities:
• Define product vision and strategy for core product areas
• Work with cross-functional teams to deliver high-impact features
• Conduct user research and translate insights into product requirements
• Define success metrics and track product performance
• Communicate product plans to stakeholders at all levels`,
  requirements: `• 5+ years of product management experience
• Experience with B2B SaaS products
• Strong analytical and problem-solving skills
• Excellent communication and leadership abilities
• Track record of shipping successful products`,
  caseStudyInstructions: `Please analyze the following scenario and provide a recommendation:

"TechCorp is considering expanding into the European market. Create a 1-2 page analysis covering:
1. Market opportunity assessment
2. Key challenges and risks
3. Go-to-market strategy recommendations
4. Success metrics you would track"

Please provide your analysis in PDF format.`,
  requiresVideo: true,
  requiresResume: true,
  requiresCaseStudy: true,
  requiresCoverLetter: false,
  status: 'draft',
  analysisStatus: 'pending',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockFiles: ApplicationFile[] = [];

const mockAnalysis: ApplicationAnalysis = {
  id: '1',
  applicationId: '1',
  videoCommunicationScore: 8.5,
  videoClarityScore: 7.8,
  videoConfidenceScore: 8.2,
  videoOverallScore: 8.2,
  cvRelevanceScore: 7.5,
  cvExperienceMatchScore: 8.0,
  cvSkillsMatchScore: 7.2,
  cvOverallScore: 7.6,
  caseStudyProblemSolvingScore: 8.8,
  caseStudyAnalyticalDepthScore: 8.5,
  caseStudyPresentationScore: 7.9,
  caseStudyOverallScore: 8.4,
  overallScore: 78,
  aiSummary:
    'Strong candidate with 6+ years of product management experience. Excellent communication skills evident in video presentation. Case study demonstrates solid analytical thinking and strategic mindset. Minor gap in enterprise SaaS experience, but strong overall fit for the role.',
  keyStrengths: [
    'Excellent communication and presentation skills',
    'Strong analytical and strategic thinking',
    'Proven track record in product management',
    'Good cultural fit based on values alignment',
  ],
  areasOfConcern: [
    'Limited enterprise B2B SaaS experience',
    'May need ramp-up time on technical product aspects',
  ],
  analysisCount: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockCandidate: CandidateProfile = {
  id: '1',
  userId: '1',
  photoUrl: undefined,
  headline: 'Product Manager',
  currentRole: 'Product Manager',
  currentCompany: 'StartupXYZ',
  about:
    'Passionate product manager with 6 years of experience building consumer and B2B products. Love solving complex problems and working with cross-functional teams.',
  skills: ['Product Strategy', 'User Research', 'Agile', 'Data Analysis', 'Leadership'],
  location: 'San Francisco, CA',
  linkedinUrl: 'https://linkedin.com/in/example',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function ApplicationPage() {
  const params = useParams();
  const token = params.token as string;

  // Mock state - in production these would come from API/context
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isCandidate, setIsCandidate] = useState(false);
  const [application, setApplication] = useState<JobApplication>(mockApplication);
  const [files, setFiles] = useState<ApplicationFile[]>(mockFiles);
  const [analysis, setAnalysis] = useState<ApplicationAnalysis | undefined>(undefined);
  const [existingDecision, setExistingDecision] = useState<EmployerDecision | undefined>(undefined);

  // For demo purposes - toggle between views
  // In production, this would be determined by authentication state
  useEffect(() => {
    // Check URL params for demo mode
    const urlParams = new URLSearchParams(window.location.search);
    const demo = urlParams.get('demo');

    if (demo === 'candidate') {
      setIsAuthenticated(true);
      setUserRole('candidate');
      setIsCandidate(true);
    } else if (demo === 'employer') {
      setIsAuthenticated(true);
      setUserRole('employer');
      setIsCandidate(false);
      setApplication({ ...mockApplication, status: 'submitted' });
      setAnalysis(mockAnalysis);
    } else if (demo === 'employer-guest') {
      // Employer viewing but not logged in
      setIsAuthenticated(false);
      setUserRole('employer');
      setIsCandidate(false);
      setApplication({ ...mockApplication, status: 'submitted' });
      setAnalysis(mockAnalysis);
    } else if (demo === 'analyzed') {
      setIsAuthenticated(true);
      setUserRole('candidate');
      setIsCandidate(true);
      setApplication({ ...mockApplication, status: 'analyzed' });
      setAnalysis(mockAnalysis);
      setFiles([
        {
          id: '1',
          applicationId: '1',
          fileType: 'video',
          fileUrl: '/mock/video.mp4',
          originalFilename: 'intro_video.mp4',
          mimeType: 'video/mp4',
          sizeBytes: 52428800,
          durationSeconds: 420,
          uploadedAt: new Date().toISOString(),
        },
        {
          id: '2',
          applicationId: '1',
          fileType: 'resume',
          fileUrl: '/mock/resume.pdf',
          originalFilename: 'resume.pdf',
          mimeType: 'application/pdf',
          sizeBytes: 1048576,
          uploadedAt: new Date().toISOString(),
        },
        {
          id: '3',
          applicationId: '1',
          fileType: 'case_study',
          fileUrl: '/mock/case_study.pdf',
          originalFilename: 'case_study.pdf',
          mimeType: 'application/pdf',
          sizeBytes: 2097152,
          uploadedAt: new Date().toISOString(),
        },
      ]);
    }
  }, []);

  // Mock handlers
  const handleFileUpload = async (fileType: string, file: File) => {
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newFile: ApplicationFile = {
      id: `file-${Date.now()}`,
      applicationId: application.id,
      fileType: fileType as ApplicationFile['fileType'],
      fileUrl: URL.createObjectURL(file),
      originalFilename: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
      uploadedAt: new Date().toISOString(),
    };

    setFiles((prev) => {
      const filtered = prev.filter((f) => f.fileType !== fileType);
      return [...filtered, newFile];
    });
  };

  const handleAnalyze = async () => {
    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setAnalysis(mockAnalysis);
    setApplication((prev) => ({ ...prev, status: 'analyzed' }));
  };

  const handleSubmit = async () => {
    // Simulate submit delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setApplication((prev) => ({
      ...prev,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
    }));
  };

  const handleReplaceFile = (fileType: string) => {
    if (fileType === 'all') {
      // Reset to draft status for re-analysis
      setApplication((prev) => ({ ...prev, status: 'draft' }));
      setAnalysis(undefined);
    } else {
      setFiles((prev) => prev.filter((f) => f.fileType !== fileType));
      if (application.status === 'analyzed') {
        setApplication((prev) => ({ ...prev, status: 'draft' }));
        setAnalysis(undefined);
      }
    }
  };

  const handleExpressInterest = async (note?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setExistingDecision({
      id: `decision-${Date.now()}`,
      employerUserId: 'employer-1',
      applicationId: application.id,
      decision: 'interested',
      note,
      createdAt: new Date().toISOString(),
    });
  };

  const handleReject = async (note?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setExistingDecision({
      id: `decision-${Date.now()}`,
      employerUserId: 'employer-1',
      applicationId: application.id,
      decision: 'rejected',
      note,
      createdAt: new Date().toISOString(),
    });
  };

  const handleScheduleInterview = () => {
    // TODO: Open Calendly modal
    console.log('Schedule interview clicked - will open Calendly integration');
    alert('Calendly integration will be added here');
  };

  // Determine which view to show
  // Guest view - not authenticated, show job details
  if (!isAuthenticated && userRole !== 'employer') {
    return <ApplicationGuestView application={application} token={token} />;
  }

  // Candidate view (owner of this application)
  if (userRole === 'candidate' && isCandidate) {
    return (
      <DashboardLayout userRole="candidate">
        <div className="bg-white lg:rounded-tl-3xl min-h-screen">
          <ApplicationCandidateView
            application={application}
            files={files}
            analysis={analysis}
            onFileUpload={handleFileUpload}
            onAnalyze={handleAnalyze}
            onSubmit={handleSubmit}
            onReplaceFile={handleReplaceFile}
          />
        </div>
      </DashboardLayout>
    );
  }

  // Employer view (viewing submitted application)
  if (userRole === 'employer') {
    // If authenticated employer, wrap with DashboardLayout
    if (isAuthenticated) {
      return (
        <DashboardLayout userRole="employer">
          <ApplicationEmployerView
            application={application}
            files={files}
            analysis={analysis}
            candidate={mockCandidate}
            existingDecision={existingDecision}
            isAuthenticated={true}
            token={token}
            onExpressInterest={handleExpressInterest}
            onReject={handleReject}
            onScheduleInterview={handleScheduleInterview}
          />
        </DashboardLayout>
      );
    }

    // Unauthenticated employer - show view without sidebar but with sign up prompts
    return (
      <div className="min-h-screen bg-[#010917]">
        <ApplicationEmployerView
          application={application}
          files={files}
          analysis={analysis}
          candidate={mockCandidate}
          existingDecision={existingDecision}
          isAuthenticated={false}
          token={token}
          onExpressInterest={handleExpressInterest}
          onReject={handleReject}
          onScheduleInterview={handleScheduleInterview}
        />
      </div>
    );
  }

  // Default to guest view for other cases
  return <ApplicationGuestView application={application} token={token} />;
}
