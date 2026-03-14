import { useEffect } from "react";
import { useGameStore } from "@/app/store/useGameStore";
import { useBetSimulation } from "@/features/betting/hooks/useBetSimulation";
import { useHydrateGameSettings } from "@/features/user/hooks/useHydrateGameSettings";

function App() {
  useHydrateGameSettings();

  const setBetAmount = useGameStore((state) => state.setBetAmount);
  const setMartingaleEnabled = useGameStore(
    (state) => state.setMartingaleEnabled,
  );

  const {
    placeSingleBet,
    startAutoBet,
    stopAutoBet,
    runAutoBetStep,
    isAutoBetting,
    autoBetState,
    lastBet,
    error,
    isBetting,
  } = useBetSimulation();

  useEffect(() => {
    if (!isAutoBetting || isBetting) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void runAutoBetStep();
    }, 800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isAutoBetting, isBetting, runAutoBetStep]);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Crypto Bet Simulator</h1>

        <div className="rounded-2xl bg-slate-900 p-4">
          <div className="flex gap-3">
            <button
              onClick={() => setBetAmount(50)}
              className="rounded-lg bg-slate-700 px-4 py-2"
            >
              Bet 50
            </button>
            <button
              onClick={() => setMartingaleEnabled(true)}
              className="rounded-lg bg-slate-700 px-4 py-2"
            >
              Enable Martingale
            </button>
            <button
              onClick={() => void placeSingleBet()}
              className="rounded-lg bg-emerald-600 px-4 py-2"
            >
              Single Bet
            </button>
            <button
              onClick={startAutoBet}
              className="rounded-lg bg-amber-600 px-4 py-2"
            >
              Start Auto Bet
            </button>
            <button
              onClick={stopAutoBet}
              className="rounded-lg bg-red-600 px-4 py-2"
            >
              Stop Auto Bet
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900 p-4">
          <h2 className="font-semibold">Auto Bet State</h2>
          <pre className="mt-3 text-sm text-slate-300">
            {JSON.stringify(autoBetState, null, 2)}
          </pre>
        </div>

        <div className="rounded-2xl bg-slate-900 p-4">
          <h2 className="font-semibold">Last Bet</h2>
          <pre className="mt-3 text-sm text-slate-300">
            {JSON.stringify(lastBet, null, 2)}
          </pre>
        </div>

        {error instanceof Error && (
          <p className="text-red-400">{error.message}</p>
        )}
      </div>
    </main>
  );
}

export default App;
