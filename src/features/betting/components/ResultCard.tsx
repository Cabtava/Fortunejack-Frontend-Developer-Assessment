import clsx from "clsx";
import { Panel } from "@/components/common/Panel";
import { formatDateTime } from "@/lib/formatters";
import type { BetRecord } from "@/types";
import type { AutoBetState } from "@/app/store/gameStore.types";

interface ResultCardProps {
  lastBet: BetRecord | null;
  autoBetState: AutoBetState;
  isBetting: boolean;
  errorMessage: string | null;
}

export function ResultCard({
  lastBet,
  autoBetState,
  isBetting,
  errorMessage,
}: ResultCardProps) {
  return (
    <Panel
      title="Latest Result"
      description="See the most recent outcome and current auto-bet session details."
    >
      <div className="space-y-5">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          {isBetting ? (
            <div>
              <p className="text-sm text-slate-400">Bet status</p>
              <p className="mt-2 text-2xl font-bold text-white">
                Flipping coin...
              </p>
            </div>
          ) : lastBet ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-400">Outcome</p>
                <p
                  className={clsx(
                    "mt-2 text-3xl font-bold uppercase",
                    lastBet.outcome === "win"
                      ? "text-emerald-400"
                      : "text-red-400",
                  )}
                >
                  {lastBet.outcome}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Currency
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    {lastBet.currency}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Amount
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    {lastBet.amount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Payout
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    {lastBet.payout.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Profit / Loss
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    {lastBet.profitLoss.toFixed(2)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Timestamp
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {formatDateTime(lastBet.timestamp)}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-slate-400">No results yet</p>
              <p className="mt-2 text-lg font-semibold text-white">
                Place your first bet to see the outcome here.
              </p>
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Session Profit / Loss
            </p>
            <p className="mt-2 text-2xl font-bold text-white">
              {autoBetState.sessionProfitLoss.toFixed(2)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Auto Bets Placed
            </p>
            <p className="mt-2 text-2xl font-bold text-white">
              {autoBetState.totalAutoBetsPlaced}
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {errorMessage}
          </div>
        )}
      </div>
    </Panel>
  );
}
