import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ProjectsPage } from "@/components/projects/projects-page"
import { createClient } from "@/lib/supabase/server"
import type { ProjectRecord } from "@/lib/projects/types"

export default async function Page() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("projects")
    .select("id,name,status,created_at,updated_at,client,project_value")
    .order("created_at", { ascending: false })

  if (error) throw new Error("Unable to load projects.")

  return (
    <>
      <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 md:h-14">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-sm font-medium">Projects</h1>
      </header>
      <ProjectsPage projects={(data ?? []) as ProjectRecord[]} />
    </>
  )
}
