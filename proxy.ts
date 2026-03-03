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
    const isAuthenticated: boolean = authRoutes.some(route => pathname.startsWith(route))

    console.log(isAuthenticated)



    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard', '/profile', '/username']
}