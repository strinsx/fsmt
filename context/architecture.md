# Architecture Context

## Stack

| Layer     | Technology                                              | Role |
| --------- | -------------------------------------------------------- | ---- |
| Framework | Next.js + React + TypeScript, configured as a PWA         | App framework, routing, PWA/offline shell |
| UI        | Tailwind CSS + shadcn/ui                                   | Styling and component library |
| Auth      | Supabase Auth                                              | Signup / login / session management |
| Database  | Supabase PostgreSQL                                         | Persistent storage for all financial data |
| Backend   | Next.js server-side / API routes or server actions          | Server-side logic, calculation orchestration |
| Deployment| Vercel (web app) + Supabase (backend/database)               | Hosting |

## System Boundaries

- `app/` (or equivalent Next.js routing folder) — owns page routes,
  layouts, and route-level data fetching for Dashboard, Transactions,
  Recurring Expenses, Financial Goals, Cashflow/Forecast, What-If
  Analysis, Settings, and Auth/Onboarding.
- `components/ui/` — generated shadcn/ui primitives; not to be
  hand-edited (see Protected Files in `ai-workflow-rules.md`).
- `lib/calculations/` (or equivalent) — centralized, testable financial
  calculation logic: cashflow, financial margin, goal projection, and
  what-if simulation. This is the single source of truth for all
  financial math; no duplicate calculation logic in UI components.
- `lib/supabase/` — Supabase client configuration, auth helpers, and
  typed data-access functions.
- Server actions / API routes — validate input server-side and perform
  writes; financial calculation logic must not be trusted from the
  client.

## Storage Model

- **Database (Supabase PostgreSQL)**: all structured financial data —
  user profiles, transactions, categories, monthly income, monthly
  (recurring) expenses, financial goals, and what-if scenarios. This is
  the sole source of truth; the MVP has no separate blob/file storage
  requirement.

## Auth and Access Model

- Every user signs in via Supabase Auth before accessing any personal
  financial data.
- Every financial record (transaction, category, monthly income,
  monthly expense, financial goal, scenario) is owned by exactly one
  user via `user_id`.
- Only the owning user can read or modify their own records — enforced
  at the database level via Supabase Row Level Security (RLS), not just
  in application code.
- Hypothetical (what-if) scenarios are isolated from actual financial
  data: they must never write to or mutate transactions, recurring
  expenses, or goals unless the user explicitly converts a scenario into
  a real transaction or goal.

## Invariants

1. Starting money is never counted as income; income only increases
   financial position when recorded as an actual income transaction.
2. Recurring expenses are projected/expected outflows only — they must
   never auto-convert into completed transactions; they only affect
   actuals when the user confirms the real payment.
3. Hypothetical (what-if) scenarios must never alter actual balances,
   transactions, or historical data.
4. Financial calculation logic lives in one centralized, testable
   location — never duplicated across UI components.
5. Users can only access and modify their own records; this is enforced
   with Supabase RLS at the database layer, not only in the UI.
6. Failed transaction writes must not partially update financial state
   (no partial writes to position/cashflow).
7. Any estimate shown to the user (financial margin, projected
   completion, what-if results) must be clearly labeled as an estimate
   based on known information — never presented as guaranteed or as
   professional financial advice.

## Open Item

The exact financial margin / spending-capacity calculation is not yet
finalized in the PRD (Section 4.5) — it must be defined as a documented
business rule before Unit 6 (Cashflow) or Unit 10 (What-If Analysis) are
implemented against it.
