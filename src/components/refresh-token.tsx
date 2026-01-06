"use client";

import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setAccessTokenFromLocalStorage,
  setRefreshTokenFromLocalStorage,
} from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { authRequests } from "@/apiRequests/auth";

const UNAUTHORIZED_PATHS = ["/login", "/logout", "/refresh-token"];
export default function RefreshToken() {
  const pathname = usePathname();

  // bản chất là check access token liên tục để refresh token trước khi nó hết hạn.
  useEffect(() => {
    if (UNAUTHORIZED_PATHS.includes(pathname)) return;
    let interval: any = null;

    const checkAndRefreshToken = async () => {
      const accessToken = getAccessTokenFromLocalStorage();
      const refreshToken = getRefreshTokenFromLocalStorage();
      if (!accessToken || !refreshToken) return;
      const decodedAccessToken = jwt.decode(accessToken) as { exp: number; iat: number };
      const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number; iat: number };

      // thời điểm hết hạn token là tính theo epoch time (s)
      // còn khi các bạn dùng cú pháp new Date().getTime() thì nó trả về epoch time (ms)
      const now = new Date().getTime() / 1000; // chuyển về s

      //trường hợp refresh token hết hạn thì không xử lý
      if (decodedRefreshToken.exp <= now) return;

      // ví dụ access token của chúng ta có thời gian hết hạn là 10s
      // thì mình kiểm tra còn 1/3 thời gian (3s) thì mình sẽ gọi refresh token
      // thời gian còn lại tính dựa trên công thức decodedAccessToken.exp - now
      // thời gian hết hạn của access token dựa trên công thức: decodedAccessToken.exp - decodedAccessToken.iat
      if (decodedAccessToken.exp - now <= (decodedAccessToken.exp - decodedAccessToken.iat) / 3) {
        // goi refresh token
        try {
          const {
            payload: {
              data: { accessToken, refreshToken },
            },
          } = await authRequests.refreshToken_nextjs();
          setAccessTokenFromLocalStorage(accessToken);
          setRefreshTokenFromLocalStorage(refreshToken);
        } catch (error) {
          clearInterval(interval);
        }
      }
    };
    // Phải gọi lần đầu tiên, vì interval sẽ chạy sau thời gian TIMEOUT
    checkAndRefreshToken()
    const TIMEOUT = 1000
    interval = setInterval(checkAndRefreshToken, TIMEOUT);

    return () => {
      clearInterval(interval);
    }
  }, [pathname]);

  return null;
}
