/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppContext } from "@/components/app-provider";
import { checkAndRefreshToken } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// component dùng để kiểm tra và refresh token liên tục khi người dùng truy cập các trang private
const UNAUTHORIZED_PATHS = ["/login", "/logout", "/refresh-token"];
export default function RefreshToken() {
  const { setIsAuth } = useAppContext();
  const pathname = usePathname();
  const router = useRouter();
  // bản chất là check access token liên tục để refresh token trước khi nó hết hạn.
  useEffect(() => {
    if (UNAUTHORIZED_PATHS.includes(pathname)) return;
    let interval: any = null;

    // Phải gọi lần đầu tiên, vì interval sẽ chạy sau thời gian TIMEOUT
    checkAndRefreshToken({
      onError: () => {
        clearInterval(interval); // dừng ngay lập tức interval đó, không cần component phải unmount.
        router.push("/login");
        setIsAuth(false);
      },
    });
    const TIMEOUT = 1000;
    interval = setInterval(
      () =>
        checkAndRefreshToken({
          onError: () => {
            clearInterval(interval);
            router.push("/login");
            setIsAuth(false);
          },
        }),
      TIMEOUT
    );

    return () => {
      clearInterval(interval);
    };
  }, [pathname, router, setIsAuth]);

  return null;
}
