"use client";

import { checkAndRefreshToken } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// component dùng để kiểm tra và refresh token liên tục khi người dùng truy cập các trang private
const UNAUTHORIZED_PATHS = ["/login", "/logout", "/refresh-token"];
export default function RefreshToken() {
  const pathname = usePathname();
  const router = useRouter();
  // bản chất là check access token liên tục để refresh token trước khi nó hết hạn.
  useEffect(() => {
    if (UNAUTHORIZED_PATHS.includes(pathname)) return;
    let interval: any = null;

    // Phải gọi lần đầu tiên, vì interval sẽ chạy sau thời gian TIMEOUT
    checkAndRefreshToken({
      onError: () => {
        clearInterval(interval);
        router.push("/login");
      },
    });
    const TIMEOUT = 1000;
    interval = setInterval(
      () =>
        checkAndRefreshToken({
          onError: () => {
            clearInterval(interval);
            router.push("/login");
          },
        }),
      TIMEOUT
    );

    return () => {
      clearInterval(interval);
    };
  }, [pathname, router]);

  return null;
}
