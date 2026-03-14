import { useBetHistoryQuery } from "@/features/history/hooks/useBetHistoryQuery";
import { useUserQuery } from "@/features/user/hooks/useUserQuery";

export function useDashboardData() {
  const userQuery = useUserQuery();
  const historyQuery = useBetHistoryQuery();

  const isLoading = userQuery.isLoading || historyQuery.isLoading;
  const isError = userQuery.isError || historyQuery.isError;

  const error =
    userQuery.error instanceof Error
      ? userQuery.error
      : historyQuery.error instanceof Error
        ? historyQuery.error
        : null;

  return {
    userQuery,
    historyQuery,
    isLoading,
    isError,
    error,
  };
}
