import DashboardHeader from "../header/DashboardHeader";
import DashboardSidebar from "../sidebar/DashboardSidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Fixed header */}
      <div className="flex-shrink-0">
        <DashboardHeader />
      </div>
      
      {/* Scrollable content area */}
      <div className="flex flex-1 min-h-0">
        {/* Scrollable sidebar */}
        <aside className="w-64 flex-shrink-0 border-r border-gray-200 h-full overflow-y-auto">
            <DashboardSidebar />
        </aside>
        
        {/* Scrollable main content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}