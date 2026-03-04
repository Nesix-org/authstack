import 'next-auth'

declare module 'next-auth' {
  interface User {
    username?: string | null 
    id: string
  }

  interface Session {
    user: User & {username?: string | null, id: string}

  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username?: string | null
    id: string
  }
}