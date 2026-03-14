import { useGameStore } from "@/app/store/useGameStore";
import {
  selectBetAmount,
  selectMartingaleEnabled,
  selectSelectedCurrency,
} from "@/app/store/gameStore.selectors";
import { useHydrateGameSettings } from "@/features/user/hooks/useHydrateGameSettings";
import { useUserQuery } from "@/features/user/hooks/useUserQuery";

function App() {
  useHydrateGameSettings();

  const { data: user } = useUserQuery();

  const selectedCurrency = useGameStore(selectSelectedCurrency);
  const betAmount = useGameStore(selectBetAmount);
  const martingaleEnabled = useGameStore(selectMartingaleEnabled);

  const setSelectedCurrency = useGameStore(
    (state) => state.setSelectedCurrency,
  );
  const setBetAmount = useGameStore((state) => state.setBetAmount);
  const setMartingaleEnabled = useGameStore(
    (state) => state.setMartingaleEnabled,
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="text-3xl font-bold">Crypto Bet Simulator</h1>

        <div className="mt-6 rounded-2xl bg-slate-900 p-4">
          <p>Persisted currency: {user?.settings.selectedCurrency}</p>
          <p>UI currency: {selectedCurrency}</p>
          <p>Bet amount: {betAmount || "empty"}</p>
          <p>Martingale: {martingaleEnabled ? "on" : "off"}</p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            className="rounded-lg bg-slate-700 px-4 py-2"
            onClick={() => setSelectedCurrency("BTC")}
          >
            BTC
          </button>
          <button
            className="rounded-lg bg-slate-700 px-4 py-2"
            onClick={() => setSelectedCurrency("ETH")}
          >
            ETH
          </button>
          <button
            className="rounded-lg bg-slate-700 px-4 py-2"
            onClick={() => setSelectedCurrency("SOL")}
          >
            SOL
          </button>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            className="rounded-lg bg-emerald-600 px-4 py-2"
            onClick={() => setBetAmount(50)}
          >
            Set Bet 50
          </button>
          <button
            className="rounded-lg bg-amber-600 px-4 py-2"
            onClick={() => setMartingaleEnabled(!martingaleEnabled)}
          >
            Toggle Martingale
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
