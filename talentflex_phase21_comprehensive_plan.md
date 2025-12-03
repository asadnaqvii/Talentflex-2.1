# TalentFlex Phase 2.1 - Comprehensive Planning Document

## Executive Summary

Phase 2.1 builds the core TalentFlex platform with:
- **Application link system** for candidates to submit video, CV, and case study
- **AI-powered analysis** scoring candidates on multiple dimensions
- **Employer review portal** with interest/reject/schedule actions
- **Internal admin dashboard** for pipeline management

---

## Updated Feature List (Phase 2.1 Final Scope)

### Core Features

| ID | Feature | Priority | Sprint |
|----|---------|----------|--------|
| **AUTH-1** | Email/password signup & login | P0 | 1 |
| **AUTH-2** | Google OAuth integration | P0 | 1 |
| **AUTH-3** | LinkedIn OAuth integration | P0 | 2 |
| **AUTH-4** | Account linking (auto-link by email) | P0 | 2 |
| **AUTH-5** | Role detection from signup context | P0 | 1 |
| **APP-1** | Application link public preview (guest) | P0 | 1 |
| **APP-2** | Candidate claims application on signup/login | P0 | 1 |
| **APP-3** | File upload - Video (MP4/WebM, 500MB, 10min) | P0 | 2 |
| **APP-4** | File upload - Resume PDF (5MB) | P0 | 2 |
| **APP-5** | File upload - Case Study PDF (10MB) | P0 | 2 |
| **APP-6** | Save as draft / Submit application | P0 | 2 |
| **APP-7** | Application status tracking | P0 | 2 |
| **AI-1** | Video transcription (Deepgram) | P0 | 2 |
| **AI-2** | CV content extraction (OpenAI GPT-4o) | P0 | 2 |
| **AI-3** | Case study analysis (OpenAI GPT-4o) | P0 | 2 |
| **AI-4** | Video interview scoring | P0 | 3 |
| **AI-5** | Job fit analysis & overall score | P0 | 3 |
| **AI-6** | AI summary generation (3-4 lines) | P0 | 3 |
| **EMP-1** | Employer guest view of application | P0 | 2 |
| **EMP-2** | Express Interest action | P0 | 2 |
| **EMP-3** | Reject action | P0 | 2 |
| **EMP-4** | Schedule Interview (Calendly embed) | P1 | 3 |
| **EMP-5** | Saved candidates list | P1 | 3 |
| **EMP-6** | Company profile with Calendly URL | P1 | 3 |
| **PROF-1** | Candidate profile CRUD | P1 | 2 |
| **PROF-2** | Employer company profile CRUD | P1 | 3 |
| **SET-1** | Update name/email | P1 | 2 |
| **SET-2** | Change password | P1 | 2 |
| **SET-3** | Connected accounts management | P1 | 2 |
| **SET-4** | Soft delete account | P2 | 3 |
| **NOTIFY-1** | Email notification on employer interest | P1 | 3 |
| **ADMIN-1** | Create application link form | P0 | 1 |
| **ADMIN-2** | Pipeline view (all applications) | P1 | 3 |

---

## Complete User Stories

### Candidate User Stories

#### C1: Apply via Application Link
```
EPIC: Candidate Application Flow

US-C1.1: View application link as guest
  AS A prospective candidate
  I WANT TO view job details from an application link
  SO THAT I can decide if I want to apply
  
  ACCEPTANCE CRITERIA:
  - Given I open /application/:token without being logged in
  - Then I see job title, company name, description
  - And I see case study instructions (if applicable)
  - And I see what's required (video, resume, case study)
  - And I see "Sign Up to Apply" and "Log In" buttons

US-C1.2: Sign up from application link
  AS A prospective candidate
  I WANT TO create an account from the application page
  SO THAT I can start my application
  
  ACCEPTANCE CRITERIA:
  - Given I click "Sign Up" from application page
  - Then I'm redirected to /signup?role=candidate&redirect=/application/:token
  - When I complete signup (email or social)
  - Then I'm redirected back to /application/:token
  - And the application is linked to my account (status: draft)

US-C1.3: Upload video introduction
  AS A candidate with a draft application
  I WANT TO upload or record my video introduction
  SO THAT employers can see me present myself
  
  ACCEPTANCE CRITERIA:
  - Given I'm on my draft application page
  - Then I see a video upload zone
  - When I upload a video (MP4/WebM/MOV, max 500MB, max 10 min)
  - Then the video is uploaded to cloud storage
  - And I see upload progress indicator
  - And I see confirmation when complete
  - And I can preview the uploaded video
  - And I can replace the video before submitting

US-C1.4: Upload resume/CV
  AS A candidate
  I WANT TO upload my resume as PDF
  SO THAT employers can review my experience
  
  ACCEPTANCE CRITERIA:
  - Given I'm on my draft application
  - When I upload a PDF (max 5MB)
  - Then the file is stored securely
  - And I see the filename displayed
  - And I can download/preview it
  - And I can replace it before submitting

US-C1.5: Upload case study
  AS A candidate applying to a role requiring case study
  I WANT TO upload my completed case study
  SO THAT employers can evaluate my analytical skills
  
  ACCEPTANCE CRITERIA:
  - Given the application requires a case study
  - Then I see the case study instructions provided
  - When I upload a PDF (max 10MB)
  - Then it's stored and displayed
  - If case study is not required, this section is hidden

US-C1.6: Save application as draft
  AS A candidate in progress
  I WANT TO save my partial application
  SO THAT I can complete it later
  
  ACCEPTANCE CRITERIA:
  - Given I have uploaded some files
  - When I click "Save Draft"
  - Then my progress is saved
  - And I see "Draft saved" confirmation
  - And I can leave and return later

US-C1.7: Submit application
  AS A candidate with complete application
  I WANT TO submit my application
  SO THAT it can be reviewed by employers
  
  ACCEPTANCE CRITERIA:
  - Given all required files are uploaded
  - When I click "Submit Application"
  - Then application status changes to "submitted"
  - And I see confirmation message
  - And I cannot edit/replace files anymore
  - And AI analysis is triggered in background
  - If required files are missing, submit button is disabled with tooltip

US-C1.8: View submitted application status
  AS A candidate who submitted
  I WANT TO see my application status
  SO THAT I know what's happening
  
  ACCEPTANCE CRITERIA:
  - Given I visit /application/:token after submitting
  - Then I see "Submitted" status with timestamp
  - And I see AI analysis status (processing/complete)
  - When analysis is complete
  - Then I see my scores and summary (optional: may hide from candidate)
```

#### C2: Candidate Profile
```
US-C2.1: Create/edit candidate profile
  AS A candidate
  I WANT TO fill out my profile
  SO THAT employers see a complete picture of me
  
  ACCEPTANCE CRITERIA:
  - Given I navigate to /candidate/profile
  - Then I can fill in: photo, headline, current role, about, experience, skills, location, preferences
  - When I save
  - Then changes persist
  - And I see success confirmation

US-C2.2: View my applications list
  AS A candidate
  I WANT TO see all my applications
  SO THAT I can track my job search
  
  ACCEPTANCE CRITERIA:
  - Given I navigate to /candidate/applications
  - Then I see a list of all my applications
  - Each showing: job title, company, status, date
  - And I can click to view details
```

#### C3: Candidate Settings
```
US-C3.1: Update account information
  AS A candidate
  I WANT TO change my name or email
  SO THAT my information is accurate
  
  ACCEPTANCE CRITERIA:
  - Given I'm on /settings
  - When I update name or email and save
  - Then changes are persisted
  - Email change may require verification

US-C3.2: Change password
  AS A candidate with email/password auth
  I WANT TO change my password
  SO THAT I can maintain security
  
  ACCEPTANCE CRITERIA:
  - Given I have a password set
  - When I enter current password and new password
  - Then password is updated
  - If current password is wrong, show error

US-C3.3: Manage connected accounts
  AS A candidate
  I WANT TO see and manage my connected social accounts
  SO THAT I control my login methods
  
  ACCEPTANCE CRITERIA:
  - Given I'm on /settings
  - Then I see which providers are connected (Google, LinkedIn)
  - I can connect additional providers
  - I can disconnect a provider IF another login method exists
  - Cannot disconnect last login method

US-C3.4: Delete my account
  AS A candidate
  I WANT TO delete my account
  SO THAT my data is removed
  
  ACCEPTANCE CRITERIA:
  - Given I'm on /settings
  - When I click "Delete Account" and confirm
  - Then my account is soft-deleted
  - And I'm logged out
  - And I cannot log in again with same credentials
```

---

### Employer User Stories

#### E1: View Candidate Application (Guest)
```
US-E1.1: View application as guest employer
  AS an employer receiving a candidate link
  I WANT TO preview the candidate
  SO THAT I can decide if I want to take action
  
  ACCEPTANCE CRITERIA:
  - Given I open /application/:token without being logged in
  - And the application is submitted
  - Then I see candidate profile summary
  - And I see AI analysis scores and summary
  - And I see links to view/download files
  - And I see video player for video intro
  - And I see CTA: "Sign Up as Employer to Connect"
```

#### E2: Employer Actions
```
US-E2.1: Express interest in candidate
  AS a logged-in employer
  I WANT TO express interest in a candidate
  SO THAT they know I want to proceed
  
  ACCEPTANCE CRITERIA:
  - Given I'm viewing an application as employer
  - When I click "Express Interest"
  - Then a decision record is created
  - And candidate receives email notification
  - And button changes to "Interested ✓"
  - And candidate appears in my saved list

US-E2.2: Reject candidate
  AS a logged-in employer
  I WANT TO reject a candidate
  SO THAT I can track my decisions
  
  ACCEPTANCE CRITERIA:
  - Given I'm viewing an application
  - When I click "Reject"
  - Then decision is recorded
  - And I can optionally add a note
  - And candidate is NOT notified
  - And button changes to "Rejected"

US-E2.3: Schedule interview
  AS an employer interested in candidate
  I WANT TO schedule an interview
  SO THAT we can proceed to next steps
  
  ACCEPTANCE CRITERIA:
  - Given I have Calendly URL in my profile
  - When I click "Schedule Interview"
  - Then Calendly widget opens (embedded popup)
  - With candidate name pre-filled if possible
  - When meeting is booked
  - Then record is saved to interview_schedules
  - If no Calendly URL, button shows "Set up Calendly in Profile"
```

#### E3: Company Profile
```
US-E3.1: Set up company profile
  AS an employer
  I WANT TO fill out my company profile
  SO THAT candidates know about my company
  
  ACCEPTANCE CRITERIA:
  - Given I navigate to /employer/profile
  - Then I can fill in: company name, logo, website, description, size, industry, locations, Calendly URL
  - When I save
  - Then changes persist
```

#### E4: Saved Candidates
```
US-E4.1: View saved candidates list
  AS an employer
  I WANT TO see all candidates I've expressed interest in
  SO THAT I can manage my pipeline
  
  ACCEPTANCE CRITERIA:
  - Given I navigate to /employer/saved-candidates
  - Then I see list of candidates where decision = 'interested'
  - Each row shows: candidate name, job title, company, overall score, date
  - I can click to view full application
```

---

### Internal/Admin User Stories

#### A1: Create Application Links
```
US-A1.1: Create new application link
  AS an internal TalentFlex user
  I WANT TO create a new application link
  SO THAT I can send it to a candidate
  
  ACCEPTANCE CRITERIA:
  - Given I navigate to /admin/create-application
  - Then I see a form with fields:
    - Job Title (required)
    - Company Name (required)
    - Location
    - Job Description
    - Requirements
    - Case Study Instructions
    - Checkboxes: Requires Video, Resume, Case Study, Cover Letter
  - When I submit
  - Then a new job_application record is created
  - And I see the generated link: /application/:token
  - And I can copy link to clipboard
```

#### A2: Pipeline View
```
US-A2.1: View all applications pipeline
  AS an internal TalentFlex user
  I WANT TO see all applications across the platform
  SO THAT I can manage the overall pipeline
  
  ACCEPTANCE CRITERIA:
  - Given I navigate to /admin/pipeline
  - Then I see a table/kanban of all applications
  - Columns: Job, Candidate, Status, Analysis Status, Employer Actions, Created Date
  - I can filter by status
  - I can click to view any application
```

---

## Complete User Flows (Visual)

### Flow 1: Candidate Application Journey

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                         CANDIDATE APPLICATION JOURNEY                              │
└────────────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │   START     │
    └──────┬──────┘
           │
           ▼
    ┌─────────────────────────────────────────────────────────────────────────┐
    │  Candidate receives application link via email/WhatsApp                 │
    │  (e.g., talentflex.com/application/abc123xyz)                          │
    └──────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
    ┌─────────────────────────────────────────────────────────────────────────┐
    │  /application/:token - GUEST VIEW                                       │
    │  ┌─────────────────────────────────────────────────────────────────┐   │
    │  │  📋 Senior Product Manager at TechCorp                          │   │
    │  │  Location: Remote/San Francisco                                 │   │
    │  │                                                                 │   │
    │  │  About this role:                                               │   │
    │  │  We're looking for a PM to lead our core product...            │   │
    │  │                                                                 │   │
    │  │  What you'll need to submit:                                    │   │
    │  │  ✓ Video Introduction (5-10 minutes)                            │   │
    │  │  ✓ Resume/CV (PDF)                                              │   │
    │  │  ✓ Case Study: "Analyze market entry strategy for..."           │   │
    │  │                                                                 │   │
    │  │  ┌─────────────────┐  ┌─────────────────┐                      │   │
    │  │  │ Sign Up to      │  │ Already have    │                      │   │
    │  │  │ Apply           │  │ account? Log In │                      │   │
    │  │  └────────┬────────┘  └────────┬────────┘                      │   │
    │  └───────────┼─────────────────────┼───────────────────────────────┘   │
    └──────────────┼─────────────────────┼───────────────────────────────────┘
                   │                     │
                   ▼                     ▼
    ┌──────────────────────────────────────────────────────────────────────────┐
    │  /signup?role=candidate&redirect=/application/:token                     │
    │  ┌────────────────────────────────────────────────────────────────────┐  │
    │  │                    Create Your Account                             │  │
    │  │                                                                    │  │
    │  │  ┌────────────────────────────────────────────────────────────┐   │  │
    │  │  │  🔵 Continue with Google                                   │   │  │
    │  │  └────────────────────────────────────────────────────────────┘   │  │
    │  │  ┌────────────────────────────────────────────────────────────┐   │  │
    │  │  │  🔗 Continue with LinkedIn                                 │   │  │
    │  │  └────────────────────────────────────────────────────────────┘   │  │
    │  │                                                                    │  │
    │  │  ─────────────────── OR ───────────────────                       │  │
    │  │                                                                    │  │
    │  │  Email:    [________________________]                              │  │
    │  │  Password: [________________________]                              │  │
    │  │                                                                    │  │
    │  │  I am a:  (●) Job Seeker   ( ) Employer                           │  │
    │  │                                                                    │  │
    │  │  ┌────────────────────────────────────────────────────────────┐   │  │
    │  │  │  Create Account                                            │   │  │
    │  │  └────────────────────────────────────────────────────────────┘   │  │
    │  └────────────────────────────────────────────────────────────────────┘  │
    │                                                                          │
    │  → On success: candidate_id linked to application, status = 'draft'      │
    │  → Redirect back to /application/:token                                  │
    └─────────────────────────────────────────────────────────┬────────────────┘
                                                              │
                                                              ▼
    ┌──────────────────────────────────────────────────────────────────────────┐
    │  /application/:token - AUTHENTICATED (DRAFT)                             │
    │  ┌────────────────────────────────────────────────────────────────────┐  │
    │  │  Your Application: Senior PM at TechCorp                           │  │
    │  │  Status: 📝 DRAFT                                                  │  │
    │  │                                                                    │  │
    │  │  ┌──────────────────────────────────────────────────────────────┐  │  │
    │  │  │  📹 VIDEO INTRODUCTION                              Required │  │  │
    │  │  │  Record or upload a 5-10 minute video introducing yourself  │  │  │
    │  │  │                                                              │  │  │
    │  │  │  ┌──────────────────────────────────────────────────────┐   │  │  │
    │  │  │  │                                                      │   │  │  │
    │  │  │  │    [📤 Upload Video]  or  [🎥 Record Now]           │   │  │  │
    │  │  │  │                                                      │   │  │  │
    │  │  │  │    Formats: MP4, WebM, MOV • Max: 500MB, 10 min     │   │  │  │
    │  │  │  │                                                      │   │  │  │
    │  │  │  └──────────────────────────────────────────────────────┘   │  │  │
    │  │  │  Status: ○ Not uploaded                                     │  │  │
    │  │  └──────────────────────────────────────────────────────────────┘  │  │
    │  │                                                                    │  │
    │  │  ┌──────────────────────────────────────────────────────────────┐  │  │
    │  │  │  📄 RESUME/CV                                       Required │  │  │
    │  │  │                                                              │  │  │
    │  │  │  [📤 Upload PDF]              Format: PDF • Max: 5MB        │  │  │
    │  │  │  Status: ○ Not uploaded                                     │  │  │
    │  │  └──────────────────────────────────────────────────────────────┘  │  │
    │  │                                                                    │  │
    │  │  ┌──────────────────────────────────────────────────────────────┐  │  │
    │  │  │  📊 CASE STUDY                                      Required │  │  │
    │  │  │                                                              │  │  │
    │  │  │  Instructions:                                               │  │  │
    │  │  │  "Analyze market entry strategy for a B2B SaaS product      │  │  │
    │  │  │   entering the Southeast Asian market. Include..."          │  │  │
    │  │  │                                                              │  │  │
    │  │  │  [📤 Upload PDF]              Format: PDF • Max: 10MB       │  │  │
    │  │  │  Status: ○ Not uploaded                                     │  │  │
    │  │  └──────────────────────────────────────────────────────────────┘  │  │
    │  │                                                                    │  │
    │  │  ┌────────────────────┐  ┌────────────────────────────────────┐   │  │
    │  │  │    Save Draft      │  │    Submit Application (disabled)   │   │  │
    │  │  └────────────────────┘  └────────────────────────────────────┘   │  │
    │  │                          ⚠️ Upload all required files to submit   │  │
    │  └────────────────────────────────────────────────────────────────────┘  │
    └──────────────────────────────────────────────────────────┬───────────────┘
                                                               │
                              ┌─────────────────────────────────┐
                              │  Candidate uploads all files    │
                              └────────────────┬────────────────┘
                                               │
                                               ▼
    ┌──────────────────────────────────────────────────────────────────────────┐
    │  /application/:token - ALL FILES UPLOADED                                │
    │  ┌────────────────────────────────────────────────────────────────────┐  │
    │  │  📹 VIDEO: intro_video.mp4                          ✓ Uploaded    │  │
    │  │  📄 RESUME: john_doe_resume.pdf                     ✓ Uploaded    │  │
    │  │  📊 CASE STUDY: market_analysis.pdf                 ✓ Uploaded    │  │
    │  │                                                                    │  │
    │  │  ┌────────────────────┐  ┌────────────────────────────────────┐   │  │
    │  │  │    Save Draft      │  │    ✅ Submit Application           │   │  │
    │  │  └────────────────────┘  └───────────────────┬────────────────┘   │  │
    │  └──────────────────────────────────────────────┼─────────────────────┘  │
    └─────────────────────────────────────────────────┼─────────────────────────┘
                                                      │
                                                      ▼
    ┌──────────────────────────────────────────────────────────────────────────┐
    │  SUBMISSION PROCESSING                                                   │
    │                                                                          │
    │  1. application.status = 'submitted'                                     │
    │  2. application.submitted_at = now()                                     │
    │  3. Queue async job: AI_ANALYSIS                                         │
    │     ├── Transcribe video (Deepgram) ────────────────────────┐           │
    │     ├── Extract CV content (OpenAI GPT-4o)                          │           │
    │     ├── Analyze case study (OpenAI GPT-4o)                          │           │
    │     └── Generate scores + summary (OpenAI GPT-4o) ◄─────────────────┘           │
    │  4. application.analysis_status = 'processing' → 'completed'             │
    │                                                                          │
    └──────────────────────────────────────────────────────────────────────────┘
                                                      │
                                                      ▼
    ┌──────────────────────────────────────────────────────────────────────────┐
    │  /application/:token - SUBMITTED VIEW                                    │
    │  ┌────────────────────────────────────────────────────────────────────┐  │
    │  │  Your Application: Senior PM at TechCorp                           │  │
    │  │  Status: ✅ SUBMITTED • December 3, 2025                           │  │
    │  │                                                                    │  │
    │  │  Your submitted files:                                             │  │
    │  │  • 📹 intro_video.mp4                                              │  │
    │  │  • 📄 john_doe_resume.pdf                                          │  │
    │  │  • 📊 market_analysis.pdf                                          │  │
    │  │                                                                    │  │
    │  │  ─────────────────────────────────────────────────────────         │  │
    │  │                                                                    │  │
    │  │  AI Analysis: ⏳ Processing...                                     │  │
    │  │  (Your application is being analyzed. Check back soon.)            │  │
    │  │                                                                    │  │
    │  │  ─────────────────────────────────────────────────────────         │  │
    │  │                                                                    │  │
    │  │  What's next?                                                      │  │
    │  │  • Your application will be shared with employers                  │  │
    │  │  • You'll be notified when an employer expresses interest          │  │
    │  └────────────────────────────────────────────────────────────────────┘  │
    └──────────────────────────────────────────────────────────────────────────┘
                                                      │
                                                      ▼
                                               ┌─────────────┐
                                               │     END     │
                                               └─────────────┘
```

### Flow 2: Employer Review Journey

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                           EMPLOYER REVIEW JOURNEY                                  │
└────────────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │   START     │
    └──────┬──────┘
           │
           ▼
    ┌─────────────────────────────────────────────────────────────────────────┐
    │  TalentFlex internal team sends candidate application link to employer  │
    │  (via email: "Here's a great candidate for your Senior PM role")        │
    └──────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
    ┌─────────────────────────────────────────────────────────────────────────┐
    │  /application/:token - EMPLOYER GUEST VIEW                              │
    │  ┌─────────────────────────────────────────────────────────────────┐   │
    │  │  Candidate for: Senior Product Manager                          │   │
    │  │                                                                 │   │
    │  │  ┌─────────────────────────────────────────────────────────┐   │   │
    │  │  │  👤 CANDIDATE PROFILE                                   │   │   │
    │  │  │  ─────────────────────────────────────────────────────  │   │   │
    │  │  │  Name: John Doe                                         │   │   │
    │  │  │  Headline: Senior Product Manager | B2B SaaS | 6+ yrs   │   │   │
    │  │  │  Location: San Francisco, CA                            │   │   │
    │  │  │                                                         │   │   │
    │  │  │  About:                                                 │   │   │
    │  │  │  Experienced PM with track record in scaling products..│   │   │
    │  │  └─────────────────────────────────────────────────────────┘   │   │
    │  │                                                                 │   │
    │  │  ┌─────────────────────────────────────────────────────────┐   │   │
    │  │  │  📊 AI ANALYSIS                                         │   │   │
    │  │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   │   │
    │  │  │                                                         │   │   │
    │  │  │  OVERALL FIT SCORE                                      │   │   │
    │  │  │  ┌─────────────────────────────────────────────────┐    │   │   │
    │  │  │  │  78/100                           ████████░░░   │    │   │   │
    │  │  │  └─────────────────────────────────────────────────┘    │   │   │
    │  │  │                                                         │   │   │
    │  │  │  "Strong candidate with 6+ years PM experience in      │   │   │
    │  │  │   B2B SaaS. Excellent communication skills evident     │   │   │
    │  │  │   in video presentation. Case study demonstrates       │   │   │
    │  │  │   solid analytical thinking. Minor gap in enterprise   │   │   │
    │  │  │   experience."                                         │   │   │
    │  │  │                                                         │   │   │
    │  │  │  Component Scores:                                      │   │   │
    │  │  │  • Video Interview:  82/100  ████████░░                │   │   │
    │  │  │  • Resume Match:     75/100  ███████░░░                │   │   │
    │  │  │  • Case Study:       77/100  ███████░░░                │   │   │
    │  │  └─────────────────────────────────────────────────────────┘   │   │
    │  │                                                                 │   │
    │  │  ┌─────────────────────────────────────────────────────────┐   │   │
    │  │  │  📎 ATTACHMENTS                                         │   │   │
    │  │  │                                                         │   │   │
    │  │  │  📹 Video Introduction          [▶ Play Video]         │   │   │
    │  │  │  📄 Resume                      [View PDF]             │   │   │
    │  │  │  📊 Case Study                  [View PDF]             │   │   │
    │  │  └─────────────────────────────────────────────────────────┘   │   │
    │  │                                                                 │   │
    │  │  ═══════════════════════════════════════════════════════════   │   │
    │  │                                                                 │   │
    │  │  Want to connect with this candidate?                           │   │
    │  │                                                                 │   │
    │  │  ┌─────────────────────┐  ┌─────────────────────┐              │   │
    │  │  │ Sign Up as Employer │  │ Log In              │              │   │
    │  │  └──────────┬──────────┘  └──────────┬──────────┘              │   │
    │  └─────────────┼─────────────────────────┼─────────────────────────┘   │
    └────────────────┼─────────────────────────┼─────────────────────────────┘
                     │                         │
                     ▼                         ▼
    ┌──────────────────────────────────────────────────────────────────────────┐
    │  /signup?role=employer&redirect=/application/:token                      │
    │  (or /login with redirect)                                               │
    │                                                                          │
    │  → Employer creates account / logs in                                    │
    │  → Redirected back to application with full actions                      │
    └──────────────────────────────────────────────────────────┬───────────────┘
                                                               │
                                                               ▼
    ┌──────────────────────────────────────────────────────────────────────────┐
    │  /application/:token - AUTHENTICATED EMPLOYER VIEW                       │
    │  ┌────────────────────────────────────────────────────────────────────┐  │
    │  │  [Same candidate info and AI analysis as above]                    │  │
    │  │                                                                    │  │
    │  │  ═══════════════════════════════════════════════════════════       │  │
    │  │                                                                    │  │
    │  │  YOUR ACTIONS                                                      │  │
    │  │  ┌──────────────────────────────────────────────────────────────┐  │  │
    │  │  │                                                              │  │  │
    │  │  │  ┌───────────────────┐  ┌───────────────────┐               │  │  │
    │  │  │  │ 💚 Express        │  │ ❌ Reject         │               │  │  │
    │  │  │  │    Interest       │  │                   │               │  │  │
    │  │  │  └─────────┬─────────┘  └─────────┬─────────┘               │  │  │
    │  │  │            │                      │                          │  │  │
    │  │  │  ┌─────────────────────────────────────────────────────┐    │  │  │
    │  │  │  │ 📅 Schedule Interview                               │    │  │  │
    │  │  │  │    (Opens Calendly - set up in your profile)        │    │  │  │
    │  │  │  └─────────────────────────────────────────────────────┘    │  │  │
    │  │  │                                                              │  │  │
    │  │  │  Add a note (optional):                                      │  │  │
    │  │  │  ┌──────────────────────────────────────────────────────┐   │  │  │
    │  │  │  │                                                      │   │  │  │
    │  │  │  └──────────────────────────────────────────────────────┘   │  │  │
    │  │  │                                                              │  │  │
    │  │  └──────────────────────────────────────────────────────────────┘  │  │
    │  └────────────────────────────────────────────────────────────────────┘  │
    └──────────────────────────────────────────────────────────────────────────┘
                     │                                    │
                     ▼                                    ▼
    ┌────────────────────────────────┐    ┌────────────────────────────────────┐
    │  EXPRESS INTEREST              │    │  SCHEDULE INTERVIEW                │
    │                                │    │                                    │
    │  1. Create employer_decision   │    │  1. Open Calendly widget           │
    │     (decision: 'interested')   │    │  2. Pre-fill candidate name        │
    │  2. Send email to candidate:   │    │  3. Employer selects time          │
    │     "Good news! TechCorp is    │    │  4. Save to interview_schedules    │
    │      interested in you..."     │    │  5. Both parties get confirmation  │
    │  3. Create notification record │    │                                    │
    │  4. Add to saved candidates    │    │                                    │
    └────────────────────────────────┘    └────────────────────────────────────┘
```

---

## Updated Sprint Plan

### Sprint 1: Foundation + Admin + Auth (Weeks 1-2)

**Goals:**
- Project setup & CI/CD
- Complete auth system (email + Google)
- Admin dashboard for creating application links
- Public application page (guest view)

**Deliverables:**

| Task | Story | Estimate | Priority |
|------|-------|----------|----------|
| Project scaffolding (monorepo setup) | - | 4h | P0 |
| Database setup (Supabase + schema) | - | 4h | P0 |
| CI pipeline (GitHub Actions) | - | 4h | P0 |
| User model + migrations | AUTH-1 | 2h | P0 |
| AuthIdentity model + migrations | AUTH-2 | 2h | P0 |
| Email signup/login endpoints | AUTH-1 | 6h | P0 |
| Email signup/login UI | AUTH-1 | 4h | P0 |
| Google OAuth backend | AUTH-2 | 6h | P0 |
| Google OAuth UI flow | AUTH-2 | 3h | P0 |
| Role detection from redirect | AUTH-5 | 2h | P0 |
| Session/JWT middleware | AUTH-1 | 3h | P0 |
| JobApplication model + migrations | APP-1 | 2h | P0 |
| GET /api/applications/by-token/:token | APP-1 | 3h | P0 |
| /application/[token] guest UI | APP-1 | 4h | P0 |
| Admin: Create application form backend | ADMIN-1 | 4h | P0 |
| Admin: Create application form UI | ADMIN-1 | 4h | P0 |
| Basic candidate/employer dashboards | - | 3h | P1 |
| Environment setup docs | - | 2h | P1 |

**Sprint 1 Total: ~62 hours**

---

### Sprint 2: Candidate Experience + File Uploads + AI Pipeline (Weeks 3-4)

**Goals:**
- Complete file upload system (video, CV, case study)
- Video transcription integration (Deepgram)
- AI content extraction (OpenAI GPT-4o)
- Candidate claims application + submits
- Employer guest view with analysis
- LinkedIn OAuth

**Deliverables:**

| Task | Story | Estimate | Priority |
|------|-------|----------|----------|
| LinkedIn OAuth backend | AUTH-3 | 6h | P0 |
| LinkedIn OAuth UI | AUTH-3 | 2h | P0 |
| Account auto-linking by email | AUTH-4 | 4h | P0 |
| ApplicationFile model + migrations | APP-3,4,5 | 2h | P0 |
| S3/GCS presigned URL generation | APP-3,4,5 | 4h | P0 |
| File upload component (frontend) | APP-3,4,5 | 6h | P0 |
| Video upload with progress | APP-3 | 4h | P0 |
| Video duration validation | APP-3 | 2h | P0 |
| PDF upload + validation | APP-4,5 | 3h | P0 |
| Candidate claims application on login | APP-2 | 3h | P0 |
| Draft application UI (upload zones) | APP-6 | 6h | P0 |
| Save draft endpoint | APP-6 | 2h | P0 |
| Submit application endpoint | APP-6 | 3h | P0 |
| Application status tracking | APP-7 | 2h | P0 |
| Deepgram integration (transcription) | AI-1 | 6h | P0 |
| OpenAI CV extraction | AI-2 | 4h | P0 |
| OpenAI case study extraction | AI-3 | 4h | P0 |
| Async job queue setup | AI-1 | 4h | P0 |
| CandidateProfile model + CRUD | PROF-1 | 4h | P1 |
| /candidate/profile UI | PROF-1 | 4h | P1 |
| Employer guest view (with analysis) | EMP-1 | 4h | P0 |
| EmployerDecision model | EMP-2,3 | 2h | P0 |
| Express Interest endpoint | EMP-2 | 2h | P0 |
| Reject endpoint | EMP-3 | 2h | P0 |
| Settings: update name/email | SET-1 | 2h | P1 |
| Settings: change password | SET-2 | 2h | P1 |
| Settings: connected accounts UI | SET-3 | 3h | P1 |

**Sprint 2 Total: ~92 hours**

---

### Sprint 3: AI Scoring + Employer Features + Polish (Weeks 5-6)

**Goals:**
- Complete AI scoring and summary generation
- Employer authenticated actions
- Calendly scheduling integration
- Company profiles + saved candidates
- Notifications
- Polish, error handling, testing

**Deliverables:**

| Task | Story | Estimate | Priority |
|------|-------|----------|----------|
| ApplicationAnalysis model | AI-4,5,6 | 2h | P0 |
| Video interview scoring (OpenAI GPT-4o) | AI-4 | 6h | P0 |
| CV scoring (OpenAI GPT-4o) | AI-4 | 4h | P0 |
| Case study scoring (OpenAI GPT-4o) | AI-4 | 4h | P0 |
| Overall job fit calculation | AI-5 | 3h | P0 |
| AI summary generation | AI-6 | 3h | P0 |
| Display scores in employer view | AI-5 | 4h | P0 |
| Display scores in candidate view | AI-5 | 3h | P1 |
| Employer authenticated actions UI | EMP-2,3 | 4h | P0 |
| CompanyProfile model + CRUD | EMP-6 | 3h | P1 |
| /employer/profile UI | EMP-6 | 4h | P1 |
| Calendly embed integration | EMP-4 | 6h | P1 |
| InterviewSchedule model | EMP-4 | 2h | P1 |
| Track scheduled interviews | EMP-4 | 3h | P1 |
| Saved candidates list backend | EMP-5 | 2h | P1 |
| /employer/saved-candidates UI | EMP-5 | 4h | P1 |
| Notification model | NOTIFY-1 | 2h | P1 |
| Email notification on interest | NOTIFY-1 | 4h | P1 |
| Soft delete account | SET-4 | 2h | P2 |
| Admin pipeline view backend | ADMIN-2 | 4h | P1 |
| Admin pipeline view UI | ADMIN-2 | 4h | P1 |
| Error handling & empty states | - | 4h | P1 |
| Loading states & skeletons | - | 3h | P1 |
| E2E tests: candidate flow | - | 6h | P1 |
| E2E tests: employer flow | - | 4h | P1 |
| Security review (RLS, access control) | - | 4h | P0 |
| Production deployment | - | 4h | P0 |

**Sprint 3 Total: ~98 hours**

---

## Summary

| Sprint | Focus | Hours |
|--------|-------|-------|
| Sprint 1 | Foundation + Auth + Admin | ~62h |
| Sprint 2 | Files + AI Pipeline + Employer Guest | ~92h |
| Sprint 3 | AI Scoring + Employer Actions + Polish | ~98h |
| **Total** | | **~252h** |

**Assumptions:**
- 2 developers working ~40h/week each = 80h/sprint
- With buffer for meetings/reviews: ~60h productive/sprint
- Total capacity: 180h over 3 sprints
- **Gap:** ~72h → either extend to 4 sprints or cut P2 items

**Recommendation:** Extend to **4 sprints (8 weeks)** or defer P2 items (soft delete, some polish) to Phase 2.2.
