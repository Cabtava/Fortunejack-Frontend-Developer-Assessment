import { useMemo } from "react";
import { useGameStore } from "@/app/store/useGameStore";
import { selectHistoryFilters } from "@/app/store/gameStore.selectors";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useBetHistoryQuery } from "./useBetHistoryQuery";
import { calculateBetStatistics } from "../utils/historyStats";
import { filterBetHistory } from "../utils/filterHistory";

export function useBetHistory() {
  const historyFilters = useGameStore(selectHistoryFilters);
  const debouncedSearch = useDebounce(historyFilters.search, 300);

  const historyQuery = useBetHistoryQuery();
  const history = historyQuery.data ?? [];

  const effectiveFilters = useMemo(
    () => ({
      ...historyFilters,
      search: debouncedSearch,
    }),
    [historyFilters, debouncedSearch],
  );

  const filteredHistory = useMemo(() => {
    return filterBetHistory(history, effectiveFilters);
  }, [history, effectiveFilters]);

  const statistics = useMemo(() => {
    return calculateBetStatistics(history);
  }, [history]);

  const filteredStatistics = useMemo(() => {
    return calculateBetStatistics(filteredHistory);
  }, [filteredHistory]);

  return {
    ...historyQuery,
    history,
    filteredHistory,
    statistics,
    filteredStatistics,
    filters: historyFilters,
    debouncedSearch,
  };
}
