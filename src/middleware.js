import { NextResponse } from "next/server";

const protectedPaths = ["/all-books/", "/my-profile"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some((path) => {
    if (path === "/all-books/") {
      return pathname.startsWith("/all-books/") && pathname !== "/all-books";
    }
    return pathname.startsWith(path);
  });

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
