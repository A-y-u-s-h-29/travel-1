import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function proxy(request) {
  const token = request.cookies.get("adminToken")?.value;
  const { pathname } = request.nextUrl;

  // Login page
  if (pathname === "/admin/login") {
    if (token && verifyToken(token)) {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.url)
      );
    }

    return NextResponse.next();
  }

  // Protect all admin routes
  if (pathname.startsWith("/admin")) {
    if (!token || !verifyToken(token)) {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );

      response.cookies.delete("adminToken");

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};