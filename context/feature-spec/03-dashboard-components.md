# Dashboard Components

## Overview

Refactor the existing **Dashboard module** to match the provided wireframe.

This is a **UI/component-structure refactor**, not a data-layer rewrite.

The refactor should include:

- Welcome header (title + muted subtext)
- Income overview area (primary Income Pool card + stacked stat cards)
- Income insights area (pie chart summary card + stat card)
- Current Ongoing Projects section with empty state
- Responsive desktop/mobile layouts

Preserve any existing data-fetching or state logic already wired into the current Dashboard wherever it exists. Where no real data exists yet, use mock/placeholder data. Do not introduce new backend/Supabase logic as part of this refactor.

---

# 1. Before Implementation

Before making any changes:

1. Read `AGENTS.md` from the project root.
2. Follow all instructions, conventions, architecture decisions, and coding standards defined in `AGENTS.md`.
3. Inspect the **existing Dashboard components/files** before creating new ones.
4. Prefer extending or restructuring existing components over building a fully parallel implementation — this is a refactor, not a rebuild.
5. Reuse existing shared components where appropriate (e.g. the `Empty` component if it was already installed for the Projects module).
6. Do not modify unrelated functionality.

The implementation should integrate with the existing:

- Sidebar
- Mobile bottom navigation
- Shadcn/UI setup
- Tailwind CSS
- `global.css`
- Lucide React icons

---

# 2. Page Purpose

The Dashboard should give the user an at-a-glance summary of their income and ongoing projects.

The refactored page should have this structure:

```text
Dashboard
│
├── Dashboard Header
│   ├── "Welcome back" title
│   └── Muted subtext
│
├── Income Overview (row 1)
│   ├── Income Pool Card (primary visual hierarchy)
│   └── Stat Stack
│       ├── Current Salary per Month
│       └── Next Payout Scheduled
│
├── Income Insights (row 2)
│   ├── Income Chart Card (pie chart + summary)
│   └── Stat Card (Current Salary per Month)
│
└── Current Ongoing Projects
    ├── Section heading
    └── Empty State
```

The Income Pool Card is intentionally the dominant visual element on the page — it should read as the most important piece of information, with everything else supporting it.

---

# 3. Dashboard Page

Use the existing Dashboard route — do not create a new one.

Do not recreate the sidebar inside the Dashboard page.

The page content should continue to sit beside the desktop sidebar and above the mobile bottom navigation, exactly as it does today.

---

# 4. Component Architecture

Recommended structure:

```text
components/
└── dashboard/
    ├── dashboard-header.tsx
    ├── income-pool-card.tsx
    ├── stat-card.tsx
    ├── income-chart-card.tsx
    ├── ongoing-projects-section.tsx
    └── dashboard-page.tsx
```

The exact location may be adjusted to follow the existing project architecture. Map these against the current Dashboard files first — rename/relocate existing components where they already cover this responsibility instead of duplicating them.

### Responsibilities

#### `DashboardHeader`

Responsible for:

- "Welcome back" title
- Muted subtext line

#### `IncomePoolCard`

Responsible for:

- Displaying current accumulated income
- Carrying the page's primary visual weight (largest/most prominent card)

#### `StatCard`

Responsible for:

- A single reusable small metric card (label + value)
- Used three times in this layout: **Current Salary per Month**, **Next Payout Scheduled**, and the second **Current Salary per Month** card

Build this as one reusable component driven by props rather than three near-identical one-off components — the wireframe itself repeats the same card shape three times.

#### `IncomeChartCard`

Responsible for:

- Shadcn pie chart
- A short quick-summary of income pool acquisition/breakdown

#### `OngoingProjectsSection`

Responsible for:

- "Current Ongoing Projects" section heading
- Empty state when no projects exist
- Should eventually render real project status content

#### `DashboardPage`

Responsible for composing the components together.

Example:

```tsx
<DashboardHeader />

<IncomeOverviewRow />

<IncomeInsightsRow />

<OngoingProjectsSection />
```

Do not place all functionality into one large component.

---

# 5. Dashboard Header

## 5.1 Title

Display:

```text
Welcome back
```

## 5.2 Subtext

Display a muted description line beneath the title (e.g. a greeting detail or short summary). Use `text-muted-foreground` and the app's existing heading typography — do not introduce custom font sizes or colors.

---

# 6. Income Overview (Row 1)

Left: `IncomePoolCard` (dominant). Right: a vertical stack of two `StatCard`s (**Current Salary per Month**, **Next Payout Scheduled**), matching the Income Pool Card's total height.

Use a responsive grid, with the Income Pool Card spanning more columns than the stat stack:

```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  <IncomePoolCard className="lg:col-span-2" />

  <div className="flex flex-col gap-4">
    <StatCard label="Current Salary" description="per month" value="—" />
    <StatCard label="Next Payout" description="scheduled" value="—" />
  </div>
</div>
```

---

# 7. Income Insights (Row 2)

Left: `IncomeChartCard` (pie chart + summary), wider. Right: a single `StatCard` (**Current Salary per Month**) matching the chart card's height.

```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  <IncomeChartCard className="lg:col-span-2" />

  <StatCard label="Current Salary" description="per month" value="—" />
</div>
```

> Note: the wireframe shows **"Current Salary per Month"** twice (once in Row 1, once in Row 2). Implement literally as shown for now. Flag this with design/product — Row 2's card may be intended to show a different metric (e.g. YTD income, average payout) rather than a duplicate.

---

# 8. Income Pool Card

`IncomePoolCard` should be the visual anchor of the page:

- Larger padding and a larger figure/heading style than the stat cards
- Displays the current accumulated income total
- Optional muted description line under the figure

Do not implement income calculation logic — display a mock/placeholder value or an existing value already computed elsewhere in the app.

---

# 9. Stat Card

`StatCard` is a small, reusable metric card. Suggested props:

```tsx
type StatCardProps = {
  label: string;
  description?: string;
  value: string;
  icon?: LucideIcon;
};
```

Use the Shadcn `Card` primitives (`Card`, `CardHeader`, `CardContent`) or the existing card pattern already used elsewhere on the Dashboard, so styling stays consistent.

---

# 10. Income Chart Card

Use the Shadcn chart component (built on Recharts). Install if it does not already exist:

```bash
npx shadcn@latest add chart
```

Render a pie chart with a short quick-summary line describing the income pool breakdown. Use mock/placeholder chart data for now — do not wire it to a real income-calculation source yet.

Ensure the summary text is also present outside the chart itself (not only as a chart legend), so the information isn't communicated through color alone.

---

# 11. Current Ongoing Projects Section

`OngoingProjectsSection` contains:

- A section heading: `Current Ongoing Projects` (same visual weight as "Welcome back", not muted)
- A Shadcn `Empty` component for the no-projects state

Reuse the existing `Empty` component and its installation if it was already added as part of the Projects module — do not reinstall or duplicate it.

Consider whether this section can directly reuse the `ProjectStatus` component built for the Projects page (Section 8 of the Projects module spec), since its responsibility already covers "empty state vs. project content." If reuse isn't straightforward without over-coupling the two modules, a lightweight local empty state is acceptable for now.

---

# 12. Shadcn/UI Requirements

Use:

- `Card`
- `Empty`
- `Chart` (pie)
- Existing Shadcn layout components where appropriate

Do not manually recreate these components. Install any missing ones via the Shadcn CLI. Do not reinstall components that already exist.

---

# 13. Icons

Use `lucide-react` for all interface icons.

| Purpose | Icon |
|---|---|
| Income / Salary | `Wallet` |
| Next Payout | `CalendarClock` |
| Ongoing Projects heading | `FolderKanban` |

These are suggestions only — follow the project's existing icon conventions if they differ. Do not introduce another icon library.

---

# 14. Styling

All styling must follow the application's existing design system.

Use:

- Shadcn/UI
- Tailwind CSS
- `global.css`
- Existing CSS variables and theme tokens

Do not introduce arbitrary colors or hardcoded hex values unless already part of the established design system. Prefer semantic classes such as `bg-background`, `text-foreground`, `text-muted-foreground`, `border`, `bg-card`.

The refactored Dashboard should continue to visually match the Sidebar and the rest of the app (including the Projects and Transactions modules, if already implemented).

---

# 15. Desktop Layout

```text
┌───────────────────────────────────────────────────────────────────┐
│                                                                   │
│  welcome back                                                    │
│  muted text                                                      │
│                                                                   │
│  ┌───────────────────────────────┐   ┌─────────────────────────┐ │
│  │                               │   │ current salary per month │ │
│  │        Income Pool            │   ├─────────────────────────┤ │
│  │  (primary visual hierarchy)   │   │ next payout scheduled    │ │
│  │                               │   └─────────────────────────┘ │
│  └───────────────────────────────┘                               │
│                                                                   │
│  ┌───────────────────────────────┐   ┌─────────────────────────┐ │
│  │  pie chart + quick summary     │   │ current salary per month │ │
│  └───────────────────────────────┘   └─────────────────────────┘ │
│                                                                   │
│  current ongoing projects                                        │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │                    empty state (shadcn)                     │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

---

# 16. Responsive Design

On mobile, collapse both rows to a single column, in this order:

```text
Income Pool
Current Salary per Month
Next Payout Scheduled
Income Chart (pie + summary)
Current Salary per Month
Current Ongoing Projects
Empty State
```

Grid classes should collapse from `lg:grid-cols-3` to a single column below the `lg` breakpoint. Cards should use the full available width, and the Empty state should remain centered and readable. Do not allow horizontal overflow.

---

# 17. Mobile Navigation Compatibility

The existing mobile bottom navigation should remain visible and functional. Page content must not be hidden underneath it — preserve/apply the same bottom padding pattern already used elsewhere in the app. Do not modify the mobile navigation unless necessary.

---

# 18. Accessibility

### Stat Cards

Label and value should use appropriate heading/text semantics so screen readers announce them meaningfully (not just styled `div`s with no structure).

### Chart

The pie chart's "quick summary" text should convey the same information as the chart visually communicates — do not rely on chart color alone.

### Empty State

Follow the accessibility behavior already established by the Shadcn `Empty` component.

---

# 19. Data Handling

Do not add new Supabase queries, API routes, or server actions as part of this refactor. If the current Dashboard already fetches real data (income, salary, payout, projects), preserve that wiring and pass it into the new components via props, for example:

```tsx
<IncomePoolCard amount={currentIncome} />
<StatCard label="Current Salary" value={monthlySalary} />
```

Where no real data source exists yet, use mock/placeholder values. Components should accept data via props rather than fetching internally, so real values can be swapped in without restructuring.

---

# 20. Avoid Overengineering

This task is a layout/component refactor only. Do not implement:

- New income/payout calculation logic
- A real chart data pipeline
- Project-fetching logic beyond what already exists
- New Supabase integration
- Drill-down or detail views for any card
- Animations beyond what Shadcn/Recharts provide by default

These can be addressed in future tasks.

---

# 21. Suggested File Structure

```text
components/
├── dashboard/
│   ├── dashboard-header.tsx
│   ├── income-pool-card.tsx
│   ├── stat-card.tsx
│   ├── income-chart-card.tsx
│   ├── ongoing-projects-section.tsx
│   └── dashboard-page.tsx
│
└── ui/
    ├── card.tsx
    ├── chart.tsx
    └── empty.tsx
```

Use the existing project's folder conventions if they differ. Do not create duplicate UI primitives.

---

# 22. Component Composition

```tsx
<DashboardPage>
  <DashboardHeader />

  <IncomeOverviewRow>
    <IncomePoolCard />
    <StatCard label="Current Salary" description="per month" value={monthlySalary} />
    <StatCard label="Next Payout" description="scheduled" value={nextPayoutDate} />
  </IncomeOverviewRow>

  <IncomeInsightsRow>
    <IncomeChartCard />
    <StatCard label="Current Salary" description="per month" value={monthlySalary} />
  </IncomeInsightsRow>

  <OngoingProjectsSection projects={projects} />
</DashboardPage>
```

Keep responsibilities separated.

---

# Complete When

## Project Structure

- [ ] `AGENTS.md` has been read and followed.
- [ ] Existing Dashboard components/files have been inspected before refactoring.
- [ ] Existing components are reused/restructured rather than duplicated.
- [ ] Dashboard-specific components are separated appropriately.

## Header

- [ ] `DashboardHeader` exists.
- [ ] "Welcome back" title is displayed.
- [ ] Muted subtext is displayed beneath the title.

## Income Overview

- [ ] `IncomePoolCard` exists and is visually the most prominent element on the page.
- [ ] `StatCard` is implemented as a single reusable component.
- [ ] "Current Salary per Month" stat card is displayed.
- [ ] "Next Payout Scheduled" stat card is displayed.
- [ ] Income Pool Card and the stat stack are arranged side-by-side on desktop, matching the wireframe.

## Income Insights

- [ ] `IncomeChartCard` exists using the Shadcn chart component.
- [ ] The chart includes a plain-text quick summary, not just a visual legend.
- [ ] A second `StatCard` ("Current Salary per Month") sits beside the chart, matching the wireframe.

## Ongoing Projects

- [ ] `OngoingProjectsSection` exists.
- [ ] "Current Ongoing Projects" heading is displayed.
- [ ] Shadcn `Empty` component is reused (not reinstalled/duplicated) for the empty state.

## Styling

- [ ] Shadcn/UI components are used.
- [ ] Tailwind CSS is used consistently.
- [ ] `global.css` theme variables are respected.
- [ ] No arbitrary colors are introduced.
- [ ] No additional UI or icon library is introduced.
- [ ] Styling matches the Sidebar and rest of the app.

## Responsive

- [ ] Desktop layout matches the provided wireframe.
- [ ] Layout collapses to a single column on mobile in the correct order.
- [ ] No horizontal overflow occurs.
- [ ] Existing mobile bottom navigation remains functional and unobstructed.

## Scope

- [ ] No new Supabase integration is added.
- [ ] No new income/payout calculation logic is added.
- [ ] No new project-fetching logic is added.
- [ ] Existing data wiring (if any) is preserved, not removed.
- [ ] No unrelated features are implemented.

## Verification

- [ ] Application starts successfully.
- [ ] Dashboard page renders successfully.
- [ ] Desktop layout is visually correct.
- [ ] Mobile layout is visually correct.
- [ ] No TypeScript errors are introduced.
- [ ] No lint/build errors are introduced.
- [ ] Existing Sidebar still works.
- [ ] Existing mobile bottom navigation still works.
- [ ] Existing Dashboard data (if any) still displays correctly after the refactor.
