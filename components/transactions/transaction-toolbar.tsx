"use client"

import * as React from "react"
import { MoreHorizontal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TransactionToolbar() {
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null)

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input aria-label="Search transactions" placeholder="Search transactions..." className="pl-8" />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant={activeFilter === "month" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setActiveFilter((prev) => (prev === "month" ? null : "month"))}
        >
          This Month
        </Button>
        <Button
          variant={activeFilter === "week" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setActiveFilter((prev) => (prev === "week" ? null : "week"))}
        >
          This Week
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="More transaction actions">
          <MoreHorizontal />
        </Button>
      </div>
    </div>
  )
}
