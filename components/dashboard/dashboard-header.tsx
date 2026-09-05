export function DashboardHeader({
  title = "Welcome back",
  description = "Here's what's happening with your projects today.",
}: {
  title?: string
  description?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
