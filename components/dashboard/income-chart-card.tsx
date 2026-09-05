"use client"

import { ChartPie } from "lucide-react"
import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

const chartData = [
  { project: "E-commerce Website", amount: 85000, fill: "var(--color-ecommerce)" },
  { project: "SaaS Dashboard", amount: 65000, fill: "var(--color-saas)" },
  { project: "Brand Identity", amount: 42500, fill: "var(--color-brand)" },
  { project: "Landing Revamp", amount: 18000, fill: "var(--color-landing)" },
]

const chartConfig = {
  ecommerce: { label: "E-commerce Website", color: "var(--chart-1)" },
  saas: { label: "SaaS Dashboard", color: "var(--chart-2)" },
  brand: { label: "Brand Identity", color: "var(--chart-3)" },
  landing: { label: "Landing Revamp", color: "var(--chart-4)" },
  amount: { label: "Amount" },
}

export function IncomeChartCard({ className }: { className?: string }) {
  return (
    <Card size="sm" className={className}>
      <CardHeader className="gap-1">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <ChartPie className="size-4 shrink-0" />
          Allocation overview
        </CardTitle>
        <p className="text-xs text-muted-foreground">income breakdown</p>
      </CardHeader>
      <CardContent className="flex flex-row items-center gap-3">
        <ChartContainer config={chartConfig} className="aspect-square max-h-[140px] w-[140px] shrink-0">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="amount" nameKey="project" innerRadius={38} outerRadius={62} strokeWidth={2} />
          </PieChart>
        </ChartContainer>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-1.5">
            <span className="flex items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="size-2 shrink-0 rounded-sm bg-[var(--chart-1)]" aria-hidden />
                E-commerce Website
              </span>
              <span className="font-medium tabular-nums">₱85,000</span>
            </span>
            <span className="flex items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="size-2 shrink-0 rounded-sm bg-[var(--chart-2)]" aria-hidden />
                SaaS Dashboard
              </span>
              <span className="font-medium tabular-nums">₱65,000</span>
            </span>
            <span className="flex items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="size-2 shrink-0 rounded-sm bg-[var(--chart-3)]" aria-hidden />
                Brand Identity
              </span>
              <span className="font-medium tabular-nums">₱42,500</span>
            </span>
            <span className="flex items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="size-2 shrink-0 rounded-sm bg-[var(--chart-4)]" aria-hidden />
                Landing Revamp
              </span>
              <span className="font-medium tabular-nums">₱18,000</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function IncomeChartCardSkeleton({ className }: { className?: string }) {
  return (
    <Card size="sm" className={className}>
      <CardHeader>
        <Skeleton className="h-4 w-28" />
      </CardHeader>
      <CardContent className="flex flex-row items-center gap-3">
        <Skeleton className="size-[140px] shrink-0 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-5/6" />
        </div>
      </CardContent>
    </Card>
  )
}
