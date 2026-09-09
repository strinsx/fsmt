"use client"

import * as React from "react"
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ExternalLink, FolderKanban, MoreHorizontal, RotateCcw, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export type Project = {
  id: string
  name: string
  category: string
  source: string
  date: string
  amount: number
  status: "active" | "pending" | "completed"
  accent: "primary" | "chart-2" | "chart-3" | "chart-4" | "chart-5"
}

type ProjectStatusProps = {
  projects: Project[]
  totalProjects: number
  onClearFilters: () => void
  onDeleteProject?: (id: string) => Promise<void> | void
  onUpdateProject?: (id: string, data: Partial<Project>) => Promise<void> | void
}

const accentClasses: Record<Project["accent"], string> = {
  primary: "bg-primary/10 text-primary",
  "chart-2": "bg-chart-2/10 text-chart-2",
  "chart-3": "bg-chart-3/10 text-chart-3",
  "chart-4": "bg-chart-4/10 text-chart-4",
  "chart-5": "bg-chart-5/10 text-chart-5",
}

const statusClasses: Record<Project["status"], string> = {
  active: "border-primary/20 bg-primary/10 text-primary",
  pending: "border-chart-3/20 bg-chart-3/10 text-chart-3",
  completed: "border-chart-2/20 bg-chart-2/10 text-chart-2",
}

const statusLabels: Record<Project["status"], string> = {
  active: "Active",
  pending: "Pending",
  completed: "Completed",
}

const currencyFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
})

function getMutationError(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback
}

function ProjectActions({ project, onDelete, onUpdate }: { project: Project; onDelete?: (id: string) => Promise<void> | void; onUpdate?: (id: string, data: Partial<Project>) => Promise<void> | void }) {
  const isMobile = useIsMobile()
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [viewOpen, setViewOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState(false)
  const [editName, setEditName] = React.useState(project.name)
  const [editClient, setEditClient] = React.useState(project.source)
  const [editAmount, setEditAmount] = React.useState(String(project.amount))
  const [editStatus, setEditStatus] = React.useState<Project["status"]>(project.status)
  const [isMutating, setIsMutating] = React.useState(false)

  function resetEditFields() {
    setEditName(project.name)
    setEditClient(project.source)
    setEditAmount(String(project.amount))
    setEditStatus(project.status)
  }

  function handleViewOpenChange(open: boolean) {
    setViewOpen(open)
    if (open) resetEditFields()
    if (!open) setEditOpen(false)
  }

  function handleEditOpenChange(open: boolean) {
    setEditOpen(open)
    if (open) resetEditFields()
  }

  async function handleSave() {
    const trimmedName = editName.trim()
    const trimmedClient = editClient.trim()
    const parsedAmount = Number(editAmount)
    if (!trimmedName) {
      toast.error("Project name is required")
      return
    }
    if (!trimmedClient) {
      toast.error("Client is required")
      return
    }
    if (Number.isNaN(parsedAmount) || parsedAmount < 0) {
      toast.error("Project value is invalid")
      return
    }
    setIsMutating(true)
    try {
      await onUpdate?.(project.id, { name: trimmedName, source: trimmedClient, amount: parsedAmount, status: editStatus })
      toast.success(`"${trimmedName}" updated`)
      setEditOpen(false)
    } catch (error) {
      toast.error(getMutationError(error, "Failed to update project"))
    } finally {
      setIsMutating(false)
    }
  }

  async function handleStatusUpdate(status: Project["status"], successMessage: string) {
    setIsMutating(true)
    try {
      await onUpdate?.(project.id, { status })
      toast.success(successMessage)
      setViewOpen(false)
    } catch (error) {
      toast.error(getMutationError(error, "Failed to update project status"))
    } finally {
      setIsMutating(false)
    }
  }

  async function handleDelete() {
    setIsMutating(true)
    try {
      await onDelete?.(project.id)
      toast.success(`"${project.name}" deleted`)
      setDeleteOpen(false)
    } catch (error) {
      toast.error(getMutationError(error, "Failed to delete project"))
    } finally {
      setIsMutating(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${project.name}`}>
              <MoreHorizontal />
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="w-40 min-w-40">
          <DropdownMenuItem onClick={() => setViewOpen(true)}>
            <ExternalLink />
            View project
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={() => setDeleteOpen(true)}>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Drawer open={viewOpen} onOpenChange={handleViewOpenChange} showSwipeHandle={isMobile} swipeDirection={isMobile ? "down" : "right"}>
        <DrawerContent>
          <DrawerHeader>
            <div className="text-left">
              <DrawerTitle>{project.name}</DrawerTitle>
              <DrawerDescription>{project.id}</DrawerDescription>
            </div>
          </DrawerHeader>
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
            <div className="grid gap-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Project</span>
                <span className="text-sm font-medium">{project.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ID</span>
                <span className="text-sm font-mono">{project.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Category</span>
                <span className="text-sm">{project.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Client</span>
                <span className="text-sm"><SourceIdentity source={project.source} /></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Project value</span>
                <span className="text-sm font-medium tabular-nums">{currencyFormatter.format(project.amount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Date created</span>
                <span className="text-sm">{project.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="outline" className={statusClasses[project.status]}>
                  <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                  {statusLabels[project.status]}
                </Badge>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <div className="flex w-full flex-col gap-2">
              {project.status === "active" ? (
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" disabled={isMutating} onClick={() => void handleStatusUpdate("pending", `"${project.name}" marked as pending`)}>Mark as pending</Button>
                  <Button className="flex-1" disabled={isMutating} onClick={() => void handleStatusUpdate("completed", `"${project.name}" marked as completed`)}>Mark as completed</Button>
                </div>
              ) : null}
              {project.status === "pending" ? (
                <Button disabled={isMutating} onClick={() => void handleStatusUpdate("completed", `"${project.name}" marked as completed`)}>Mark as complete</Button>
              ) : null}
              {project.status === "completed" ? (
                <Button onClick={() => { setViewOpen(false); toast.info(`Transactions for "${project.name}" are coming soon.`) }}>View transactions</Button>
              ) : null}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => handleEditOpenChange(true)}>Edit</Button>
                <DrawerClose render={<Button variant="outline" className="flex-1">Close</Button>} />
              </div>
            </div>
          </DrawerFooter>
          <Drawer open={editOpen} onOpenChange={handleEditOpenChange} showSwipeHandle={isMobile} swipeDirection={isMobile ? "down" : "right"}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Edit project</DrawerTitle>
                <DrawerDescription>Update the details for {project.name}</DrawerDescription>
              </DrawerHeader>
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
                <div className="grid gap-2">
                  <Label htmlFor={`edit-name-${project.id}-nested`}>Project name</Label>
                  <Input id={`edit-name-${project.id}-nested`} value={editName} onChange={(e) => setEditName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`edit-client-${project.id}-nested`}>Client</Label>
                  <Input id={`edit-client-${project.id}-nested`} value={editClient} onChange={(e) => setEditClient(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`edit-value-${project.id}-nested`}>Project value</Label>
                  <Input id={`edit-value-${project.id}-nested`} type="number" min="0" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select value={editStatus} onValueChange={(v) => setEditStatus(v as Project["status"])}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DrawerFooter>
                <div className="flex w-full gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setEditOpen(false)}>Cancel</Button>
                  <Button className="flex-1" disabled={isMutating} onClick={() => void handleSave()}>Save changes</Button>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </DrawerContent>
      </Drawer>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete &quot;{project.name}&quot; file? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isMutating}
              onClick={() => void handleDelete()}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

function ProjectIdentity({ project, selected, onSelectedChange }: { project: Project; selected?: boolean; onSelectedChange?: (checked: boolean) => void }) {
  return (
    <div className="flex items-center gap-3 min-w-56">
      {onSelectedChange ? <Checkbox checked={selected} onCheckedChange={(v) => onSelectedChange(v === true)} aria-label={`Select ${project.name}`} /> : null}
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">{project.name}</p>
        <p className="truncate text-xs text-muted-foreground">{project.id}</p>
      </div>
    </div>
  )
}

function SourceIdentity({ source }: { source: string }) {
  const initials = source
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)

  return (
    <div className="flex items-center gap-2.5">
      <Avatar size="sm">
        <AvatarFallback className="bg-secondary font-medium text-secondary-foreground">{initials}</AvatarFallback>
      </Avatar>
      <span className="text-muted-foreground">{source}</span>
    </div>
  )
}

export function ProjectStatus({ projects, totalProjects, onClearFilters, onDeleteProject, onUpdateProject }: ProjectStatusProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [bulkOpen, setBulkOpen] = React.useState(false)
  const [page, setPage] = React.useState(1)

  const pageSize = 8

  const columns = React.useMemo<ColumnDef<Project>[]>(() => [
    {
      id: "select",
      header: ({ table }) => {
        const rows = table.getPaginationRowModel().rows
        const ids = rows.map((r) => (r.original as Project).id)
        const all = ids.length > 0 && ids.every((id) => selectedIds.has(id))
        return (
          <Checkbox
            checked={all}
            onCheckedChange={(v) => {
              const checked = v === true
              setSelectedIds((prev) => {
                const next = new Set(prev)
                ids.forEach((id) => { if (checked) next.add(id); else next.delete(id) })
                return next
              })
            }}
            aria-label="Select all"
          />
        )
      },
      cell: ({ row }) => {
        const id = (row.original as Project).id
        return <Checkbox checked={selectedIds.has(id)} onCheckedChange={(v) => setSelectedIds((prev) => { const n = new Set(prev); if (v === true) n.add(id); else n.delete(id); return n })} aria-label={`Select ${id}`} />
      },
      enableSorting: false,
      size: 32,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button variant="ghost" size="sm" className="h-8 gap-2 px-2 -ml-2" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Project
          <ArrowUpDown className="size-3.5 opacity-50" />
        </Button>
      ),
      cell: ({ row }) => {
        const project: Project = row.original
        return <ProjectIdentity project={project} />
      },
      sortingFn: (a, b) => a.original.name.localeCompare(b.original.name),
    },
    {
      accessorKey: "source",
      header: ({ column }) => (
        <Button variant="ghost" size="sm" className="h-8 px-2 -ml-2" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Source
          <ArrowUpDown className="ml-2 size-3.5 opacity-50" />
        </Button>
      ),
      cell: ({ row }) => <SourceIdentity source={row.original.source} />,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <Button variant="ghost" size="sm" className="h-8 px-2 -ml-2" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Project value
          <ArrowUpDown className="ml-2 size-3.5 opacity-50" />
        </Button>
      ),
      cell: ({ row }) => <span className="font-medium tabular-nums">{currencyFormatter.format(row.original.amount)}</span>,
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button variant="ghost" size="sm" className="h-8 px-2 -ml-2" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date created
          <ArrowUpDown className="ml-2 size-3.5 opacity-50" />
        </Button>
      ),
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.date}</span>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button variant="ghost" size="sm" className="h-8 px-2 -ml-2" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown className="ml-2 size-3.5 opacity-50" />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge variant="outline" className={statusClasses[row.original.status]}>
          <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
          {statusLabels[row.original.status]}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => <ProjectActions project={row.original} onDelete={onDeleteProject} onUpdate={onUpdateProject} />,
      enableSorting: false,
    },
   ], [selectedIds, onDeleteProject, onUpdateProject])

  const table = useReactTable({
    data: projects,
    columns,
    state: { sorting, pagination: { pageIndex: page - 1, pageSize: pageSize } },
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? (updater as (old: { pageIndex: number; pageSize: number }) => { pageIndex: number; pageSize: number })({ pageIndex: page - 1, pageSize }) : updater
      setPage(next.pageIndex + 1)
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const pageCount = table.getPageCount() || 1

  React.useEffect(() => {
    setPage(1)
  }, [projects])

  React.useEffect(() => {
    setSelectedIds((prev) => {
      const valid = new Set(projects.map((p) => p.id))
      const next = new Set<string>()
      prev.forEach((id) => { if (valid.has(id)) next.add(id) })
      return next
    })
  }, [projects])

  if (projects.length === 0) {
    const hasProjects = totalProjects > 0
    return (
      <Card className="min-h-[360px] justify-center border-transparent bg-transparent py-0 shadow-none ring-0 md:min-h-[440px]">
        <Empty className="py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderKanban />
            </EmptyMedia>
            <EmptyTitle>{hasProjects ? "No matching projects" : "No projects yet"}</EmptyTitle>
            <EmptyDescription>
              {hasProjects
                ? "Try a different search or clear the current filters."
                : "Create your first project to start monitoring its status and financial progress."}
            </EmptyDescription>
          </EmptyHeader>
          {hasProjects ? (
            <EmptyContent>
              <Button variant="outline" onClick={onClearFilters}>
                <RotateCcw />
                Clear filters
              </Button>
            </EmptyContent>
          ) : null}
        </Empty>
      </Card>
    )
  }

  const rows = table.getPaginationRowModel().rows
  const totalPages = table.getPageCount()
  const pagination = table.getState().pagination
  const firstShown = pagination.pageIndex * pagination.pageSize + 1
  const lastShown = Math.min(firstShown + rows.length - 1, projects.length)

  async function handleBulkDelete() {
    const ids = Array.from(selectedIds)
    try {
      await Promise.all(ids.map((id) => onDeleteProject?.(id)))
      toast.success(`${ids.length} project${ids.length > 1 ? "s" : ""} deleted`)
      setSelectedIds(new Set())
      setBulkOpen(false)
    } catch (error) {
      toast.error(getMutationError(error, "Failed to delete selected projects"))
    }
  }

  return (
    <Card className="gap-0 overflow-hidden border-transparent bg-transparent py-0 shadow-none ring-0">
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            {selectedIds.size > 0 ? (
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead colSpan={table.getAllColumns().length} className="h-12 px-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-foreground">{selectedIds.size} selected</span>
                      <Button variant="ghost" size="sm" className="h-7" onClick={() => setSelectedIds(new Set())}>Clear</Button>
                    </div>
                    <Button variant="destructive" size="sm" className="h-7" onClick={() => setBulkOpen(true)}>
                      <Trash2 />
                      Delete
                    </Button>
                  </div>
                </TableHead>
              </TableRow>
            ) : (
              table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="bg-transparent hover:bg-transparent">
                  {hg.headers.map((header) => (
                    <TableHead key={header.id} className="h-12 px-4 text-xs text-muted-foreground first:pl-5">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))
            )}
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <ContextMenu key={row.id}>
                <ContextMenuTrigger className="contents">
                  <TableRow className="h-[72px] align-middle">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-3 align-middle first:pl-5">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onClick={() => toast.info(`"${row.original.name}" details are ready for the data integration phase.`)}>
                    <ExternalLink /> View project
                  </ContextMenuItem>
                  <ContextMenuItem variant="destructive" onClick={() => void Promise.resolve(onDeleteProject?.(row.original.id)).then(() => toast.success(`"${row.original.name}" deleted`)).catch((error) => toast.error(getMutationError(error, "Failed to delete project")))}>
                    <Trash2 /> Delete
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="divide-y md:hidden">
        {selectedIds.size > 0 ? (
          <div className="flex items-center justify-between bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{selectedIds.size} selected</span>
              <Button variant="ghost" size="sm" className="h-7" onClick={() => setSelectedIds(new Set())}>Clear</Button>
            </div>
            <Button variant="destructive" size="sm" className="h-7" onClick={() => setBulkOpen(true)}>
              <Trash2 />
              Delete
            </Button>
          </div>
        ) : null}
        {rows.map((row) => {
          const project = row.original
          return (
            <ContextMenu key={row.id}>
              <ContextMenuTrigger className="contents">
                <article className="flex flex-col gap-4 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <ProjectIdentity project={project} selected={selectedIds.has(project.id)} onSelectedChange={(c) => setSelectedIds((prev) => { const n = new Set(prev); if (c) n.add(project.id); else n.delete(project.id); return n })} />
                    <ProjectActions project={project} onDelete={onDeleteProject} onUpdate={onUpdateProject} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Source</p>
                      <div className="mt-1"><SourceIdentity source={project.source} /></div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Project value</p>
                      <p className="mt-1 font-medium tabular-nums">{currencyFormatter.format(project.amount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Date created</p>
                      <p className="mt-1">{project.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <Badge variant="outline" className={`mt-1 ${statusClasses[project.status]}`}>
                        <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                        {statusLabels[project.status]}
                      </Badge>
                    </div>
                  </div>
                </article>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onClick={() => toast.info(`"${project.name}" details are ready for the data integration phase.`)}>
                  <ExternalLink /> View project
                </ContextMenuItem>
                <ContextMenuItem variant="destructive" onClick={() => void Promise.resolve(onDeleteProject?.(project.id)).then(() => toast.success(`"${project.name}" deleted`)).catch((error) => toast.error(getMutationError(error, "Failed to delete project")))}>
                  <Trash2 /> Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          )
        })}
      </div>

      <AlertDialog open={bulkOpen} onOpenChange={setBulkOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete {selectedIds.size} selected project{selectedIds.size > 1 ? "s" : ""} file{selectedIds.size > 1 ? "s" : ""}? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setBulkOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => void handleBulkDelete()}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{firstShown}–{lastShown}</span> of {projects.length} projects
        </p>
        <Pagination className="mx-0 w-auto justify-start sm:justify-end">
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                size="sm"
                text=""
                aria-label="Go to previous project page"
                aria-disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-50" : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  setPage((c) => Math.max(1, c - 1))
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  size="icon-sm"
                  isActive={page === i + 1}
                  onClick={(event) => {
                    event.preventDefault()
                    setPage(i + 1)
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                size="sm"
                text=""
                aria-label="Go to next project page"
                aria-disabled={page === totalPages}
                className={page === totalPages ? "pointer-events-none opacity-50" : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  setPage((c) => Math.min(totalPages, c + 1))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Card>
  )
}
