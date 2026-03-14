import { useEffect } from "react";
import { useGameStore } from "@/app/store/useGameStore";
import { useBetSimulation } from "@/features/betting/hooks/useBetSimulation";
import { useBetHistory } from "@/features/history/hooks/useBetHistory";
import { useHydrateGameSettings } from "@/features/user/hooks/useHydrateGameSettings";
import { useUserQuery } from "@/features/user/hooks/useUserQuery";
import { useUpdateSelectedCurrencyMutation } from "@/features/user/hooks/useUserMutations";
import { LoadingState } from "@/components/common/LoadingState";
import { ErrorState } from "@/components/common/ErrorState";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { BalanceCards } from "@/features/user/components/BalanceCards";
import { BettingPanel } from "@/features/betting/components/BettingPanel";
import { ResultCard } from "@/features/betting/components/ResultCard";
import { StatisticsGrid } from "@/features/history/components/StatisticsGrid";
import { HistoryFilters } from "@/features/history/components/HistoryFilters";
import { BetHistoryTable } from "@/features/history/components/BetHistoryTable";
import type { Currency } from "@/types";

export function DashboardPage() {
  useHydrateGameSettings();

  const userQuery = useUserQuery();
  const historyData = useBetHistory();
  const simulation = useBetSimulation();
  const updateSelectedCurrencyMutation = useUpdateSelectedCurrencyMutation();

  const setSelectedCurrency = useGameStore(
    (state) => state.setSelectedCurrency,
  );
  const setBetAmount = useGameStore((state) => state.setBetAmount);
  const setMartingaleEnabled = useGameStore(
    (state) => state.setMartingaleEnabled,
  );
  const setStopWin = useGameStore((state) => state.setStopWin);
  const setStopLoss = useGameStore((state) => state.setStopLoss);

  const handleSelectCurrency = async (currency: Currency) => {
    setSelectedCurrency(currency);
    await updateSelectedCurrencyMutation.mutateAsync(currency);
  };

  useEffect(() => {
    if (!simulation.isAutoBetting || simulation.isBetting) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void simulation.runAutoBetStep();
    }, 800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    simulation.isAutoBetting,
    simulation.isBetting,
    simulation.runAutoBetStep,
  ]);

  if (userQuery.isLoading || historyData.isLoading) {
    return <LoadingState />;
  }

  if (userQuery.error || historyData.error) {
    const message =
      userQuery.error instanceof Error
        ? userQuery.error.message
        : historyData.error instanceof Error
          ? historyData.error.message
          : "Something went wrong.";

    return <ErrorState message={message} />;
  }

  if (!userQuery.data) {
    return <ErrorState message="User data is unavailable." />;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <DashboardHeader />

        <BalanceCards
          balances={userQuery.data.balances}
          selectedCurrency={simulation.settings.selectedCurrency}
          onSelectCurrency={(currency) => void handleSelectCurrency(currency)}
        />

        <section className="grid gap-6 lg:grid-cols-2">
          <BettingPanel
            settings={simulation.settings}
            autoBetState={simulation.autoBetState}
            isBetting={simulation.isBetting}
            isAutoBetting={simulation.isAutoBetting}
            canPlaceBet={simulation.canPlaceBet}
            canStartAutoBet={simulation.canStartAutoBet}
            onBetAmountChange={setBetAmount}
            onMartingaleChange={setMartingaleEnabled}
            onStopWinChange={setStopWin}
            onStopLossChange={setStopLoss}
            onPlaceBet={() => void simulation.placeSingleBet()}
            onStartAutoBet={simulation.startAutoBet}
            onStopAutoBet={simulation.stopAutoBet}
          />

          <ResultCard
            lastBet={simulation.lastBet}
            autoBetState={simulation.autoBetState}
            isBetting={simulation.isBetting}
            errorMessage={
              simulation.error instanceof Error
                ? simulation.error.message
                : null
            }
          />
        </section>

        <StatisticsGrid statistics={historyData.statistics} />

        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl shadow-black/20">
          <HistoryFilters />
          <div className="mt-4">
            <BetHistoryTable bets={historyData.filteredHistory} />
          </div>
        </section>
      </div>
    </main>
  );
}
