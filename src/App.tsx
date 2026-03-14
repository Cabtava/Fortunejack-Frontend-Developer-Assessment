import { useState } from "react";
import { placeBet } from "@/features/betting/api/bettingApi";

function App() {
  const [result, setResult] = useState<string>("No bet yet");

  const handleTestBet = async () => {
    try {
      const response = await placeBet({ amount: 100, currency: "BTC" });
      setResult(JSON.stringify(response, null, 2));
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="text-3xl font-bold">Crypto Bet Simulator</h1>

        <button
          onClick={handleTestBet}
          className="mt-6 rounded-xl bg-emerald-500 px-4 py-2 font-medium text-black"
        >
          Test Bet
        </button>

        <pre className="mt-6 overflow-auto rounded-2xl bg-slate-900 p-4 text-sm text-slate-300">
          {result}
        </pre>
      </div>
    </main>
  );
}

export default App;
