export function WelcomeBanner({ name = "Alex" }: { name?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Welcome back, {name}</h2>
      <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s happening with your projects today.</p>
    </div>
  )
}
