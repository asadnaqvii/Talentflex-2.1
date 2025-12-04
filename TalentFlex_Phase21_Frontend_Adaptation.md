# TalentFlex Phase 2.1 - Frontend Adaptation Plan

## Existing Codebase Analysis

### Tech Stack (Confirmed)
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS v4
- Lucide React icons
- Custom UI components (no shadcn/ui currently)

### Current Structure
```
src/
├── app/                          # Next.js App Router pages
│   ├── ai-coach/                 # ❌ REMOVE
│   ├── ai-marketplace/           # ❌ REMOVE
│   ├── challenges/               # ❌ REMOVE
│   ├── course/                   # ❌ REMOVE
│   ├── dashboard/                # ✏️ MODIFY → Role-based dashboard
│   ├── interview/                # ✏️ MODIFY → Repurpose for application
│   ├── jobs/                     # ✏️ MODIFY → Repurpose patterns
│   ├── notifications/            # ✅ KEEP
│   ├── onboarding/               # ❌ REMOVE (out of scope)
│   ├── profile/                  # ✏️ MODIFY → Candidate profile
│   ├── roadmap/                  # ❌ REMOVE
│   ├── signin/                   # ✏️ MODIFY → Add social login
│   ├── signup/                   # ✏️ MODIFY → Add role + social
│   ├── skills/                   # ❌ REMOVE
│   └── team/                     # ❌ REMOVE
├── components/
│   ├── auth/                     # ✏️ MODIFY
│   ├── dashboard/                # ✏️ MODIFY
│   ├── interview/                # ✏️ PARTIAL KEEP (UI patterns)
│   ├── jobs/                     # ✏️ PARTIAL KEEP (UI patterns)
│   ├── layout/                   # ✏️ MODIFY (Sidebar, TopBar)
│   ├── profile/                  # ✏️ MODIFY
│   └── ui/                       # ✅ KEEP + EXPAND
└── types/                        # ✏️ MODIFY → New types for Phase 2.1
```

---

## Page-by-Page Adaptation Guide

### Pages to REMOVE (Out of Scope)

| Page | Action | Reason |
|------|--------|--------|
| `/ai-coach/*` | DELETE | Not in Phase 2.1 |
| `/ai-marketplace/*` | DELETE | Not in Phase 2.1 |
| `/challenges/*` | DELETE | Not in Phase 2.1 |
| `/course/*` | DELETE | Not in Phase 2.1 |
| `/onboarding/*` | DELETE | Not in Phase 2.1 |
| `/roadmap/*` | DELETE | Not in Phase 2.1 |
| `/skills/*` | DELETE | Not in Phase 2.1 |
| `/team/*` | DELETE | Not in Phase 2.1 |

### Pages to MODIFY

#### 1. `/signup` → Add Role Selection + Social Login

**Current:** Email/password only, redirects to onboarding
**Target:** Role selection, social login (Google/LinkedIn), redirect handling

```tsx
// Changes needed in SignUpPage.tsx:
// 1. Add role selection (candidate/employer) - pre-filled from URL param
// 2. Add Google OAuth button
// 3. Add LinkedIn OAuth button  
// 4. Handle redirect param from application link
// 5. Remove onboarding redirect
```

**New UI Elements:**
- Radio buttons or toggle for "I am a: Job Seeker / Employer"
- "Continue with Google" button
- "Continue with LinkedIn" button
- Read `?role=` and `?redirect=` from URL

---

#### 2. `/signin` → Add Social Login

**Current:** Email/password only
**Target:** Add social login options

```tsx
// Changes needed in SignInPage.tsx:
// 1. Add Google OAuth button
// 2. Add LinkedIn OAuth button
// 3. Handle redirect param
```

---

#### 3. `/dashboard` → Role-Based Dashboard

**Current:** Candidate-focused with jobs, skills, challenges, AI marketplace
**Target:** Different views for candidate vs employer

**Candidate Dashboard (`/candidate`):**
- My Applications list
- Profile completion prompt
- Recent activity

**Employer Dashboard (`/employer`):**
- Saved candidates summary
- Company profile completion prompt
- Recent candidate views

---

#### 4. `/profile` → Candidate Profile

**Current:** Generic profile with rewards, certificates, payment
**Target:** Candidate-specific profile (headline, experience, skills, preferences)

```tsx
// Changes needed:
// 1. Remove rewards, certificates, payment sections
// 2. Add: headline, current_role, about, experience_snapshot, skills, preferences
// 3. Keep: avatar, name, email, location
```

---

### Pages to CREATE (New)

#### 1. `/application/[token]` - Main Application Page ⭐ CRITICAL

This is the core page of Phase 2.1. Three states:

**State A: Guest View (Not logged in)**
```
┌─────────────────────────────────────────────────────────────┐
│  Job Title at Company                                       │
│  Location • Requirements                                    │
│                                                             │
│  Job Description...                                         │
│                                                             │
│  Case Study Instructions (if required)...                   │
│                                                             │
│  What you'll need to submit:                                │
│  ✓ Video Introduction (5-10 min)                            │
│  ✓ Resume/CV (PDF)                                          │
│  ✓ Case Study (PDF)                                         │
│                                                             │
│  [Sign Up to Apply]  [Already have account? Log In]         │
└─────────────────────────────────────────────────────────────┘
```

**State B: Candidate View - Choose Application Type**
```
┌─────────────────────────────────────────────────────────────┐
│  Apply for: Job Title at Company                            │
│                                                             │
│  How would you like to apply?                               │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ⚡ USE MY GENERIC APPLICATION                       │   │
│  │                                                     │   │
│  │  Your master profile (Score: 82/100)                │   │
│  │  ✓ Video intro ready                                │   │
│  │  ✓ Resume ready                                     │   │
│  │  + Just upload case study for this role             │   │
│  │                                                     │   │
│  │  [Use Generic Application]                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ✏️ CREATE CUSTOM APPLICATION                        │   │
│  │                                                     │   │
│  │  Upload new files tailored for this specific role   │   │
│  │  • Custom video addressing this job                 │   │
│  │  • Tailored resume                                  │   │
│  │  • Job-specific case study                          │   │
│  │                                                     │   │
│  │  [Start Custom Application]                         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ─────────────────────────────────────────────────────      │
│  💡 No generic application yet?                             │
│     [Create Your Generic Application →]                     │
└─────────────────────────────────────────────────────────────┘
```

**State B2: Candidate View - Using Generic (Only Case Study Needed)**
```
┌─────────────────────────────────────────────────────────────┐
│  Your Application: Job Title at Company                     │
│  Using: Generic Application                                 │
│  Status: DRAFT                                              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📹 Video Introduction          ✓ From Generic       │   │
│  │     [▶ Preview]  [Switch to Custom Video]           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📄 Resume/CV                   ✓ From Generic       │   │
│  │     [View PDF]  [Switch to Custom Resume]           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📊 Case Study                           [Upload]    │   │
│  │     Instructions: "Analyze market entry..."         │   │
│  │     Status: ○ Not uploaded                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Save Draft]  [Analyze My Application]                     │
└─────────────────────────────────────────────────────────────┘
```

**State B3: Candidate Draft/Analyzed View (Custom Application)**
```
┌─────────────────────────────────────────────────────────────┐
│  Your Application: Job Title at Company                     │
│  Status: DRAFT / ANALYZED                                   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📹 Video Introduction                    [Upload]    │   │
│  │     Status: ✓ Uploaded / ○ Not uploaded              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📄 Resume/CV                             [Upload]    │   │
│  │     Status: ✓ Uploaded / ○ Not uploaded              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📊 Case Study                            [Upload]    │   │
│  │     Instructions: "..."                              │   │
│  │     Status: ✓ Uploaded / ○ Not uploaded              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [If DRAFT:]                                                │
│  [Save Draft]  [Analyze My Application]                     │
│                                                             │
│  [If ANALYZED:]                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📊 AI ANALYSIS RESULTS                              │   │
│  │ Overall Score: 78/100                               │   │
│  │ "3-4 line summary..."                               │   │
│  │                                                     │   │
│  │ Video: 82/100  CV: 75/100  Case Study: 77/100      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Replace Files & Re-Analyze]  [Submit to Employers]        │
└─────────────────────────────────────────────────────────────┘
```

**State C: Employer View**
```
┌─────────────────────────────────────────────────────────────┐
│  Candidate for: Job Title                                   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 👤 Candidate Profile                                │   │
│  │ Name, Headline, Location, About...                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📊 AI ANALYSIS                                      │   │
│  │ Overall Score: 78/100                               │   │
│  │ "Summary..."                                        │   │
│  │ Video: 82  CV: 75  Case: 77                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  📎 Attachments:                                            │
│  [▶ Play Video]  [View Resume]  [View Case Study]           │
│                                                             │
│  [If Guest Employer:]                                       │
│  [Sign Up as Employer]  [Log In]                            │
│                                                             │
│  [If Logged In Employer:]                                   │
│  [💚 Express Interest]  [❌ Reject]  [📅 Schedule Interview] │
└─────────────────────────────────────────────────────────────┘
```

---

#### 2. `/candidate` - Candidate Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  Welcome back, [Name]!                                      │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📋 My Applications                                  │   │
│  │                                                     │   │
│  │ Job Title @ Company    Status: Submitted   Dec 3    │   │
│  │ Job Title @ Company    Status: Draft       Dec 1    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 👤 Complete Your Profile                            │   │
│  │ Add headline, experience, skills to stand out       │   │
│  │ [Edit Profile]                                      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

#### 3. `/candidate/profile` - Candidate Profile Page

Adapt existing `/profile` with new fields:
- Photo
- Headline
- Current Role & Company
- About
- Experience Snapshot (JSON/list)
- Skills (tags)
- Location
- LinkedIn URL
- Preferences (remote, salary, industries)

---

#### 4. `/candidate/applications` - Applications List

List of all candidate's applications with status, dates, links.

---

#### 5. `/candidate/application` - Generic Application (Master Profile) ⭐ NEW

This is where candidates create/manage their reusable "master application":

```
┌─────────────────────────────────────────────────────────────┐
│  My Generic Application                                     │
│  "Your reusable profile for quick applications"             │
│                                                             │
│  Status: ✅ READY (Score: 82/100)                           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📹 Video Introduction                    [Replace]   │   │
│  │     intro_video.mp4 • 8:32 • Uploaded Dec 1          │   │
│  │     [▶ Preview]                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📄 Master Resume                         [Replace]   │   │
│  │     resume_2024.pdf • 2 pages • Uploaded Dec 1       │   │
│  │     [View PDF]                                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📁 Portfolio (Optional)                  [Add]       │   │
│  │     Not uploaded yet                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ─────────────────────────────────────────────────────      │
│                                                             │
│  📊 AI ANALYSIS                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Overall: 82/100                                     │   │
│  │                                                     │   │
│  │ "Strong communicator with clear articulation.       │   │
│  │  Well-structured resume highlighting relevant       │   │
│  │  experience. Consider adding more quantifiable      │   │
│  │  achievements."                                     │   │
│  │                                                     │   │
│  │ 📹 Video: 85/100   📄 Resume: 79/100               │   │
│  │                                                     │   │
│  │ Suggested Roles: Product Manager, Project Lead,    │   │
│  │                  Business Analyst                   │   │
│  │                                                     │   │
│  │ Key Strengths:                                      │   │
│  │ • Excellent verbal communication                    │   │
│  │ • Strong analytical background                      │   │
│  │                                                     │   │
│  │ Areas to Improve:                                   │   │
│  │ • Add more metrics to resume achievements           │   │
│  │ • Include leadership examples in video              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Update & Re-Analyze]                                      │
│                                                             │
│  💡 Use this application when applying to jobs for faster   │
│     applications. You can always customize for specific     │
│     roles if needed.                                        │
└─────────────────────────────────────────────────────────────┘
```

---

#### 6. `/employer` - Employer Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  Employer Dashboard                                         │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🏢 Complete Your Company Profile                    │   │
│  │ Add company info and Calendly URL                   │   │
│  │ [Edit Company Profile]                              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 💚 Saved Candidates (3)                             │   │
│  │                                                     │   │
│  │ John D. - PM @ TechCorp     Score: 78   Dec 3      │   │
│  │ Jane S. - Designer          Score: 85   Dec 2      │   │
│  │ [View All →]                                        │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

#### 6. `/employer/profile` - Company Profile Page

New page for company information:
- Company Name
- Logo
- Website
- LinkedIn URL
- Description
- Size (dropdown)
- Industry
- Primary Locations
- Calendly URL ⭐

---

#### 7. `/employer/saved-candidates` - Saved Candidates List

Table/list of candidates employer expressed interest in.

---

#### 8. `/settings` - Settings Page

Adapt existing EditProfilePage:
- Update name/email
- Change password
- Connected accounts (Google, LinkedIn)
- Delete account

---

#### 9. `/admin/create-application` - Create Application Link

Internal team only:
```
┌─────────────────────────────────────────────────────────────┐
│  Create Application Link                                    │
│                                                             │
│  Job Title: [________________]                              │
│  Company Name: [________________]                           │
│  Location: [________________]                               │
│  Job Description: [________________]                        │
│  Requirements: [________________]                           │
│  Case Study Instructions: [________________]                │
│                                                             │
│  Requirements:                                              │
│  [✓] Video  [✓] Resume  [ ] Case Study  [ ] Cover Letter   │
│                                                             │
│  [Create Link]                                              │
│                                                             │
│  Generated Link:                                            │
│  https://talentflex.com/application/abc123  [Copy]          │
└─────────────────────────────────────────────────────────────┘
```

---

#### 10. `/admin/pipeline` - Pipeline View

Table of all applications with filters.

---

## Component Adaptation Guide

### Layout Components

#### Sidebar.tsx → Create Role-Based Sidebars

**Option A: Single Sidebar with role-based items**
```tsx
const candidateMenuItems = [
  { href: '/candidate', label: 'Dashboard', icon: '...' },
  { href: '/candidate/application', label: 'My Application', icon: '...' }, // Generic app
  { href: '/candidate/applications', label: 'Job Applications', icon: '...' },
  { href: '/candidate/profile', label: 'My Profile', icon: '...' },
];

const employerMenuItems = [
  { href: '/employer', label: 'Dashboard', icon: '...' },
  { href: '/employer/saved-candidates', label: 'Saved Candidates', icon: '...' },
  { href: '/employer/profile', label: 'Company Profile', icon: '...' },
];

const adminMenuItems = [
  { href: '/admin/create-application', label: 'Create Link', icon: '...' },
  { href: '/admin/pipeline', label: 'Pipeline', icon: '...' },
];
```

**Option B: Separate sidebar components per role**
- `CandidateSidebar.tsx`
- `EmployerSidebar.tsx`
- `AdminSidebar.tsx`

**Recommendation:** Option A (simpler, less code duplication)

---

### New Components to Create

#### 1. `components/application/` - Application Page Components

```
components/application/
├── ApplicationGuestView.tsx      # Guest view of job details
├── ApplicationCandidateView.tsx  # Candidate upload/analyze/submit view
├── ApplicationEmployerView.tsx   # Employer review view
├── FileUploadZone.tsx            # Drag-drop file upload
├── VideoUploadZone.tsx           # Video-specific upload
├── AnalysisResults.tsx           # AI score display
├── ScoreCard.tsx                 # Individual score component
├── AnalysisLoading.tsx           # Loading state during analysis
└── ApplicationStatus.tsx         # Status badge component
```

#### 2. `components/employer/` - Employer Components

```
components/employer/
├── EmployerDashboard.tsx
├── SavedCandidatesList.tsx
├── CompanyProfileForm.tsx
├── CandidateCard.tsx
├── EmployerActions.tsx           # Interest/Reject/Schedule buttons
└── CalendlyEmbed.tsx             # Calendly integration
```

#### 3. `components/admin/` - Admin Components

```
components/admin/
├── CreateApplicationForm.tsx
├── PipelineTable.tsx
├── ApplicationRow.tsx
└── PipelineFilters.tsx
```

#### 4. `components/ui/` - Shared UI Components (Expand)

```
components/ui/
├── BackButton.tsx                # ✅ EXISTS
├── Button.tsx                    # NEW - Standardized button
├── Input.tsx                     # NEW - Form input
├── Select.tsx                    # NEW - Dropdown
├── Badge.tsx                     # NEW - Status badges
├── Card.tsx                      # NEW - Card container
├── Modal.tsx                     # NEW - Modal dialog
├── ProgressBar.tsx               # NEW - Score visualization
├── FileUpload.tsx                # NEW - File upload component
├── VideoPlayer.tsx               # NEW - Video playback
├── PDFViewer.tsx                 # NEW - PDF preview
├── Spinner.tsx                   # NEW - Loading spinner
└── Toast.tsx                     # NEW - Notifications
```

---

## Types Update (src/types/index.ts)

```typescript
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
  createdAt: string;
}

export interface AuthIdentity {
  id: string;
  userId: string;
  provider: AuthProvider;
  providerUserId: string;
}

// ============================================
// PROFILE TYPES
// ============================================

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
}

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
}

// ============================================
// GENERIC APPLICATION TYPES
// ============================================

export interface GenericApplication {
  id: string;
  candidateId: string;
  status: 'draft' | 'analyzed';
  analysisStatus: AnalysisStatus;
  files: GenericApplicationFile[];
  analysis?: GenericApplicationAnalysis;
  createdAt: string;
  updatedAt: string;
}

export interface GenericApplicationFile {
  id: string;
  genericApplicationId: string;
  fileType: 'video' | 'resume' | 'cover_letter'; // cover_letter used as portfolio
  fileUrl: string;
  originalFilename: string;
  mimeType: string;
  sizeBytes: number;
  durationSeconds?: number;
  transcriptionText?: string;
  uploadedAt: string;
}

export interface GenericApplicationAnalysis {
  id: string;
  genericApplicationId: string;
  
  // Video scores
  videoCommunicationScore?: number;
  videoClarityScore?: number;
  videoConfidenceScore?: number;
  videoOverallScore?: number;
  
  // CV scores (general assessment)
  cvPresentationScore?: number;
  cvExperienceDepthScore?: number;
  cvSkillsBreadthScore?: number;
  cvOverallScore?: number;
  
  // Overall
  overallScore: number;
  aiSummary: string;
  keyStrengths?: string[];
  suggestedRoles?: string[];
  areasToImprove?: string[];
  
  analysisCount: number;
  createdAt: string;
}

// ============================================
// JOB-SPECIFIC APPLICATION TYPES
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
  
  // Generic application link
  usesGenericApplication: boolean;
  genericApplicationId?: string;
  
  candidateId?: string;
  status: ApplicationStatus;
  analysisStatus: AnalysisStatus;
  submittedAt?: string;
  createdAt: string;
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
  
  // Video scores
  videoCommunicationScore?: number;
  videoClarityScore?: number;
  videoConfidenceScore?: number;
  videoOverallScore?: number;
  
  // CV scores
  cvRelevanceScore?: number;
  cvExperienceMatchScore?: number;
  cvSkillsMatchScore?: number;
  cvOverallScore?: number;
  
  // Case study scores
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
  createdAt: string;
}

export interface EmployerDecision {
  id: string;
  employerUserId: string;
  applicationId: string;
  decision: DecisionType;
  note?: string;
  createdAt: string;
}

// ============================================
// UI HELPER TYPES
// ============================================

export interface ApplicationWithAnalysis extends JobApplication {
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
```

---

## Routing Structure (Final)

```
src/app/
├── page.tsx                      # Landing / Redirect
├── layout.tsx                    # Root layout
├── globals.css
│
├── (auth)/                       # Auth group (no sidebar)
│   ├── signup/
│   │   └── page.tsx
│   └── signin/
│       └── page.tsx
│
├── (dashboard)/                  # Dashboard group (with sidebar)
│   ├── layout.tsx                # DashboardLayout with role-based sidebar
│   │
│   ├── candidate/
│   │   ├── page.tsx              # Candidate dashboard
│   │   ├── application/
│   │   │   └── page.tsx          # ⭐ Generic application (master profile)
│   │   ├── profile/
│   │   │   └── page.tsx          # Candidate profile
│   │   └── applications/
│   │       └── page.tsx          # Applications list
│   │
│   ├── employer/
│   │   ├── page.tsx              # Employer dashboard
│   │   ├── profile/
│   │   │   └── page.tsx          # Company profile
│   │   └── saved-candidates/
│   │       └── page.tsx          # Saved candidates list
│   │
│   ├── settings/
│   │   └── page.tsx              # Account settings
│   │
│   └── admin/
│       ├── create-application/
│       │   └── page.tsx
│       └── pipeline/
│           └── page.tsx
│
├── application/
│   └── [token]/
│       └── page.tsx              # Job-specific application page (all states)
│
└── notifications/
    └── page.tsx                  # Keep existing
```

---

## Migration Checklist

### Phase 1: Cleanup & Structure (Day 1)

- [ ] Delete unused pages/components (ai-coach, challenges, etc.)
- [ ] Create new folder structure
- [ ] Update types/index.ts with new types
- [ ] Create route groups `(auth)` and `(dashboard)`

### Phase 2: Auth Updates (Day 2)

- [ ] Update SignUpPage with role selection
- [ ] Add Google OAuth button (UI only)
- [ ] Add LinkedIn OAuth button (UI only)
- [ ] Update SignInPage with social buttons
- [ ] Handle redirect params

### Phase 3: Layout Updates (Day 3)

- [ ] Create role-based sidebar logic
- [ ] Update DashboardLayout for route groups
- [ ] Create minimal candidate/employer dashboards

### Phase 4: Application Page (Days 4-6)

- [ ] Create `/application/[token]/page.tsx`
- [ ] Create ApplicationGuestView component
- [ ] Create ApplicationCandidateView component
- [ ] Create FileUploadZone component
- [ ] Create AnalysisResults component
- [ ] Create ApplicationEmployerView component

### Phase 5: Profile Pages (Day 7)

- [ ] Adapt profile page for candidate
- [ ] Create company profile page for employer

### Phase 6: Employer Features (Day 8)

- [ ] Create SavedCandidatesList
- [ ] Create EmployerActions component
- [ ] Add Calendly embed

### Phase 7: Admin Pages (Day 9)

- [ ] Create CreateApplicationForm
- [ ] Create PipelineTable

### Phase 8: Settings & Polish (Day 10)

- [ ] Update settings page
- [ ] Add connected accounts section
- [ ] Polish and responsive fixes

---

## Reusable Components from Existing Code

| Existing Component | Reuse In | Modifications Needed |
|-------------------|----------|---------------------|
| `TopBar.tsx` | All pages | Minor - keep as is |
| `BackButton.tsx` | Application page | None |
| `DashboardLayout.tsx` | Dashboard pages | Add role-based sidebar logic |
| `ProfileHeader.tsx` | Candidate profile | Adapt fields |
| `EditProfilePage.tsx` | Settings page | Remove payment, adapt fields |
| `ChangePasswordModal.tsx` | Settings | None |
| `JobDetailsPage.tsx` (patterns) | Application guest view | Adapt layout patterns |
| `CaseStudyPage.tsx` (patterns) | Application upload view | Adapt card patterns |

---

## Estimated Time Savings

| Task | From Scratch | With Existing Code | Savings |
|------|--------------|-------------------|---------|
| Auth pages | 8h | 3h | 5h |
| Layout/Sidebar | 6h | 2h | 4h |
| Profile pages | 8h | 4h | 4h |
| UI components | 12h | 4h | 8h |
| Styling/Responsive | 8h | 2h | 6h |
| **Total** | **42h** | **15h** | **27h (~64%)** |

**Net result:** Your 4-week timeline is very achievable. The existing frontend gives you a ~1 week head start.