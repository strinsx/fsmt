import { CalendarClock, Wallet } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { IncomeChartCard } from "@/components/dashboard/income-chart-card"
import { IncomePoolCard } from "@/components/dashboard/income-pool-card"
import { SalaryAllocationPeriodCard } from "@/components/dashboard/salary-allocation-period-card"
import { StatCard } from "@/components/dashboard/stat-card"

type DashboardPageProps = {
  incomePool?: string
  monthlySalary?: string
  nextPayoutDate?: string
  nextPayoutRemaining?: string
}

export function DashboardPage({
  incomePool = "₱100,000.00",
  monthlySalary = "₱25,000.00",
  nextPayoutDate = "September 15, 2026",
}: DashboardPageProps) {
  return (
    <div className="flex flex-1 flex-col p-6 md:p-8 lg:p-10">
      <div className="flex flex-col gap-6">
        <DashboardHeader />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <IncomePoolCard amount={incomePool} className="flex flex-col justify-center lg:col-span-2" />
          <div className="flex flex-col gap-4">
            <StatCard label="Current Salary" value={monthlySalary} valueSuffix=" / per month" hint="Pool: 100,000 | runway 4 months." icon={Wallet} className="flex-1" />
            <p className="px-1 text-center text-xs leading-relaxed text-muted-foreground">Salary recalculates after each payout.</p>
            <StatCard label="Next Payout" description="Scheduled" value={nextPayoutDate} hint="11 days remaining — auto-transfer on schedule." icon={CalendarClock} className="flex-1" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-20">
          <IncomeChartCard className="lg:col-span-7" />
          <SalaryAllocationPeriodCard className="flex flex-col justify-center lg:col-span-13" />
        </div>
      </div>
    </div>
  )
}
