# TalentFlex Phase 2.1 - Database Schema

## Complete Schema with AI Analysis Support

```sql
-- ============================================
-- EXTENSIONS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE user_role AS ENUM ('candidate', 'employer', 'internal');
CREATE TYPE user_status AS ENUM ('active', 'soft_deleted');
CREATE TYPE auth_provider AS ENUM ('email', 'google', 'linkedin');
CREATE TYPE application_status AS ENUM ('unclaimed', 'draft', 'analyzed', 'submitted');
-- Flow: unclaimed → draft → analyzed → submitted
-- 'analyzed': Candidate has run AI analysis and is reviewing scores (can replace files & re-analyze)
-- 'submitted': Candidate approved scores, application locked and visible to employers
CREATE TYPE analysis_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE file_type AS ENUM ('resume', 'cover_letter', 'case_study', 'video');
CREATE TYPE decision_type AS ENUM ('interested', 'rejected');

-- ============================================
-- CORE TABLES
-- ============================================

-- Users (candidates, employers, internal staff)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    role user_role NOT NULL,
    status user_status DEFAULT 'active',
    password_hash VARCHAR(255), -- NULL if social-only auth
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auth identities for social login
CREATE TABLE auth_identities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider auth_provider NOT NULL,
    provider_user_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TIMESTAMPTZ,
    raw_profile JSONB, -- Store full OAuth profile for reference
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(provider, provider_user_id)
);

CREATE INDEX idx_auth_identities_user ON auth_identities(user_id);
CREATE INDEX idx_auth_identities_provider ON auth_identities(provider, provider_user_id);

-- ============================================
-- PROFILE TABLES
-- ============================================

-- Candidate profiles
CREATE TABLE candidate_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    photo_url TEXT,
    headline VARCHAR(255), -- e.g., "Senior Product Manager"
    current_role VARCHAR(255),
    current_company VARCHAR(255),
    about TEXT,
    experience_snapshot JSONB, -- [{company, role, duration, highlights}]
    skills TEXT[], -- Array of skill strings
    location VARCHAR(255),
    linkedin_url TEXT,
    preferences JSONB, -- {remote: bool, salary_range: {min, max}, industries: [...]}
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Company profiles (for employers)
CREATE TABLE company_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    website TEXT,
    linkedin_url TEXT,
    description TEXT,
    size VARCHAR(50), -- e.g., "51-200", "1000+"
    industry VARCHAR(100),
    primary_locations TEXT[], -- Array of location strings
    calendly_url TEXT, -- For interview scheduling
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- GENERIC APPLICATION (Reusable Master Application)
-- ============================================

-- Each candidate can have ONE generic application (their "master" profile application)
CREATE TABLE generic_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Status (no 'submitted' state - generic apps are always available)
    status application_status DEFAULT 'draft', -- draft or analyzed
    analysis_status analysis_status DEFAULT 'pending',
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generic application files (video, resume, portfolio)
CREATE TABLE generic_application_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    generic_application_id UUID NOT NULL REFERENCES generic_applications(id) ON DELETE CASCADE,
    file_type file_type NOT NULL, -- 'video', 'resume', or 'cover_letter' as portfolio
    file_url TEXT NOT NULL,
    original_filename VARCHAR(255),
    mime_type VARCHAR(100),
    size_bytes BIGINT,
    duration_seconds INTEGER, -- For video
    transcription_text TEXT, -- For video (from Deepgram)
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(generic_application_id, file_type)
);

-- Generic application analysis (no job-specific context)
CREATE TABLE generic_application_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    generic_application_id UUID UNIQUE NOT NULL REFERENCES generic_applications(id) ON DELETE CASCADE,
    
    -- Video scores (1-10) - General communication assessment
    video_communication_score DECIMAL(3,1),
    video_clarity_score DECIMAL(3,1),
    video_confidence_score DECIMAL(3,1),
    video_overall_score DECIMAL(3,1),
    
    -- CV scores (1-10) - General quality assessment
    cv_presentation_score DECIMAL(3,1), -- How well-formatted/readable
    cv_experience_depth_score DECIMAL(3,1), -- Quality of experience descriptions
    cv_skills_breadth_score DECIMAL(3,1), -- Range and relevance of skills
    cv_overall_score DECIMAL(3,1),
    
    -- Overall (general professional assessment)
    overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
    ai_summary TEXT, -- General professional summary
    key_strengths TEXT[],
    suggested_roles TEXT[], -- AI-suggested job types based on profile
    areas_to_improve TEXT[], -- Suggestions for strengthening application
    
    -- Metadata
    analysis_count INTEGER DEFAULT 1,
    raw_analysis_response JSONB,
    processing_time_ms INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_generic_apps_candidate ON generic_applications(candidate_id);

-- ============================================
-- JOB-SPECIFIC APPLICATION TABLES
-- ============================================

-- Job applications (created by internal team via application links)
CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    token VARCHAR(64) UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
    
    -- Job details (set by internal team when creating link)
    job_title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    job_description TEXT,
    requirements TEXT,
    case_study_instructions TEXT, -- Instructions for case study if required
    
    -- Requirements flags
    requires_video BOOLEAN DEFAULT TRUE,
    requires_resume BOOLEAN DEFAULT TRUE,
    requires_case_study BOOLEAN DEFAULT FALSE,
    requires_cover_letter BOOLEAN DEFAULT FALSE,
    
    -- Application source: custom uploads OR linked from generic application
    uses_generic_application BOOLEAN DEFAULT FALSE,
    generic_application_id UUID REFERENCES generic_applications(id) ON DELETE SET NULL,
    -- If uses_generic_application = TRUE, video & resume come from generic_application
    -- Case study is ALWAYS job-specific (uploaded to application_files)
    
    -- Candidate assignment
    candidate_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Status tracking
    status application_status DEFAULT 'unclaimed',
    analysis_status analysis_status DEFAULT 'pending',
    
    -- Metadata
    created_by_internal_id UUID REFERENCES users(id), -- Internal user who created link
    submitted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_applications_token ON job_applications(token);
CREATE INDEX idx_applications_candidate ON job_applications(candidate_id);
CREATE INDEX idx_applications_status ON job_applications(status);

-- Application files (uploads)
CREATE TABLE application_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES job_applications(id) ON DELETE CASCADE,
    file_type file_type NOT NULL,
    
    -- File metadata
    file_url TEXT NOT NULL, -- S3/GCS URL
    original_filename VARCHAR(255),
    mime_type VARCHAR(100),
    size_bytes BIGINT,
    duration_seconds INTEGER, -- For video files only
    
    -- Processing status (for video transcription)
    transcription_status analysis_status DEFAULT 'pending',
    transcription_text TEXT, -- Stored transcription
    
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(application_id, file_type) -- One file per type per application
);

CREATE INDEX idx_application_files_app ON application_files(application_id);

-- ============================================
-- AI ANALYSIS TABLES
-- ============================================

-- Application analysis (AI-generated scores and summary)
-- Note: When candidate re-analyzes, this record is updated (not a new record)
CREATE TABLE application_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID UNIQUE NOT NULL REFERENCES job_applications(id) ON DELETE CASCADE,
    
    -- Video interview scores (1-10 scale)
    video_communication_score DECIMAL(3,1),
    video_clarity_score DECIMAL(3,1),
    video_confidence_score DECIMAL(3,1),
    video_overall_score DECIMAL(3,1), -- Weighted average
    
    -- CV/Resume scores (1-10 scale)
    cv_relevance_score DECIMAL(3,1),
    cv_experience_match_score DECIMAL(3,1),
    cv_skills_match_score DECIMAL(3,1),
    cv_overall_score DECIMAL(3,1),
    
    -- Case study scores (1-10 scale, nullable if not required)
    case_study_problem_solving_score DECIMAL(3,1),
    case_study_analytical_depth_score DECIMAL(3,1),
    case_study_presentation_score DECIMAL(3,1),
    case_study_overall_score DECIMAL(3,1),
    
    -- Overall job fit
    overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
    ai_summary TEXT, -- 3-4 line summary
    key_strengths TEXT[], -- Array of strength points
    areas_of_concern TEXT[], -- Array of concerns
    
    -- Re-analysis tracking
    analysis_count INTEGER DEFAULT 1, -- Increments each time candidate re-analyzes
    
    -- Raw AI responses for debugging/auditing
    raw_analysis_response JSONB,
    
    -- Processing metadata
    processing_time_ms INTEGER,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- EMPLOYER DECISION TABLES
-- ============================================

-- Employer decisions on applications
CREATE TABLE employer_decisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    application_id UUID NOT NULL REFERENCES job_applications(id) ON DELETE CASCADE,
    
    decision decision_type NOT NULL,
    note TEXT, -- Optional employer note
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(employer_user_id, application_id) -- One decision per employer per application
);

CREATE INDEX idx_employer_decisions_employer ON employer_decisions(employer_user_id);
CREATE INDEX idx_employer_decisions_application ON employer_decisions(application_id);
CREATE INDEX idx_employer_decisions_interested ON employer_decisions(employer_user_id, decision) 
    WHERE decision = 'interested';

-- Interview schedules (tracked from Calendly)
CREATE TABLE interview_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    application_id UUID NOT NULL REFERENCES job_applications(id) ON DELETE CASCADE,
    
    -- Calendly event details
    calendly_event_id VARCHAR(255),
    scheduled_at TIMESTAMPTZ,
    duration_minutes INTEGER,
    meeting_url TEXT,
    
    -- Status
    status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, completed, cancelled
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- NOTIFICATION TABLES
-- ============================================

-- Notifications for candidates
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    type VARCHAR(50) NOT NULL, -- 'employer_interested', 'interview_scheduled', etc.
    title VARCHAR(255) NOT NULL,
    message TEXT,
    data JSONB, -- Additional context (application_id, employer_id, etc.)
    
    read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, read, created_at DESC);

-- ============================================
-- ADMIN/INTERNAL TABLES
-- ============================================

-- Application pipeline view for internal team
CREATE TABLE application_pipeline_status (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID UNIQUE NOT NULL REFERENCES job_applications(id) ON DELETE CASCADE,
    
    -- Pipeline stages
    link_created_at TIMESTAMPTZ,
    link_sent_at TIMESTAMPTZ,
    candidate_claimed_at TIMESTAMPTZ,
    submitted_at TIMESTAMPTZ,
    sent_to_employer_at TIMESTAMPTZ,
    employer_responded_at TIMESTAMPTZ,
    interview_scheduled_at TIMESTAMPTZ,
    
    -- Current stage
    current_stage VARCHAR(50), -- 'created', 'sent', 'claimed', 'submitted', 'with_employer', 'interview_set', 'closed'
    
    -- Notes from internal team
    internal_notes TEXT,
    assigned_to_internal_id UUID REFERENCES users(id),
    
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth_identities ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can read/update their own data
CREATE POLICY users_own ON users
    FOR ALL USING (id = auth.uid());

-- Candidates can see their own profiles
CREATE POLICY candidate_profiles_own ON candidate_profiles
    FOR ALL USING (user_id = auth.uid());

-- Employers can see their own company profiles
CREATE POLICY company_profiles_own ON company_profiles
    FOR ALL USING (employer_user_id = auth.uid());

-- Candidates can see their own applications
CREATE POLICY applications_candidate ON job_applications
    FOR SELECT USING (candidate_id = auth.uid());

-- Employers can view submitted applications (via token access handled at API level)
-- Internal users can see all applications
CREATE POLICY applications_internal ON job_applications
    FOR ALL USING (
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'internal')
    );

-- Employers can manage their own decisions
CREATE POLICY decisions_employer ON employer_decisions
    FOR ALL USING (employer_user_id = auth.uid());

-- Users can see their own notifications
CREATE POLICY notifications_own ON notifications
    FOR ALL USING (user_id = auth.uid());

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_candidate_profiles_skills ON candidate_profiles USING GIN(skills);
CREATE INDEX idx_applications_created_at ON job_applications(created_at DESC);
CREATE INDEX idx_analysis_overall_score ON application_analysis(overall_score DESC);

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_candidate_profiles_updated_at
    BEFORE UPDATE ON candidate_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_company_profiles_updated_at
    BEFORE UPDATE ON company_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_job_applications_updated_at
    BEFORE UPDATE ON job_applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_application_analysis_updated_at
    BEFORE UPDATE ON application_analysis
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_employer_decisions_updated_at
    BEFORE UPDATE ON employer_decisions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

## Entity Relationship Summary

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        ENTITY RELATIONSHIPS                              │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  users ─────────────┬──────────────────────────────────────────────────  │
│    │                │                                                    │
│    │ 1:N            │ 1:1 (per role)                                     │
│    ▼                ▼                                                    │
│  auth_identities   candidate_profiles ──or── company_profiles            │
│                                                                          │
│  users (internal) ─────────────────────────────────────────────────────  │
│    │                                                                     │
│    │ creates                                                             │
│    ▼                                                                     │
│  job_applications ───────────────────────────────────────────────────    │
│    │         │         │                                                 │
│    │ 1:1     │ 1:N     │ 1:1                                             │
│    ▼         ▼         ▼                                                 │
│  candidate  files   analysis                                             │
│  (user)     │                                                            │
│             ├── resume                                                   │
│             ├── video (+ transcription)                                  │
│             ├── case_study                                               │
│             └── cover_letter                                             │
│                                                                          │
│  job_applications ◄──────────────────────────────────────────────────    │
│    │                                                                     │
│    │ N:N (via employer_decisions)                                        │
│    ▼                                                                     │
│  employers ──► employer_decisions ──► notifications (to candidate)      │
│               │                                                          │
│               │ optional                                                 │
│               ▼                                                          │
│            interview_schedules                                           │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```