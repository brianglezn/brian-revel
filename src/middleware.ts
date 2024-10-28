import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const unprotectedPaths = ['/login', '/register'];

    if (token && unprotectedPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!token && !unprotectedPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|login|register|_next|favicon.ico).*)'],
};

