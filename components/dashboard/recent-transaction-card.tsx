import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Transaction = {
  id: string
  label: string
  amount: string
  type: "in" | "out"
}

const mockTransactions: Transaction[] = [
  { id: "1", label: "Salary", amount: "₱25,000.00", type: "out" },
  { id: "2", label: "E-commerce Website", amount: "₱65,000.00", type: "in" },
  { id: "3", label: "Brand Identity Design", amount: "₱42,500.00", type: "in" },
  { id: "4", label: "Office Rent", amount: "₱15,000.00", type: "out" },
  { id: "5", label: "Mobile App MVP", amount: "₱120,000.00", type: "in" },
]

export function RecentTransactionCard() {
  return (
    <section className="flex h-full flex-col gap-3">
      <h3 className="text-sm font-semibold tracking-tight">Recent Transaction</h3>
      <div className="overflow-hidden rounded-xl border-0 bg-transparent">
        <Table>
          <TableHeader>
            <TableRow className="bg-transparent hover:bg-transparent">
              <TableHead>Transaction</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.slice(0, 5).map((t) => (
              <TableRow key={t.id} className="bg-transparent">
                <TableCell className="font-medium">{t.label}</TableCell>
                <TableCell className={`text-right font-semibold ${t.type === "in" ? "text-green-600" : "text-red-600"}`}>
                  {t.type === "in" ? "+" : "-"} {t.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Link href="/transactions" className="self-start text-sm font-medium text-primary hover:underline">
        View all
      </Link>
    </section>
  )
}

export function RecentTransactionCardSkeleton() {
  return <div className="h-[180px] rounded-xl border bg-card" />
}
