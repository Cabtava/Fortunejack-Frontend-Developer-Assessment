import clsx from "clsx";
import type { Currency, UserBalances } from "@/types";

interface BalanceCardsProps {
  balances: UserBalances;
  selectedCurrency: Currency;
  onSelectCurrency: (currency: Currency) => void;
  isDisabled?: boolean;
}

const currencyOrder: Currency[] = ["BTC", "ETH", "SOL"];

export function BalanceCards({
  balances,
  selectedCurrency,
  onSelectCurrency,
  isDisabled = false,
}: BalanceCardsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {currencyOrder.map((currency) => {
        const isActive = currency === selectedCurrency;

        return (
          <button
            key={currency}
            type="button"
            onClick={() => onSelectCurrency(currency)}
            disabled={isDisabled}
            className={clsx(
              "rounded-3xl border p-5 text-left transition shadow-lg shadow-black/20",
              isActive
                ? "border-emerald-500 bg-emerald-500/10"
                : "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900",
              isDisabled && "cursor-not-allowed opacity-60",
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {currency}
            </p>

            <p className="mt-3 text-3xl font-bold text-white">
              {balances[currency].toFixed(2)}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              {isDisabled
                ? "Unavailable during auto bet"
                : isActive
                  ? "Selected currency"
                  : "Click to select"}
            </p>
          </button>
        );
      })}
    </section>
  );
}
