import { CalendarClock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function NextPayoutCard({
  date = "September 15, 2026",
  remaining = "11 days remaining",
}: {
  date?: string
  remaining?: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 text-sm font-normal leading-tight tracking-tight text-muted-foreground">
          <CalendarClock className="size-3.5 shrink-0 opacity-70" />
          Next Payout Scheduled
        </CardTitle>
      </CardHeader>
      <CardContent className="gap-1">
        <p className="text-2xl font-semibold leading-tight tracking-tight">{date}</p>
        <p className="text-sm leading-tight text-muted-foreground">{remaining}</p>
      </CardContent>
    </Card>
  )
}

export function NextPayoutCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-40" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-36" />
        <Skeleton className="h-3 w-28" />
      </CardContent>
    </Card>
  )
}
