import { Banknote } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CurrentSalaryCard({ amount = "₱25,000.00" }: { amount?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 text-sm font-normal leading-tight tracking-tight text-muted-foreground">
          <Banknote className="size-3.5 shrink-0 opacity-70" />
          Current Salary Per Month
        </CardTitle>
      </CardHeader>
      <CardContent className="gap-1">
        <p className="text-2xl font-semibold leading-tight tracking-tight">{amount}</p>
        <p className="text-sm leading-tight text-muted-foreground">Your current monthly salary allocation</p>
      </CardContent>
    </Card>
  )
}

export function CurrentSalaryCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-44" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-3 w-52" />
      </CardContent>
    </Card>
  )
}
