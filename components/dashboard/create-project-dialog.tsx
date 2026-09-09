"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import type { ProjectStatus } from "@/lib/projects/types"

export type CreatedProject = {
  name: string
  client: string
  amount: number
  status: ProjectStatus
}

type CreateProjectDialogProps = {
  onCreate?: (project: CreatedProject) => Promise<void> | void
}

export function CreateProjectDialog({ onCreate }: CreateProjectDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const [client, setClient] = React.useState("")
  const [amount, setAmount] = React.useState("")
  const [status, setStatus] = React.useState<ProjectStatus>("pending")
  const [isCreating, setIsCreating] = React.useState(false)

  async function handleCreate() {
    const trimmed = name.trim()
    if (!trimmed) {
      toast.error("Project name is required")
      return
    }
    const trimmedClient = client.trim()
    if (!trimmedClient) {
      toast.error("Client is required")
      return
    }
    const parsedAmount = Number(amount)
    if (!amount || Number.isNaN(parsedAmount) || parsedAmount < 0) {
      toast.error("Project value is required")
      return
    }
    if (!status) {
      toast.error("Status is required")
      return
    }
    setIsCreating(true)
    const promise = Promise.resolve(
      onCreate?.({ name: trimmed, client: trimmedClient, amount: parsedAmount, status })
    )

    toast.promise(promise, {
      loading: `Creating "${trimmed}"...`,
      success: `Successfully created "${trimmed}"`,
      error: (error) => error instanceof Error ? error.message : "Failed to create project",
    })

    try {
      await promise
      setOpen(false)
      setName("")
      setClient("")
      setAmount("")
      setStatus("pending")
    } catch {
      // toast.promise reports the persisted mutation error.
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <Plus />
            Create project
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>Add a new project to monitor its status and financial progress.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="project-name">Project name</Label>
            <Input id="project-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Website Redesign" disabled={isCreating} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project-client">Client</Label>
            <Input id="project-client" value={client} onChange={(e) => setClient(e.target.value)} placeholder="e.g., Acme Inc." disabled={isCreating} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project-value">Project value</Label>
            <Input id="project-value" type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 50000" disabled={isCreating} />
          </div>
          <div className="grid gap-2">
            <Label>Status</Label>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { value: "active", label: "Active", activeClass: "border-primary/20 bg-primary/10 text-primary", inactiveClass: "border-border bg-transparent text-muted-foreground hover:bg-muted" },
                { value: "pending", label: "Pending", activeClass: "border-chart-3/20 bg-chart-3/10 text-chart-3", inactiveClass: "border-border bg-transparent text-muted-foreground hover:bg-muted" },
                { value: "completed", label: "Completed", activeClass: "border-chart-2/20 bg-chart-2/10 text-chart-2", inactiveClass: "border-border bg-transparent text-muted-foreground hover:bg-muted" },
              ].map((item) => (
                <Badge
                  key={item.value}
                  variant="outline"
                  aria-pressed={status === item.value}
                  onClick={() => !isCreating && setStatus(item.value as ProjectStatus)}
                  className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors select-none ${status === item.value ? item.activeClass : item.inactiveClass}`}
                >
                  <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                  {item.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose disabled={isCreating} render={<Button variant="outline">Cancel</Button>} />
          <Button onClick={handleCreate} disabled={isCreating}>
            {isCreating ? (
              <>
                <Spinner />
                Creating...
              </>
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
