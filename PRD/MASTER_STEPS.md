# RunningRabi — Master Steps Checklist

Source: `PRD/RunningRabi_PRD`

Status legend: `[ ]` not started, `[x]` completed (add timestamp in notes)

## MVP Scope: View & Share GPX Data
- Focus exclusively on viewing GPX routes and securely sharing them.
- Defer live coaching, voice guidance, re-routing, and workout logic to post-MVP.

## MVP Checklist
### Core GPX Features
- [x] Route library with two tabs: My Private Routes / Shared With Me — completed 2025-11-07 (evidence: `web/src/components/RoutesTabs.tsx`, `web/src/app/routes/page.tsx`)
- [ ] GPX import/upload and validation (size, schema) — upload & parsing done; add size/schema validation later (evidence: `web/src/components/GPXUpload.tsx`)
- [x] Route detail page with map viewer (render GPX path, start/finish) — completed 2025-11-07 (evidence: `web/src/components/MapViewer.tsx`)
- [x] Basemap uses open data sources (Hong Kong focus: data.gov.hk/OSM) — completed 2025-11-07 (configurable via `NEXT_PUBLIC_HK_TILE_URL`, OSM fallback)
- [x] Display license-required attribution for Hong Kong open data sources — completed 2025-11-07 (MapLibre attribution displayed)
- [ ] Fallback provider if Hong Kong open data tiles are unavailable — basic env fallback present; add runtime outage fallback later
- [ ] Optional: cache HK tiles for reliability (respect provider rate limits)
- [x] Share route privately via invite code or secure link — UI stub completed 2025-11-07 (evidence: `web/src/components/SharePanel.tsx`); backend enforcement post-MVP
- [ ] Revoke share access and validate revocation works
- [ ] Privacy default: routes private; no public feed or heatmaps
- [ ] No address book scraping; explicit permissions only

### Mobile App UI (MVP)
- [x] Routes list screen (tabs + empty states) — completed 2025-11-07 (evidence: `RoutesTabs` in routes page)
- [x] Route detail screen with map, metadata, and Share button — completed 2025-11-07
- [x] Share flow UI (copy link/invite, display recipients) — completed 2025-11-07 (UI-only)
- [ ] Settings: basic privacy and connection controls

### Backend & Data (MVP)
- [ ] Supabase schema: `routes`, `route_shares`, storage bucket for GPX
- [ ] RLS: owner-only read/write; shared recipients read-only
- [ ] API/RPC: create share, revoke share, list shares
- [ ] GPX parsing service with safe deserialization (no unsafe libraries)

### Security & Tests (MVP)
- [ ] Unit tests for GPX parsing (invalid file, malformed track)
- [ ] RLS tests: unauthorized user blocked; shared user permitted
- [ ] XSS tests: sanitized route names/notes rendered safely
- [ ] E2E: share create → recipient view → revoke → recipient blocked
- [ ] Attribution/language compliance tests for HK open data basemap
- [ ] Tile fallback resilience tests (HK open data source outage scenarios)

### Documentation & Ops (MVP)
- [ ] README usage: import GPX, view, share, revoke
- [ ] CHANGELOG entry under Unreleased for MVP features
- [x] Master steps timestamps on completion with evidence links — updated 2025-11-07
- [x] Document Hong Kong open data sources, URLs, licenses, and attribution — completed 2025-11-07 (evidence: `PRD/EXTERNAL_SERVICES.md`)

## Post-MVP Backlog
## 1. Live Coach Connection
- [ ] Live Run Monitoring (coach mobile view: map, pace, HR)
- [ ] Real-Time Audio feedback (push-to-talk to athlete)
- [ ] Adaptive Training Plan (mid-run adjustments: skip/reduce)
- [ ] Post-Run Portal (analytics and multimedia feedback options)

## 2. Intelligent Navigation & Routing
- [ ] Geofenced corridor off-route detection
- [ ] Smart re-routing back to planned route with voice guidance
- [ ] High-priority background voice guidance engine (stability)
- [ ] Route builder v2.0 (snap-to-road + manual adjustments)

## 3. Privacy-First Data & Sharing
- [ ] Coach Connect sharing model (private by default, secure invites)
- [ ] No address book scraping (explicit, case-by-case permissions)
- [ ] Route library tabs (My Private Routes / Shared With Me)
- [ ] Private route sharing (secure link or file)
- [ ] Open data sync from Garmin/Coros into RunningRabi

## 4. Technical Performance & UX
- [ ] Robust watch-phone sync (priority queue, no lost data)
- [ ] GPS source-of-truth selection (Watch vs Phone)
- [ ] Pre-caching routes/workouts on device for reliability
- [ ] Workouts tab with filters (Type, Duration, Distance, Status)

## 5. Mobile App (iOS & Android)
### Athlete View
- [ ] Training calendar (view assigned plan)
- [ ] Post-run analysis & coach feedback inbox
- [ ] Route creation and management library
- [ ] Privacy & connection settings

### Coach View
- [ ] Athlete roster dashboard
- [ ] Live Run Monitor
- [ ] Push-to-talk button
- [ ] Workout builder and calendar planner
- [ ] Post-run feedback & analysis tools

## 6. Watch App (watchOS, Wear OS)
- [ ] Main display (Pace, HR, Distance, current workout step)
- [ ] Navigation cues (turn arrows) and haptic feedback patterns
- [ ] Coaching interface (receive audio & workout adjustments)
- [ ] Offline reliability (start/complete/save run without phone; sync later)

## 7. Workflow: My First Coached Run
### Phase 1: Setup & Planning (Mobile)
- [ ] Athlete signup; select “Athlete” mode
- [ ] Generate private Coach Connect Code
- [ ] Coach links athlete via roster using code
- [ ] Coach assigns workout with attached GPX route
- [ ] Athlete loads route to watch; cache for reliability

### Phase 2: The Run (Watch & Coach Mobile)
- [ ] Athlete starts workout on watch; voice guidance begins
- [ ] Coach receives “run started” push notification
- [ ] Live Run Monitor shows location, pace, HR
- [ ] Off-route handling: corridor detection and smart rejoin instructions
- [ ] Push-to-talk audio guidance from coach
- [ ] Mid-run workout adjustment (e.g., End Interval)
- [ ] Watch updates instantly (e.g., Cooldown step)

### Phase 3: Post-Run & Feedback (Mobile)
- [ ] Athlete saves run; reliable sync to phone
- [ ] Coach reviews analytics (pace variability, HR drift)
- [ ] Coach records feedback (audio/text/video)
- [ ] Athlete views completed run and listens to feedback

## 8. Non-Functional & Infrastructure
- [ ] Stability and crash resilience across core flows
- [ ] Background service prioritization for guidance
- [ ] Data ownership and device sync alignment
- [ ] Scalability for coach-athlete concurrency

## 9. Documentation & Governance
- [ ] Maintain this checklist; update only with approved changes
- [ ] Timestamp completions and link to evidence/PRs