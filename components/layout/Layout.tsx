import DashboardHeader from "../header/DashboardHeader";
import DashboardSidebar from "../sidebar/DashboardSidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
      {/* Fixed header */}
      <div className="flex-shrink-0">
        <DashboardHeader />
      </div>

      {/* Scrollable content area */}
      <div className="flex min-h-0 flex-1">
        {/* Scrollable sidebar */}
        <aside className="h-full w-64 flex-shrink-0 overflow-y-auto border-r border-gray-200">
          <DashboardSidebar />
        </aside>

        {/* Scrollable main content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
