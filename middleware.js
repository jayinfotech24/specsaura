import { NextResponse } from 'next/server'

export function middleware(request) {
    console.log('✅ Middleware triggered:', request.nextUrl.pathname)

    const token = request.cookies.get('usertoken')?.value
    const publicPaths = ['/login', '/register', '/_next', '/api']

    const isPublic = publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))
    if (isPublic) return NextResponse.next()

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

// ✅ Middleware config: only apply to desired routes
export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
