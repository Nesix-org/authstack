import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./dashboard-sidebar";
import { RightSidebar } from "./right-sidebar";
import { Menu } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  showRightSidebar?: boolean;
}

export function DashboardLayout({ children, showRightSidebar = true }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <div className="flex flex-1 flex-col">
          {/* Mobile Header */}
          <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b-2 border-border bg-background px-4 lg:hidden">
            <SidebarTrigger>
              <Menu className="h-6 w-6" />
            </SidebarTrigger>
            <div className="flex h-8 w-8 items-center justify-center border-2 border-foreground bg-foreground">
              <span className="font-heading text-sm font-bold text-background">X</span>
            </div>
          </header>

          <div className="flex flex-1">
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
            
            {showRightSidebar && <RightSidebar />}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
