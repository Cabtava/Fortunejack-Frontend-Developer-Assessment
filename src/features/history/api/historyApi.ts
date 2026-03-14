import type { BetRecord } from "@/types";
import {
  getBetHistory,
  saveBetHistory,
} from "@/services/localStorage/betHistoryStorage";
import { simulateApiCall } from "@/services/mockApi/mockApiUtils";

export async function getHistory(): Promise<BetRecord[]> {
  return simulateApiCall(() => getBetHistory(), {
    errorMessage: "Failed to load bet history.",
  });
}

export async function saveHistory(history: BetRecord[]): Promise<BetRecord[]> {
  return simulateApiCall(
    () => {
      saveBetHistory(history);
      return getBetHistory();
    },
    {
      errorMessage: "Failed to save bet history.",
    },
  );
}

export async function clearHistory(): Promise<BetRecord[]> {
  return simulateApiCall(
    () => {
      saveBetHistory([]);
      return [];
    },
    {
      errorMessage: "Failed to clear bet history.",
    },
  );
}
