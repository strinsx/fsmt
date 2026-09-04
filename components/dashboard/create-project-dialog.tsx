"use client"

import * as React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"

export function CreateProjectDialog() {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [priority, setPriority] = React.useState("medium")
  const [status, setStatus] = React.useState("not-started")
  const [isCreating, setIsCreating] = React.useState(false)

  async function handleCreate() {
    const trimmed = name.trim()
    if (!trimmed) {
      toast.error("Project name is required")
      return
    }
    setIsCreating(true)
    const promise = new Promise<{ status: number; name: string }>((resolve) => {
      setTimeout(() => resolve({ status: 201, name: trimmed }), 1200)
    })

    toast.promise(promise, {
      loading: `Creating "${trimmed}"...`,
      success: (data) => `successfully created "${data.name}"`,
      error: "Failed to create project",
    })

    try {
      const result = await promise
      if (result.status === 201) {
        setOpen(false)
        setName("")
        setDescription("")
        setPriority("medium")
        setStatus("not-started")
      }
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button>Create Project</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>Add a new project to monitor its status and financial progress.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="project-name">Project name</Label>
            <Input id="project-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Website Redesign" disabled={isCreating} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project-description">Project description</Label>
            <Textarea id="project-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the project..." rows={3} disabled={isCreating} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v ?? "medium")}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v ?? "not-started")}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started">Not started</SelectItem>
                  <SelectItem value="in-progress">In progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
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
