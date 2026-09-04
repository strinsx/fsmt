# Project Components

## Overview

Implement the initial **Projects module** based on the provided wireframe.

The Projects module is responsible for displaying and eventually monitoring the user's projects.

For this implementation, focus on building the **frontend component structure and UI only**.

The module should include:

- Project page header
- Create Project action
- More actions menu trigger
- Project filtering controls
- Project status dashboard area
- Empty state when no projects exist
- Responsive desktop/mobile layouts

Do not implement project database functionality or Supabase queries yet.

---

# 1. Before Implementation

Before making any changes:

1. Read `AGENTS.md` from the project root.
2. Follow all instructions, conventions, architecture decisions, and coding standards defined in `AGENTS.md`.
3. Inspect the existing project structure before creating new files.
4. Reuse existing components when appropriate.
5. Do not modify unrelated functionality.

The implementation should integrate with the existing:

- Sidebar
- Mobile bottom navigation
- Shadcn/UI setup
- Tailwind CSS
- `global.css`
- Lucide React icons

---

# 2. Page Purpose

The Projects page should eventually allow the user to monitor their projects and understand their current project status.

The initial page should have this structure:

```text
Projects
│
├── Project Header
│   ├── List of Projects
│   ├── Create Project
│   └── More Actions
│
├── Project Filters
│   ├── Filtered By
│   └── Select
│
└── Project Dashboard Status
    └── Empty State / Project Status
```

The page should feel like a natural continuation of the existing Dashboard UI.

---

# 3. Project Page

Implement the Projects page at the appropriate route.

If the existing sidebar already defines the Projects route, use that route instead of creating a duplicate route.

The page should use the application's existing layout.

Do not recreate the sidebar inside the Projects page.

The page content should sit beside the desktop sidebar and above the mobile bottom navigation.

---

# 4. Component Architecture

Create separate components for the major parts of the Projects module.

Recommended structure:

```text
components/
└── projects/
    ├── project-header.tsx
    ├── project-filters.tsx
    ├── project-status.tsx
    └── projects-page.tsx
```

The exact location may be adjusted to follow the existing project architecture.

### Responsibilities

#### `ProjectHeader`

Responsible for:

- Page title
- Create Project button
- More Actions button

#### `ProjectFilters`

Responsible for:

- Filter label/control
- Project status/type selection

#### `ProjectStatus`

Responsible for:

- Main project monitoring area
- Displaying projects in the future
- Displaying the Empty state when no projects exist

#### `ProjectsPage`

Responsible for composing the components together.

Example:

```tsx
<ProjectHeader />

<ProjectFilters />

<ProjectStatus />
```

Do not place all functionality into one large component.

---

# 5. Project Header

Create a reusable `ProjectHeader` component.

The header should contain:

```text
List of Projects                         + Create Project    ...
```

---

## 5.1 Page Title

Display:

```text
List of Projects
```

Use the existing typography conventions from the application.

Do not introduce custom font sizes or colors unless required by the existing design system.

---

## 5.2 Create Project Button

Create a button labeled:

```text
+ Create Project
```

Use the Shadcn/UI `Button` component.

Use the Lucide React `Plus` icon.

Example:

```tsx
<Button>
  <Plus />
  Create Project
</Button>
```

Follow the existing Shadcn/UI conventions for icon sizing and spacing.

The button does not need to create a project yet.

For this implementation, it can:

- Have no action
- Open a placeholder handler
- Be prepared for future dialog implementation

Do not implement the actual project creation workflow.

---

# 6. More Actions

Add a compact More Actions button on the right side of the project header.

Use:

```text
MoreHorizontal
```

from `lucide-react`.

The button should visually communicate that additional project actions will eventually be available.

Use the Shadcn/UI `Button` component.

Prefer an icon-only button with an accessible label.

Example:

```tsx
<Button
  variant="outline"
  size="icon"
  aria-label="More project actions"
>
  <MoreHorizontal />
</Button>
```

Do not implement the actions menu unless the existing application already has a suitable menu component that can be used without expanding the scope.

---

# 7. Project Filters

Create a separate:

```text
ProjectFilters
```

component.

The filter area should appear underneath the project header.

The initial wireframe contains:

```text
Filtered By        Select
```

---

## 7.1 Filter Control

Display:

```text
Filtered By
```

Use the appropriate Shadcn/UI form/control pattern.

The label should clearly communicate what the adjacent selection controls.

---

## 7.2 Project Select

Install the Shadcn Select component if it does not already exist:

```bash
npx shadcn@latest add select
```

Use the generated Shadcn/UI `Select` components.

The select should support placeholder options such as:

```text
All Projects
Active
Pending
Completed
```

For example:

```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select" />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="all">
      All Projects
    </SelectItem>

    <SelectItem value="active">
      Active
    </SelectItem>

    <SelectItem value="pending">
      Pending
    </SelectItem>

    <SelectItem value="completed">
      Completed
    </SelectItem>
  </SelectContent>
</Select>
```

The filter does not need to connect to real project data yet.

If implementing local filtering is straightforward, it may be added, but it is not required for this task.

---

# 8. Project Status Dashboard

Create:

```text
ProjectStatus
```

as a separate component.

This is the large primary content area shown in the wireframe.

The purpose of this area is to eventually monitor project status.

It should become the primary workspace for project information.

For now, it should support an empty state.

---

# 9. Empty State

Use the Shadcn/UI `Empty` component for the initial no-project state.

The project already uses Shadcn/UI, so reuse the existing Empty component if it has already been installed.

If it does not exist, install it:

```bash
npx shadcn@latest add empty
```

Do not create a custom empty-state component that duplicates Shadcn's functionality.

---

## 9.1 Empty State Content

When there are no projects, display an appropriate empty state.

Suggested content:

```text
No Projects Yet

Create your first project to start monitoring
your project status and financial progress.
```

Optionally include a Lucide project icon.

A possible structure:

```text
┌──────────────────────────────────────────────────────┐
│                                                      │
│                       📁                             │
│                                                      │
│                 No Projects Yet                     │
│                                                      │
│       Create your first project to start             │
│       monitoring your project status.                │
│                                                      │
│                 Create Project                       │
│                                                      │
└──────────────────────────────────────────────────────┘
```

The Create Project action may reuse the same project creation action from the header if appropriate.

Do not implement the actual creation workflow.

---

# 10. Project Status Future Architecture

The `ProjectStatus` component should not be tightly coupled to the Empty state.

The Empty state represents only the current **no-project condition**.

Eventually, the component should be able to render project information.

Conceptually:

```tsx
<ProjectStatus projects={projects} />
```

Future structure:

```text
ProjectStatus
│
├── projects.length === 0
│   └── Empty
│
└── projects.length > 0
    └── Project Status UI
```

Do not implement the future project status UI yet.

This keeps the component extensible without over-engineering the current implementation.

---

# 11. Shadcn/UI Requirements

The Projects module must use Shadcn/UI components.

Use:

- `Button`
- `Select`
- `Empty`
- Existing Shadcn layout components where appropriate

Do not manually recreate these components.

If a required Shadcn component is missing, install it using the Shadcn CLI.

Required commands where needed:

```bash
npx shadcn@latest add select
```

```bash
npx shadcn@latest add empty
```

Do not reinstall components that already exist.

---

# 12. Icons

Use `lucide-react` for all interface icons.

Recommended icons:

| Purpose | Icon |
|---|---|
| Create Project | `Plus` |
| More Actions | `MoreHorizontal` |
| Projects | `FolderKanban` |
| Empty Project State | `FolderOpen` or `FolderKanban` |

Use the project's existing icon conventions if they differ.

Do not introduce another icon library.

---

# 13. Styling

All styling must follow the application's existing design system.

Use:

- Shadcn/UI
- Tailwind CSS
- `global.css`
- Existing CSS variables
- Existing theme tokens

Do not introduce arbitrary colors.

Do not hardcode colors such as:

```css
#000000
#ffffff
#123456
```

unless they are already part of the application's established design system.

Prefer Shadcn semantic classes such as:

```text
bg-background
text-foreground
text-muted-foreground
border
bg-card
```

and other existing theme utilities.

The Projects page should visually match the Dashboard and Sidebar.

---

# 14. Desktop Layout

The desktop layout should closely follow the provided wireframe.

Structure:

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  List of Projects                    + Create Project   ... │
│                                                             │
│  Filtered By                         [ Select          ▼ ]   │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │                  Project Status                       │  │
│  │                                                       │  │
│  │                No Projects Yet                        │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Header

Use a horizontal flex layout.

The title should remain on the left.

Actions should remain on the right.

Example:

```text
List of Projects                 [ + Create Project ] [ ... ]
```

### Filters

Place the filtering controls underneath the header.

### Project Status

The Project Status area should take up the majority of the available page width.

It should have enough vertical space to serve as the future project dashboard.

---

# 15. Responsive Design

The Projects module must be responsive.

Do not assume desktop-only usage.

The application is also designed to function as a PWA, so the mobile layout should work naturally with the existing mobile bottom navigation.

---

## 15.1 Mobile Header

On mobile, the header may wrap if necessary.

Example:

```text
List of Projects

[ + Create Project ] [ ... ]
```

Do not force everything onto one line if it causes overflow.

---

## 15.2 Mobile Filters

The filter controls should stack or wrap naturally.

Example:

```text
Filtered By

[ Select                         ▼ ]
```

The Select should have a comfortable touch target.

---

## 15.3 Mobile Project Status

The Project Status area should use the available width.

Do not allow horizontal overflow.

The Empty state should remain centered and readable.

---

# 16. Mobile Navigation Compatibility

The existing mobile bottom navigation should remain visible on mobile.

The Projects page must account for it.

Page content must not be hidden underneath the fixed bottom navigation.

Use appropriate bottom padding on mobile.

Conceptually:

```text
Page content
     ↓
Additional bottom spacing
     ↓
Mobile navigation
```

Do not modify the mobile navigation unless necessary to integrate this page.

---

# 17. Accessibility

The implementation should include appropriate accessibility behavior.

### Buttons

Icon-only buttons must have an accessible label.

Example:

```tsx
aria-label="More project actions"
```

### Select

The Select should have an accessible label or associated visible label.

### Icons

Decorative icons should not unnecessarily be announced as content.

Follow the accessibility behavior provided by Shadcn/UI and Radix components.

---

# 18. Data Handling

Do not connect this module to Supabase yet.

Do not create:

- Database tables
- Supabase queries
- API routes
- Server actions
- Mutations
- Project persistence

Use mock/placeholder data only if needed.

The UI should be designed so real project data can be introduced later.

For example:

```tsx
<ProjectStatus projects={projects} />
```

rather than:

```tsx
<ProjectStatus />
```

with the component internally fetching data.

However, do not create the actual data layer yet.

---

# 19. Avoid Overengineering

This task is only for the initial Project UI.

Do not implement:

- Project creation modal
- Project editing
- Project deletion
- Project database schema
- Project authentication logic
- Project financial calculations
- Project status calculations
- Project analytics
- Project API
- Supabase integration
- Advanced filtering
- Search
- Pagination

These can be implemented in future project tasks.

---

# 20. Suggested File Structure

Prefer:

```text
components/
├── projects/
│   ├── project-header.tsx
│   ├── project-filters.tsx
│   ├── project-status.tsx
│   └── projects-page.tsx
│
└── ui/
    ├── button.tsx
    ├── select.tsx
    └── empty.tsx
```

Use the existing project's folder conventions if they differ.

Do not create duplicate UI primitives.

---

# 21. Component Composition

The final page should conceptually look like:

```tsx
<ProjectsPage>
  <ProjectHeader />

  <ProjectFilters />

  <ProjectStatus />
</ProjectsPage>
```

And:

```tsx
<ProjectHeader>
  <PageTitle />
  <CreateProjectButton />
  <MoreActionsButton />
</ProjectHeader>
```

And:

```tsx
<ProjectStatus>
  {projects.length === 0 ? (
    <Empty />
  ) : (
    <ProjectStatusContent />
  )}
</ProjectStatus>
```

Keep responsibilities separated.

---

# 22. Visual Hierarchy

The page should have a clear visual hierarchy.

### Primary

```text
List of Projects
```

### Secondary

```text
Create Project
More Actions
Filtered By
```

### Main Workspace

```text
Project Status
```

The Project Status area should visually carry more weight than the filter controls.

Avoid making every element visually prominent.

---

# 23. Wireframe Interpretation

The provided wireframe represents the intended hierarchy:

```text
                 PROJECTS
                    │
        ┌───────────┴───────────┐
        │                       │
 List of Projects        Create Project
                                │
                           More Actions
        │
        └───────────────┐
                        │
                  Filtered By
                        │
                     Select
                        │
                        ▼
              ┌─────────────────┐
              │                 │
              │ Project Status  │
              │                 │
              │                 │
              └─────────────────┘
```

Preserve this hierarchy when implementing the UI.

Do not add additional dashboard cards or unrelated content to this page.

---

# 24. Future Extensibility

Design the components so future project functionality can be added without restructuring the entire page.

Potential future functionality includes:

- Project list
- Project status
- Project progress
- Project income
- Project expenses
- Project payout
- Project deadlines
- Project completion
- Project financial allocation

The current implementation should only establish the UI foundation for these features.

---

# Complete When

## Project Structure

- [ ] `AGENTS.md` has been read and followed.
- [ ] Existing project architecture has been inspected.
- [ ] Project-specific components are separated appropriately.
- [ ] No unnecessary files or abstractions are created.

## Header

- [ ] `ProjectHeader` exists.
- [ ] `List of Projects` is displayed.
- [ ] Create Project button exists.
- [ ] Create Project uses Shadcn `Button`.
- [ ] Create Project uses the Lucide `Plus` icon.
- [ ] More Actions button exists.
- [ ] More Actions uses Shadcn `Button`.
- [ ] More Actions uses `MoreHorizontal`.
- [ ] Icon-only actions have accessible labels.

## Filters

- [ ] `ProjectFilters` exists.
- [ ] `Filtered By` is displayed.
- [ ] Shadcn `Select` is used.
- [ ] Select has appropriate placeholder text.
- [ ] Select contains basic project status options.
- [ ] Filtering does not require backend functionality.

## Project Status

- [ ] `ProjectStatus` exists.
- [ ] Project Status is positioned below the filters.
- [ ] Project Status occupies the primary content area.
- [ ] Shadcn `Empty` is used for the no-project state.
- [ ] Empty state communicates that no projects exist.
- [ ] Empty state is structured so real project data can replace it later.

## Styling

- [ ] Shadcn/UI components are used.
- [ ] Tailwind CSS is used consistently.
- [ ] `global.css` theme variables are respected.
- [ ] No arbitrary colors are introduced.
- [ ] No additional UI library is introduced.
- [ ] No additional icon library is introduced.
- [ ] Styling matches the existing Dashboard and Sidebar.

## Responsive

- [ ] Desktop layout matches the provided wireframe.
- [ ] Header works on desktop.
- [ ] Header works on mobile.
- [ ] Filter controls work on mobile.
- [ ] Project Status works on mobile.
- [ ] No horizontal overflow occurs.
- [ ] Existing mobile bottom navigation remains functional.
- [ ] Project content does not become hidden behind mobile navigation.
- [ ] Touch targets are comfortable on mobile.

## Scope

- [ ] No Supabase integration is added.
- [ ] No project database schema is added.
- [ ] No project creation workflow is implemented.
- [ ] No project editing/deletion functionality is implemented.
- [ ] No project analytics are implemented.
- [ ] No unrelated features are implemented.

## Verification

- [ ] Application starts successfully.
- [ ] Projects page renders successfully.
- [ ] Desktop layout is visually correct.
- [ ] Mobile layout is visually correct.
- [ ] No TypeScript errors are introduced.
- [ ] No lint/build errors are introduced.
- [ ] Existing Dashboard navigation still works.
- [ ] Existing Sidebar still works.
- [ ] Existing mobile bottom navigation still works.
