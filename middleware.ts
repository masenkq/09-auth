import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has('auth-token'); // Або інша назва вашого токена

  // Приватні маршрути
  const isPrivateRoute = pathname.startsWith('/profile') || pathname.startsWith('/notes');
  
  // Публічні маршрути (доступні тільки для неавторизованих)
  const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  // Якщо користувач не авторизований і намагається отримати доступ до приватного маршруту
  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Якщо користувач авторизований і намагається отримати доступ до публічних маршрутів
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/sign-in',
    '/sign-up'
  ],
};