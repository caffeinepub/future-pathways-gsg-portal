# Future Pathways GSG Portal

## Current State
The portal has a ProfileBuilderPage at `/profile` that is protected behind login. It includes a profile data entry form (academic achievements, extracurriculars, etc.) and a PDP Roadmap section showing a 4-column Grade 9-12 timeline.

## Requested Changes (Diff)

### Add
- New public page: `ProfileRoadmapPage.tsx` at route `/profile-roadmap`
- This is a standalone prototype page — no login required
- Rich visual roadmap showing the Profile Building Pathway across Grades 9–12
- Each grade is a detailed interactive stage with:
  - Clear milestone checklist (checkboxes users can tick off)
  - Key activities: academics, extracurriculars, leadership, competitions, standardized tests, internships, applications
  - Tips / guidance callouts
  - Progress indicator showing how complete each grade's checklist is
- A top-level progress bar showing overall roadmap completion
- "Book a Counselor" CTA at the bottom
- Add nav link "Profile Roadmap" in Navigation and on the Home page Quick Actions

### Modify
- `routeTree.tsx`: add `/profile-roadmap` route (public, no ProtectedRoute)
- `Navigation.tsx`: add "Profile Roadmap" link
- `HomePage.tsx`: update Quick Action tiles to include Profile Roadmap

### Remove
- Nothing

## Implementation Plan
1. Create `ProfileRoadmapPage.tsx` with interactive Grade 9–12 roadmap, local state checkboxes, per-grade progress bars, and overall progress indicator
2. Add route `/profile-roadmap` in `routeTree.tsx` without auth protection
3. Add nav item in `Navigation.tsx`
4. Add Quick Action tile on `HomePage.tsx`
