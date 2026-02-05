import { RegisterForm } from "@/components/form/register-form";
import { BrandName } from "@/components/layout/brand-name";
import { RegisterLogo } from "@/components/layout/register-logo";
import Link from "next/link";


function SignUp () {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Form */}
      <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <BrandName margin />

          <h1 className="mb-2 text-4xl font-bold">CREATE ACCOUNT</h1>
          <p className="mb-10 text-muted-foreground">
            Start your journey with us today.
          </p>

          <RegisterForm />

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden border-l-2 border-border bg-foreground lg:flex lg:w-1/2 lg:items-center lg:justify-center">
        <div className="px-16 text-center">
          <RegisterLogo />
          <h2 className="mb-4 font-space text-3xl font-bold text-background">
            JOIN THE STACK
          </h2>
          <p className="text-background/70">
            Build production-ready authentication flows.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;