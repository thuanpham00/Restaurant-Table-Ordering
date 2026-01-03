import { NextRequest, NextResponse } from "next/server";

const authPath = ["/login"];
const privatePath = ["/manage"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("accessToken")?.value;

  if (privatePath.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authPath.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// luôn chạy trên phía Next (server/edge runtime),
// mỗi lần có request vào, trước khi tới route/page tương ứng.

export const config = {
  matcher: ["/manage/:path*", "/login"],
};
