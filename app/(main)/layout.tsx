import { DashboardLayout } from "@/components/dashboard/dashboard-layout" 
import AuthSessionProvider from "@/components/auth/auth-session-provider";



 function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthSessionProvider>
       <DashboardLayout>
         {children}
       </DashboardLayout>
    </AuthSessionProvider>
  );
}
export default MainLayout;