// ============================================
// USER & AUTH TYPES
// ============================================

export type UserRole = 'candidate' | 'employer' | 'internal';
export type UserStatus = 'active' | 'soft_deleted';
export type AuthProvider = 'email' | 'google' | 'linkedin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthIdentity {
  id: string;
  userId: string;
  provider: AuthProvider;
  providerUserId: string;
  createdAt: string;
}

// ============================================
// PROFILE TYPES
// ============================================

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  highlights?: string[];
}

export interface CandidatePreferences {
  remote?: boolean;
  salaryRange?: { min: number; max: number };
  industries?: string[];
}

export interface CandidateProfile {
  id: string;
  userId: string;
  photoUrl?: string;
  headline?: string;
  currentRole?: string;
  currentCompany?: string;
  about?: string;
  experienceSnapshot?: ExperienceItem[];
  skills?: string[];
  location?: string;
  linkedinUrl?: string;
  preferences?: CandidatePreferences;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyProfile {
  id: string;
  employerUserId: string;
  companyName: string;
  logoUrl?: string;
  website?: string;
  linkedinUrl?: string;
  description?: string;
  size?: string;
  industry?: string;
  primaryLocations?: string[];
  calendlyUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// APPLICATION TYPES
// ============================================

export type ApplicationStatus = 'unclaimed' | 'draft' | 'analyzed' | 'submitted';
export type AnalysisStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type FileType = 'resume' | 'cover_letter' | 'case_study' | 'video';
export type DecisionType = 'interested' | 'rejected';

export interface JobApplication {
  id: string;
  token: string;
  jobTitle: string;
  companyName: string;
  location?: string;
  jobDescription?: string;
  requirements?: string;
  caseStudyInstructions?: string;
  requiresVideo: boolean;
  requiresResume: boolean;
  requiresCaseStudy: boolean;
  requiresCoverLetter: boolean;
  candidateId?: string;
  status: ApplicationStatus;
  analysisStatus: AnalysisStatus;
  // Link to generic application (if using generic video/resume)
  usesGenericApplication?: boolean;
  genericApplicationId?: string;
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationFile {
  id: string;
  applicationId: string;
  fileType: FileType;
  fileUrl: string;
  originalFilename: string;
  mimeType: string;
  sizeBytes: number;
  durationSeconds?: number; // For video
  transcriptionText?: string;
  uploadedAt: string;
}

export interface ApplicationAnalysis {
  id: string;
  applicationId: string;

  // Video scores (1-10)
  videoCommunicationScore?: number;
  videoClarityScore?: number;
  videoConfidenceScore?: number;
  videoOverallScore?: number;

  // CV scores (1-10)
  cvRelevanceScore?: number;
  cvExperienceMatchScore?: number;
  cvSkillsMatchScore?: number;
  cvOverallScore?: number;

  // Case study scores (1-10)
  caseStudyProblemSolvingScore?: number;
  caseStudyAnalyticalDepthScore?: number;
  caseStudyPresentationScore?: number;
  caseStudyOverallScore?: number;

  // Overall
  overallScore: number;
  aiSummary: string;
  keyStrengths?: string[];
  areasOfConcern?: string[];

  analysisCount: number;
  processingTimeMs?: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmployerDecision {
  id: string;
  employerUserId: string;
  applicationId: string;
  decision: DecisionType;
  note?: string;
  createdAt: string;
}

export interface InterviewSchedule {
  id: string;
  employerUserId: string;
  applicationId: string;
  calendlyEventId?: string;
  scheduledAt?: string;
  durationMinutes?: number;
  meetingUrl?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

// ============================================
// NOTIFICATION TYPES
// ============================================

export type NotificationType =
  | 'employer_interested'
  | 'interview_scheduled'
  | 'analysis_complete'
  | 'application_submitted'
  | 'system';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message?: string;
  data?: Record<string, unknown>;
  read: boolean;
  readAt?: string;
  createdAt: string;
}

// ============================================
// GENERIC APPLICATION (MASTER PROFILE)
// ============================================

export type GenericApplicationStatus = 'incomplete' | 'complete' | 'analyzed';

export interface GenericApplication {
  id: string;
  candidateId: string;

  // Files
  videoUrl?: string;
  videoFilename?: string;
  videoDurationSeconds?: number;
  videoTranscription?: string;

  resumeUrl?: string;
  resumeFilename?: string;

  portfolioUrl?: string;
  portfolioFilename?: string;

  // Status
  status: GenericApplicationStatus;
  analysisStatus: AnalysisStatus;

  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface GenericApplicationAnalysis {
  id: string;
  genericApplicationId: string;

  // Video scores (1-10) - General assessment
  videoCommunicationScore?: number;
  videoClarityScore?: number;
  videoConfidenceScore?: number;
  videoOverallScore?: number;

  // CV scores (1-10) - General assessment
  cvPresentationScore?: number;
  cvExperienceDepthScore?: number;
  cvSkillsBreadthScore?: number;
  cvOverallScore?: number;

  // Overall
  overallScore: number;
  aiSummary: string;
  suggestedJobTypes?: string[];
  keyStrengths?: string[];
  areasForImprovement?: string[];

  // Metadata
  processingTimeMs?: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// UI HELPER TYPES
// ============================================

export interface ApplicationWithDetails extends JobApplication {
  files: ApplicationFile[];
  analysis?: ApplicationAnalysis;
  candidate?: CandidateProfile;
}

export interface SavedCandidate {
  decision: EmployerDecision;
  application: JobApplication;
  candidate: CandidateProfile;
  analysis?: ApplicationAnalysis;
}

// ============================================
// MOCK/UI STATE TYPES (for frontend before backend)
// ============================================

export type MockUser = User & {
  // Extended for mock data purposes
  mockId?: string;
};

export interface DashboardStats {
  totalApplications: number;
  submittedApplications: number;
  pendingAnalysis: number;
  interestReceived: number;
}
