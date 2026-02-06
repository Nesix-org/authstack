import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { Menu } from "lucide-react";
import { AppSidebar } from "./dashboard-sidebar";


interface DashboardLayoutProps {
  children: ReactNode;
  showRightSidebar?: boolean;
}

export function DashboardLayout({ children}: DashboardLayoutProps) {
  return (
    <SidebarProvider
      defaultOpen
      style={
        {
          "--sidebar-width": "16rem" /* w-64 */,
          "--sidebar-width-icon": "5rem" /* w-20 */,
        } as React.CSSProperties
      }
    >
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <div className="flex flex-1 flex-col">
          {/* Mobile Header */}
          <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b-2 border-border bg-background px-4 md:hidden">
            <SidebarTrigger>
              <Menu className="h-6 w-6" />
            </SidebarTrigger>
            <div className="flex h-8 w-8 items-center justify-center border-2 border-foreground bg-foreground">
              <span className="font-heading text-sm font-bold text-background">A</span>
            </div>
          </header>

          <div className="flex flex-1">
            <main className="flex-1 overflow-y-auto p-4">
              {children}
            </main>

          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
