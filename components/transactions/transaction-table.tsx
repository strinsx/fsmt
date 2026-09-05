import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export type Transaction = {
  id: string
  name: string
  dateCreated: string
  type: string
  amount: number
}

type TransactionTableProps = {
  transactions: Transaction[]
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg">
      <Table>
        <TableHeader className="[&_tr]:border-0">
          <TableRow className="border-0 hover:bg-transparent">
            <TableHead>Transaction ID</TableHead>
            <TableHead>Transaction Name</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="border-b">
              <TableCell className="font-mono text-xs text-muted-foreground">{transaction.id}</TableCell>
              <TableCell className="font-medium">{transaction.name}</TableCell>
              <TableCell className="text-muted-foreground">{transaction.dateCreated}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell className={`text-right font-medium ${transaction.amount >= 0 ? "text-primary" : "text-destructive"}`}>
                {transaction.amount >= 0 ? "+" : "-"}₱{Math.abs(transaction.amount).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
