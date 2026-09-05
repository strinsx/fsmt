"use client"

import * as React from "react"
import { TransactionHeader } from "@/components/transactions/transaction-header"
import { TransactionPagination } from "@/components/transactions/transaction-pagination"
import { TransactionTable, type Transaction } from "@/components/transactions/transaction-table"
import { TransactionToolbar } from "@/components/transactions/transaction-toolbar"

const mockTransactions: Transaction[] = [
  { id: "1", name: "Client Payment — Acme Corp", dateCreated: "2026-08-20", type: "Income", amount: 85000 },
  { id: "2", name: "Office Rent", dateCreated: "2026-08-18", type: "Expense", amount: -25000 },
  { id: "3", name: "Freelance Project — SaaS Dashboard", dateCreated: "2026-08-15", type: "Income", amount: 65000 },
  { id: "4", name: "Software Subscription", dateCreated: "2026-08-12", type: "Expense", amount: -1200 },
  { id: "5", name: "Brand Identity Project", dateCreated: "2026-08-10", type: "Income", amount: 42500 },
  { id: "6", name: "Internet Bill", dateCreated: "2026-08-08", type: "Expense", amount: -2500 },
  { id: "7", name: "E-commerce Website Build", dateCreated: "2026-08-05", type: "Income", amount: 120000 },
  { id: "8", name: "Coworking Membership", dateCreated: "2026-08-02", type: "Expense", amount: -8000 },
  { id: "9", name: "Mobile App MVP Milestone", dateCreated: "2026-07-30", type: "Income", amount: 40000 },
  { id: "10", name: "Equipment Purchase", dateCreated: "2026-07-28", type: "Expense", amount: -35000 },
  { id: "11", name: "Consulting Retainer", dateCreated: "2026-07-22", type: "Income", amount: 30000 },
  { id: "12", name: "Marketing Campaign", dateCreated: "2026-07-18", type: "Expense", amount: -15000 },
]

const ITEMS_PER_PAGE = 15

type TransactionsPageProps = {
  transactions?: Transaction[]
}

export function TransactionsPage({ transactions = mockTransactions }: TransactionsPageProps) {
  const [page, setPage] = React.useState(1)
  const total = transactions.length
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE))
  const paginated = transactions.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  const shown = paginated.length

  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  return (
    <div className="flex flex-1 flex-col p-6 md:p-8 lg:p-10">
      <TransactionHeader />
      <div className="mt-8 flex flex-col gap-4">
        <TransactionToolbar />
        <TransactionTable transactions={paginated} />
        <TransactionPagination shown={shown} total={total} page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  )
}
