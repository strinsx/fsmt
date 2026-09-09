"use client"

import { Download, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"
import { CreateProjectDialog, type CreatedProject } from "@/components/dashboard/create-project-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ProjectHeaderProps = {
  onCreateProject: (project: CreatedProject) => void
}

export function ProjectHeader({ onCreateProject }: ProjectHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">List of Projects</h2>
        <p className="text-sm text-muted-foreground">View, organize, and manage all your freelance projects.</p>
      </div>
      <div className="flex items-center gap-2">
        <CreateProjectDialog onCreate={onCreateProject} />
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="icon" aria-label="More project actions">
                <MoreHorizontal />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast.info("Project export is being prepared for a future update.")}>
              <Download />
              Export projects
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
