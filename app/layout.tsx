import "./globals.css"
import { PT_Serif, Space_Grotesk, Space_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { SerwistProvider } from "@serwist/next/react"
import type { Metadata, Viewport } from "next"
import { cn } from "@/lib/utils"
import { ThemeSync } from "@/components/theme-sync"
import { AppSidebar } from "@/components/app-sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans", weight: ["300", "400", "500", "600", "700"] })
const ptSerif = PT_Serif({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "700"] })
const spaceMono = Space_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "700"] })

const APP_NAME = "FSMT"
const APP_DEFAULT_TITLE = "FSMT — Freelancer Salary Management Tool"
const APP_DESCRIPTION = "A salary allocation tool for freelancers with irregular income."

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: `%s — ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: { default: APP_DEFAULT_TITLE, template: `%s — ${APP_NAME}` },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: { default: APP_DEFAULT_TITLE, template: `%s — ${APP_NAME}` },
    description: APP_DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", spaceGrotesk.variable, ptSerif.variable, spaceMono.variable)}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(matchMedia('(prefers-color-scheme:dark)').matches)document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeSync />
          <TooltipProvider>
            <SerwistProvider swUrl="/sw.js" disable={process.env.NODE_ENV !== "production"}>
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="pb-16 md:pb-0">
                  {children}
                </SidebarInset>
                <MobileNav />
              </SidebarProvider>
              <Toaster richColors position="top-right" />
            </SerwistProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
