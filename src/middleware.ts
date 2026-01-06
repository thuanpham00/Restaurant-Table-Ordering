import { NextRequest, NextResponse } from "next/server";

const authPath = ["/login"];
const privatePath = ["/manage"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // trường hợp chưa đăng nhập thì ko vào được privatePath
  if (privatePath.some((path) => pathname.startsWith(path)) && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // trường hợp đã đăng nhập rồi thì ko vào được login nữa
  if (authPath.some((path) => pathname.startsWith(path)) && refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // trường hợp đăng nhập rồi và AT trong cookie hết hạn
  if (privatePath.some((path) => pathname.startsWith(path)) && !accessToken && refreshToken) {
    const url = new URL("/logout", request.url);
    // xử lý case AT tại cookie bị xóa redirect sang /logout để xóa RT luôn và redirect sang /login
    url.searchParams.set("refreshToken", refreshToken ?? "");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// luôn chạy trên phía Next (server/edge runtime),
// mỗi lần có request vào, trước khi tới route/page tương ứng.

export const config = {
  matcher: ["/manage/:path*", "/login"],
};
