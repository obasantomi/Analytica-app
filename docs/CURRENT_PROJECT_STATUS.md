# Current Project Status

## Project Overview

Analytica is a Next.js application for guided data analytics learning. The current implementation centers on user onboarding, authentication, project creation, AI-assisted project workflows, and a dashboard for reviewing progress and skill development. The app combines a Prisma-backed data model with server-side API routes and a client-side experience for project generation, AI mentor interaction, answer submission, and AI review feedback.

The codebase currently appears to be in an active beta-style implementation with several core flows working, but a few routes and pages remain placeholder or partially implemented.

## Tech Stack

| Area                       | Current implementation                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Frameworks                 | Next.js 16, React 19, TypeScript                                                                                    |
| Languages                  | TypeScript, JavaScript, SQL                                                                                         |
| Styling solution           | Tailwind CSS 4 with DaisyUI                                                                                         |
| State management           | React local state via useState/useEffect; no active global state library in use (zustand is installed but not used) |
| Data fetching              | Axios for client-side requests and server-side API calls; Prisma ORM for database access                            |
| Authentication             | NextAuth.js with credentials and Google OAuth providers                                                             |
| Form libraries             | React Hook Form                                                                                                     |
| Validation                 | Zod                                                                                                                 |
| Charts                     | Recharts                                                                                                            |
| UI libraries               | React Icons, Framer Motion, React Hot Toast, React Loading Skeleton                                                 |
| Utilities                  | Prisma client, bcrypt, PapaParse, json2csv, dotenv                                                                  |
| Other notable dependencies | Google GenAI SDK for Gemini-based AI features                                                                       |

## Current Folder Structure

The application uses the Next.js App Router structure under the app directory.

- app/(auth) — authentication-related pages and providers
- app/(dashboard) — protected dashboard experience, project lab UI, and dashboard components
- app/(marketing) — landing page route
- app/api — route handlers and server-side services for auth, onboarding, projects, and user data
- app/onboarding — onboarding flow for first-time users
- app/prompts — prompt templates used by AI flows
- app/generated/prisma — generated Prisma client artifacts
- lib — shared helper modules and dataset configuration definitions
- prisma — Prisma schema and migrations
- public/images — static assets and icons

## Implemented Features

| Feature                                    | Description                                                                                           | Status                | Major components involved                                                                                                                                                                                              | Routes/pages involved                             | APIs used                                                |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------- |
| Authentication                             | Credentials login and Google OAuth sign-in are implemented through NextAuth                           | Implemented           | app/(auth)/sign-in/page.tsx, app/(auth)/sign-up/page.tsx, app/api/auth/authOptions.ts                                                                                                                                  | /sign-in, /sign-up                                | NextAuth routes under /api/auth                          |
| User onboarding                            | Users can complete profile setup with username, expertise, experience, and domain interests           | Implemented           | app/onboarding/OnboardingClient.tsx, app/onboarding/onboardUserSchema.ts                                                                                                                                               | /onboarding                                       | /api/onboardUser                                         |
| Dashboard experience                       | Authenticated users see a dashboard with project count, skill radar, and recent projects              | Implemented           | app/(dashboard)/components/DashboardView.tsx, RecentProjectsView.tsx, SkillRadarCard.tsx                                                                                                                               | /dashboard                                        | /api/user/skills                                         |
| Project lab entry and project creation     | Users can select discipline, difficulty, and scenario to generate a project workspace                 | Implemented           | app/(dashboard)/project-lab/new/page.tsx, app/(dashboard)/components/DisciplineSelector.tsx, DifficultySelector.tsx, IndustryScenarioSelector.tsx                                                                      | /project-lab/new                                  | /api/projects                                            |
| AI-generated project setup                 | The backend fetches a World Bank dataset, summarizes it, and generates AI questions for a new project | Implemented           | app/api/projects/route.ts, app/api/projects/controllers/dataset.controller.ts, app/api/projects/services/buildWorldBankUrl.ts, app/api/projects/services/datasetService.ts, app/api/projects/[id]/chat/chat.service.ts | /project-lab/new                                  | World Bank API, Gemini via Google GenAI                  |
| Project lab detail view                    | Each project has a detail experience with business context, tasks, and answer submission              | Implemented           | app/(dashboard)/project-lab/[projectId]/page.tsx, ProjectLabMainColumn.tsx, DatasetInfoBox.tsx                                                                                                                         | /project-lab/[projectId]                          | /api/projects/[id]/download                              |
| AI mentor panel                            | A chat-style mentor panel allows users to ask for guidance during the project flow                    | Implemented           | app/(dashboard)/project-lab/components/AIMentorPanel.tsx, MentorPanelContent.tsx                                                                                                                                       | /project-lab/[projectId]                          | /api/projects/[id]/chat                                  |
| Answer submission and AI review            | Users can submit answers to generated questions and receive AI feedback                               | Implemented           | app/(dashboard)/project-lab/components/AnswerQuestionsModal.tsx, app/(dashboard)/project-lab/components/DatasetInfoBox.tsx, app/api/projects/[id]/review-details/route.ts                                              | /project-lab/[projectId]                          | /api/projects/[id]/review-details                        |
| Review results page                        | AI evaluation results can be viewed in a dedicated page after review generation                       | Implemented           | app/(dashboard)/project-lab/[projectId]/details/page.tsx and supporting detail components                                                                                                                              | /project-lab/[projectId]/details                  | /api/projects/[id]/review-details (via prior submission) |
| Skill profile                              | The application tracks user skills and presents a skill radar and summary statistics                  | Implemented           | app/(dashboard)/skill-profile/page.tsx, SkillRaderChart.tsx, app/api/user/skills/route.ts                                                                                                                              | /skill-profile                                    | /api/user/skills                                         |
| Project archive and recent projects        | Users can review their past projects from the dashboard and project lab pages                         | Implemented           | app/(dashboard)/components/PastProjectsView.tsx, RecentProjectsView.tsx, ProjectCard.tsx                                                                                                                               | /project-lab, /dashboard                          | Prisma queries via server components                     |
| Landing page                               | A root landing page route exists                                                                      | Partially implemented | app/(marketing)/page.tsx                                                                                                                                                                                               | /                                                 | None                                                     |
| AI Critique and Learning Path placeholders | Dedicated placeholder views exist for these areas                                                     | Partially implemented | app/(dashboard)/components/AICritiqueLabel.tsx, LearningPathView.tsx                                                                                                                                                   | /ai-critique, /skill-profile-related placeholders | None                                                     |

## Pages and Routes

| Route                            | Purpose                                                     | Status                               |
| -------------------------------- | ----------------------------------------------------------- | ------------------------------------ |
| /                                | Marketing landing page                                      | Placeholder / minimal implementation |
| /sign-in                         | User sign-in page with credentials and Google OAuth options | Implemented                          |
| /sign-up                         | User registration page                                      | Implemented                          |
| /onboarding                      | First-time user profile setup                               | Implemented                          |
| /dashboard                       | Main authenticated dashboard                                | Implemented                          |
| /project-lab                     | Project archive and entry point for new projects            | Implemented                          |
| /project-lab/new                 | Project configuration form for generating a new project     | Implemented                          |
| /project-lab/[projectId]         | Active project workspace with AI mentor and exercise view   | Implemented                          |
| /project-lab/[projectId]/details | AI review results and feedback breakdown                    | Implemented                          |
| /skill-profile                   | Skill assessment and progress summary                       | Implemented                          |
| /ai-critique                     | Dedicated AI critique route                                 | Placeholder                          |

## Components

| Component                | Where it is used                                  | Purpose                                                                |
| ------------------------ | ------------------------------------------------- | ---------------------------------------------------------------------- |
| DashboardShell           | app/(dashboard)/layout.tsx                        | Wraps the authenticated dashboard with sidebar and top navigation      |
| DashboardSidebar         | app/(dashboard)/components/DashboardSidebar.tsx   | Main dashboard navigation and logout entry                             |
| DashboardNav             | app/(dashboard)/components/DashboardNav.tsx       | User profile dropdown and logout action                                |
| DashboardView            | app/(dashboard)/components/DashboardView.tsx      | Renders dashboard hero content and stat cards                          |
| RecentProjectsView       | app/(dashboard)/components/RecentProjectsView.tsx | Displays the latest three user projects                                |
| PastProjectsView         | app/(dashboard)/project-lab/page.tsx              | Displays the full archive of user projects                             |
| ProjectCard              | RecentProjectsView.tsx, PastProjectsView.tsx      | Reusable project summary card                                          |
| EmptyProjectView         | Project views                                     | Empty-state UI for users with no projects                              |
| DisciplineSelector       | app/(dashboard)/project-lab/new/page.tsx          | Selects project discipline                                             |
| DifficultySelector       | app/(dashboard)/project-lab/new/page.tsx          | Selects project difficulty                                             |
| IndustryScenarioSelector | app/(dashboard)/project-lab/new/page.tsx          | Selects project domain/scenario                                        |
| SkillRadarCard           | Dashboard and skill profile pages                 | Lazy-loaded skill radar chart wrapper                                  |
| SkillRaderChart          | app/(dashboard)/components/SkillRaderChart.tsx    | Recharts-based skill radar visualization                               |
| AIMentorPanel            | app/(dashboard)/project-lab/[projectId]/page.tsx  | Right-side AI mentor panel                                             |
| MentorPanelContent       | AIMentorPanel.tsx                                 | Chat UI for mentor interactions                                        |
| DatasetInfoBox           | ProjectLabMainColumn.tsx                          | Shows business context, stakeholder questions, and submission controls |
| AnswerQuestionsModal     | DatasetInfoBox.tsx                                | Modal form for submitting answers to project questions                 |
| ExerciseCard             | ProjectLabExercisesSection.tsx                    | Renders the generated analytical exercises                             |
| QuestionReviewCard       | QuestionReviewList.tsx                            | Expands AI review feedback per question                                |
| EvaluationOverviewCard   | details page                                      | Displays the overall AI evaluation summary                             |
| CategoryFeedbackCard     | CategoryFeedbackGrid.tsx                          | Displays category-level feedback                                       |

## API Integration

### Endpoints currently consumed

The application relies on a mix of internal Next.js API routes and external APIs.

- Internal API routes:
  - /api/user — creates a user account
  - /api/onboardUser — completes onboarding
  - /api/projects — creates a new project and generates AI-backed project data
  - /api/projects/[id]/chat — generates AI mentor responses
  - /api/projects/[id]/review-details — submits answers and stores AI evaluation results
  - /api/projects/[id]/download — exports the dataset as CSV
  - /api/user/skills — retrieves user skill progress

- External APIs:
  - World Bank API for dataset retrieval and summary generation
  - Google GenAI / Gemini API for AI-generated questions, summaries, mentor responses, and project review feedback

### Axios setup

There is no centralized Axios instance with interceptors or shared headers. Requests are issued directly from client components using axios.post or axios.get, with mostly straightforward success and error handling.

### Authentication flow

Authentication is handled by NextAuth.js, with credentials-based login and Google OAuth provider support. Session data is managed via JWT strategy and attached to the user session object.

### Request/response handling

- API routes validate request bodies with Zod where relevant.
- Server routes return JSON responses with status codes such as 401, 404, 400, 409, 500.
- Client components display toasts for success and error states.

### Error handling strategy

Errors are generally handled in one of three ways:

- Route handlers return structured JSON errors and appropriate HTTP status codes.
- Client components catch errors and display toast notifications.
- Some server-side code logs errors to the console for debugging.

## Authentication

- Login: Implemented with credentials-based sign-in using NextAuth.
- Signup: Implemented through a dedicated sign-up page and /api/user route.
- Session management: JWT strategy is used with NextAuth; session data is enriched with user profile values such as id, level, username, email, and image.
- Protected routes: The dashboard layout and several pages call getServerSession and redirect unauthenticated users to /sign-in or /onboarding as appropriate.
- Token handling: Authentication relies on NextAuth-managed JWT/session handling rather than custom token storage.
- OAuth: Google OAuth is configured in authOptions.ts and exposed through the sign-in and sign-up pages.

## State Management

The current state management approach is lightweight and local:

- React local state is used in forms, modal dialogs, and interactive UI elements.
- Server components fetch data directly from Prisma and pass it to child components.
- NextAuth session data is used as the primary source of authentication state.
- Zustand is present in package.json but does not appear to be actively used in the implemented code.

## UI Design System

The UI is built primarily with Tailwind utility classes and a custom visual system rather than a formal UI library theme.

- Color palette currently used:
  - Deep navy: #001736
  - Blue accent: #0058BB, #0B5BF3
  - Teal accent: #00D4A5, #14b8a6, #58FBDA
  - Slate neutrals: #0f172a, #f2f4f6, #e5e7eb
- Typography: The app uses Geist Sans and Geist Mono from next/font/google, with fallback to Arial/Helvetica in global CSS.
- Spacing conventions: Tailwind spacing utilities are used throughout; cards and sections rely on padding and gap classes such as p-4, p-6, p-8, gap-4, gap-6.
- Card styles: Rounded cards with subtle borders, shadow-sm, and sectioned content are common across dashboard and project views.
- Button styles: Buttons are mostly rounded, with teal/blue primary states and hover transitions.
- Icons: React Icons is used consistently for navigation, actions, and status states.
- Layout patterns: The dashboard uses a fixed top bar, a side navigation rail, and a content area; project lab views use split layouts with a main column and an AI mentor panel.

## Existing Animations

The codebase includes several UI animations and motion patterns:

- Hover transitions on buttons and cards using Tailwind transition classes.
- Collapse and expand animation for question review cards using Framer Motion.
- Smooth scrolling behavior in the AI mentor panel and page-level scroll handling.
- Pulse animation for the AI typing indicator in the mentor panel.
- Skeleton loading state for the skill radar chart while the data loads.
- Basic scale and color transitions for action buttons and empty states.

## Project Architecture

The architecture is organized around the App Router pattern and server actions-style route handlers:

- app/(dashboard) contains the user-facing experience and reusable dashboard UI.
- app/api contains server-side endpoints and business logic for features such as authentication, onboarding, project generation, and AI review.
- app/onboarding contains onboarding flow logic separated from the main dashboard.
- lib contains helper modules and dataset definitions that are shared across routes and services.
- prisma schema and generated client provide the database model and typed access layer.
- The overall separation of concerns is fairly clear: UI components handle rendering, route handlers manage request/response flow, and services/helpers manage dataset and AI logic.

## Environment Variables

The codebase references the following environment variables:

| Variable             | Purpose                                           |
| -------------------- | ------------------------------------------------- |
| NEXTAUTH_SECRET      | Secret used by NextAuth for session security      |
| GOOGLE_CLIENT_ID     | Google OAuth client ID                            |
| GOOGLE_CLIENT_SECRET | Google OAuth client secret                        |
| GOOGLE_GENAI_API_KEY | API key for Gemini/Google GenAI-based AI features |
| DATABASE_URL         | Connection string used by Prisma                  |

No secret values are included in this document.

## Current TODOs

No explicit TODO comments were found in the codebase. However, several areas are still incomplete or clearly placeholder-based:

| Area                                                                 | Current status                       |
| -------------------------------------------------------------------- | ------------------------------------ |
| Marketing landing page                                               | Minimal placeholder content          |
| AI Critique page                                                     | Placeholder component only           |
| Learning Path view                                                   | Placeholder component only           |
| Skill Radar placeholder view                                         | Present as a placeholder component   |
| Some UI states rely on runtime data without strong fallback handling | Partially implemented                |
| Several files include console logging for debugging                  | Present but not production-optimized |

## Technical Debt

The following areas appear to be the main opportunities for cleanup and hardening:

- The codebase uses many direct axios calls rather than a shared client with interceptors.
- Some logic is duplicated across dashboard and project archive views, especially around project card rendering and date formatting.
- There is no formal design token system; styling relies heavily on ad hoc Tailwind utility classes and hardcoded color values.
- The AI and dataset service layers are functional, but error handling and fallback behavior could be more robust.
- The project includes a few debugging-oriented console.log statements that should be removed or gated in production.
- The app currently uses a mixture of server and client components; component boundaries could be clarified further for maintainability.

## Known Issues

- The landing page route is not yet meaningfully implemented and currently renders placeholder content.
- The AI Critique and Learning Path views are not yet functional beyond placeholder UI.
- The skill radar chart uses a component name with a typo in the file name (SkillRaderChart), which is harmless but inconsistent.
- The project creation flow depends on an external World Bank API and Gemini service; if either fails, the user experience is limited and error states are mostly handled at the UI level.
- There is no visible centralized state or API abstraction layer beyond local component state and route handlers.
- Some route and component file names suggest ongoing evolution and may benefit from normalization.

## Recommended Next Steps

Based on the current implementation, the most logical next priorities are:

1. Replace the placeholder marketing, AI Critique, and Learning Path experiences with real, production-ready pages.
2. Harden the AI and dataset pipeline with more robust loading, retry, and fallback states.
3. Introduce a shared API layer or client configuration for Axios to reduce duplication and improve consistency.
4. Consolidate repeated UI patterns such as project cards and empty states into a more consistent component library.
5. Add stronger error handling and loading states for external API failures.
6. Review the current Prisma and API usage to prepare the app for broader production use and clearer maintainability.
