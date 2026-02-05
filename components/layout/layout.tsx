import { ReactNode } from "react";
import Navbar from "./navbar";

interface LayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  showNavbar?: boolean;
}

const Layout = ({ children, isAuthenticated = false, showNavbar = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {showNavbar && <Navbar isAuthenticated={isAuthenticated} />}
      <main className={showNavbar ? "pt-16" : ""}>{children}</main>
    </div>
  );
};

export default Layout;