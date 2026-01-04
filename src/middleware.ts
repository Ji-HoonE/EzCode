import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/signin', '/find/password', '/find/api/auth/find-password-verify'];

export async function middleware(request: NextRequest) {
  /** pathname 경로 저장 */
  const response = NextResponse.next();
  response.headers.set('x-pathname', request.nextUrl.pathname);

  if (publicPaths.some((publicPath) => request.nextUrl.pathname.includes(publicPath))) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token || token.error) {
    return NextResponse.next();
  }

  return response;
}

export const config = {
  matcher: [
    '/api/((?!auth).*)',
    '/((?!api|_next|_next/static|_next/image|assets|favicon.ico|sw.js|icons|logo|.well-known).*)',
  ],
};
