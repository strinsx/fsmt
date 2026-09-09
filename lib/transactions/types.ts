export const incomeTransactionStatuses = ["pending", "cleared", "cancelled"] as const

export type IncomeTransactionStatus = (typeof incomeTransactionStatuses)[number]

export type IncomeTransaction = {
  id: string
  projectId: string | null
  name: string
  createdAt: string
  receivedAt: string
  type: "Income"
  amount: number
  status: IncomeTransactionStatus
  description: string | null
}
