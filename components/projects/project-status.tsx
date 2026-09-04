"use client"

import * as React from "react"
import { FolderKanban, MoreHorizontal, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
  { id: "PRJ-006", name: "SEO Optimization", source: "Upwork", date: "2026-07-10", amount: "₱30,000.00", status: "completed" },
  { id: "PRJ-007", name: "Portfolio Website", source: "Direct Client", date: "2026-08-05", amount: "₱25,000.00", status: "active" },
  { id: "PRJ-008", name: "CRM Integration", source: "Upwork", date: "2026-07-19", amount: "₱95,000.00", status: "active" },
  { id: "PRJ-009", name: "Social Media Campaign", source: "Fiverr", date: "2026-06-22", amount: "₱15,000.00", status: "completed" },
  { id: "PRJ-010", name: "Booking System", source: "Toptal", date: "2026-08-14", amount: "₱110,000.00", status: "pending" },
  { id: "PRJ-011", name: "Analytics Dashboard", source: "Direct Client", date: "2026-07-30", amount: "₱78,000.00", status: "active" },
  { id: "PRJ-012", name: "Payment Gateway", source: "Upwork", date: "2026-06-08", amount: "₱52,000.00", status: "completed" },
  { id: "PRJ-013", name: "Fitness App UI", source: "Fiverr", date: "2026-08-18", amount: "₱38,000.00", status: "pending" },
  { id: "PRJ-014", name: "Real Estate Portal", source: "Direct Client", date: "2026-07-05", amount: "₱140,000.00", status: "active" },
  { id: "PRJ-015", name: "Chatbot Development", source: "Toptal", date: "2026-06-30", amount: "₱62,000.00", status: "completed" },
]

type ProjectStatusProps = {
  projects?: Project[]
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const variant = status === "active" ? "default" : status === "pending" ? "secondary" : "outline"
  const label = status.charAt(0).toUpperCase() + status.slice(1)
  return <Badge variant={variant} className="h-5 px-1.5 text-[10px]">{label}</Badge>
}

const ITEMS_PER_PAGE = 10

export function ProjectStatus({ projects }: ProjectStatusProps) {
  const [page, setPage] = React.useState(1)
  const displayProjects = projects && projects.length > 0 ? projects : mockProjects
  const totalPages = Math.max(1, Math.ceil(displayProjects.length / ITEMS_PER_PAGE))
  const paginatedProjects = displayProjects.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  if (displayProjects.length === 0) {
    return (
      <div className="flex min-h-[320px] flex-1 flex-col rounded-xl bg-transparent md:min-h-[420px]">
        <Empty className="flex flex-1 flex-col justify-center border-0 py-16 md:py-20">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderKanban />
            </EmptyMedia>
            <EmptyTitle>No Projects Yet</EmptyTitle>
            <EmptyDescription>Create your first project to start monitoring your project status and financial progress.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>
              <Plus />
              Create Project
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-xl bg-transparent">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="[&_tr]:border-0">
            <TableRow className="border-0 hover:bg-transparent">
              <TableHead className="px-2.5 py-2 text-xs font-medium text-muted-foreground">Project ID</TableHead>
              <TableHead className="px-2.5 py-2 text-xs font-medium text-muted-foreground">Project Name</TableHead>
              <TableHead className="px-2.5 py-2 text-xs font-medium text-muted-foreground">Source</TableHead>
              <TableHead className="px-2.5 py-2 text-xs font-medium text-muted-foreground">Date</TableHead>
              <TableHead className="px-2.5 py-2 text-xs font-medium text-muted-foreground">Amount</TableHead>
              <TableHead className="px-2.5 py-2 text-xs font-medium text-muted-foreground">Status</TableHead>
              <TableHead className="w-8 px-2.5 py-2">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProjects.map((project) => (
              <TableRow key={project.id} className="border-0 h-9">
                <TableCell className="px-2.5 py-2 font-mono text-xs font-medium">{project.id}</TableCell>
                <TableCell className="px-2.5 py-2 text-xs font-medium">{project.name}</TableCell>
                <TableCell className="px-2.5 py-2 text-xs text-foreground">{project.source}</TableCell>
                <TableCell className="px-2.5 py-2 text-xs text-muted-foreground">{project.date}</TableCell>
                <TableCell className="px-2.5 py-2 text-xs font-medium">{project.amount}</TableCell>
                <TableCell className="px-2.5 py-2">
                  <StatusBadge status={project.status} />
                </TableCell>
                <TableCell className="px-2.5 py-2">
                  <Button variant="ghost" size="icon-xs" aria-label={`Actions for ${project.name}`}>
                    <MoreHorizontal />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination className="mt-2 justify-end">
        <PaginationContent className="gap-1">
          <PaginationItem>
            <PaginationPrevious href="#" size="sm" text="" onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)) }} aria-disabled={page === 1} className={page === 1 ? "pointer-events-none opacity-50 h-7 px-2 text-xs" : "h-7 px-2 text-xs"} />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink href="#" size="icon-sm" isActive={page === i + 1} onClick={(e) => { e.preventDefault(); setPage(i + 1) }} className="h-7 w-7 text-xs">
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" size="sm" text="" onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(totalPages, p + 1)) }} aria-disabled={page === totalPages} className={page === totalPages ? "pointer-events-none opacity-50 h-7 px-2 text-xs" : "h-7 px-2 text-xs"} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
