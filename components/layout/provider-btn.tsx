"use client"


interface ProviderBtnProps {
  provider: string
  icon: React.ReactNode
  label: string
}

export function ProviderBtn ({ provider, icon: Icon, label }: ProviderBtnProps ) {
  return (
    <button
      type="button"
      className="w-full rounded-lg border border-muted bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white cursor-pointer duration-300"
      // onClick={() => signIn(provider, {})}
    >
      <div className="flex items-center justify-center gap-1 font-space">
        {Icon}
        <span>Continue with {label}</span>
      </div>
    </button>
  )
}