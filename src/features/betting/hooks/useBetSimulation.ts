import { useCallback, useMemo } from "react";
import { useGameStore } from "@/app/store/useGameStore";
import {
  selectAutoBetState,
  selectGameSettings,
} from "@/app/store/gameStore.selectors";
import { useUserQuery } from "@/features/user/hooks/useUserQuery";
import { usePlaceBetMutation } from "./usePlaceBetMutation";
import { getNextMartingaleAmount } from "../utils/martingale";
import { shouldStopAutoBet } from "../utils/autoBet";
import { validateBetInput, validateStopValue } from "../utils/validation";

export function useBetSimulation() {
  const settings = useGameStore(selectGameSettings);
  const autoBet = useGameStore(selectAutoBetState);

  const startAutoBetStore = useGameStore((state) => state.startAutoBet);
  const stopAutoBetStore = useGameStore((state) => state.stopAutoBet);
  const setCurrentAutoBetAmount = useGameStore(
    (state) => state.setCurrentAutoBetAmount,
  );
  const addSessionProfitLoss = useGameStore(
    (state) => state.addSessionProfitLoss,
  );
  const incrementAutoBetCount = useGameStore(
    (state) => state.incrementAutoBetCount,
  );
  const resetAutoBetSession = useGameStore(
    (state) => state.resetAutoBetSession,
  );

  const userQuery = useUserQuery();
  const placeBetMutation = usePlaceBetMutation();

  const currentBalance =
    userQuery.data?.balances[settings.selectedCurrency] ?? 0;

  const lastBet = useMemo(() => {
    return placeBetMutation.data?.createdBet ?? null;
  }, [placeBetMutation.data]);

  const validateBetAmount = useCallback(
    (amount: number) => {
      const betError = validateBetInput({
        amount,
        balance: currentBalance,
      });

      if (betError) {
        throw new Error(betError);
      }

      const stopWinError = validateStopValue(settings.stopWin);
      if (stopWinError) {
        throw new Error(stopWinError);
      }

      const stopLossError = validateStopValue(settings.stopLoss);
      if (stopLossError) {
        throw new Error(stopLossError);
      }
    },
    [currentBalance, settings.stopLoss, settings.stopWin],
  );

  const resolveManualBetAmount = useCallback(() => {
    return typeof settings.betAmount === "number" ? settings.betAmount : 0;
  }, [settings.betAmount]);

  const placeSingleBet = useCallback(
    async (amount?: number) => {
      const resolvedAmount = amount ?? resolveManualBetAmount();

      validateBetAmount(resolvedAmount);

      return placeBetMutation.mutateAsync({
        amount: resolvedAmount,
        currency: settings.selectedCurrency,
      });
    },
    [
      placeBetMutation,
      resolveManualBetAmount,
      settings.selectedCurrency,
      validateBetAmount,
    ],
  );

  const startAutoBet = useCallback(() => {
    const initialAmount = resolveManualBetAmount();

    validateBetAmount(initialAmount);
    startAutoBetStore(initialAmount);
  }, [resolveManualBetAmount, startAutoBetStore, validateBetAmount]);

  const stopAutoBet = useCallback(() => {
    stopAutoBetStore();
  }, [stopAutoBetStore]);

  const runAutoBetStep = useCallback(async () => {
    if (!autoBet.isAutoBetting || autoBet.currentAutoBetAmount === null) {
      return null;
    }

    validateBetAmount(autoBet.currentAutoBetAmount);

    const result = await placeBetMutation.mutateAsync({
      amount: autoBet.currentAutoBetAmount,
      currency: settings.selectedCurrency,
    });

    const currentProfitLoss = result.createdBet.profitLoss;
    const nextSessionProfitLoss = autoBet.sessionProfitLoss + currentProfitLoss;

    addSessionProfitLoss(currentProfitLoss);
    incrementAutoBetCount();

    const initialAmount =
      autoBet.initialAutoBetAmount ?? autoBet.currentAutoBetAmount;

    const nextBetAmount = settings.martingaleEnabled
      ? getNextMartingaleAmount(
          autoBet.currentAutoBetAmount,
          result.createdBet.outcome === "win",
          initialAmount,
        )
      : initialAmount;

    const nextBalance = result.updatedUser.balances[settings.selectedCurrency];

    const shouldStop = shouldStopAutoBet({
      sessionProfitLoss: nextSessionProfitLoss,
      stopWin: settings.stopWin,
      stopLoss: settings.stopLoss,
      nextBetAmount,
      currentBalance: nextBalance,
    });

    if (shouldStop) {
      stopAutoBetStore();
      return result;
    }

    setCurrentAutoBetAmount(nextBetAmount);

    return result;
  }, [
    addSessionProfitLoss,
    autoBet.currentAutoBetAmount,
    autoBet.initialAutoBetAmount,
    autoBet.isAutoBetting,
    autoBet.sessionProfitLoss,
    incrementAutoBetCount,
    placeBetMutation,
    setCurrentAutoBetAmount,
    settings.martingaleEnabled,
    settings.selectedCurrency,
    settings.stopLoss,
    settings.stopWin,
    stopAutoBetStore,
    validateBetAmount,
  ]);

  const canPlaceBet =
    !placeBetMutation.isPending &&
    typeof settings.betAmount === "number" &&
    settings.betAmount > 0 &&
    settings.betAmount <= currentBalance;

  const canStartAutoBet =
    !placeBetMutation.isPending &&
    !autoBet.isAutoBetting &&
    typeof settings.betAmount === "number" &&
    settings.betAmount > 0 &&
    settings.betAmount <= currentBalance;

  return {
    placeSingleBet,
    startAutoBet,
    stopAutoBet,
    runAutoBetStep,
    resetAutoBetSession,
    isBetting: placeBetMutation.isPending,
    isAutoBetting: autoBet.isAutoBetting,
    canPlaceBet,
    canStartAutoBet,
    autoBetState: autoBet,
    settings,
    currentBalance,
    lastBet,
    error: placeBetMutation.error,
  };
}
