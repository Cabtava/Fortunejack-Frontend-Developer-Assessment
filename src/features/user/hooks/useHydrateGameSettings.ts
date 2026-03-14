import { useEffect } from "react";
import { useGameStore } from "@/app/store/useGameStore";
import { useUserQuery } from "./useUserQuery";

export function useHydrateGameSettings() {
  const { data: user } = useUserQuery();
  const hydrateSettings = useGameStore((state) => state.hydrateSettings);

  useEffect(() => {
    if (!user) {
      return;
    }

    hydrateSettings({
      selectedCurrency: user.settings.selectedCurrency,
      martingaleEnabled: user.settings.martingaleEnabled,
      stopWin: user.settings.stopWin,
      stopLoss: user.settings.stopLoss,
    });
  }, [user, hydrateSettings]);
}
