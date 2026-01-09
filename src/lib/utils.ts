/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityError, isClient } from "@/utils/http";
import { clsx, type ClassValue } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import { authRequests } from "@/apiRequests/auth";
import { DishStatus, TableStatus } from "@/constants/type";
import { envConfig } from "@/utils/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : `/${path}`;
};

export const handleErrorApi = ({
  errors,
  setError,
  duration,
}: {
  errors: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (errors instanceof EntityError && setError) {
    errors.payload.errors.forEach((item) => {
      setError(item.field as "email" | "password" | "name" | "confirmPassword", {
        type: "server",
        message: item.message,
      });
    });
  } else {
    toast.error("Lỗi", {
      description: errors?.payload?.message || "Có lỗi xảy ra, vui lòng thử lại sau",
      duration: duration || 5000,
    });
  }
};

export const getAccessTokenFromLocalStorage = () => {
  return isClient ? localStorage.getItem("accessToken") : null;
};

export const setAccessTokenFromLocalStorage = (value: string) => {
  return isClient && localStorage.setItem("accessToken", value);
};

export const getRefreshTokenFromLocalStorage = () => {
  return isClient ? localStorage.getItem("refreshToken") : null;
};

export const setRefreshTokenFromLocalStorage = (value: string) => {
  return isClient && localStorage.setItem("refreshToken", value);
};

export const removeTokenFromLocalStorage = () => {
  isClient && localStorage.removeItem("accessToken");
  isClient && localStorage.removeItem("refreshToken");
};

export const checkAndRefreshToken = async (params?: { onError?: () => void; onSuccess?: () => void }) => {
  const accessToken = getAccessTokenFromLocalStorage();
  const refreshToken = getRefreshTokenFromLocalStorage();
  if (!accessToken || !refreshToken) return;
  const decodedAccessToken = jwt.decode(accessToken) as { exp: number; iat: number };
  const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number; iat: number };

  // thời điểm hết hạn token là tính theo epoch time (s)
  // còn khi các bạn dùng cú pháp new Date().getTime() thì nó trả về epoch time (ms)
  const now = new Date().getTime() / 1000 - 1; // chuyển về s // khi set cookie với expires thì sẽ bị lệch 0 - 1000ms nên trừ thêm 1

  //trường hợp refresh token hết hạn thì cho logout
  if (decodedRefreshToken.exp <= now) {
    removeTokenFromLocalStorage();
    // cookie tự delete nên không cần can thiệp (chỉ cần đợi hết hạn)
    params?.onError && params.onError();
    return;
  }

  // ví dụ access token của chúng ta có thời gian hết hạn là 10s
  // thì mình kiểm tra còn 1/3 thời gian (3s) thì mình sẽ gọi refresh token
  // thời gian còn lại tính dựa trên công thức decodedAccessToken.exp - now
  // thời gian hết hạn của access token dựa trên công thức: decodedAccessToken.exp - decodedAccessToken.iat
  if (decodedAccessToken.exp - now < (decodedAccessToken.exp - decodedAccessToken.iat) / 3) {
    // goi refresh token
    try {
      const {
        payload: {
          data: { accessToken, refreshToken },
        },
      } = await authRequests.refreshToken_nextjs(); // set cookie ở đây
      setAccessTokenFromLocalStorage(accessToken);
      setRefreshTokenFromLocalStorage(refreshToken);
      params?.onSuccess && params.onSuccess();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      params?.onError && params.onError();
    }
  }
};

export const getVietnameseDishStatus = (status: (typeof DishStatus)[keyof typeof DishStatus]) => {
  switch (status) {
    case DishStatus.Available:
      return "Có sẵn";
    case DishStatus.Unavailable:
      return "Không có sẵn";
    default:
      return "Ẩn";
  }
};

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export const getVietnameseTableStatus = (status: (typeof TableStatus)[keyof typeof TableStatus]) => {
  switch (status) {
    case TableStatus.Available:
      return "Có sẵn";
    case TableStatus.Reserved:
      return "Đã đặt";
    default:
      return "Ẩn";
  }
};

export const getTableLink = ({ token, tableNumber }: { token: string; tableNumber: number }) => {
  return envConfig.NEXT_PUBLIC_URL + '/tables/' + tableNumber + '?token=' + token
}