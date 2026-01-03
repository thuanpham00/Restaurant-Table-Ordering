import { LoginBodyType, LoginResType } from "@/schemaValidations/auth.schema";
import http from "@/utils/http";

export const authRequests = {
  login_nextjs: async (data: LoginBodyType) => {
    return http.post<LoginResType>("/api/auth/login", data, {
      baseUrl: "", // sử dụng baseUrl trống để gọi API nội bộ của Next.js
    });
  },
  login_backend: async (data: LoginBodyType) => {
    return http.post<LoginResType>(`/auth/login`, data);
  },
};
