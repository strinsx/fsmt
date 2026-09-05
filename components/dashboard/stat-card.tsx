import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export type StatCardProps = {
  label: string
  description?: string
  value: string
  hint?: string
  valueSuffix?: string
  icon?: LucideIcon
  className?: string
}

export function StatCard({ label, description, value, hint, valueSuffix, icon: Icon, className }: StatCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 text-sm font-normal leading-tight tracking-tight text-muted-foreground">
          {Icon ? <Icon className="size-3.5 shrink-0 opacity-70" /> : null}
          <span>
            {label}
            {description ? <span className="font-normal"> {description}</span> : null}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="gap-1.5">
        <p className="text-2xl font-semibold leading-tight tracking-tight">
          {value}
          {valueSuffix ? <span className="text-sm font-normal text-muted-foreground">{valueSuffix}</span> : null}
        </p>
        {hint ? <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p> : null}
      </CardContent>
    </Card>
  )
}

export function StatCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <Skeleton className="h-4 w-32" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-28" />
      </CardContent>
    </Card>
  )
}
