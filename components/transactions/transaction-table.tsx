"use client"

import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useIsMobile } from "@/hooks/use-mobile"
import type { IncomeTransaction } from "@/lib/transactions/types"

export type Transaction = IncomeTransaction

type TransactionTableProps = {
  transactions: Transaction[]
}

const currencyFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
})

const dateFormatter = new Intl.DateTimeFormat("en-PH", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Manila",
})

const statusClasses: Record<IncomeTransaction["status"], string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
  cleared: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
  cancelled: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
}

function TransactionDrawer({ transaction }: { transaction: Transaction }) {
  const isMobile = useIsMobile()

  return (
    <Drawer showSwipeHandle={isMobile} swipeDirection={isMobile ? "down" : "right"}>
      <DrawerTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label={`View transaction ${transaction.id}`}>
            <MoreHorizontal />
          </Button>
        }
      />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Transaction details</DrawerTitle>
          <DrawerDescription>Details for the selected income transaction.</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-4">
          <div className="grid gap-5 rounded-lg border p-4">
            <div className="grid gap-1">
              <span className="text-xs text-muted-foreground">Transaction ID</span>
              <span className="break-all font-mono text-sm">{transaction.id}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-xs text-muted-foreground">Date Created</span>
              <span className="text-sm font-medium">{dateFormatter.format(new Date(transaction.createdAt))}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-xs text-muted-foreground">Transaction Type</span>
              <span className="text-sm font-medium">{transaction.type}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-xs text-muted-foreground">Transaction Name</span>
              <span className="text-sm font-medium">{transaction.name}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-xs text-muted-foreground">Status</span>
              <span><Badge variant="outline" className={statusClasses[transaction.status]}>{transaction.status}</Badge></span>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline">Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead>Transaction ID</TableHead>
            <TableHead>Transaction Name</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-16 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                No transactions match the current filters.
              </TableCell>
            </TableRow>
          ) : transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="max-w-44 truncate font-mono text-xs text-muted-foreground" title={transaction.id}>{transaction.id}</TableCell>
              <TableCell className="font-medium">{transaction.name}</TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">{dateFormatter.format(new Date(transaction.createdAt))}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell className="text-right font-medium text-primary">+{currencyFormatter.format(transaction.amount)}</TableCell>
              <TableCell><Badge variant="outline" className={`capitalize ${statusClasses[transaction.status]}`}>{transaction.status}</Badge></TableCell>
              <TableCell className="text-right"><TransactionDrawer transaction={transaction} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
