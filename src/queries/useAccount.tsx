import { accountApiRequests } from "@/apiRequests/account";
import { ChangePasswordV2BodyType, UpdateMeBodyType } from "@/schemaValidations/account.schema";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

export const useGetMeQuery = ({ queryKey }: { queryKey: string }) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => {
      return accountApiRequests.me().then((res) => {
        return res;
      });
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUpdateMeMutation = () => {
  return useMutation({
    mutationFn: (body: UpdateMeBodyType) => {
      return accountApiRequests.updateMe(body);
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (body: ChangePasswordV2BodyType) => {
      return accountApiRequests.changePassword_nextjs(body);
    },
  });
};
