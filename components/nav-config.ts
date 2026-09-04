import { FolderKanban, LayoutDashboard, Settings, Wallet } from "lucide-react"

export const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Projects", url: "/projects", icon: FolderKanban },
  { title: "Income Pool", url: "/income-pool", icon: Wallet },
  { title: "Settings", url: "/settings", icon: Settings },
] as const
