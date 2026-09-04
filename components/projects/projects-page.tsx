import { ProjectFilters } from "@/components/projects/project-filters"
import { ProjectHeader } from "@/components/projects/project-header"
import { ProjectStatus } from "@/components/projects/project-status"

type Project = {
  id: string
  name: string
  source: string
  date: string
  amount: string
  status: "active" | "pending" | "completed"
}

type ProjectsPageProps = {
  projects?: Project[]
}

export function ProjectsPage({ projects = [] }: ProjectsPageProps) {
  return (
    <div className="flex flex-1 flex-col p-6 md:p-8 lg:p-10">
      <div className="flex flex-1 flex-col gap-8 rounded-xl p-8 md:min-h-0 md:gap-10 md:p-10 lg:p-12">
        <ProjectHeader />
        <ProjectFilters />
        <ProjectStatus projects={projects} />
      </div>
    </div>
  )
}
