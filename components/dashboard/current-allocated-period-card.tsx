import { Hourglass } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CurrentAllocatedPeriodCard({
  value = "12 months",
  description = "11 months remaining",
}: {
  value?: string
  description?: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 text-sm font-normal leading-tight tracking-tight text-muted-foreground">
          <Hourglass className="size-3.5 shrink-0 opacity-70" />
          Current Allocated Time Period
        </CardTitle>
      </CardHeader>
      <CardContent className="gap-1">
        <p className="text-2xl font-semibold leading-tight tracking-tight">{value}</p>
        <p className="text-sm leading-tight text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export function CurrentAllocatedPeriodCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  )
}
