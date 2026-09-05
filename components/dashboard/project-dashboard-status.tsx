import { FolderKanban, MoreHorizontal, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreateProjectDialog } from "@/components/dashboard/create-project-dialog"

type Project = {
  id: string
  name: string
  source: string
  date: string
  amount: string
  status: "active" | "pending" | "completed"
}

const mockProjects: Project[] = [
  { id: "PRJ-001", name: "E-commerce Website", source: "Upwork", date: "2026-08-12", amount: "₱85,000.00", status: "active" },
  { id: "PRJ-002", name: "Brand Identity Design", source: "Direct Client", date: "2026-07-28", amount: "₱42,500.00", status: "pending" },
  { id: "PRJ-003", name: "Mobile App MVP", source: "Toptal", date: "2026-08-01", amount: "₱120,000.00", status: "active" },
  { id: "PRJ-004", name: "Landing Page Revamp", source: "Fiverr", date: "2026-06-15", amount: "₱18,000.00", status: "completed" },
  { id: "PRJ-005", name: "SaaS Dashboard", source: "Direct Client", date: "2026-08-20", amount: "₱65,000.00", status: "pending" },
]

type ProjectDashboardStatusProps = {
  projects?: Project[]
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const variant = status === "active" ? "default" : status === "pending" ? "secondary" : "outline"
  const label = status.charAt(0).toUpperCase() + status.slice(1)
  return <Badge variant={variant}>{label}</Badge>
}

export function ProjectDashboardStatus({ projects }: ProjectDashboardStatusProps) {
  const filteredProjects = (projects && projects.length > 0 ? projects : mockProjects).filter((p) => p.status === "active" || p.status === "pending")
  const displayProjects = filteredProjects

  if (displayProjects.length === 0) {
    return (
      <div className="flex flex-1 flex-col rounded-xl bg-transparent md:min-h-[320px]">
        <Empty className="flex flex-1 flex-col justify-center border-0 py-16 md:py-24">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderKanban />
            </EmptyMedia>
            <EmptyTitle>Project Dashboard Status</EmptyTitle>
            <EmptyDescription>No projects to display yet.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <EmptyDescription>Create or add a project to start monitoring your project status and financial progress.</EmptyDescription>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <CreateProjectDialog />
              <Button variant="outline">Import Project</Button>
            </div>
          </EmptyContent>
        </Empty>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-hidden rounded-xl bg-transparent">
      <h3 className="text-sm font-semibold tracking-tight">Current ongoing projects</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="[&_tr]:border-0">
            <TableRow className="border-0 hover:bg-transparent">
              <TableHead className="px-4 py-3 text-muted-foreground md:px-6 md:py-4">Project ID</TableHead>
              <TableHead className="px-4 py-3 text-muted-foreground md:px-6 md:py-4">Project Name</TableHead>
              <TableHead className="px-4 py-3 text-muted-foreground md:px-6 md:py-4">Source</TableHead>
              <TableHead className="px-4 py-3 text-muted-foreground md:px-6 md:py-4">Date</TableHead>
              <TableHead className="px-4 py-3 text-muted-foreground md:px-6 md:py-4">Amount</TableHead>
              <TableHead className="px-4 py-3 text-muted-foreground md:px-6 md:py-4">Status</TableHead>
              <TableHead className="w-10 px-4 py-3 md:px-6 md:py-4">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayProjects.map((project) => (
              <TableRow key={project.id} className="border-0">
                <TableCell className="px-4 py-4 font-mono text-xs font-medium md:px-6 md:py-5">{project.id}</TableCell>
                <TableCell className="px-4 py-4 font-medium md:px-6 md:py-5">{project.name}</TableCell>
                <TableCell className="px-4 py-4 text-foreground md:px-6 md:py-5">{project.source}</TableCell>
                <TableCell className="px-4 py-4 text-muted-foreground md:px-6 md:py-5">{project.date}</TableCell>
                <TableCell className="px-4 py-4 font-medium md:px-6 md:py-5">{project.amount}</TableCell>
                <TableCell className="px-4 py-4 md:px-6 md:py-5">
                  <StatusBadge status={project.status} />
                </TableCell>
                <TableCell className="px-4 py-4 md:px-6 md:py-5">
                  <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${project.name}`}>
                    <MoreHorizontal />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export function ProjectDashboardStatusSkeleton() {
  return (
    <div className="rounded-xl bg-transparent p-12">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-muted size-10 rounded-lg" />
        <div className="bg-muted h-5 w-48 rounded-md" />
        <div className="bg-muted h-4 w-40 rounded-md" />
        <div className="bg-muted h-3 w-64 rounded-md" />
      </div>
    </div>
  )
}
