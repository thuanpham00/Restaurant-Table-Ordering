import {
  AccountResType,
  ChangePasswordV2BodyType,
  ChangePasswordV2ResType,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";
import http from "@/utils/http";

export const accountApiRequests = {
  me: () => {
    return http.get<AccountResType>("/accounts/me");
  },

  updateMe: (body: UpdateMeBodyType) => {
    return http.put<AccountResType>("/accounts/me", body);
  },

  changePassword_nextjs: (body: ChangePasswordV2BodyType) => {
    return http.put<ChangePasswordV2ResType>("/api/accounts/change-password-v2", body, {
      baseUrl: "",
    });
  },
  changePassword_backend: (
    body: ChangePasswordV2BodyType & {
      accessToken: string;
    }
  ) => {
    return http.put<ChangePasswordV2ResType>(
      "/accounts/change-password-v2",
      { password: body.password, oldPassword: body.oldPassword, confirmPassword: body.confirmPassword },
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`, // vì ở server nên http sẽ ko tự động gán AT cần set thủ công
        },
      }
    );
  },
};
