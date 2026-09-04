import { Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function IncomePoolCard({ amount = "₱100,000.00" }: { amount?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 text-sm font-normal leading-tight tracking-tight text-muted-foreground">
          <Wallet className="size-3.5 shrink-0 opacity-70" />
          Income Pool
        </CardTitle>
      </CardHeader>
      <CardContent className="gap-1">
        <p className="text-2xl font-semibold leading-tight tracking-tight">{amount}</p>
        <p className="text-sm leading-tight text-muted-foreground">Project money currently allocated</p>
      </CardContent>
    </Card>
  )
}

export function IncomePoolCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-3 w-40" />
      </CardContent>
    </Card>
  )
}
