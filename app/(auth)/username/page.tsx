import { RegisterLogo } from "@/components/auth/register-logo"
import { UsernameForm } from "@/components/form/username-form"
import { BrandName } from "@/components/layout/brand-name"

function Page () {
  return (
    <div className="flex min-h-screen">
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

      <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <BrandName margin />

          <h1 className="mb-2 text-4xl font-bold">CHOOSE A USERNAME</h1>
          <p className="mb-10 text-muted-foreground">
            Start your journey with us today.
          </p>

          <UsernameForm />
        </div>
      </div>
    </div>
  )
}

export default Page