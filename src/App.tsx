import { usePlaceBetMutation } from "@/features/betting/hooks/usePlaceBetMutation";
import { useBetHistoryQuery } from "@/features/history/hooks/useBetHistoryQuery";
import { useUserQuery } from "@/features/user/hooks/useUserQuery";

function App() {
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useUserQuery();
  const {
    data: history,
    isLoading: isHistoryLoading,
    error: historyError,
  } = useBetHistoryQuery();

  const betMutation = usePlaceBetMutation();

  const handleBet = async () => {
    await betMutation.mutateAsync({
      amount: 100,
      currency: user?.settings.selectedCurrency ?? "BTC",
    });
  };

  if (isUserLoading || isHistoryLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p>Loading...</p>
      </main>
    );
  }

  if (userError || historyError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p>
          {userError instanceof Error
            ? userError.message
            : historyError instanceof Error
              ? historyError.message
              : "Something went wrong"}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="text-3xl font-bold">Crypto Bet Simulator</h1>

        <div className="mt-6 rounded-2xl bg-slate-900 p-4">
          <h2 className="text-lg font-semibold">Balances</h2>
          <pre className="mt-3 text-sm text-slate-300">
            {JSON.stringify(user?.balances, null, 2)}
          </pre>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-900 p-4">
          <h2 className="text-lg font-semibold">History</h2>
          <pre className="mt-3 max-h-96 overflow-auto text-sm text-slate-300">
            {JSON.stringify(history, null, 2)}
          </pre>
        </div>

        <button
          onClick={handleBet}
          disabled={betMutation.isPending}
          className="mt-6 rounded-xl bg-emerald-500 px-4 py-2 font-medium text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {betMutation.isPending ? "Betting..." : "Place Test Bet"}
        </button>

        {betMutation.error instanceof Error && (
          <p className="mt-4 text-red-400">{betMutation.error.message}</p>
        )}
      </div>
    </main>
  );
}

export default App;
