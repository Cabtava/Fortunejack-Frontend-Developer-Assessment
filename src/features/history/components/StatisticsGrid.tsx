import type { BetStatistics } from "@/types";

interface StatisticsGridProps {
  statistics: BetStatistics;
}

const items = (statistics: BetStatistics) => [
  { label: "Total Bets", value: statistics.totalBets.toString() },
  {
    label: "Wins / Losses",
    value: `${statistics.wins} / ${statistics.losses}`,
  },
  { label: "Win Rate", value: `${statistics.winRate.toFixed(1)}%` },
  { label: "Biggest Win", value: statistics.biggestWin.toFixed(2) },
  { label: "Biggest Loss", value: statistics.biggestLoss.toFixed(2) },
  {
    label: "Current Profit / Loss",
    value: statistics.currentProfitLoss.toFixed(2),
  },
];

export function StatisticsGrid({ statistics }: StatisticsGridProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items(statistics).map((item) => (
        <article
          key={item.label}
          className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-black/20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {item.label}
          </p>
          <p className="mt-3 text-2xl font-bold text-white">{item.value}</p>
        </article>
      ))}
    </section>
  );
}
