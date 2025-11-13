# RunningRabbit Coach — MVP Status

## ✅ Completed
- Monorepo structure with shared packages
- Coach app initialized with Next.js 14, TypeScript, Tailwind CSS
- Shared UI components (Minimalism design system)
- Shared types package with coach/athlete data models
- Supabase schema migration for coach features
- API routes:
  - `/api/coach/invite` — invite athlete by email
  - `/api/coach/athletes` — list linked athletes
  - `/api/coach/workouts/templates` — CRUD workout templates
  - `/api/coach/workouts/assign` — assign template to athlete/week
  - `/api/coach/feedback` — post text/audio feedback
- UI pages:
  - Home page with quick actions
  - Dashboard overview
  - Invite athlete form
  - Athlete roster with status badges
  - Workout template manager
  - Feedback composer
- RLS policies enforcing role-based access (coach vs athlete)
- Audit logging for key actions
- Health check endpoint `/healthz`

## 🔄 Running Now
- Coach app dev server on http://localhost:3001

## 📋 Next Steps
1. **Authentication** — integrate Supabase auth with coach role enforcement
2. **Real coach ID** — replace hard-coded placeholder in API routes
3. **Athlete acceptance flow** — UI for athletes to accept/decline invites
4. **Progress dashboard** — charts showing adherence, weekly metrics
5. **Audio feedback upload** — Supabase Storage integration
6. **Mobile responsiveness** — ensure all pages work on small screens
7. **Tests** — unit and E2E coverage for invites, assignments, feedback
8. **Deployment** — Vercel config for runningrabbit.coach domain

## 🏗️ Architecture
- Monorepo with shared packages
- Single Supabase project shared with athlete app
- Role-based separation via `profiles.role` and `coach_athlete_links`
- Minimalist UI consistent with RunningRabbit brand

## 🔐 Security
- RLS policies enforce coach-only access to templates
- Athletes can only read assignments/feedback addressed to them
- Revocation immediately blocks coach access
- Audit logs track all invite/assignment/feedback actions