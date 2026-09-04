
# UI Context

## Product

FSMT (Freelancer Salary Management Tool)

FSMT is a focused salary-allocation tool for freelancers with irregular, project-based income.

The interface should communicate financial information clearly without turning the product into a general-purpose personal finance application.

The primary UI question is:

> "How much can I pay myself?"

---

## Theme

Both light and dark modes are supported through shadcn/ui tokens in `app/globals.css`.

The theme follows the browser/device `prefers-color-scheme` preference as the source of truth.

An inline script in the root layout applies the `.dark` class before first paint to avoid a flash of incorrect theme.

`components/theme-sync.tsx`, mounted in `app/layout.tsx`, keeps the theme synchronized while the application is open so OS-level light/dark changes are reflected immediately.

The visual identity should remain minimal and professional.

FSMT should not rely heavily on bright accent colors or excessive visual decoration.

---

## Design Principles

### 1. Salary First

The most important piece of information in FSMT is the user's current salary allocation.

The dashboard should make the current monthly allocation immediately understandable.

Example:

**₱41,666.67**

Monthly Salary Allocation

Supporting information should appear around this value rather than competing with it.

### 2. Minimal and Focused

FSMT is a tool, not a productivity application.

Avoid:

- Gamification
- Streaks
- Achievement systems
- Excessive charts
- Unnecessary statistics
- Decorative dashboards

Every interface element should support the user's understanding of their income allocation.

### 3. Low Cognitive Load

The user should not need financial expertise to understand the application.

Avoid unnecessary financial terminology.

When technical or financial concepts are necessary, explain them in plain language.

### 4. Explain the Calculation

The salary allocation is the core calculation of FSMT.

Users should be able to understand where the number comes from.

For example:

```text
₱500,000 available
÷
12 months
=
₱41,666.67 / month