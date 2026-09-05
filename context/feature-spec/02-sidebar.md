Read `AGENTS.md` before implementing this file.
Follow all instructions, conventions, architecture decisions, and coding standards defined in `AGENTS.md`.

# Shadcn Sidebar
- Install the official Shadcn sidebar component
- `npx shadcn@latest add sidebar-06`
- Use the generated Shadcn components rather than creating a custom sidebar implementation from scratch.

# Desktop Sidebar
- Implement the sidebar on the / route as the primary application navigation.
- The sidebar should contain these navigation items:
    - Dashboard
    - Projects
    - Income Pool
    - Settings
- Use appropriate icons from `lucide-react` for each navigation item.

    # Suggested Icons
    - Dashboard → LayoutDashboard
    - Projects → FolderKanban
    - Income Pool → Wallet
    - Settings → Settings
- The navigation items should be implemented as actual links/routes where appropriate, even if the destination pages are currently placeholders.
- For now, the / route can display a simple placeholder dashboard/content area beside the sidebar.

# Shadcn/UI Styling
- The sidebar must be built using the installed Shadcn/UI sidebar components
- Do not create a separate custom sidebar component with manually duplicated sidebar behavior unless required by the Shadcn implementation.
    Use:

    Shadcn/UI components
    global.css
    Existing Tailwind configuration
    lucide-react

    Keep the styling consistent with the project's existing design system.

    Avoid introducing another CSS framework or styling system.

# Mobile Navigation
Because this application is intended to function as a PWA, implement a mobile bottom navigation bar for smaller screen sizes.
    - Behavior:
    - Desktop/tablet → show the Shadcn sidebar.
    - Mobile → hide the desktop sidebar and show a fixed bottom navigation bar.
    - The bottom navigation should contain the same four navigation items:
        - Dashboard
        - Projects
        - Income Pool
        - Settings
    - Use the same Lucide icons as the desktop navigation.

The mobile navigation should feel similar to a native mobile/PWA application:
    Fixed to the bottom of the viewport.
    Easily tappable navigation targets.
    Respect mobile safe-area insets where applicable.
    Avoid covering page content.
    Provide a clear active/selected state.
    Maintain consistent spacing and icon sizing.
    Work correctly with browser/PWA viewport behavior.

# Component Structure
Prefer a clean structure similar to:

components/
├── ui/
│   └── sidebar.tsx
└── app-sidebar.tsx

Keep application-specific navigation configuration separate from the underlying Shadcn sidebar primitives where practical.

Avoid duplicating the navigation definitions between desktop and mobile. Ideally, define the navigation items once and reuse them for both navigation components.


# Scope

This task is only for implementing the navigation shell.

Do not build the actual functionality for:

Dashboard
Projects
Income Pool
Settings

Placeholder routes/pages are sufficient for now.

Do not implement unrelated features.

# Complete when
- AGENTS.md has been read and followed.
- npx shadcn@latest add sidebar-06 has been installed successfully.
- The Shadcn sidebar is implemented.
- Settings navigation exists.
- All navigation items use lucide-react icons.
- Desktop navigation uses the Shadcn sidebar.
- Mobile navigation switches to a fixed bottom navigation bar.
- Mobile navigation contains the same four navigation items.
- Mobile navigation has active/selected states.
- Mobile navigation respects safe-area insets.
- Page content is not hidden behind the mobile navigation.
- No unnecessary UI libraries or styling systems are introduced.
- The implementation is responsive across desktop and mobile viewport sizes.
