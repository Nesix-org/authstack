import { LoginForm } from "@/components/form/login-form";
import { AuthProvider } from "@/components/auth/auth-providers";
import { BrandName } from "@/components/layout/brand-name";
import {Link} from 'next-view-transitions'


const SignIn = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Decorative */}
      <div className="hidden border-r-2 border-border bg-foreground lg:flex lg:w-1/2 lg:items-center lg:justify-center">
        <div className="px-16 text-center">
          <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center border-4 border-background">
            <div className="h-16 w-16 bg-background"></div>
          </div>
          <h2 className="mb-4 font-space text-3xl font-bold text-background">
            WELCOME BACK
          </h2>
          <p className="text-background/70">
            Continue building amazing things.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <BrandName margin />

          <h1 className="mb-2 text-4xl font-bold">SIGN IN</h1>
          <p className="mb-10 text-muted-foreground">
            Enter your credentials to continue.
          </p>
        
          <LoginForm />

          <AuthProvider />

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
