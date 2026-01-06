"use client";

import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage } from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
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
      });
    }
  }, [accessTokenFromURL, mutateAsync, refreshTokenFromURL, router]);
  return <div>Logout page</div>;
}
