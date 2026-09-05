"use client"

import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProjectFilters() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-sm">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search projects..." className="h-8 pl-8 text-xs" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Select>
          <SelectTrigger size="sm" className="w-full text-xs sm:w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger size="sm" className="w-full text-xs sm:w-[130px]">
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
        <Button size="sm" className="h-8">
          <Plus />
          Add project
        </Button>
      </div>
    </div>
  )
}
