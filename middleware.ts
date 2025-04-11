import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function that runs before routes are processed
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  console.log('Middleware running for path:', pathname);

  // If accessing admin routes (except login) and not authenticated
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isAuthenticated = !!token;

  console.log('Is admin route:', isAdminRoute);
  console.log('Is authenticated:', isAuthenticated);

  if (isAdminRoute && !isAuthenticated) {
    console.log('Redirecting to login page');
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If already logged in and trying to access login page, redirect to admin
  if (pathname === '/admin/login' && isAuthenticated) {
    console.log('Already logged in, redirecting to admin');
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

// Only run middleware on admin routes
export const config = {
  matcher: ['/admin/:path*'],
}; 