export default function OfflinePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-semibold">You are offline</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        FSMT is not available right now. Check your connection and try again.
      </p>
    </main>
  );
}
