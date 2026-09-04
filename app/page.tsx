import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { CurrentAllocatedPeriodCard } from "@/components/dashboard/current-allocated-period-card"
import { CurrentSalaryCard } from "@/components/dashboard/current-salary-card"
import { DashboardFilters } from "@/components/dashboard/dashboard-filters"
import { IncomePoolCard } from "@/components/dashboard/income-pool-card"
import { NextPayoutCard } from "@/components/dashboard/next-payout-card"
import { ProjectDashboardStatus } from "@/components/dashboard/project-dashboard-status"

export default function Page() {
  return (
    <>
      <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 md:h-14">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-sm font-medium">Dashboard</h1>
      </header>
      <div className="flex flex-1 flex-col p-6 md:p-8 lg:p-10">
        <div className="flex flex-1 flex-col gap-8 rounded-xl p-8 md:min-h-0 md:gap-10 md:p-10 lg:p-12">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <IncomePoolCard />
            <CurrentSalaryCard />
            <NextPayoutCard />
            <CurrentAllocatedPeriodCard />
          </div>
          <DashboardFilters />
          <div className="flex flex-1 flex-col min-h-[320px] md:min-h-0">
            <ProjectDashboardStatus />
          </div>
        </div>
      </div>
    </>
  )
}
