import clsx from "clsx";
import { formatDateTime } from "@/lib/formatters";
import type { BetRecord } from "@/types";

interface BetHistoryTableProps {
  bets: BetRecord[];
}

export function BetHistoryTable({ bets }: BetHistoryTableProps) {
  if (bets.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center text-slate-400">
        No bets match the current filters.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-950">
          <thead>
            <tr className="border-b border-slate-800 text-left">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Currency
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Amount
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Outcome
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Payout
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Profit / Loss
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Timestamp
              </th>
            </tr>
          </thead>

          <tbody>
            {bets.map((bet) => (
              <tr
                key={bet.id}
                className="border-b border-slate-900 last:border-b-0"
              >
                <td className="px-4 py-4 font-medium text-white">
                  {bet.currency}
                </td>
                <td className="px-4 py-4 text-slate-300">
                  {bet.amount.toFixed(2)}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={clsx(
                      "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase",
                      bet.outcome === "win"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-red-500/15 text-red-400",
                    )}
                  >
                    {bet.outcome}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-300">
                  {bet.payout.toFixed(2)}
                </td>
                <td
                  className={clsx(
                    "px-4 py-4 font-medium",
                    bet.profitLoss >= 0 ? "text-emerald-400" : "text-red-400",
                  )}
                >
                  {bet.profitLoss.toFixed(2)}
                </td>
                <td className="px-4 py-4 text-sm text-slate-400">
                  {formatDateTime(bet.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
