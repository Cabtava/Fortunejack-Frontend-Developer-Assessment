import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearHistory, saveHistory } from "@/features/history/api/historyApi";
import { queryKeys } from "@/lib/queryKeys";

export function useSaveHistoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveHistory,
    onSuccess: (history) => {
      queryClient.setQueryData(queryKeys.history, history);
    },
  });
}

export function useClearHistoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearHistory,
    onSuccess: (history) => {
      queryClient.setQueryData(queryKeys.history, history);
    },
  });
}
