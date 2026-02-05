'use client'

export function LogoutButton () {
  return (
    <button
      onClick={() => {
        // TODO: Implement logout logic
        console.log("Logout clicked");
      }}
      className="inline-flex h-9 items-center border-2 border-foreground bg-background px-4 font-heading text-sm font-medium uppercase tracking-wider text-foreground transition-all hover:bg-foreground hover:text-background"
    >
      Logout
    </button>
  )
}