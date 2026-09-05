import { MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProjectHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight leading-relaxed sm:text-2xl md:text-3xl">List of Projects</h2>
        <p className="text-sm text-muted-foreground">View and manage all your projects</p>
      </div>
      <div className="flex items-center gap-1.5">
        <Button size="sm">
          <Plus />
          Create Project
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="More project actions">
          <MoreHorizontal />
        </Button>
      </div>
    </div>
  )
}
