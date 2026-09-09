import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { TransactionsPage } from "@/components/transactions/transactions-page"
import { createClient } from "@/lib/supabase/server"
import type { IncomeTransaction } from "@/lib/transactions/types"

type IncomeTransactionRow = {
  id: string
  project_id: string | null
  amount: number
  received_at: string
  created_at: string
  status: string | null
  description: string | null
  project: { name: string } | { name: string }[] | null
}

export default async function Page() {
  const supabase = await createClient()
  let data: unknown[] | null = null
  let error: unknown = null
  const trySelect = async (cols: string) =>
    supabase.from("income_transactions").select(cols).order("created_at", { ascending: false })
  const primary = await trySelect("id,project_id,amount,received_at,created_at,status,description,project:projects(name)")
  data = primary.data as unknown[] | null
  error = primary.error
  if (primary.error) {
    const msg = String((primary.error as { message?: string })?.message ?? "")
    const code = String((primary.error as { code?: string })?.code ?? "")
    const isMissingCol = code === "42703" || /column/i.test(msg) || /does not exist/i.test(msg)
    if (isMissingCol) {
      const attempts = [
        "id,project_id,amount,received_at,created_at,status,project:projects(name)",
        "id,project_id,amount,received_at,created_at,description,project:projects(name)",
        "id,project_id,amount,received_at,created_at,project:projects(name)",
      ]
      for (const cols of attempts) {
        const res = await trySelect(cols)
        if (!res.error) {
          data = res.data as unknown[] | null
          error = null
          break
        }
        error = res.error
      }
    }
  }

  if (error) {
    console.error("Unable to load transactions", error)
    data = []
  }

  const transactions: IncomeTransaction[] = ((data ?? []) as unknown as IncomeTransactionRow[]).map((row) => {
    const project = Array.isArray((row as IncomeTransactionRow).project) ? (row as unknown as { project: { name: string }[] | null }).project?.[0] : (row as IncomeTransactionRow).project as { name: string } | null

    return {
      id: (row as IncomeTransactionRow).id,
      projectId: (row as IncomeTransactionRow).project_id,
      name: (project as { name: string } | null)?.name ?? "Unassigned income",
      createdAt: (row as IncomeTransactionRow).created_at,
      receivedAt: (row as IncomeTransactionRow).received_at,
      type: "Income",
      amount: Number((row as IncomeTransactionRow).amount),
      status: ((row as IncomeTransactionRow).status as IncomeTransaction["status"]) ?? "pending",
      description: (row as IncomeTransactionRow).description ?? null,
    }
  })

  return (
    <>
      <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 md:h-14">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-sm font-medium">Transactions</h1>
      </header>
      <TransactionsPage transactions={transactions} />
    </>
  )
}
