import { useGameStore } from "@/app/store/useGameStore";
import {
  selectMaxAmountFilter,
  selectMinAmountFilter,
  selectOutcomeFilter,
  selectSearchFilter,
} from "@/app/store/gameStore.selectors";

function parseNullableNumber(value: string): number | null {
  if (value.trim() === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

export function HistoryFilters() {
  const search = useGameStore(selectSearchFilter);
  const outcome = useGameStore(selectOutcomeFilter);
  const minAmount = useGameStore(selectMinAmountFilter);
  const maxAmount = useGameStore(selectMaxAmountFilter);

  const setSearchFilter = useGameStore((state) => state.setSearchFilter);
  const setOutcomeFilter = useGameStore((state) => state.setOutcomeFilter);
  const setMinAmountFilter = useGameStore((state) => state.setMinAmountFilter);
  const setMaxAmountFilter = useGameStore((state) => state.setMaxAmountFilter);
  const resetHistoryFilters = useGameStore(
    (state) => state.resetHistoryFilters,
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-white">Bet History</h2>
        <p className="mt-1 text-sm text-slate-400">
          Search and filter recent bets by outcome and amount.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-4">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearchFilter(event.target.value)}
          placeholder="Search by currency, outcome, amount"
          className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500"
        />

        <select
          value={outcome}
          onChange={(event) =>
            setOutcomeFilter(event.target.value as "all" | "win" | "loss")
          }
          className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
        >
          <option value="all">All outcomes</option>
          <option value="win">Win</option>
          <option value="loss">Loss</option>
        </select>

        <input
          type="number"
          min="0"
          step="0.01"
          value={minAmount ?? ""}
          onChange={(event) =>
            setMinAmountFilter(parseNullableNumber(event.target.value))
          }
          placeholder="Min amount"
          className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500"
        />

        <div className="flex gap-3">
          <input
            type="number"
            min="0"
            step="0.01"
            value={maxAmount ?? ""}
            onChange={(event) =>
              setMaxAmountFilter(parseNullableNumber(event.target.value))
            }
            placeholder="Max amount"
            className="min-w-0 flex-1 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500"
          />

          <button
            type="button"
            onClick={resetHistoryFilters}
            className="rounded-2xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
