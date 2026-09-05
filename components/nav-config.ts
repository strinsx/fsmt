import { ArrowLeftRight, FolderKanban, LayoutDashboard, Settings } from "lucide-react"

export const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Projects", url: "/projects", icon: FolderKanban },
  { title: "Transactions", url: "/transactions", icon: ArrowLeftRight },
  { title: "Settings", url: "/settings", icon: Settings },
] as const
