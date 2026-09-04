import { MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProjectHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-xl font-semibold tracking-tight leading-relaxed sm:text-2xl md:text-3xl">List of Projects</h2>
      <div className="flex items-center gap-2">
        <Button>
          <Plus />
          Create Project
        </Button>
        <Button variant="outline" size="icon" aria-label="More project actions">
          <MoreHorizontal />
        </Button>
      </div>
    </div>
  )
}
