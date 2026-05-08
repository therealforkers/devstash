
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Main</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 rounded-xl bg-card border border-border shadow-sm p-4">
            <div className="h-4 w-1/2 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
