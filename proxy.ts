import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

const AUTH_ROUTES = ['/', '/login', '/register', '/username']
const PROTECTED_ROUTES = ['/dashboard', '/settings']

export async function proxy(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const token = req.cookies.get('next-auth.session-token')?.value || req.cookies.get('__Secure-next-auth.session-token')?.value

    const {pathname} = req.nextUrl;
    const isLoggedIn: boolean = !!session?.user;
    const hasUsername: boolean = !!session?.user.username
    const isUsernamePage: boolean =  pathname.startsWith('/username')
    const isProtectedRoutes: boolean = PROTECTED_ROUTES.some(route => pathname.startsWith(route))

    if (!isLoggedIn && isProtectedRoutes) {
      return NextResponse.redirect(new URL('/login', req.url))
    } 

    // check if user already has username, if not redirect to username route
    if (isLoggedIn && !hasUsername && !isUsernamePage) {
      return NextResponse.redirect(new URL('/username', req.url))
    }

    if (token && hasUsername && AUTH_ROUTES.includes(pathname)) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // }password@Temi

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login', '/register','/dashboard', '/profile', '/username', '/settings', '/explore', '/notifications', '/messages', '/bookmarks']
}