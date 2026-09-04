# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- 04-project-components — completed 2026-09-04. Projects module frontend UI only.

## Completed

- Project scaffolding: Next.js + React + TypeScript + Tailwind + shadcn/ui baseline (`app/layout.tsx`, `app/globals.css`, `app/page.tsx`).
- 01-design-system: shadcn/ui configured (`components.json`, `lib/utils.ts`, `app/globals.css`); components installed — Button, Card, Dialog, Input, Calendar, Avatar, Toast (Sonner), Spinner, Skeleton (`components/ui/*` unmodified); `lucide-react` + `next-themes`/`sonner`/`date-fns`/`react-day-picker` dependencies added; theme sync via inline `prefers-color-scheme` script + `components/theme-sync.tsx` + `next-themes` ThemeProvider in `app/layout.tsx`; verified `npm run build` passes with no light-default flash — 2026-09-04.
- PWA: Serwist configurator mode implemented (`serwist.config.js/.ts`, `app/sw.ts` with `/// <reference lib="webworker" />`, `fallbacks` → `/~offline`, `defaultCache` runtimeCaching); `next.config.ts` bundler-agnostic (`turbopack.root`); `app/layout.tsx` wraps `SerwistProvider` (`@serwist/next/react`, `swUrl: /sw.js`, disabled in dev) + FSMT `metadata`/`viewport` (`themeColor: #0a0a0a`); `app/manifest.ts` + `app/~offline/page.tsx`; `package.json` scripts `dev`/`dev:once`/`build` use `serwist build` + `concurrently` + `--turbopack`; `public/sw.js` precaches prerendered routes (20 URLs) — verified `npm run build` — 2026-09-04.
- 02-sidebar: Shadcn sidebar installed (`npx shadcn add sidebar` + `sidebar-06` → `components/ui/sidebar.tsx`, `hooks/use-mobile.ts`, `components/ui/sheet/separator/tooltip/breadcrumb/dropdown-menu`); navigation shell — `components/app-sidebar.tsx` (FSMT header + Wallet icon) with 4 items Dashboard→`/` (`LayoutDashboard`), Projects→`/projects` (`FolderKanban`), Income Pool→`/income-pool` (`Wallet`), Settings→`/settings` (`Settings`) using `lucide-react`, active via `usePathname`; shared config `components/nav-config.ts` reused by desktop and mobile; `components/mobile-nav.tsx` fixed bottom bar (`md:hidden`, grid 4, `min-h-11` tappable targets, active `text-primary`, `pb-[env(safe-area-inset-bottom)]`, content offset `pb-16 md:pb-0` on `SidebarInset`); `app/layout.tsx` wraps `SidebarProvider` + `TooltipProvider` + `AppSidebar` + `SidebarInset` + `MobileNav` alongside `ThemeProvider`/`SerwistProvider`; placeholder routes `/` (dashboard cards: allocation/pool/payout), `/projects`, `/income-pool`, `/settings` with `SidebarTrigger` header and shadcn `Card` placeholders; removed shadcn block extra `app/dashboard`/`nav-main`/`sidebar-opt-in-form`; sidebar dark tokens aligned to `app/globals.css` theme (`--sidebar`/`--sidebar-primary`/`--sidebar-accent`/`--sidebar-border`/`--sidebar-ring` matched to green/blue palette); verified `npm run build` (7 routes: `/`, `/projects`, `/income-pool`, `/settings`, `/_not-found`, `/~offline`, `/manifest.webmanifest`; 24 URLs precached) — 2026-09-04.
- 03-dashboard-components: `npx shadcn add empty` → `components/ui/empty.tsx`; dashboard — `components/dashboard/income-pool-card.tsx` (title `Income Pool`, `₱100,000.00`, “Project money currently allocated”), `components/dashboard/current-salary-card.tsx` (`Current Salary Per Month`, `₱25,000.00`, “Your current monthly salary allocation”), `components/dashboard/next-payout-card.tsx` (`Next Payout Scheduled`, `September 15, 2026`, `11 days remaining`) each using `Card`/`CardHeader`/`CardTitle`/`CardContent` with `Skeleton` variants (`IncomePoolCardSkeleton` etc.) approximating card layout; `components/dashboard/project-dashboard-status.tsx` uses `Empty`/`EmptyHeader`/`EmptyMedia` (`FolderKanban` `variant="icon"`) /`EmptyTitle`/`EmptyDescription`/`EmptyContent` with “Project Dashboard Status / No projects to display yet / Create or add a project…” and `min-h-[320px] md:min-h-[400px]` large section; `app/page.tsx` desktop `grid md:grid-cols-3` (3 cards equal width) + project status below occupying full width, mobile stacks vertically, no horizontal overflow, `SidebarInset pb-16 md:pb-0` preserves bottom nav safe-area; styling via `global.css` tokens + `lucide-react`, no extra UI deps, placeholder mock data; verified `npm run build` (7 routes, 24 URLs precached) — 2026-09-04.
- 04-project-components: `components/projects/project-header.tsx` (title `List of Projects`, `Button` + `Plus` “Create Project”, `Button variant=outline size=icon` + `MoreHorizontal` aria-label), `components/projects/project-filters.tsx` (client, label `Filtered By` + `Select` placeholder `Select` with `All Projects`/`Active`/`Pending`/`Completed`), `components/projects/project-status.tsx` (props `projects?: unknown[]`, empty `Empty` with `FolderKanban variant=icon` + `No Projects Yet` + description + `Create Project` `Plus` button, `min-h-[320px] md:min-h-[420px]` `border bg-card`, future branch `projects.length>0`), `components/projects/projects-page.tsx` (composes Header + Filters + Status with `gap-6 p-4 md:p-6`); `app/projects/page.tsx` retains `SidebarTrigger`/`Separator` header and renders `ProjectsPage` inside `SidebarInset pb-16 md:pb-0`; responsive header `flex-col sm:flex-row`, filters `flex-col sm:flex-row` with `sm:w-[180px]` select, no Supabase/creation workflow, uses `shadcn/ui` `Button`/`Select`/`Empty` + `lucide-react` + `global.css` tokens; verified `npm run build` (6 routes, 28 URLs precached) — 2026-09-04.

## In Progress

- None.

## Next Up

- Database & Backend Foundation (Supabase project, schema, RLS) — per PRD Section 15 Development Units.
- Authentication (Supabase Auth: signup/login/logout/sessions).

## Open Questions

- None yet — add here when a requirement is ambiguous or missing per `ai-workflow-rules.md`.

## Architecture Decisions

- None yet.

## Session Notes

- Cleaned tracker on 2026-09-04: removed unrelated system (Margin) history.
