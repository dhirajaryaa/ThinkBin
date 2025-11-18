import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_ROUTES } from "./lib/constants";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("thinkbin_user_session")?.value;
  // protected route check
  const isProtected = PROTECTED_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
);
// session check 
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  };
  // allow req 
  return NextResponse.next();
};