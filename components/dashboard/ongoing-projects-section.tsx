import { FolderKanban } from "lucide-react"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"

type OngoingProjectsSectionProps = {
  projects?: unknown[]
}

export function OngoingProjectsSection({ projects }: OngoingProjectsSectionProps) {
  const hasProjects = projects !== undefined ? projects.length > 0 : false

  if (hasProjects) {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <FolderKanban className="size-5 shrink-0" aria-hidden />
          Current Ongoing Projects
        </h2>
        <div className="rounded-xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">Project list will appear here.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
        <FolderKanban className="size-5 shrink-0" aria-hidden />
        Current Ongoing Projects
      </h2>
      <Empty className="border bg-card py-12 md:py-16">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderKanban />
          </EmptyMedia>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>No projects to display yet. Create or add a project to start monitoring your project status and financial progress.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <p className="text-sm text-muted-foreground">Projects you create will appear here.</p>
        </EmptyContent>
      </Empty>
    </section>
  )
}

export function OngoingProjectsSectionSkeleton() {
  return (
    <section className="flex flex-col gap-4">
      <Skeleton className="h-7 w-64" />
      <div className="rounded-xl border bg-card p-12">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="size-10 rounded-lg" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    </section>
  )
}
