import { useEffect } from "react";
import { useGameStore } from "@/app/store/useGameStore";
import { selectSelectedCurrency } from "@/app/store/gameStore.selectors";
import { useUpdateSelectedCurrencyMutation } from "./useUserMutations";

export function useSyncSelectedCurrency() {
  const selectedCurrency = useGameStore(selectSelectedCurrency);
  const updateSelectedCurrencyMutation = useUpdateSelectedCurrencyMutation();

  useEffect(() => {
    updateSelectedCurrencyMutation.mutate(selectedCurrency);
  }, [selectedCurrency, updateSelectedCurrencyMutation]);
}
