"use client"

import * as React from "react"
import Link from "next/link"
import { FolderKanban, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Project = {
  id: string
  name: string
  amount: string
  status: "active" | "pending" | "completed"
  date: string
}

const mockProjects: Project[] = [
  { id: "PRJ-001", name: "E-commerce Website", amount: "₱85,000.00", status: "active", date: "2026-08-12" },
  { id: "PRJ-002", name: "Brand Identity Design", amount: "₱42,500.00", status: "pending", date: "2026-07-28" },
  { id: "PRJ-003", name: "Mobile App MVP", amount: "₱120,000.00", status: "active", date: "2026-08-01" },
  { id: "PRJ-004", name: "Landing Page Revamp", amount: "₱18,000.00", status: "completed", date: "2026-06-15" },
  { id: "PRJ-005", name: "SaaS Dashboard", amount: "₱65,000.00", status: "active", date: "2026-08-20" },
  { id: "PRJ-006", name: "SEO Optimization", amount: "₱30,000.00", status: "pending", date: "2026-07-10" },
  { id: "PRJ-007", name: "Portfolio Website", amount: "₱25,000.00", status: "completed", date: "2026-08-05" },
  { id: "PRJ-008", name: "CRM Integration", amount: "₱95,000.00", status: "active", date: "2026-07-19" },
  { id: "PRJ-009", name: "Analytics Dashboard", amount: "₱78,000.00", status: "pending", date: "2026-07-30" },
  { id: "PRJ-010", name: "Mobile App Redesign", amount: "₱55,000.00", status: "active", date: "2026-08-05" },
]

type OngoingProjectsSectionProps = {
  projects?: Project[]
}

export function OngoingProjectsSection({ projects }: OngoingProjectsSectionProps) {
  const displayProjects = projects && projects.length > 0 ? projects : mockProjects
  const hasProjects = displayProjects.length > 0

  if (hasProjects) {
    return (
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold tracking-tight">Current Ongoing Projects</h3>
        <div className="overflow-hidden rounded-xl border-0 bg-transparent">
          <Table>
            <TableHeader>
              <TableRow className="bg-transparent hover:bg-transparent">
                <TableHead>Project name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayProjects.slice(0, 5).map((p) => (
                <TableRow key={p.id} className="bg-transparent">
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="font-medium">{p.amount}</TableCell>
                  <TableCell>
                    <Badge variant={p.status === "active" ? "default" : p.status === "pending" ? "secondary" : "outline"} className="capitalize">
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{p.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Link href="/projects" className="self-start text-sm font-medium text-primary hover:underline">
          View all
        </Link>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-base font-semibold tracking-tight sm:text-lg">Current Ongoing Projects</h2>
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
          <Button>
            <Plus />
            Create project
          </Button>
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
