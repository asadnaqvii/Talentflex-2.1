# TalentFlex Phase 2.1 - Final Engineering Playbook
## Solo Developer + Claude Code (Opus 4.5) | 4 Weeks

---

## Quick Reference: Final Decisions

| Decision | Choice |
|----------|--------|
| AI Score Visibility | Both candidates AND employers see full scores |
| Video Recording | Upload only (no in-browser recording) |
| AI Analysis Trigger | On "Analyze" button (BEFORE submit, so candidate can review & redo) |
| Candidate Review | Candidates see scores first, can replace files & re-analyze |
| Final Submit | Separate action after candidate approves their scores |
| Employer Notifications | Manual forwarding by internal team |
| Timeline | 4 weeks with Claude Code assistance |
| Video Limit | 500MB, 10 minutes max |
| CV Limit | 5MB PDF |
| Case Study Limit | 10MB PDF |

---

## Application Status Flow

```
unclaimed → draft → analyzed → submitted
    │         │         │          │
    │         │         │          └── Locked, visible to employers
    │         │         │
    │         │         └── Candidate reviewing scores (can redo)
    │         │                    │
    │         │         ┌──────────┘
    │         │         │ Replace file
    │         │         ▼
    │         └── Uploading files ◄───┘
    │
    └── Link created, no candidate yet
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         TALENTFLEX PHASE 2.1                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FRONTEND (Next.js 14 + TypeScript)                                         │
│  ├── /application/[token]     → Guest view / Candidate upload / Employer   │
│  ├── /signup, /login          → Auth flows (email + Google + LinkedIn)     │
│  ├── /candidate/*             → Profile, applications list, settings       │
│  ├── /employer/*              → Company profile, saved candidates          │
│  └── /admin/*                 → Create links, pipeline view                │
│                                                                             │
│  BACKEND (Next.js API Routes or NestJS)                                     │
│  ├── /api/auth/*              → Signup, login, OAuth callbacks             │
│  ├── /api/applications/*      → CRUD, file upload, submit                  │
│  ├── /api/analysis/*          → Trigger AI analysis                        │
│  ├── /api/decisions/*         → Employer interest/reject                   │
│  ├── /api/profiles/*          → Candidate & company profiles               │
│  └── /api/admin/*             → Create links, pipeline                     │
│                                                                             │
│  EXTERNAL SERVICES                                                          │
│  ├── Supabase                 → Postgres + Auth + Storage + Realtime       │
│  ├── Deepgram                 → Video transcription (async)                │
│  ├── OpenAI API (GPT-4o)      → CV/Case analysis + Scoring + Summary       │
│  ├── Calendly                 → Interview scheduling (embed)               │
│  └── Resend/SES               → Email notifications                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Database Schema (Supabase)

```sql
-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE user_role AS ENUM ('candidate', 'employer', 'internal');
CREATE TYPE user_status AS ENUM ('active', 'soft_deleted');
CREATE TYPE auth_provider AS ENUM ('email', 'google', 'linkedin');
CREATE TYPE application_status AS ENUM ('unclaimed', 'draft', 'analyzed', 'submitted');
CREATE TYPE analysis_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE file_type AS ENUM ('resume', 'cover_letter', 'case_study', 'video');
CREATE TYPE decision_type AS ENUM ('interested', 'rejected');

-- ============================================
-- USERS & AUTH
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    role user_role NOT NULL,
    status user_status DEFAULT 'active',
    password_hash VARCHAR(255),
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE auth_identities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider auth_provider NOT NULL,
    provider_user_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    raw_profile JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(provider, provider_user_id)
);

-- ============================================
-- PROFILES
-- ============================================
CREATE TABLE candidate_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    photo_url TEXT,
    headline VARCHAR(255),
    current_role VARCHAR(255),
    current_company VARCHAR(255),
    about TEXT,
    experience_snapshot JSONB,
    skills TEXT[],
    location VARCHAR(255),
    linkedin_url TEXT,
    preferences JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE company_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employer_user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    website TEXT,
    linkedin_url TEXT,
    description TEXT,
    size VARCHAR(50),
    industry VARCHAR(100),
    primary_locations TEXT[],
    calendly_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- APPLICATIONS
-- ============================================
CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token VARCHAR(64) UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
    
    -- Job details
    job_title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    job_description TEXT,
    requirements TEXT,
    case_study_instructions TEXT,
    
    -- Requirements
    requires_video BOOLEAN DEFAULT TRUE,
    requires_resume BOOLEAN DEFAULT TRUE,
    requires_case_study BOOLEAN DEFAULT FALSE,
    
    -- Candidate
    candidate_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Status
    status application_status DEFAULT 'unclaimed',
    analysis_status analysis_status DEFAULT 'pending',
    
    -- Metadata
    created_by_internal_id UUID REFERENCES users(id),
    submitted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE application_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES job_applications(id) ON DELETE CASCADE,
    file_type file_type NOT NULL,
    file_url TEXT NOT NULL,
    original_filename VARCHAR(255),
    mime_type VARCHAR(100),
    size_bytes BIGINT,
    duration_seconds INTEGER,
    transcription_text TEXT,
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(application_id, file_type)
);

-- ============================================
-- AI ANALYSIS
-- ============================================
CREATE TABLE application_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID UNIQUE NOT NULL REFERENCES job_applications(id) ON DELETE CASCADE,
    
    -- Video scores (1-10)
    video_communication_score DECIMAL(3,1),
    video_clarity_score DECIMAL(3,1),
    video_confidence_score DECIMAL(3,1),
    video_overall_score DECIMAL(3,1),
    
    -- CV scores (1-10)
    cv_relevance_score DECIMAL(3,1),
    cv_experience_match_score DECIMAL(3,1),
    cv_skills_match_score DECIMAL(3,1),
    cv_overall_score DECIMAL(3,1),
    
    -- Case study scores (1-10)
    case_study_problem_solving_score DECIMAL(3,1),
    case_study_analytical_depth_score DECIMAL(3,1),
    case_study_presentation_score DECIMAL(3,1),
    case_study_overall_score DECIMAL(3,1),
    
    -- Overall
    overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
    ai_summary TEXT,
    key_strengths TEXT[],
    areas_of_concern TEXT[],
    
    -- Metadata
    raw_analysis_response JSONB,
    processing_time_ms INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- EMPLOYER DECISIONS
-- ============================================
CREATE TABLE employer_decisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employer_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    application_id UUID NOT NULL REFERENCES job_applications(id) ON DELETE CASCADE,
    decision decision_type NOT NULL,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(employer_user_id, application_id)
);

CREATE TABLE interview_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employer_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    application_id UUID NOT NULL REFERENCES job_applications(id) ON DELETE CASCADE,
    calendly_event_id VARCHAR(255),
    scheduled_at TIMESTAMPTZ,
    duration_minutes INTEGER,
    meeting_url TEXT,
    status VARCHAR(50) DEFAULT 'scheduled',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- NOTIFICATIONS
-- ============================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    data JSONB,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_applications_token ON job_applications(token);
CREATE INDEX idx_applications_candidate ON job_applications(candidate_id);
CREATE INDEX idx_applications_status ON job_applications(status);
CREATE INDEX idx_decisions_employer ON employer_decisions(employer_user_id);
CREATE INDEX idx_decisions_interested ON employer_decisions(employer_user_id, decision) 
    WHERE decision = 'interested';
```

---

## AI Analysis Pipeline (Analyze → Review → Submit)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              CANDIDATE-CONTROLLED ANALYSIS FLOW                             │
│              (Candidate reviews scores BEFORE submitting)                   │
└─────────────────────────────────────────────────────────────────────────────┘

User clicks "Analyze My Application"
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 1: VALIDATION                                                         │
│  • Check all required files uploaded                                        │
│  • Validate file sizes/formats                                              │
│  • Set analysis_status = 'processing'                                       │
│  • Show loading spinner: "Analyzing your application..."                    │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 2: VIDEO TRANSCRIPTION (Deepgram)                          ~30-60s   │
│                                                                             │
│  const transcription = await deepgram.transcription.preRecorded(            │
│    { url: videoFileUrl },                                                   │
│    { model: 'nova-2', smart_format: true }                                  │
│  );                                                                         │
│                                                                             │
│  → Save transcription_text to application_files                             │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 3: DOCUMENT EXTRACTION (OpenAI GPT-4o)                     ~10-20s   │
│                                                                             │
│  import OpenAI from 'openai';                                               │
│  const openai = new OpenAI();                                               │
│                                                                             │
│  // Extract CV content (fetch PDF, convert to base64 or extract text)      │
│  const cvContent = await openai.chat.completions.create({                   │
│    model: 'gpt-4o',                                                         │
│    messages: [{                                                             │
│      role: 'user',                                                          │
│      content: [                                                             │
│        {                                                                    │
│          type: 'image_url',                                                 │
│          image_url: { url: `data:application/pdf;base64,${cvBase64}` }     │
│        },                                                                   │
│        { type: 'text', text: 'Extract: skills, experience, education...' } │
│      ]                                                                      │
│    }]                                                                       │
│  });                                                                        │
│                                                                             │
│  // Alternative: Use pdf-parse to extract text first, then send to GPT-4o  │
│  // Same for case study if present                                          │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 4: SCORING & ANALYSIS (OpenAI GPT-4o)                      ~15-30s   │
│                                                                             │
│  const analysis = await openai.chat.completions.create({                    │
│    model: 'gpt-4o',                                                         │
│    response_format: { type: 'json_object' },                                │
│    messages: [{                                                             │
│      role: 'system',                                                        │
│      content: 'You are an expert recruiter. Analyze candidates and return  │
│                structured JSON scores.'                                     │
│    }, {                                                                     │
│      role: 'user',                                                          │
│      content: `                                                             │
│        JOB DESCRIPTION:                                                     │
│        ${jobDescription}                                                    │
│                                                                             │
│        VIDEO TRANSCRIPT:                                                    │
│        ${videoTranscript}                                                   │
│                                                                             │
│        CV CONTENT:                                                          │
│        ${cvContent}                                                         │
│                                                                             │
│        CASE STUDY:                                                          │
│        ${caseStudyContent}                                                  │
│                                                                             │
│        Analyze this candidate. Return JSON:                                 │
│        {                                                                    │
│          "video_scores": {                                                  │
│            "communication": 1-10,                                           │
│            "clarity": 1-10,                                                 │
│            "confidence": 1-10                                               │
│          },                                                                 │
│          "cv_scores": {                                                     │
│            "relevance": 1-10,                                               │
│            "experience_match": 1-10,                                        │
│            "skills_match": 1-10                                             │
│          },                                                                 │
│          "case_study_scores": {                                             │
│            "problem_solving": 1-10,                                         │
│            "analytical_depth": 1-10,                                        │
│            "presentation": 1-10                                             │
│          },                                                                 │
│          "overall_score": 0-100,                                            │
│          "summary": "3-4 line summary...",                                  │
│          "key_strengths": ["...", "..."],                                   │
│          "areas_of_concern": ["...", "..."]                                 │
│        }                                                                    │
│      `                                                                      │
│    }]                                                                       │
│  });                                                                        │
│                                                                             │
│  const result = JSON.parse(analysis.choices[0].message.content);            │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 5: SAVE & SHOW RESULTS TO CANDIDATE                                   │
│                                                                             │
│  • Save all scores to application_analysis table                            │
│  • Set status = 'analyzed', analysis_status = 'completed'                   │
│  • Return results to frontend                                               │
│  • CANDIDATE REVIEWS THEIR SCORES                                           │
│                                                                             │
│  TOTAL TIME: ~60-120 seconds                                                │
│  (Show progress bar with steps to user)                                     │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 6: CANDIDATE DECISION                                                 │
│                                                                             │
│  Option A: Happy with scores                                                │
│  ─────────────────────────────                                              │
│  → Click "Submit to Employers"                                              │
│  → status = 'submitted'                                                     │
│  → Application locked, visible to employers                                 │
│                                                                             │
│  Option B: Want to improve                                                  │
│  ─────────────────────────────                                              │
│  → Click "Replace" on any file                                              │
│  → Upload new file                                                          │
│  → status = 'draft' (reset)                                                 │
│  → Click "Analyze" again                                                    │
│  → Repeat until satisfied                                                   │
└─────────────────────────────────────────────────────────────────────────────┘

ERROR HANDLING:
• If any step fails → set analysis_status = 'failed'
• Show user-friendly error message
• Allow retry from beginning
• Log full error for debugging

PDF HANDLING NOTE (OpenAI):
GPT-4o can process PDFs in two ways:
1. Convert PDF pages to images → send as image_url (good for formatted docs)
2. Extract text with pdf-parse → send as text (faster, cheaper)

Recommended approach for TalentFlex:
• Use pdf-parse to extract text from CV and case study
• Falls back to image conversion if text extraction fails
• Example:
  const pdfParse = require('pdf-parse');
  const dataBuffer = await fetch(pdfUrl).then(r => r.arrayBuffer());
  const { text } = await pdfParse(Buffer.from(dataBuffer));
```

---

## 4-Week Sprint Plan (Claude Code Optimized)

### Week 1: Foundation + Auth + Admin

**Day 1-2: Project Setup**
```bash
# Claude Code commands
"Set up Next.js 14 app with TypeScript, Tailwind, shadcn/ui"
"Create Supabase project and run this schema: [paste schema]"
"Set up GitHub repo with CI workflow for linting and type checking"
```

**Day 3-4: Auth System**
```bash
"Implement email/password signup and login with Supabase Auth"
"Add Google OAuth with role selection from redirect param"
"Create auth middleware that checks session and redirects appropriately"
"Build /signup and /login pages with social buttons"
```

**Day 5-6: Application Link System**
```bash
"Create admin page at /admin/create-application with form for job details"
"Implement POST /api/admin/applications to create job_application record"
"Build GET /api/applications/by-token/[token] endpoint"
"Create /application/[token] page showing job details for guests"
```

**Day 7: Polish & Integration**
```bash
"Add role-based redirects after login (candidate → /candidate, employer → /employer)"
"Create basic dashboard layouts for /candidate and /employer"
"Test full flow: create link → view as guest → signup → redirect back"
```

**Week 1 Deliverables:**
- [ ] Auth working (email + Google)
- [ ] Admin can create application links
- [ ] Guest can view application page
- [ ] Signup links application to user

---

### Week 2: File Upload + AI Pipeline

**Day 8-9: File Upload Infrastructure**
```bash
"Set up Supabase Storage bucket for application files with proper policies"
"Create presigned URL generation endpoint for secure uploads"
"Build reusable FileUpload component with drag-drop, progress, preview"
"Implement file validation (size, type, duration for video)"
```

**Day 10-11: Candidate Upload Flow**
```bash
"Build draft application UI with upload zones for video, CV, case study"
"Implement save draft functionality"
"Add 'Analyze My Application' button (disabled until all required files uploaded)"
"Create loading state for analysis: 'Analyzing your application...'"
```

**Day 12-13: AI Analysis Pipeline**
```bash
"Integrate Deepgram API for video transcription"
"Implement OpenAI GPT-4o call for CV content extraction from PDF"
"Implement OpenAI GPT-4o call for case study analysis"
"Build scoring prompt that analyzes all components together with JSON mode"
"Create application_analysis record with all scores"
"Build 'analyzed' state UI showing scores to candidate"
"Add 'Replace File' buttons that reset status to 'draft'"
"Add 'Submit to Employers' button (only visible in 'analyzed' state)"
```

**Day 14: Testing & Edge Cases**
```bash
"Test full upload → submit → analysis flow"
"Add error handling for failed transcription/analysis"
"Implement retry mechanism for failed analysis"
"Add timeout handling for long videos"
```

**Week 2 Deliverables:**
- [ ] Video, CV, case study upload working
- [ ] Deepgram transcription integrated
- [ ] OpenAI GPT-4o analysis generating scores
- [ ] Candidate sees scores in 'analyzed' state
- [ ] Replace file & re-analyze working
- [ ] Final submit to employers working

---

### Week 3: Employer Features + Profiles

**Day 15-16: Employer Application View**
```bash
"Build employer view of /application/[token] with AI scores displayed"
"Create score visualization components (progress bars, score cards)"
"Add video player, PDF viewer for attachments"
"Implement guest vs authenticated employer view differences"
```

**Day 17-18: Employer Actions**
```bash
"Add Express Interest button with employer_decision creation"
"Add Reject button with optional note"
"Implement Calendly embed for Schedule Interview button"
"Create /employer/saved-candidates page listing interested candidates"
```

**Day 19-20: Profiles**
```bash
"Build /candidate/profile page with all profile fields"
"Build /employer/profile page with company info and Calendly URL"
"Create /candidate/applications list showing all user's applications"
"Add LinkedIn OAuth for account linking"
```

**Day 21: Settings & Notifications**
```bash
"Build /settings page: update name/email, change password"
"Add connected accounts section showing Google/LinkedIn"
"Implement email notification when employer expresses interest"
"Create in-app notification system (optional)"
```

**Week 3 Deliverables:**
- [ ] Employer can view analysis and take actions
- [ ] Calendly scheduling working
- [ ] Saved candidates list
- [ ] Candidate and employer profiles
- [ ] LinkedIn OAuth

---

### Week 4: Admin + Polish + Deploy

**Day 22-23: Admin Dashboard**
```bash
"Build /admin/pipeline page showing all applications"
"Add filters by status, search by candidate/job"
"Display key metrics: total apps, submitted, pending analysis"
"Create application detail view for internal users"
```

**Day 24-25: Polish & UX**
```bash
"Add loading skeletons for all data-fetching pages"
"Implement proper error boundaries and error states"
"Add empty states for lists (no applications, no saved candidates)"
"Improve mobile responsiveness across all pages"
```

**Day 26-27: Testing & Security**
```bash
"Write E2E tests for candidate flow: link → signup → upload → submit"
"Write E2E tests for employer flow: view → signup → interest"
"Security audit: verify RLS policies, check for data leaks"
"Test edge cases: expired tokens, deleted users, missing files"
```

**Day 28: Deploy**
```bash
"Set up production environment variables"
"Deploy frontend to Vercel"
"Configure Supabase production project"
"Run smoke tests on production"
"Create internal documentation for creating application links"
```

**Week 4 Deliverables:**
- [ ] Admin pipeline view
- [ ] All UX polish complete
- [ ] E2E tests passing
- [ ] Production deployed
- [ ] Documentation complete

---

## API Endpoints Reference

### Auth
```
POST   /api/auth/signup          → Create account (email/password)
POST   /api/auth/login           → Login (email/password)
GET    /api/auth/google          → Initiate Google OAuth
GET    /api/auth/google/callback → Google OAuth callback
GET    /api/auth/linkedin        → Initiate LinkedIn OAuth
GET    /api/auth/linkedin/callback → LinkedIn OAuth callback
POST   /api/auth/logout          → Logout
GET    /api/auth/me              → Get current user
```

### Applications
```
GET    /api/applications/by-token/:token    → Get application by token (public)
POST   /api/applications/:id/claim          → Claim application (candidate)
POST   /api/applications/:id/files          → Get presigned upload URL
POST   /api/applications/:id/files/:type/replace → Replace a specific file (resets to 'draft')
PUT    /api/applications/:id/draft          → Save draft
POST   /api/applications/:id/analyze        → Run AI analysis (status → 'analyzed')
POST   /api/applications/:id/submit         → Final submit to employers (status → 'submitted')
GET    /api/applications/:id/analysis       → Get analysis results
```

### Employer Decisions
```
POST   /api/decisions                       → Create decision (interest/reject)
GET    /api/decisions/saved                 → List saved candidates
POST   /api/interviews                      → Record scheduled interview
```

### Profiles
```
GET    /api/profiles/candidate              → Get candidate profile
PUT    /api/profiles/candidate              → Update candidate profile
GET    /api/profiles/company                → Get company profile
PUT    /api/profiles/company                → Update company profile
```

### Admin
```
POST   /api/admin/applications              → Create application link
GET    /api/admin/pipeline                  → Get all applications
GET    /api/admin/applications/:id          → Get application details
```

---

## Claude Code Workflow Tips

### 1. Feature Implementation Pattern
```bash
# Start with the database
"Add this column to job_applications table: [column definition]"

# Then the API
"Create POST /api/applications/:id/submit endpoint that validates files and triggers analysis"

# Then the UI
"Build the submit button component that shows loading state and calls the submit API"

# Then connect
"Wire up the submit button on /application/[token] page to call the submit API"
```

### 2. Debugging Pattern
```bash
# When something breaks
"Check the Supabase logs for errors in the last 10 minutes"
"Add console.logs to trace the data flow in the submit handler"
"Show me the network request/response for the failing API call"
```

### 3. Testing Pattern
```bash
# After each feature
"Write a test that verifies: guest can view application, signs up, uploads files, submits"
"Run the E2E tests and fix any failures"
```

### 4. Daily Standup with Claude
```bash
# Start of day
"Here's what we built yesterday: [summary]. Today we need to: [goals]. 
Let's start with [first task]"

# End of day
"Summarize what we accomplished today and what's left for tomorrow"
```

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=

# AI Services
DEEPGRAM_API_KEY=
OPENAI_API_KEY=

# Email
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Go-Live Checklist

### Pre-Launch
- [ ] All core flows working (candidate apply, employer review)
- [ ] AI analysis completing successfully
- [ ] Email notifications sending
- [ ] Error handling in place
- [ ] Loading states smooth
- [ ] Mobile responsive

### Security
- [ ] RLS policies verified
- [ ] No cross-user data access
- [ ] File URLs are signed/protected
- [ ] Passwords properly hashed
- [ ] OAuth tokens stored securely

### Production
- [ ] Environment variables set
- [ ] Supabase production project configured
- [ ] Vercel deployment successful
- [ ] Domain configured (if applicable)
- [ ] Monitoring/alerting set up

### Documentation
- [ ] Internal doc: How to create application links
- [ ] Internal doc: How to forward links to employers
- [ ] README with setup instructions
