import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentCollections } from "@/components/dashboard/recent-collections";
import { PinnedItems } from "@/components/dashboard/pinned-items";
import { RecentItems } from "@/components/dashboard/recent-items";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <StatsCards />

      <RecentCollections />

      <div className="grid gap-8 xl:grid-cols-2">
        <div className="space-y-8">
          <PinnedItems />
        </div>
        <div>
          <RecentItems />
        </div>
      </div>
    </div>
  );
}
