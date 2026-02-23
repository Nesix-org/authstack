import {NextRequest, NextResponse} from "next/server";
import {getSession} from "next-auth/react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

export async function proxy(req: NextRequest) {
    const session = await getServerSession(authOptions);

    const pathname = req.nextUrl.pathname; // /username
    const isLoggedIn: boolean = !!session?.user;
    const hasUsername: boolean = !!session?.user.username
    const isUsernamePage: boolean =  pathname.startsWith('/username')
    const isAuthenticated: boolean = pathname.startsWith('/auth')

    console.log(isAuthenticated)



    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard', '/profile', '/username']
}