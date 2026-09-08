import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ProjectsPage } from "@/components/projects/projects-page"

export default function Page() {
  return (
    <>
      <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 md:h-14">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-sm font-medium">Projects</h1>
      </header>
      <ProjectsPage />
    </>
  )
}
