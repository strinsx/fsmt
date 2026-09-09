"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { ChevronsUpDownIcon, LogOutIcon } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export function NavUser() {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const [user, setUser] = React.useState<{ name: string; email: string; avatar: string } | null>(null)

  React.useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user
      if (!u) return
      const meta = (u.user_metadata ?? {}) as Record<string, string>
      const fullName = meta.display_name || meta.full_name || meta.name || u.email?.split("@")[0] || "User"
      setUser({ name: fullName, email: u.email ?? "", avatar: meta.avatar_url ?? "" })
      supabase
        .from("profiles")
        .select("display_name,email")
        .eq("id", u.id)
        .single()
        .then(({ data: profile }) => {
          const p = profile as { display_name: string | null } | null
          if (p?.display_name) setUser((prev) => (prev ? { ...prev, name: p.display_name! } : prev))
        })
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session?.user) {
        setUser(null)
      } else {
        const meta = (session.user.user_metadata ?? {}) as Record<string, string>
        const fullName = meta.display_name || meta.full_name || meta.name || session.user.email?.split("@")[0] || "User"
        setUser({ name: fullName, email: session.user.email ?? "", avatar: meta.avatar_url ?? "" })
      }
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="opacity-60">
            <Avatar>
              <AvatarFallback>--</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Not signed in</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />}>
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{initials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <ChevronsUpDownIcon className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{initials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
