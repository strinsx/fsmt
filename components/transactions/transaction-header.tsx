import { FileDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TransactionHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight leading-relaxed sm:text-2xl md:text-3xl">Transactions</h2>
        <p className="text-sm text-muted-foreground">View and manage all your transactions</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <FileDown />
          Export Transactions
        </Button>
        <Button size="sm">
          <Plus />
          Transactions
        </Button>
      </div>
    </div>
  )
}
