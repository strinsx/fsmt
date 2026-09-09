import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type ProjectStatusFilter = "all" | "active" | "pending" | "completed"

type ProjectFiltersProps = {
  counts: Record<ProjectStatusFilter, number>
  query: string
  source: string
  status: ProjectStatusFilter
  onQueryChange: (value: string) => void
  onSourceChange: (value: string) => void
  onStatusChange: (value: ProjectStatusFilter) => void
}

const statuses: { label: string; value: ProjectStatusFilter }[] = [
  { label: "All projects", value: "all" },
  { label: "Active", value: "active" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
]

const filterActiveClasses: Record<ProjectStatusFilter, string> = {
  all: "border-white/20 bg-white/15 text-white hover:bg-white/20 hover:text-white",
  active: "border-primary/20 bg-primary/10 text-primary hover:bg-primary/15",
  pending: "border-chart-3/20 bg-chart-3/10 text-chart-3 hover:bg-chart-3/15",
  completed: "border-chart-2/20 bg-chart-2/10 text-chart-2 hover:bg-chart-2/15",
}

const filterInactiveClasses: Record<ProjectStatusFilter, string> = {
  all: "border-transparent text-white hover:bg-white/10 hover:text-white",
  active: "border-transparent text-primary hover:bg-primary/10",
  pending: "border-transparent text-chart-3 hover:bg-chart-3/10",
  completed: "border-transparent text-chart-2 hover:bg-chart-2/10",
}

const filterDotClasses: Record<ProjectStatusFilter, string> = {
  all: "bg-current",
  active: "bg-primary",
  pending: "bg-chart-3",
  completed: "bg-chart-2",
}

export function ProjectFilters({
  counts,
  query,
  source,
  status,
  onQueryChange,
  onSourceChange,
  onStatusChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col gap-4 border-b pb-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex gap-1 overflow-x-auto pb-1" aria-label="Filter projects by status">
        {statuses.map((item) => {
          const isActive = status === item.value
          return (
            <Button
              key={item.value}
              type="button"
              variant="outline"
              size="sm"
              className={`shrink-0 rounded-full border px-3 ${isActive ? filterActiveClasses[item.value] : filterInactiveClasses[item.value]}`}
              aria-pressed={isActive}
              onClick={() => onStatusChange(item.value)}
            >
              <span className={`size-1.5 rounded-full ${filterDotClasses[item.value]}`} aria-hidden="true" />
              {item.label}
              <span className={`text-xs ${isActive ? "opacity-80" : "opacity-70"}`}>{counts[item.value]}</span>
            </Button>
          )
        })}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search projects..."
            aria-label="Search projects"
            className="pl-9"
          />
        </div>
        <Select value={source} onValueChange={(value) => onSourceChange(value ?? "all")}>
          <SelectTrigger aria-label="Filter projects by source" className="w-full sm:w-40">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="upwork">Upwork</SelectItem>
            <SelectItem value="direct">Direct Client</SelectItem>
            <SelectItem value="toptal">Toptal</SelectItem>
            <SelectItem value="fiverr">Fiverr</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
