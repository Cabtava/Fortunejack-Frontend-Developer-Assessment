import type { BetHistoryFilters, BetRecord } from "@/types";

export function filterBetHistory(
  history: BetRecord[],
  filters: BetHistoryFilters,
): BetRecord[] {
  const searchValue = filters.search.trim().toLowerCase();

  return history.filter((bet) => {
    const matchesSearch =
      searchValue.length === 0 ||
      bet.currency.toLowerCase().includes(searchValue) ||
      bet.outcome.toLowerCase().includes(searchValue) ||
      bet.amount.toString().includes(searchValue);

    const matchesOutcome =
      filters.outcome === "all" || bet.outcome === filters.outcome;

    const matchesMinAmount =
      filters.minAmount === null || bet.amount >= filters.minAmount;

    const matchesMaxAmount =
      filters.maxAmount === null || bet.amount <= filters.maxAmount;

    return (
      matchesSearch && matchesOutcome && matchesMinAmount && matchesMaxAmount
    );
  });
}
