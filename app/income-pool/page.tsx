import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"

export default function Page() {
  return (
    <>
      <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 md:h-14">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-sm font-medium">Income Pool</h1>
      </header>
      <div className="flex flex-1 flex-col p-4">
        <Card className="flex flex-1 items-center justify-center p-8">
          <CardContent className="text-center">
            <p className="text-sm font-medium">Income Pool placeholder</p>
            <p className="text-xs text-muted-foreground">Available income and transactions will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
