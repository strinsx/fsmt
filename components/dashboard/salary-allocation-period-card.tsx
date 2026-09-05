import { Hourglass } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export function SalaryAllocationPeriodCard({
  total = "12 months",
  remaining = "11 months remaining",
  totalDuration = "overall allocation duration",
  className,
}: {
  total?: string
  remaining?: string
  totalDuration?: string
  className?: string
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 text-sm font-normal leading-tight tracking-tight text-muted-foreground">
          <Hourglass className="size-3.5 shrink-0 opacity-70" />
          Salary Allocation Period
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold leading-tight tracking-tight">{total}</p>
          <p className="text-xs leading-relaxed text-muted-foreground">{totalDuration}</p>
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium leading-tight">{remaining}</p>
          <Progress value={91.6} />
          <p className="text-xs text-muted-foreground">11 of 12 months remaining — 8% elapsed</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function SalaryAllocationPeriodCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <Skeleton className="h-4 w-40" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-px w-full" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-1.5 w-full rounded-full" />
      </CardContent>
    </Card>
  )
}
