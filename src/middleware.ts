// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isAuth = !!token;
  const isProtected = ["/dashboard", "/profile"].some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !isAuth) {
    const loginUrl = new URL("/login", req.url); // req.url includes origin
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname); // Optional
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
