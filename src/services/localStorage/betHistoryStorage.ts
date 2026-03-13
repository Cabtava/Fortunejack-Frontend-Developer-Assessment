import {
  DEFAULT_BET_HISTORY,
  MAX_BET_HISTORY_ITEMS,
  STORAGE_KEYS,
} from "@/lib/constants";
import type { BetRecord } from "@/types";
import { getStorageItem, setStorageItem } from "./storage";

export function getBetHistory(): BetRecord[] {
  return getStorageItem<BetRecord[]>(
    STORAGE_KEYS.BET_HISTORY,
    DEFAULT_BET_HISTORY,
  );
}

export function saveBetHistory(history: BetRecord[]): void {
  const trimmedHistory = history.slice(0, MAX_BET_HISTORY_ITEMS);
  setStorageItem(STORAGE_KEYS.BET_HISTORY, trimmedHistory);
}

export function addBetToHistory(newBet: BetRecord): BetRecord[] {
  const currentHistory = getBetHistory();
  const updatedHistory = [newBet, ...currentHistory].slice(
    0,
    MAX_BET_HISTORY_ITEMS,
  );

  saveBetHistory(updatedHistory);

  return updatedHistory;
}

export function resetBetHistory(): void {
  setStorageItem(STORAGE_KEYS.BET_HISTORY, DEFAULT_BET_HISTORY);
}
