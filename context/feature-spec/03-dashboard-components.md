# Dashboard Components

## Requirements

### 1. Dashboard Overview

Implement the initial dashboard UI for the `/` route.

The dashboard should provide a quick overview of the user's current financial/project status.

The desktop layout should consist of:

1. Three financial summary cards at the top.
2. One large project dashboard status empty state underneath.

Use **Shadcn/UI components** for the dashboard UI.

The implementation must follow the existing styling, colors, typography, spacing, and theme variables defined in `global.css`.

Do not introduce custom colors that conflict with the existing theme.

---

## 2. Financial Summary Cards

Create **three separate reusable card components**.

Each card should represent one specific financial context.

### Card 1 — Income Pool

Purpose:

> Show the amount of project money currently allocated to the income pool.

Display:

* Card title: `Income Pool`
* Amount/value
* Supporting description explaining what the amount represents

Example:

```text
Income Pool
₱100,000.00

Project money currently allocated
```

The actual value can be placeholder/mock data for now.

---

### Card 2 — Current Salary Per Month

Purpose:

> Show the current monthly salary the user should give themselves.

Display:

* Card title: `Current Salary Per Month`
* Monthly salary amount
* Supporting description

Example:

```text
Current Salary Per Month
₱25,000.00

Your current monthly salary allocation
```

The actual value can be placeholder/mock data for now.

---

### Card 3 — Next Payout Scheduled

Purpose:

> Show when the user's next salary payout is scheduled.

Display:

* Card title: `Next Payout Scheduled`
* Next payout date
* Supporting information such as the payout period or number of days remaining

Example:

```text
Next Payout Scheduled
September 15, 2026

11 days remaining
```

The actual date/value can be placeholder/mock data for now.

---

## 3. Shadcn/UI Cards

Use the official Shadcn/UI `Card` components.

Each financial summary should be implemented using Shadcn's card primitives rather than manually-created containers.

Use appropriate components such as:

```text
Card
CardHeader
CardTitle
CardDescription
CardContent
```

Use the existing theme variables from `global.css`.

Do not hardcode arbitrary colors.

---

## 4. Loading States

Implement loading states for the three financial cards using **Shadcn/UI Skeleton**.

The skeleton state should approximate the actual card layout.

For example:

```text
┌──────────────────────────────┐
│ ████████████                 │
│                              │
│ ████████████████             │
│ █████████                    │
└──────────────────────────────┘
```

The skeleton should be reusable where practical.

Do not use text such as `Loading...` as the primary loading state when a Skeleton component can represent the layout.

---

## 5. Component Structure

Keep the three cards as separate components.

Prefer a structure similar to:

```text
components/
├── dashboard/
│   ├── income-pool-card.tsx
│   ├── current-salary-card.tsx
│   ├── next-payout-card.tsx
│   └── project-dashboard-status.tsx
└── ui/
    ├── card.tsx
    ├── skeleton.tsx
    └── empty.tsx
```

The exact structure may be adjusted to match the existing project architecture and the instructions in `AGENTS.md`.

Avoid putting all three cards into one large component.

---

# Project Dashboard Status

## 6. Empty State Component

Below the three financial cards, create a large **Project Dashboard Status** section.

Install the Shadcn/UI Empty component:

```bash
npx shadcn@latest add empty
```

Use the generated Shadcn `Empty` component for this section.

The purpose of this section is to eventually monitor the status of the user's projects.

For the current implementation, this should be an empty/placeholder state.

---

## 7. Project Dashboard Status Content

The section should communicate that project monitoring will appear here.

Suggested content:

```text
Project Dashboard Status

No projects to display yet.

Create or add a project to start monitoring
your project status and financial progress.
```

Use the Shadcn Empty component primitives rather than creating a custom empty-state container.

If appropriate, include a Lucide icon to visually represent projects.

Do not implement actual project-management functionality as part of this task.

---

# Desktop Layout

## 8. Dashboard Structure

The desktop dashboard should follow this layout:

```text
┌─────────────────────────────────────────────────────────────┐
│                         Dashboard                           │
│                                                             │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐  │
│  │ Income Pool    │ │ Current Salary │ │ Next Payout    │  │
│  │                │ │                │ │                │  │
│  │ ₱100,000       │ │ ₱25,000/month  │ │ Sep 15, 2026   │  │
│  │ Project funds  │ │ Monthly salary │ │ 11 days left   │  │
│  └────────────────┘ └────────────────┘ └────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                                                         │ │
│  │               Project Dashboard Status                  │ │
│  │                                                         │ │
│  │                  No projects yet                        │ │
│  │                                                         │ │
│  │       Create or add a project to monitor status         │ │
│  │                                                         │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Card Layout

On desktop:

* Display all three cards in one horizontal row.
* Cards should have equal or balanced widths.
* Maintain consistent spacing between cards.
* Cards should remain visually compact compared with the project dashboard section.

### Project Dashboard Layout

Below the cards:

* Display one large Project Dashboard Status section.
* It should occupy the majority of the available dashboard width.
* Use the Shadcn Empty component.
* Give the section enough vertical space to function as the future project monitoring area.

---

# Responsive Behavior

The dashboard must remain responsive.

On smaller screens:

* The three cards may stack vertically or use a responsive grid.
* The Project Dashboard Status should remain below the cards.
* Avoid horizontal overflow.
* Ensure the layout works correctly alongside the mobile bottom navigation implemented in the previous task.
* Account for the mobile navigation's bottom safe area/padding.

Suggested responsive structure:

```text
Mobile

┌───────────────────────┐
│ Dashboard             │
│                       │
│ ┌───────────────────┐ │
│ │ Income Pool       │ │
│ └───────────────────┘ │
│                       │
│ ┌───────────────────┐ │
│ │ Current Salary    │ │
│ └───────────────────┘ │
│                       │
│ ┌───────────────────┐ │
│ │ Next Payout       │ │
│ └───────────────────┘ │
│                       │
│ ┌───────────────────┐ │
│ │                   │ │
│ │ Project Dashboard │ │
│ │ Status             │ │
│ │                   │ │
│ └───────────────────┘ │
│                       │
├───────────────────────┤
│ Dashboard Projects ...│
└───────────────────────┘
```

---

# Styling Requirements

All dashboard components must follow the project's existing design system.

Use:

* Shadcn/UI
* Tailwind CSS
* `global.css`
* Existing theme variables
* `lucide-react`

Do not:

* Introduce a separate UI library.
* Create arbitrary color values that conflict with `global.css`.
* Recreate Shadcn components manually.
* Add unnecessary dependencies.
* Implement backend/database functionality for these placeholder values.

The dashboard should visually feel like part of the same application as the existing sidebar.


# Complete When

* [ ] `AGENTS.md` has been read and followed.
* [ ] Shadcn `Card` components are used.
* [ ] Shadcn `Skeleton` is used for loading states.
* [ ] `npx shadcn@latest add empty` has been installed successfully.
* [ ] Shadcn `Empty` is used for the Project Dashboard Status.
* [ ] Three separate card components have been created.
* [ ] Income Pool card displays allocated project money.
* [ ] Current Salary Per Month card displays the current monthly salary allocation.
* [ ] Next Payout Scheduled card displays the next salary payout date.
* [ ] Each card has an appropriate loading/skeleton state.
* [ ] Cards are displayed in a three-column row on desktop.
* [ ] Project Dashboard Status appears below the three cards.
* [ ] Project Dashboard Status uses the Shadcn Empty component.
* [ ] Dashboard is responsive on mobile.
* [ ] Dashboard does not conflict with the mobile bottom navigation.
* [ ] Styling follows the existing `global.css` theme.
* [ ] No arbitrary colors are introduced.
* [ ] No additional UI libraries are added.
* [ ] Components are appropriately separated and reusable.
* [ ] Placeholder/mock data is used without introducing unnecessary backend logic.
* [ ] The application builds successfully.
* [ ] Existing sidebar/navigation functionality remains intact.
