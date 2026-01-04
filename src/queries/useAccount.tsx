import { accountApiRequests } from "@/apiRequests/account";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetMeQuery = ({ queryKey }: { queryKey: string }) => {
  return useQuery({
    queryKey: ["me", queryKey],
    queryFn: () => {
      return accountApiRequests.me().then((res) => {
        return res;
      });
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
