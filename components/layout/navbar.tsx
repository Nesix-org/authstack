'use client'

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavbarProps {
  isAuthenticated?: boolean;
}

const Navbar = ({ isAuthenticated = false }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-border bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-heading text-xl font-bold tracking-tight">
          AUTHSTACK
        </Link>

        <nav className="flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className={cn(
                  "font-heading text-sm font-medium uppercase tracking-wider transition-colors hover:text-muted-foreground",
                  pathname === "/signin" && "underline underline-offset-4"
                )}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex h-9 items-center border-2 border-foreground bg-foreground px-4 font-heading text-sm font-medium uppercase tracking-wider text-background transition-all hover:bg-background hover:text-foreground"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className={cn(
                  "font-heading text-sm font-medium uppercase tracking-wider transition-colors hover:text-muted-foreground",
                  pathname === "/dashboard" && "underline underline-offset-4"
                )}
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className={cn(
                  "font-heading text-sm font-medium uppercase tracking-wider transition-colors hover:text-muted-foreground",
                  pathname === "/profile" && "underline underline-offset-4"
                )}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  // TODO: Implement logout logic
                  console.log("Logout clicked");
                }}
                className="inline-flex h-9 items-center border-2 border-foreground bg-background px-4 font-heading text-sm font-medium uppercase tracking-wider text-foreground transition-all hover:bg-foreground hover:text-background"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
