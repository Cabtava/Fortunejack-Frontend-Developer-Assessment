import { useQuery } from "@tanstack/react-query";
import { getHistory } from "@/features/history/api/historyApi";
import { queryKeys } from "@/lib/queryKeys";

export function useBetHistoryQuery() {
  return useQuery({
    queryKey: queryKeys.history,
    queryFn: getHistory,
  });
}
