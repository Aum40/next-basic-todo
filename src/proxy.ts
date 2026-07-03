import { auth } from './lib/auth';

// export function proxy(request: NextRequest) {
//   console.log('PROXY');
// }

const PROTECTED_ROUTES = ['/dashboard', '/todo'];
const ONLY_PUBLIC_ROUTES = ['/register', '/login'];

export const proxy = auth((req) => {
  // if (req.nextUrl.pathname === '/dashboard' && !req.auth) {
  //   console.log(req.url);
  //   const url = new URL('/register', req.url);
  //   return Response.redirect(url);
  // }
  if (
    PROTECTED_ROUTES.some((route) => req.nextUrl.pathname.startsWith(route)) &&
    !req.auth
  ) {
    const url = new URL('/login', req.url);
    return Response.redirect(url);
  }
  if (
    ONLY_PUBLIC_ROUTES.some((route) =>
      req.nextUrl.pathname.startsWith(route),
    ) &&
    req.auth
  ) {
    const url = new URL('/dashboard', req.url);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ['/login', '/register', '/todo/:path*', '/dashboard'],
};
