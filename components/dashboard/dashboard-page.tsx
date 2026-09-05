import { CalendarClock, Wallet } from "lucide-react"
import { DashboardHeader, DashboardHeaderSkeleton } from "@/components/dashboard/dashboard-header"
import { IncomeChartCard, IncomeChartCardSkeleton } from "@/components/dashboard/income-chart-card"
import { IncomePoolCard, IncomePoolCardSkeleton } from "@/components/dashboard/income-pool-card"
import { OngoingProjectsSection, OngoingProjectsSectionSkeleton } from "@/components/dashboard/ongoing-projects-section"
import { RecentTransactionCard, RecentTransactionCardSkeleton } from "@/components/dashboard/recent-transaction-card"
import { SalaryAllocationPeriodCard, SalaryAllocationPeriodCardSkeleton } from "@/components/dashboard/salary-allocation-period-card"
import { Separator } from "@/components/ui/separator"
import { StatCard, StatCardSkeleton } from "@/components/dashboard/stat-card"

type DashboardPageProps = {
  incomePool?: string
  monthlySalary?: string
  nextPayoutDate?: string
  nextPayoutRemaining?: string
  projects?: { id: string; name: string; amount: string; status: "active" | "pending" | "completed"; date: string }[]
}

export function DashboardPage({
  incomePool = "₱100,000.00",
  monthlySalary = "₱25,000.00",
  nextPayoutDate = "September 15, 2026",
  projects,
}: DashboardPageProps) {
  return (
    <div className="flex flex-1 flex-col p-6 md:p-8 lg:p-10">
      <div className="flex flex-col gap-6">
        <DashboardHeader />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <IncomePoolCard amount={incomePool} className="flex flex-col justify-center lg:col-span-2" />
          <div className="flex flex-col gap-4">
            <StatCard label="Current Salary" value={monthlySalary} valueSuffix=" / per month" hint="Pool: 100,000 | runway 4 months." icon={Wallet} className="flex-1" />
            <StatCard label="Next Payout" description="Scheduled" value={nextPayoutDate} hint="11 days remaining — auto-transfer on schedule." icon={CalendarClock} className="flex-1" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-20">
          <IncomeChartCard className="lg:col-span-7" />
          <SalaryAllocationPeriodCard className="flex flex-col justify-center lg:col-span-13" />
        </div>

        <Separator />

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Activity</h2>
            <p className="text-sm text-muted-foreground">Your latest activity across projects and transactions</p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
            <div className="lg:col-span-2">
              <OngoingProjectsSection projects={projects} />
            </div>
            <div className="flex h-full flex-col">
              <RecentTransactionCard />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export function DashboardPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col p-6 md:p-8 lg:p-10">
      <div className="flex flex-col gap-6">
        <DashboardHeaderSkeleton />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <IncomePoolCardSkeleton className="flex flex-col justify-center lg:col-span-2" />
          <div className="flex flex-col gap-4">
            <StatCardSkeleton className="flex-1" />
            <StatCardSkeleton className="flex-1" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-20">
          <IncomeChartCardSkeleton className="lg:col-span-7" />
          <SalaryAllocationPeriodCardSkeleton className="flex flex-col justify-center lg:col-span-13" />
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="h-7 w-32 rounded bg-muted" />
            <div className="h-4 w-64 rounded bg-muted" />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <OngoingProjectsSectionSkeleton />
            </div>
            <RecentTransactionCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  )
}
