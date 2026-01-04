import { AccountResType } from "@/schemaValidations/account.schema";
import http from "@/utils/http";

export const accountApiRequests = {
  me: () => {
    return http.get<AccountResType>("/accounts/me");
  },
};
