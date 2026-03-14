import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/features/user/api/userApi";
import { queryKeys } from "@/lib/queryKeys";

export function useUserQuery() {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: getUser,
  });
}
