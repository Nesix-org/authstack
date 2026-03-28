import { cn } from "@/lib/utils";
import { BrandName } from "./brand-name";
import { Link } from "next-view-transitions";

const Navbar = async () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-border bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <BrandName />

        <nav className="flex items-center gap-6">
          <>
            <Link
              href="/login"
              className={cn(
                "font-space text-sm font-medium uppercase tracking-wider transition-colors hover:text-muted-foreground underline underline-offset-4",
              )}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="inline-flex h-9 items-center border-2 border-foreground bg-foreground px-4 font-space text-sm font-medium uppercase tracking-wider text-background transition-all hover:bg-background hover:text-foreground"
            >
              Sign Up
            </Link>
          </>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
