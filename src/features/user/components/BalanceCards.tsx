import type { Currency, UserBalances } from "@/types";
import clsx from "clsx";

interface BalanceCardsProps {
  balances: UserBalances;
  selectedCurrency: Currency;
  onSelectCurrency: (currency: Currency) => void;
}

const currencyOrder: Currency[] = ["BTC", "ETH", "SOL"];

export function BalanceCards({
  balances,
  selectedCurrency,
  onSelectCurrency,
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
            className={clsx(
              "rounded-3xl border p-5 text-left transition",
              "shadow-lg shadow-black/20",
              isActive
                ? "border-emerald-500 bg-emerald-500/10"
                : "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900",
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {currency}
            </p>
            <p className="mt-3 text-3xl font-bold text-white">
              {balances[currency].toFixed(2)}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              {isActive ? "Selected currency" : "Click to select"}
            </p>
          </button>
        );
      })}
    </section>
  );
}
