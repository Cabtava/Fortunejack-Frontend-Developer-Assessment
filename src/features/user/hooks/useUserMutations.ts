import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  resetUser,
  updateSelectedCurrency,
  updateUser,
} from "@/features/user/api/userApi";
import { queryKeys } from "@/lib/queryKeys";

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKeys.user, updatedUser);
    },
  });
}

export function useUpdateSelectedCurrencyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSelectedCurrency,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKeys.user, updatedUser);
    },
  });
}

export function useResetUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKeys.user, updatedUser);
    },
  });
}
