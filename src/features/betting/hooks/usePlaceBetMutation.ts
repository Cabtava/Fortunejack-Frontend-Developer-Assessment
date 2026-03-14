import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeBet } from "@/features/betting/api/bettingApi";
import { queryKeys } from "@/lib/queryKeys";

export function usePlaceBetMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: placeBet,
    onSuccess: (result) => {
      queryClient.setQueryData(queryKeys.user, result.updatedUser);
      queryClient.setQueryData(queryKeys.history, result.updatedHistory);

      queryClient.invalidateQueries({ queryKey: queryKeys.user });
      queryClient.invalidateQueries({ queryKey: queryKeys.history });
    },
  });
}
