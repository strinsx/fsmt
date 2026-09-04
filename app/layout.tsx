import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SerwistProvider } from "@serwist/next/react";
import type { Metadata, Viewport } from "next";
import { cn } from "@/lib/utils";
import { ThemeSync } from "@/components/theme-sync";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const APP_NAME = "FSMT";
const APP_DEFAULT_TITLE = "FSMT — Freelancer Salary Management Tool";
const APP_DESCRIPTION = "A salary allocation tool for freelancers with irregular income.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: `%s — ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.webmanifest",
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
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
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
          <SerwistProvider swUrl="/sw.js" disable={process.env.NODE_ENV !== "production"}>
            {children}
          </SerwistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
