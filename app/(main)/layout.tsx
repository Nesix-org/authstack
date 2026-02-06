import { DashboardLayout } from "@/components/dashboard/dashboard-layout";


function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}

export default MainLayout;