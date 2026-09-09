"use client"

import * as React from "react"
import { ProjectFilters, type ProjectStatusFilter } from "@/components/projects/project-filters"
import { ProjectHeader } from "@/components/projects/project-header"
import { ProjectStatus, type Project } from "@/components/projects/project-status"
import type { CreatedProject } from "@/components/dashboard/create-project-dialog"
import { createProject, deleteProject, updateProject } from "@/app/(app)/projects/actions"
import type { ProjectRecord } from "@/lib/projects/types"

type ProjectsPageProps = {
  projects: ProjectRecord[]
}

const accentMap: Record<Project["status"], Project["accent"]> = {
  active: "primary",
  pending: "chart-3",
  completed: "chart-2",
}

function toProject(record: ProjectRecord): Project {
  return {
    id: record.id,
    name: record.name,
    category: "Freelance project",
    source: record.client ?? "No client",
    date: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(record.created_at)),
    amount: Number(record.project_value ?? 0),
    status: record.status,
    accent: accentMap[record.status],
  }
}

export function ProjectsPage({ projects }: ProjectsPageProps) {
  const [projectList, setProjectList] = React.useState(() => projects.map(toProject))
  const [query, setQuery] = React.useState("")
  const [source, setSource] = React.useState("all")
  const [status, setStatus] = React.useState<ProjectStatusFilter>("all")

  const counts = React.useMemo(
    () => ({
      all: projectList.length,
      active: projectList.filter((project) => project.status === "active").length,
      pending: projectList.filter((project) => project.status === "pending").length,
      completed: projectList.filter((project) => project.status === "completed").length,
    }),
    [projectList]
  )

  const filteredProjects = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return projectList.filter((project) => {
      const matchesStatus = status === "all" || project.status === status
      const sourceKey = project.source === "Direct Client" ? "direct" : project.source.toLowerCase()
      const matchesSource = source === "all" || sourceKey === source
      const matchesQuery = !normalizedQuery || [project.name, project.id, project.category, project.source].some((value) => value.toLowerCase().includes(normalizedQuery))
      return matchesStatus && matchesSource && matchesQuery
    })
  }, [projectList, query, source, status])

  async function handleCreateProject(project: CreatedProject) {
    const result = await createProject({
      name: project.name,
      client: project.client,
      projectValue: project.amount,
      status: project.status,
    })
    if (result.data === null) throw new Error(result.error)

    setProjectList((current) => [toProject(result.data), ...current])
    setQuery("")
    setSource("all")
    setStatus("all")
  }

  async function handleDeleteProject(id: string) {
    const result = await deleteProject(id)
    if (result.id === null) throw new Error(result.error)
    setProjectList((current) => current.filter((project) => project.id !== result.id))
  }

  async function handleUpdateProject(id: string, data: Partial<Project>) {
    const result = await updateProject(id, {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.source !== undefined ? { client: data.source } : {}),
      ...(data.amount !== undefined ? { projectValue: data.amount } : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
    })
    if (result.data === null) throw new Error(result.error)

    const updated = toProject(result.data)
    setProjectList((current) => current.map((project) => project.id === id ? updated : project))
  }

  return (
    <div className="flex flex-1 flex-col p-4 sm:p-6 md:p-8 lg:p-10">
      <ProjectHeader onCreateProject={handleCreateProject} />
      <div className="mt-8 flex flex-1 flex-col gap-5">
        <ProjectFilters
          counts={counts}
          query={query}
          source={source}
          status={status}
          onQueryChange={setQuery}
          onSourceChange={setSource}
          onStatusChange={setStatus}
        />
        <ProjectStatus
          key={`${query}-${source}-${status}`}
          projects={filteredProjects}
          totalProjects={projectList.length}
          onClearFilters={() => {
            setQuery("")
            setSource("all")
            setStatus("all")
          }}
          onDeleteProject={handleDeleteProject}
          onUpdateProject={handleUpdateProject}
        />
      </div>
    </div>
  )
}
