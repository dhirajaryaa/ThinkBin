import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_ROUTES, SESSION_COOKIE_NAME } from "./lib/constants";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isProtected = PROTECTED_ROUTES.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/ask/:path*",
    "/create/:path*",
    "/notes/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};