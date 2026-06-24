import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const isProtected =
    (pathname.startsWith("/all-books/") && pathname !== "/all-books") ||
    pathname.startsWith("/my-profile");

  if (!isProtected) return NextResponse.next();

  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/all-books/:id+", "/my-profile", "/my-profile/:path*"],
};
