"use client"

import { Wallet } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

const chartData = [
  { month: "January", income: 32000 },
  { month: "February", income: 41000 },
  { month: "March", income: 38000 },
  { month: "April", income: 55000 },
  { month: "May", income: 48000 },
  { month: "June", income: 62000 },
]

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function IncomePoolCard({
  amount = "₱100,000.00",
  description = "Project money currently allocated",
  className,
}: {
  amount?: string
  description?: string
  className?: string
}) {
  return (
    <Card className={["border-0 bg-transparent p-4 shadow-none md:p-6", className].filter(Boolean).join(" ")}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="flex items-center gap-1.5 text-sm font-normal leading-tight tracking-tight text-muted-foreground">
          <Wallet className="size-3.5 shrink-0 opacity-70" />
          Income Pool
        </CardTitle>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs">
            3 months
          </Button>
          <Button variant="secondary" size="sm" className="h-7 px-2.5 text-xs">
            6 months
          </Button>
          <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs">
            12 months
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 sm:flex-row sm:justify-between">
        <div className="flex flex-1 flex-col gap-3">
          <p className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{amount}</p>
          <p className="text-sm leading-tight text-muted-foreground">{description}</p>
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">Covers about 4 months at ₱25,000/mo — 55% allocated, 30% available from 3 active income sources.</p>
        </div>
        <div className="flex w-full max-w-[320px] shrink-0 flex-col sm:w-[52%]">
          <ChartContainer config={chartConfig} className="h-[140px] w-full">
            <LineChart accessibilityLayer data={chartData} margin={{ left: 8, right: 12, top: 4 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} width={40} tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`} domain={[0, 70000]} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel formatter={(value) => `₱${Number(value).toLocaleString()}`} />} />
              <Line dataKey="income" type="natural" stroke="var(--color-income)" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function IncomePoolCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={["border-0 bg-transparent p-4 shadow-none md:p-6", className].filter(Boolean).join(" ")}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
        <Skeleton className="h-4 w-24" />
        <div className="flex gap-1.5">
          <Skeleton className="h-7 w-20 rounded-md" />
          <Skeleton className="h-7 w-20 rounded-md" />
          <Skeleton className="h-7 w-20 rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 sm:flex-row sm:justify-between">
        <div className="flex flex-1 flex-col gap-3">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-3 w-64" />
        </div>
        <Skeleton className="h-[140px] w-full max-w-[320px] rounded-lg" />
      </CardContent>
    </Card>
  )
}
