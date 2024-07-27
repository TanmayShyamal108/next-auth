import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
export async function middleware(req: NextRequest) {
    let verified = req.cookies.get('email')
    // let url = req.nextUrl.pathname
    // console.log(url)
 if (!verified && req.nextUrl.pathname.startsWith('/home')) {
        return NextResponse.redirect(new URL('/', req.url))

    }
}
