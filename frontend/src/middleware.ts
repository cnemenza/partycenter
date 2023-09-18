import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.includes('/auth')) {
    const token = request.cookies.get('access_token');
    if (token !== undefined) return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (pathname.includes('/dashboard')) {
    const token = request.cookies.get('access_token');
    if (token === undefined) return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
};
