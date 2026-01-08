"use client";

import { useAppContext } from "@/components/app-provider";
import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage } from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// dành cho xử lý case bị lỗi 401 chạy trên server component - case 401 client thì xử lý luôn ở axios interceptor
// sẽ redirect sang /logout để xử lý (xóa token trong LS và xóa token trong cookie) và redirect về /login
export default function LogoutPage() {
  const { setIsAuth } = useAppContext();
  const { mutateAsync } = useLogoutMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshTokenFromURL = searchParams.get("refreshToken");
  const accessTokenFromURL = searchParams.get("accessToken");

  useEffect(() => {
    if (
      (refreshTokenFromURL && refreshTokenFromURL === getRefreshTokenFromLocalStorage()) ||
      (accessTokenFromURL && accessTokenFromURL === getAccessTokenFromLocalStorage())
    ) {
      mutateAsync().then(() => {
        router.push("/login");
        setIsAuth(false);
      });
    } else {
      router.push("/"); // nếu url ko đúng thì về trang chủ
    }
  }, [accessTokenFromURL, mutateAsync, refreshTokenFromURL, router, setIsAuth]);
  return <div>Logout page</div>;
}
