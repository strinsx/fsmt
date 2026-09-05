import { Skeleton } from "@/components/ui/skeleton"

export function DashboardHeader({
  title = "Welcome back",
  description = "Here's what's happening with your projects today.",
}: {
  title?: string
  description?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export function DashboardHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton className="h-7 w-40 sm:h-8 sm:w-48" />
      <Skeleton className="h-4 w-64 sm:w-80" />
    </div>
  )
}
