# Settings Components

Always read `AGENTS.md` before executing this file.

## Overview

Implement the initial **Settings module**, based on the provided wireframe with the following revisions:

- Drop the Username/Birthday/Phone Number/Password/Language fields and the 3-card theme picker from the original wireframe.
- Add a **Notifications** section (not present in the wireframe).
- Replace the theme picker with a **custom Light/Dark toggle button** powered by the MagicUI Animated Theme Toggler.
- Separate every section with a Shadcn `Separator`.

For this implementation, focus on building the **frontend component structure and UI only**. Theme switching itself should actually function (it is a client-side concern), but profile/personal-information/notification changes do not need to persist anywhere yet.

The module should include:

- Settings page header
- Profile section (avatar, full name, account ID)
- Personal Information section (first name, last name, email)
- Notifications section (in-app notifications switch)
- Theme section (animated light/dark toggle)
- Section separators throughout
- Responsive desktop/mobile layouts

Do not implement account update persistence or Supabase queries yet.

---

# 1. Before Implementation

Before making any changes:

1. Read `AGENTS.md` from the project root.
2. Follow all instructions, conventions, architecture decisions, and coding standards defined in `AGENTS.md`.
3. Inspect the existing project structure before creating new files.
4. Reuse existing components when appropriate (e.g. `Input`, `Label`, `Button` already installed for other modules).
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

The Settings page should let the user review their profile and adjust basic preferences.

The initial page should have this structure:

```text
Settings
│
├── Settings Header
│   ├── "Settings" title
│   └── Muted subtext
│
├── Separator
│
├── Profile
│   ├── Section heading + muted text
│   ├── Avatar
│   ├── Full Name
│   └── Account ID
│
├── Separator
│
├── Personal Information
│   ├── Section heading + muted text
│   ├── First Name input | Last Name input
│   └── Email input
│
├── Separator
│
├── Notifications
│   ├── Section heading + muted text
│   └── In-app Notifications (Switch)
│
├── Separator
│
└── Theme
    ├── Section heading + muted text
    └── Light Mode / Dark Mode toggle button
```

The page should feel like a natural continuation of the existing Dashboard UI.

---

# 3. Settings Page

Implement the Settings page at the appropriate route.

If the existing sidebar already defines the Settings route, use that route instead of creating a duplicate route.

The page should use the application's existing layout. Do not recreate the sidebar inside the Settings page.

The page content should sit beside the desktop sidebar and above the mobile bottom navigation.

---

# 4. Component Architecture

Recommended structure:

```text
components/
└── settings/
    ├── settings-header.tsx
    ├── profile-section.tsx
    ├── personal-info-section.tsx
    ├── notifications-section.tsx
    ├── theme-section.tsx
    └── settings-page.tsx
```

The exact location may be adjusted to follow the existing project architecture.

### Responsibilities

#### `SettingsHeader`

Responsible for:

- Page title
- Muted subtext

#### `ProfileSection`

Responsible for:

- Section heading + muted text
- Avatar
- Full name and account ID display

#### `PersonalInfoSection`

Responsible for:

- Section heading + muted text
- First Name / Last Name inputs
- Email input

#### `NotificationsSection`

Responsible for:

- Section heading + muted text
- In-app notifications toggle (Shadcn `Switch`)

#### `ThemeSection`

Responsible for:

- Section heading + muted text
- Light/Dark mode toggle button, wired to the animated theme toggler's logic

#### `SettingsPage`

Responsible for composing the sections together, separated by `Separator`.

Example:

```tsx
<SettingsHeader />
<Separator />

<ProfileSection />
<Separator />

<PersonalInfoSection />
<Separator />

<NotificationsSection />
<Separator />

<ThemeSection />
```

Do not place all functionality into one large component.

---

# 5. Settings Header

Display:

```text
Settings
```

With a muted subtext beneath it, e.g.:

```text
Customize your profile, personal information, and preferences.
```

Use the existing typography conventions from the application. Do not introduce custom font sizes or colors unless required by the existing design system.

---

# 6. Separators

Install the Shadcn `Separator` component if it does not already exist:

```bash
npx shadcn@latest add separator
```

Place a `<Separator />` between every top-level section: after the header, and between Profile, Personal Information, Notifications, and Theme. Do not add separators inside a section (e.g. between the two Personal Information inputs).

---

# 7. Profile Section

## 7.1 Section Heading

Display:

```text
Profile
```

With muted text beneath, e.g.:

```text
View your personal profile information.
```

## 7.2 Avatar + Identity

Display the user's avatar beside their full name and account ID, using the Shadcn `Avatar` component. Install if it does not already exist:

```bash
npx shadcn@latest add avatar
```

```tsx
<div className="flex items-center gap-4">
  <Avatar>
    <AvatarImage src={user.avatarUrl} alt={user.fullName} />
    <AvatarFallback>{initials}</AvatarFallback>
  </Avatar>

  <div>
    <p className="font-medium text-foreground">{user.fullName}</p>
    <p className="text-sm text-muted-foreground">Account ID: {user.accountId}</p>
  </div>
</div>
```

Full name and account ID are display-only in this section — editing happens in Personal Information below (for the name) or is not editable at all (for the account ID). Use mock/placeholder user data if none exists yet.

---

# 8. Personal Information Section

## 8.1 Section Heading

Display:

```text
Personal Information
```

With muted text beneath, e.g.:

```text
Manage your name and email address.
```

## 8.2 First Name / Last Name

Two Shadcn `Input` components with `Label`s, laid out side by side on desktop:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="space-y-2">
    <Label htmlFor="first-name">First Name</Label>
    <Input id="first-name" defaultValue={user.firstName} />
  </div>

  <div className="space-y-2">
    <Label htmlFor="last-name">Last Name</Label>
    <Input id="last-name" defaultValue={user.lastName} />
  </div>
</div>
```

## 8.3 Email

A single full-width `Input` beneath the name row:

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" defaultValue={user.email} />
</div>
```

Inputs can hold local state only. Do not implement account update persistence yet.

---

# 9. Notifications Section

## 9.1 Section Heading

Display:

```text
Notifications
```

With muted text beneath, e.g.:

```text
Choose how you want to be notified.
```

## 9.2 In-App Notifications Switch

Install the Shadcn `Switch` component if it does not already exist:

```bash
npx shadcn@latest add switch
```

Render a label with the switch beside it:

```tsx
<div className="flex items-center justify-between">
  <Label htmlFor="in-app-notifications">In-app Notifications</Label>
  <Switch id="in-app-notifications" checked={inAppNotifications} onCheckedChange={setInAppNotifications} />
</div>
```

Local state only — do not implement notification preference persistence yet.

---

# 10. Theme Section

## 10.1 Section Heading

Display:

```text
Theme
```

With muted text beneath, e.g.:

```text
Switch between light and dark mode.
```

## 10.2 Animated Light/Dark Toggle

Install the MagicUI Animated Theme Toggler:

```bash
npx shadcn@latest add @magicui/animated-theme-toggler
```

Do not render the library's default icon-only button as-is. Instead, reuse the toggling logic/function it exposes (the view-transition-based theme switch) and wire it to a custom two-option button labeled:

```text
Light Mode | Dark Mode
```

Conceptually:

```tsx
function ThemeSection() {
  const { toggleTheme } = useAnimatedThemeToggler(); // or the equivalent export from the installed component
  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={theme === "light" ? "default" : "outline"}
        onClick={() => theme !== "light" && toggleTheme()}
      >
        Light Mode
      </Button>

      <Button
        variant={theme === "dark" ? "default" : "outline"}
        onClick={() => theme !== "dark" && toggleTheme()}
      >
        Dark Mode
      </Button>
    </div>
  );
}
```

Adjust the exact hook/function name to whatever the installed component actually exports — inspect the generated file after running the install command. Unlike the other sections, this toggle should genuinely switch the app's theme, since it's a client-side UI concern rather than data persistence.

---

# 11. Shadcn/UI Requirements

The Settings module must use Shadcn/UI components.

Use:

- `Separator`
- `Avatar`
- `Input`
- `Label`
- `Switch`
- `Button`
- MagicUI `animated-theme-toggler` (for its toggle logic only, not its default button UI)

Do not manually recreate these components. Install any missing ones using the Shadcn CLI. Do not reinstall components that already exist.

---

# 12. Icons

Use `lucide-react` for any interface icons needed (e.g. a settings-page icon in the sidebar, if not already present). Follow the project's existing icon conventions. Do not introduce another icon library.

---

# 13. Styling

All styling must follow the application's existing design system.

Use:

- Shadcn/UI
- Tailwind CSS
- `global.css`
- Existing CSS variables and theme tokens

Do not introduce arbitrary colors. Do not hardcode colors such as `#000000`, `#ffffff`, `#123456` unless already part of the application's established design system.

Prefer Shadcn semantic classes such as `bg-background`, `text-foreground`, `text-muted-foreground`, `border`, `bg-card`.

The Settings page should visually match the Dashboard and Sidebar.

---

# 14. Desktop Layout

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Settings                                                   │
│  muted text                                                 │
│  ───────────────────────────────────────────────────────    │
│                                                             │
│  Profile                                                    │
│  muted text                                                 │
│  (avatar)  Full Name                                        │
│            Account ID: ...                                  │
│  ───────────────────────────────────────────────────────    │
│                                                             │
│  Personal Information                                       │
│  muted text                                                 │
│  [ First Name       ]        [ Last Name        ]            │
│  [ Email                                       ]              │
│  ───────────────────────────────────────────────────────    │
│                                                             │
│  Notifications                                               │
│  muted text                                                 │
│  In-app Notifications                          ( ⏻ switch ) │
│  ───────────────────────────────────────────────────────    │
│                                                             │
│  Theme                                                       │
│  muted text                                                 │
│  [ Light Mode ]  [ Dark Mode ]                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

# 15. Responsive Design

## 15.1 Mobile

- First Name / Last Name inputs stack into a single column.
- The Notifications row keeps the label and switch on the same line if it fits; otherwise wrap the switch beneath the label.
- The Light Mode / Dark Mode buttons remain side by side unless space is too tight, in which case they may wrap.
- No section should cause horizontal overflow on narrow screens.

---

# 16. Mobile Navigation Compatibility

The existing mobile bottom navigation should remain visible on mobile. Page content must not be hidden underneath the fixed bottom navigation — use appropriate bottom padding. Do not modify the mobile navigation unless necessary to integrate this page.

---

# 17. Accessibility

### Inputs

Every `Input` must have an associated `Label` (via `htmlFor`/`id`).

### Switch

The `Switch` must have an associated, visible `Label`.

### Theme Toggle

The Light Mode / Dark Mode buttons should reflect the current selection (e.g. `aria-pressed`) so assistive technology can tell which mode is active.

### Avatar

Provide meaningful `alt` text on `AvatarImage` (the user's name), and a sensible fallback (initials) when no image is available.

---

# 18. Data Handling

Do not connect this module to Supabase yet. Do not create:

- Database tables
- Supabase queries
- API routes
- Server actions
- Mutations
- Profile/notification persistence

Use mock/placeholder user data only if needed. The UI should be designed so real user data can be introduced later, for example:

```tsx
<ProfileSection user={user} />
<PersonalInfoSection user={user} onSave={handleSave} />
```

rather than the components internally fetching data.

The Theme toggle is the one exception — it may genuinely apply the theme change, since that is local UI state, not persisted account data.

---

# 19. Avoid Overengineering

This task is only for the initial Settings UI.

Do not implement:

- Profile picture upload
- Account update persistence
- Password change functionality
- Language selection
- Notification preference persistence
- Notification channels beyond the single in-app toggle
- Additional theme options beyond Light/Dark
- Account deletion or security settings

These can be implemented in future tasks.

---

# 20. Suggested File Structure

```text
components/
├── settings/
│   ├── settings-header.tsx
│   ├── profile-section.tsx
│   ├── personal-info-section.tsx
│   ├── notifications-section.tsx
│   ├── theme-section.tsx
│   └── settings-page.tsx
│
└── ui/
    ├── separator.tsx
    ├── avatar.tsx
    ├── input.tsx
    ├── label.tsx
    ├── switch.tsx
    ├── button.tsx
    └── animated-theme-toggler.tsx
```

Use the existing project's folder conventions if they differ. Do not create duplicate UI primitives.

---

# 21. Component Composition

```tsx
<SettingsPage>
  <SettingsHeader />
  <Separator />

  <ProfileSection user={user} />
  <Separator />

  <PersonalInfoSection user={user} />
  <Separator />

  <NotificationsSection />
  <Separator />

  <ThemeSection />
</SettingsPage>
```

Keep responsibilities separated.

---

# Complete When

## Project Structure

- [ ] `AGENTS.md` has been read and followed.
- [ ] Existing project architecture has been inspected.
- [ ] Settings-specific components are separated appropriately.
- [ ] No unnecessary files or abstractions are created.

## Header

- [ ] `SettingsHeader` exists.
- [ ] "Settings" title is displayed.
- [ ] Muted subtext is displayed beneath the title.

## Separators

- [ ] A `Separator` appears after the header and between every subsequent section.
- [ ] No separators appear within a section.

## Profile

- [ ] `ProfileSection` exists.
- [ ] Section heading and muted text are displayed.
- [ ] Avatar is displayed beside full name and account ID.

## Personal Information

- [ ] `PersonalInfoSection` exists.
- [ ] Section heading and muted text are displayed.
- [ ] First Name and Last Name inputs are displayed side by side on desktop.
- [ ] Email input is displayed beneath the name row.
- [ ] Every input has an associated label.

## Notifications

- [ ] `NotificationsSection` exists.
- [ ] Section heading and muted text are displayed.
- [ ] Shadcn `Switch` is used for the in-app notifications toggle.
- [ ] The switch has an associated visible label.

## Theme

- [ ] `ThemeSection` exists.
- [ ] Section heading and muted text are displayed.
- [ ] MagicUI `animated-theme-toggler` is installed and its toggle logic is reused.
- [ ] A custom "Light Mode" / "Dark Mode" button pair is rendered instead of the library's default button.
- [ ] Clicking either button actually switches the app's theme.

## Styling

- [ ] Shadcn/UI components are used.
- [ ] Tailwind CSS is used consistently.
- [ ] `global.css` theme variables are respected.
- [ ] No arbitrary colors are introduced.
- [ ] No additional UI library is introduced beyond what's specified.
- [ ] No additional icon library is introduced.
- [ ] Styling matches the existing Dashboard and Sidebar.

## Responsive

- [ ] Desktop layout matches the structure above.
- [ ] Name inputs stack on mobile.
- [ ] No horizontal overflow occurs.
- [ ] Existing mobile bottom navigation remains functional.
- [ ] Settings content does not become hidden behind mobile navigation.

## Scope

- [ ] No Supabase integration is added.
- [ ] No account update persistence is implemented.
- [ ] No password/language/notification-channel functionality is implemented.
- [ ] No unrelated features are implemented.

## Verification

- [ ] Application starts successfully.
- [ ] Settings page renders successfully.
- [ ] Desktop layout is visually correct.
- [ ] Mobile layout is visually correct.
- [ ] No TypeScript errors are introduced.
- [ ] No lint/build errors are introduced.
- [ ] Theme toggle correctly switches the app's appearance.
- [ ] Existing Dashboard navigation still works.
- [ ] Existing Sidebar still works.
- [ ] Existing mobile bottom navigation still works.
