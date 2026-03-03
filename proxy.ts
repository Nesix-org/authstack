import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

const authRoutes = ['/login', '/register', '/username']

export async function proxy(req: NextRequest) {
    const session = await getServerSession(authOptions);

    const pathname = req.nextUrl.pathname; // /username
    const isLoggedIn: boolean = !!session?.user;
    const hasUsername: boolean = !!session?.user.username
    const isUsernamePage: boolean =  pathname.startsWith('/username')
    const isAuthenticationRoutes: boolean = authRoutes.some(route => pathname.startsWith(route))

    if (!isLoggedIn && !isAuthenticationRoutes) {
      return NextResponse.redirect(new URL('/login', req.url))
    } 

    // check if user already has username, if not redirect to username route
    if(isLoggedIn && !hasUsername && !isUsernamePage) {
      return NextResponse.redirect(new URL('/username', req.url))
    }

    // if all conditions are met, route to dashboard
    if(isLoggedIn && hasUsername && isAuthenticationRoutes) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    http: return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/profile', '/username']
}