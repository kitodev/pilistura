import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/Login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/Register") {
    return NextResponse.redirect(new URL("/register", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Login", "/Register"],
};
