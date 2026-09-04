# AI Workflow Rules

## Approach

Build Margin incrementally using a spec-driven workflow, following the
Development Units defined in the PRD (Section 15) as the primary unit of
work. Context files (`project-overview.md`, `architecture.md`,
`ui-context.md`, and the PRD itself) define what to build, how to build
it, and the current state of progress. Always implement against these
specs — do not infer or invent financial behavior, calculation rules, or
UI patterns not defined in the context files.

## Scoping Rules

- Work on one Development Unit (or a clearly-bounded sub-piece of one)
  at a time — see PRD Section 15 for the full breakdown: Project
  Scaffolding, Database & Backend Foundation, Authentication,
  Onboarding, Transaction Management, Cashflow, Recurring Expenses,
  Financial Goals, Dashboard, What-If Analysis, Financial Decision
  Insights, Settings & Account Management, Validation & Error Handling,
  and Security.
- Prefer small, verifiable increments over large speculative changes.
- Do not combine unrelated system boundaries in a single implementation
  step.

## When to Split Work

Split an implementation step if it combines:

- UI changes and financial calculation logic changes — calculation
  logic belongs in `lib/calculations/`, not inline in components.
- Multiple unrelated feature units (e.g., Recurring Expenses and
  Financial Goals) in a single change.
- Any change to a business rule (e.g., how financial margin is
  calculated) that has not been finalized and documented, per PRD
  Section 9.
- Behavior not clearly defined in the context files or PRD.

If a change cannot be verified end to end quickly, the scope is too
broad — split it.

## Handling Missing Requirements

- Do not invent product behavior not defined in the PRD or context
  files — in particular, do not guess at the financial margin /
  spending-capacity formula; it must be finalized as a business rule
  before implementation (PRD Section 4.5).
- If a requirement is ambiguous (e.g., how a scenario interacts with an
  in-progress goal), resolve it in the relevant context file before
  implementing.
- If a requirement is missing, add it as an open question in
  `progress-tracker.md` before continuing.

## Protected Files

Do not modify the following unless explicitly instructed:

- `components/ui/*` — generated shadcn/ui library components.
- Any third-party library internals.
- Finalized business-rule definitions (e.g., the financial margin
  calculation) once documented — changes require explicit confirmation,
  since they affect every projection and scenario in the app.

## Keeping Docs in Sync

Update the relevant context file whenever implementation changes:

- System architecture or boundaries → `architecture.md`
- Storage model or schema decisions → `architecture.md`
- UI / visual conventions → `ui-context.md`
- Feature scope or product goals → `project-overview.md`

## Before Moving to the Next Unit

1. The current unit works end to end within its defined scope.
2. No invariant defined in `architecture.md` was violated — in
   particular, actual vs. projected/hypothetical data stays separated,
   and RLS/ownership boundaries are intact.
3. `progress-tracker.md` reflects the completed work.
4. `npm run build` passes.
