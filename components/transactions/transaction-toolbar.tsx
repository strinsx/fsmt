"use client"

import { CalendarDays, FolderKanban, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type TransactionLinkFilter = "all" | "linked" | "unassigned"
export type TransactionDateFilter = "all" | "month" | "year"

type ProjectFilterOption = {
  id: string
  name: string
}

type TransactionToolbarProps = {
  query: string
  linkFilter: TransactionLinkFilter
  dateFilter: TransactionDateFilter
  projectId: string
  projects: ProjectFilterOption[]
  filteredCount: number
  totalCount: number
  onQueryChange: (value: string) => void
  onLinkFilterChange: (value: TransactionLinkFilter) => void
  onDateFilterChange: (value: TransactionDateFilter) => void
  onProjectChange: (value: string) => void
}

const linkFilters: { label: string; value: TransactionLinkFilter }[] = [
  { label: "All", value: "all" },
  { label: "Linked projects", value: "linked" },
  { label: "Unassigned", value: "unassigned" },
]

export function TransactionToolbar({
  query,
  linkFilter,
  dateFilter,
  projectId,
  projects,
  filteredCount,
  totalCount,
  onQueryChange,
  onLinkFilterChange,
  onDateFilterChange,
  onProjectChange,
}: TransactionToolbarProps) {
  return (
    <div className="border-b">
      <div className="flex gap-6 overflow-x-auto" aria-label="Filter transactions by project relationship">
        {linkFilters.map((filter) => {
          const isActive = linkFilter === filter.value
          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => onLinkFilterChange(filter.value)}
              className={`relative shrink-0 px-0.5 pb-3 text-sm font-medium transition-colors ${isActive ? "text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Select value={dateFilter} onValueChange={(value) => onDateFilterChange((value ?? "all") as TransactionDateFilter)}>
            <SelectTrigger aria-label="Filter transactions by date" className="w-full sm:w-40">
              <CalendarDays />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All dates</SelectItem>
              <SelectItem value="month">This month</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={projectId} onValueChange={(value) => onProjectChange(value ?? "all")}>
            <SelectTrigger aria-label="Filter transactions by project" className="w-full sm:w-52">
              <FolderKanban />
              <SelectValue placeholder="All projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All projects</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            aria-label="Search transactions"
            placeholder="Search transactions..."
            className="pl-9"
          />
        </div>
      </div>

      <p className="pb-3 text-xs text-muted-foreground">
        Showing {filteredCount} of {totalCount} transactions
      </p>
    </div>
  )
}
