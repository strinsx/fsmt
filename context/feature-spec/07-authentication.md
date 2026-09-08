

# Authentication 

Read `AGENTS.md` before executing the file.

Create this page for authentication
- `app/auth/login.ts`
- `app/auth/signup.ts`

Create a proxy.ts for authorization

make sure to put the needed authencation files of client / server.ts inside `lib\supabase`

- use the `npx shadcn@latest add login-01` and `npx shadcn@latest add signup-01`as blocks for the page.

Requirements
- make sure to use the `shadcn/ui` components as much as possible
- follow the styling and ui context of `01-design-system.md`
- same as for the sign up, make sure to ask for the specifics
    - Full Name
    - Email
    - Password with an eye revealer favicon that controls visibility of the password.
    - Confirm Password
- when logged in, make sure that the usernav of the `sidebar.ts` reacts to the account and has a logout button in dropdown tabs.
- when logged, paste the specifics and inputs of the user to the profiles table.

# Complete when
- supabase is able to run to the backend with no issues whatsoever.
- no lint errors
