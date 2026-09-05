# Transaction Components

## Overview

Implement the initial **Transactions module** based on the provided wireframe.

The Transactions module is responsible for displaying and eventually managing the user's transactions.

For this implementation, focus on building the **frontend component structure and UI only**.

The module should include:

- Transaction page header (title + muted subtext)
- Export Transactions action
- Create Transaction action
- More actions menu trigger
- Transaction toolbar (search + filters)
- Transactions table
- Row summary + pagination
- Responsive desktop/mobile layouts

Do not implement transaction database functionality, PDF export logic, or Supabase queries yet.

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

The Transactions page should eventually allow the user to view, search, and filter their transactions.

The initial page should have this structure:

```text
Transactions
│
├── Transaction Header
│   ├── Title + Muted Subtext
│   ├── Export Transactions
│   └── + Transactions
│
├── Transaction Toolbar
│   ├── Search
│   ├── Filter: This Month
│   ├── Filter: This Week
│   └── More Actions
│
├── Transactions Table
│   └── Transaction Rows
│
└── Table Footer
    ├── Showing X out of Y
    └── Pagination
```

The page should feel like a natural continuation of the existing Dashboard UI.

---

# 3. Transaction Page

Implement the Transactions page at the appropriate route.

If the existing sidebar already defines the Transactions route, use that route instead of creating a duplicate route.

The page should use the application's existing layout.

Do not recreate the sidebar inside the Transactions page.

The page content should sit beside the desktop sidebar and above the mobile bottom navigation.

---

# 4. Component Architecture

Create separate components for the major parts of the Transactions module.

Recommended structure:

```text
components/
└── transactions/
    ├── transaction-header.tsx
    ├── transaction-toolbar.tsx
    ├── transaction-table.tsx
    ├── transaction-pagination.tsx
    └── transactions-page.tsx
```

The exact location may be adjusted to follow the existing project architecture.

### Responsibilities

#### `TransactionHeader`

Responsible for:

- Page title + muted subtext
- Export Transactions button
- Create Transaction button

#### `TransactionToolbar`

Responsible for:

- Search input
- "This Month" filter
- "This Week" filter
- More actions trigger

#### `TransactionTable`

Responsible for:

- Rendering transaction rows
- Table column structure

#### `TransactionPagination`

Responsible for:

- Row summary text ("Showing X out of Y")
- Pagination controls

#### `TransactionsPage`

Responsible for composing the components together.

Example:

```tsx
<TransactionHeader />

<TransactionToolbar />

<TransactionTable />

<TransactionPagination />
```

Do not place all functionality into one large component.

---

# 5. Transaction Header

Create a reusable `TransactionHeader` component.

The header should contain:

```text
transactions                     [ export transactions ] [ + transactions ]
muted text
```

## 5.1 Page Title

Display:

```text
Transactions
```

With a muted description line beneath it, e.g.:

```text
View and manage all your transactions
```

Use the existing typography conventions from the application (heading + `text-muted-foreground` for the subtext). Do not introduce custom font sizes or colors unless required by the existing design system.

## 5.2 Export Transactions Button

Use the Shadcn/UI `Button` component with `variant="outline"`.

Use the Lucide React `FileDown` icon (lucide-react does not ship a dedicated "PDF" icon — `FileDown` is the closest semantic match for an export action; swap it if the project already has an established export icon convention).

Example:

```tsx
<Button variant="outline">
  <FileDown />
  Export Transactions
</Button>
```

Do not implement actual PDF generation/export logic yet. The button can:

- Have no action
- Open a placeholder handler
- Be prepared for future export implementation

## 5.3 Create Transaction Button

Use the Shadcn/UI `Button` component with `variant="default"`.

Use the Lucide React `Plus` icon.

Example:

```tsx
<Button variant="default">
  <Plus />
  Transactions
</Button>
```

Do not implement the actual transaction creation workflow. The button can be a placeholder handler prepared for a future dialog.

---

# 6. Transaction Toolbar

Create a separate `TransactionToolbar` component.

The toolbar sits underneath the header and contains, left to right:

```text
[ Search transactions...          ]     [ This Month ] [ This Week ] [ ... ]
```

## 6.1 Search Input

Use the Shadcn/UI `Input` component with a placeholder such as `Search transactions...`. Optionally include the Lucide `Search` icon inside the input following the app's existing input-with-icon pattern, if one exists.

The search does not need to filter real data yet.

## 6.2 "This Month" / "This Week" Filters

Render as two Shadcn `Button` components with `variant="outline"` and `size="sm"`, styled as filter pills per the wireframe.

```tsx
<Button variant="outline" size="sm">This Month</Button>
<Button variant="outline" size="sm">This Week</Button>
```

If the project already has a `ToggleGroup` or similar Shadcn primitive installed for this pattern, prefer that instead of plain buttons. Local, client-side toggling of active state is acceptable; connecting to real data is not required.

## 6.3 More Actions

Icon-only Shadcn `Button`, `variant="outline"`, `size="icon"`, using the Lucide `MoreHorizontal` icon.

```tsx
<Button variant="outline" size="icon" aria-label="More transaction actions">
  <MoreHorizontal />
</Button>
```

Do not implement the actions menu unless the existing application already has a suitable menu component that can be used without expanding scope.

---

# 7. Transactions Table

Create a separate `TransactionTable` component.

Use the Shadcn/UI `Table` components. Install if they do not already exist:

```bash
npx shadcn@latest add table
```

## 7.1 Columns

| Column | Description |
|---|---|
| Transaction Name | Name/description of the transaction |
| Date Created | The date the transaction was recorded |
| Type | Transaction category/type |
| Amount | Signed value, prefixed with `+` or `-` |

Example:

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Transaction Name</TableHead>
      <TableHead>Date Created</TableHead>
      <TableHead>Type</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {transactions.map((transaction) => (
      <TableRow key={transaction.id}>
        <TableCell>{transaction.name}</TableCell>
        <TableCell>{transaction.dateCreated}</TableCell>
        <TableCell>{transaction.type}</TableCell>
        <TableCell className="text-right">
          {transaction.amount >= 0 ? "+" : "-"}
          {Math.abs(transaction.amount)}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## 7.2 Amount Column

Display the amount with a leading `+` or `-` depending on direction. Rely on the sign prefix and existing theme tokens (e.g. `text-foreground`, or an existing success/destructive token if the design system already defines one). Do not introduce arbitrary hardcoded hex colors for positive/negative values.

## 7.3 Data

Use mock/placeholder transaction rows only if needed to visualize the table layout. Do not connect to a real data source yet (see Section 16).

---

# 8. Row Summary & Pagination

Create a `TransactionPagination` component placed below the table, mirroring the wireframe:

```text
showing 10 out of 260                          [  pagination controls  ]
```

## 8.1 Row Summary Text

Display a summary such as:

```text
Showing {rowsShown} out of {totalRows}
```

Use `text-muted-foreground` for this text.

## 8.2 Pagination

Use the Shadcn/UI `Pagination` component. Install if it does not already exist:

```bash
npx shadcn@latest add pagination
```

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        1
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

Pagination only needs to manage local UI state (e.g. current page number). It does not need to be wired to a real data source or backend yet.

---

# 9. Shadcn/UI Requirements

The Transactions module must use Shadcn/UI components.

Use:

- `Button`
- `Input`
- `Table`
- `Pagination`
- Existing Shadcn layout components where appropriate

Do not manually recreate these components. If a required Shadcn component is missing, install it using the Shadcn CLI. Do not reinstall components that already exist.

---

# 10. Icons

Use `lucide-react` for all interface icons.

| Purpose | Icon |
|---|---|
| Export Transactions | `FileDown` |
| Create Transaction | `Plus` |
| More Actions | `MoreHorizontal` |
| Search | `Search` |

Use the project's existing icon conventions if they differ. Do not introduce another icon library.

---

# 11. Styling

All styling must follow the application's existing design system.

Use:

- Shadcn/UI
- Tailwind CSS
- `global.css`
- Existing CSS variables
- Existing theme tokens

Do not introduce arbitrary colors. Do not hardcode colors such as `#000000`, `#ffffff`, `#123456` unless already part of the application's established design system.

Prefer Shadcn semantic classes such as `bg-background`, `text-foreground`, `text-muted-foreground`, `border`, `bg-card`, and other existing theme utilities.

The Transactions page should visually match the Dashboard and Sidebar.

---

# 12. Desktop Layout

```text
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  transactions                     [ export transactions ] [ + tx ]  │
│  muted text                                                        │
│                                                                     │
│  [ search input             ]        [ this month ][ this week ][…] │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ Transaction Name   Date Created    Type          Amount        │  │
│  │ ...                                                          │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  showing 10 out of 260                        [ pagination ]        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

The table should occupy the majority of the available page width and height.

---

# 13. Responsive Design

## 13.1 Mobile Header

On mobile, the header should wrap if necessary:

```text
transactions
muted text

[ export transactions ] [ + transactions ]
```

## 13.2 Mobile Toolbar

The search input should take full width on mobile, with filters and the more-actions trigger wrapping onto the next line if needed:

```text
[ search input                         ]

[ this month ] [ this week ] [ ... ]
```

## 13.3 Mobile Table

Use a horizontal scroll container around the table so columns are not compressed or clipped. Do not allow the table to force horizontal overflow on the page itself. Converting rows into stacked cards is out of scope for this task.

## 13.4 Mobile Pagination

The row summary and pagination controls may stack vertically on narrow screens. Touch targets should remain comfortable.

---

# 14. Mobile Navigation Compatibility

The existing mobile bottom navigation should remain visible on mobile. Page content must not be hidden underneath the fixed bottom navigation — use appropriate bottom padding. Do not modify the mobile navigation unless necessary to integrate this page.

---

# 15. Accessibility

### Buttons

Icon-only buttons must have an accessible label, e.g. `aria-label="More transaction actions"`.

### Search Input

The search input should have an accessible label (visible label or `aria-label`).

### Table

Use semantic table markup (`<Table>`, `<TableHeader>`, `<TableBody>`, `<TableHead>`) so screen readers can announce columns correctly.

### Pagination

Follow the accessibility behavior provided by Shadcn/UI and Radix's `Pagination` primitives.

---

# 16. Data Handling

Do not connect this module to Supabase yet. Do not create:

- Database tables
- Supabase queries
- API routes
- Server actions
- Mutations
- PDF export logic
- Transaction persistence

Use mock/placeholder data only if needed. The UI should be designed so real transaction data can be introduced later, for example:

```tsx
<TransactionTable transactions={transactions} />
```

rather than the component internally fetching data.

---

# 17. Avoid Overengineering

This task is only for the initial Transactions UI.

Do not implement:

- Actual PDF export
- Transaction creation modal
- Transaction editing
- Transaction deletion
- Real search/filter logic against a data source
- Sorting logic
- Transaction database schema
- Transaction API
- Supabase integration
- Advanced filtering
- Analytics

These can be implemented in future tasks.

---

# 18. Suggested File Structure

```text
components/
├── transactions/
│   ├── transaction-header.tsx
│   ├── transaction-toolbar.tsx
│   ├── transaction-table.tsx
│   ├── transaction-pagination.tsx
│   └── transactions-page.tsx
│
└── ui/
    ├── button.tsx
    ├── input.tsx
    ├── table.tsx
    └── pagination.tsx
```

Use the existing project's folder conventions if they differ. Do not create duplicate UI primitives.

---

# 19. Component Composition

```tsx
<TransactionsPage>
  <TransactionHeader />
  <TransactionToolbar />
  <TransactionTable transactions={transactions} />
  <TransactionPagination shown={rowsShown} total={totalRows} />
</TransactionsPage>
```

```tsx
<TransactionHeader>
  <PageTitle />
  <ExportTransactionsButton />
  <CreateTransactionButton />
</TransactionHeader>
```

Keep responsibilities separated.

---

# Complete When

## Project Structure

- [ ] `AGENTS.md` has been read and followed.
- [ ] Existing project architecture has been inspected.
- [ ] Transaction-specific components are separated appropriately.
- [ ] No unnecessary files or abstractions are created.

## Header

- [ ] `TransactionHeader` exists.
- [ ] `Transactions` title is displayed with muted subtext beneath it.
- [ ] Export Transactions button exists, uses Shadcn `Button` with `variant="outline"`.
- [ ] Export Transactions uses the Lucide `FileDown` icon.
- [ ] Create Transaction button exists, uses Shadcn `Button` with `variant="default"`.
- [ ] Create Transaction uses the Lucide `Plus` icon.
- [ ] Icon-only actions have accessible labels.

## Toolbar

- [ ] `TransactionToolbar` exists.
- [ ] Search input exists using Shadcn `Input`.
- [ ] "This Month" filter control exists.
- [ ] "This Week" filter control exists.
- [ ] More actions trigger exists using `MoreHorizontal`.
- [ ] Toolbar does not require backend functionality.

## Table

- [ ] `TransactionTable` exists using Shadcn `Table` components.
- [ ] Columns match: Transaction Name, Date Created, Type, Amount.
- [ ] Amount column displays a `+` or `-` prefix.
- [ ] No arbitrary hardcoded colors are used for amount styling.
- [ ] Table is positioned below the toolbar.

## Pagination

- [ ] `TransactionPagination` exists.
- [ ] "Showing X out of Y" summary text is displayed.
- [ ] Shadcn `Pagination` component is used.
- [ ] Pagination does not require backend functionality.

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
- [ ] Header works on desktop and mobile.
- [ ] Toolbar works on desktop and mobile.
- [ ] Table does not cause page-level horizontal overflow on mobile.
- [ ] Existing mobile bottom navigation remains functional.
- [ ] Transaction content is not hidden behind mobile navigation.
- [ ] Touch targets are comfortable on mobile.

## Scope

- [ ] No Supabase integration is added.
- [ ] No transaction database schema is added.
- [ ] No PDF export logic is implemented.
- [ ] No transaction creation workflow is implemented.
- [ ] No transaction editing/deletion functionality is implemented.
- [ ] No real search/filter/sort logic is implemented.
- [ ] No unrelated features are implemented.

## Verification

- [ ] Application starts successfully.
- [ ] Transactions page renders successfully.
- [ ] Desktop layout is visually correct.
- [ ] Mobile layout is visually correct.
- [ ] No TypeScript errors are introduced.
- [ ] No lint/build errors are introduced.
- [ ] Existing Dashboard navigation still works.
- [ ] Existing Sidebar still works.
- [ ] Existing mobile bottom navigation still works.
