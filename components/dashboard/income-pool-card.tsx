"use client"

import { Wallet } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
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
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
        <CardTitle className="flex items-center gap-1.5 text-sm font-normal leading-tight tracking-tight text-muted-foreground">
          <Wallet className="size-3.5 shrink-0 opacity-70" />
          Income Pool
        </CardTitle>
        <div className="flex flex-col items-end gap-1">
          <p className="text-xs font-medium tracking-tight">Pool history</p>
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
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 sm:flex-row sm:justify-between">
        <div className="flex flex-1 flex-col gap-3">
          <p className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{amount}</p>
          <p className="text-sm leading-tight text-muted-foreground">{description}</p>
          <Separator />
          <div className="grid grid-cols-3 overflow-hidden rounded-md border text-xs">
            <div className="flex flex-col gap-0.5 border-r p-2.5">
              <span className="font-semibold leading-none">4 months</span>
              <span className="text-[11px] leading-none text-muted-foreground">coverage</span>
            </div>
            <div className="flex flex-col gap-0.5 border-r p-2.5">
              <span className="font-semibold leading-none">55%</span>
              <span className="text-[11px] leading-none text-muted-foreground">allocated</span>
            </div>
            <div className="flex flex-col gap-0.5 p-2.5">
              <span className="font-semibold leading-none">30%</span>
              <span className="text-[11px] leading-none text-muted-foreground">available</span>
            </div>
          </div>
          <div className="rounded-md border p-2.5 text-left text-xs">
            <span className="font-semibold">3</span> <span className="text-muted-foreground">active income sources</span>
          </div>
        </div>
        <div className="flex w-full max-w-[420px] shrink-0 flex-col gap-2 sm:w-[60%]">
          <ChartContainer config={chartConfig} className="h-[190px] w-full">
            <LineChart accessibilityLayer data={chartData} margin={{ left: 4, right: 8, top: 4, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={6} tickFormatter={(value) => value.slice(0, 3)} />
              <YAxis tickLine={false} axisLine={false} tickMargin={6} width={36} tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`} domain={[0, 70000]} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel formatter={(value) => `₱${Number(value).toLocaleString()}`} />} />
              <Line dataKey="income" type="natural" stroke="var(--color-income)" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ChartContainer>
          <a href="/transactions" className="self-end text-xs font-medium text-primary underline-offset-4 hover:underline active:text-primary/80">
            View Transaction History
          </a>
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
          <Skeleton className="h-px w-full" />
          <div className="grid grid-cols-3 overflow-hidden rounded-md border">
            <Skeleton className="h-[52px] rounded-none border-r" />
            <Skeleton className="h-[52px] rounded-none border-r" />
            <Skeleton className="h-[52px] rounded-none" />
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="h-[190px] w-full max-w-[420px] rounded-lg" />
      </CardContent>
    </Card>
  )
}
