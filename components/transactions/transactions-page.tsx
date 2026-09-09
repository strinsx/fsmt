"use client"

import * as React from "react"
import { TransactionHeader } from "@/components/transactions/transaction-header"
import { TransactionPagination } from "@/components/transactions/transaction-pagination"
import { TransactionTable } from "@/components/transactions/transaction-table"
import {
  TransactionToolbar,
  type TransactionDateFilter,
  type TransactionLinkFilter,
} from "@/components/transactions/transaction-toolbar"
import type { IncomeTransaction } from "@/lib/transactions/types"

const ITEMS_PER_PAGE = 15

type TransactionsPageProps = {
  transactions: IncomeTransaction[]
}

export function TransactionsPage({ transactions }: TransactionsPageProps) {
  const [page, setPage] = React.useState(1)
  const [query, setQuery] = React.useState("")
  const [linkFilter, setLinkFilter] = React.useState<TransactionLinkFilter>("all")
  const [dateFilter, setDateFilter] = React.useState<TransactionDateFilter>("all")
  const [projectId, setProjectId] = React.useState("all")

  const projects = React.useMemo(() => {
    const uniqueProjects = new Map<string, string>()
    transactions.forEach((transaction) => {
      if (transaction.projectId) uniqueProjects.set(transaction.projectId, transaction.name)
    })
    return Array.from(uniqueProjects, ([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name))
  }, [transactions])

  const filteredTransactions = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const now = new Date()

    return transactions.filter((transaction) => {
      const isLinked = transaction.projectId !== null
      const matchesLink = linkFilter === "all" || (linkFilter === "linked" ? isLinked : !isLinked)
      const matchesProject = projectId === "all" || transaction.projectId === projectId
      const createdAt = new Date(transaction.createdAt)
      const matchesDate = dateFilter === "all"
        || (dateFilter === "month" && createdAt.getFullYear() === now.getFullYear() && createdAt.getMonth() === now.getMonth())
        || (dateFilter === "year" && createdAt.getFullYear() === now.getFullYear())
      const matchesQuery = !normalizedQuery
        || transaction.id.toLowerCase().includes(normalizedQuery)
        || transaction.name.toLowerCase().includes(normalizedQuery)

      return matchesLink && matchesProject && matchesDate && matchesQuery
    })
  }, [dateFilter, linkFilter, projectId, query, transactions])

  const total = filteredTransactions.length
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filteredTransactions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  function updateFilter(update: () => void) {
    setPage(1)
    update()
  }

  return (
    <div className="flex flex-1 flex-col p-6 md:p-8 lg:p-10">
      <TransactionHeader />
      <div className="mt-8 flex flex-col gap-4">
        <TransactionToolbar
          query={query}
          linkFilter={linkFilter}
          dateFilter={dateFilter}
          projectId={projectId}
          projects={projects}
          filteredCount={filteredTransactions.length}
          totalCount={transactions.length}
          onQueryChange={(value) => updateFilter(() => setQuery(value))}
          onLinkFilterChange={(value) => updateFilter(() => {
            setLinkFilter(value)
            if (value === "unassigned") setProjectId("all")
          })}
          onDateFilterChange={(value) => updateFilter(() => setDateFilter(value))}
          onProjectChange={(value) => updateFilter(() => setProjectId(value))}
        />
        <TransactionTable transactions={paginated} />
        <TransactionPagination shown={paginated.length} total={total} page={currentPage} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  )
}
