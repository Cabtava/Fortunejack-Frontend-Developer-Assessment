export function DashboardHeader() {
  return (
    <header className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
          Casino Frontend Challenge
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Crypto Bet Simulator
        </h1>
        <p className="max-w-2xl text-sm text-slate-400 sm:text-base">
          Coin flip betting dashboard with persistent balances, auto-bet
          controls, history filtering, and session statistics.
        </p>
      </div>
    </header>
  );
}
