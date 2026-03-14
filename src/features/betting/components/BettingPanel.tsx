import { Panel } from "@/components/common/Panel";
import type {
  AutoBetState,
  GameSettingsState,
} from "@/app/store/gameStore.types";

interface BettingPanelProps {
  settings: GameSettingsState;
  autoBetState: AutoBetState;
  isBetting: boolean;
  isAutoBetting: boolean;
  canPlaceBet: boolean;
  canStartAutoBet: boolean;
  onBetAmountChange: (amount: number | "") => void;
  onMartingaleChange: (enabled: boolean) => void;
  onStopWinChange: (value: number | null) => void;
  onStopLossChange: (value: number | null) => void;
  onPlaceBet: () => void;
  onStartAutoBet: () => void;
  onStopAutoBet: () => void;
}

function parseNumberInput(value: string): number | "" {
  if (value.trim() === "") {
    return "";
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? "" : parsed;
}

export function BettingPanel({
  settings,
  autoBetState,
  isBetting,
  isAutoBetting,
  canPlaceBet,
  canStartAutoBet,
  onBetAmountChange,
  onMartingaleChange,
  onStopWinChange,
  onStopLossChange,
  onPlaceBet,
  onStartAutoBet,
  onStopAutoBet,
}: BettingPanelProps) {
  return (
    <Panel
      title="Bet Controls"
      description="Configure your manual bet or start an automated Martingale session."
    >
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Selected Currency
          </label>
          <div className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white">
            {settings.selectedCurrency}
          </div>
        </div>

        <div>
          <label
            htmlFor="bet-amount"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Bet Amount
          </label>
          <input
            id="bet-amount"
            type="number"
            min="0"
            step="0.01"
            value={settings.betAmount}
            onChange={(event) =>
              onBetAmountChange(parseNumberInput(event.target.value))
            }
            className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500"
            placeholder="Enter bet amount"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="stop-win"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Stop Win
            </label>
            <input
              id="stop-win"
              type="number"
              min="0"
              step="0.01"
              value={settings.stopWin ?? ""}
              onChange={(event) => {
                const next = parseNumberInput(event.target.value);
                onStopWinChange(next === "" ? null : next);
              }}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500"
              placeholder="Optional"
            />
          </div>

          <div>
            <label
              htmlFor="stop-loss"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Stop Loss
            </label>
            <input
              id="stop-loss"
              type="number"
              min="0"
              step="0.01"
              value={settings.stopLoss ?? ""}
              onChange={(event) => {
                const next = parseNumberInput(event.target.value);
                onStopLossChange(next === "" ? null : next);
              }}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500"
              placeholder="Optional"
            />
          </div>
        </div>

        <label className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3">
          <div>
            <p className="font-medium text-white">Martingale Strategy</p>
            <p className="text-sm text-slate-400">
              Double the bet after each loss and reset after a win.
            </p>
          </div>

          <input
            type="checkbox"
            checked={settings.martingaleEnabled}
            onChange={(event) => onMartingaleChange(event.target.checked)}
            className="h-5 w-5 accent-emerald-500"
          />
        </label>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-sm text-slate-400">Auto-bet status</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Status
              </p>
              <p className="mt-1 font-semibold text-white">
                {isAutoBetting ? "Running" : "Idle"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Current Amount
              </p>
              <p className="mt-1 font-semibold text-white">
                {autoBetState.currentAutoBetAmount?.toFixed(2) ?? "—"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Session P/L
              </p>
              <p className="mt-1 font-semibold text-white">
                {autoBetState.sessionProfitLoss.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onPlaceBet}
            disabled={!canPlaceBet || isAutoBetting}
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isBetting && !isAutoBetting ? "Placing Bet..." : "Place Bet"}
          </button>

          {!isAutoBetting ? (
            <button
              type="button"
              onClick={onStartAutoBet}
              disabled={!canStartAutoBet}
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-amber-500 px-5 py-3 font-semibold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Start Auto Bet
            </button>
          ) : (
            <button
              type="button"
              onClick={onStopAutoBet}
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Stop Auto Bet
            </button>
          )}
        </div>
      </div>
    </Panel>
  );
}
