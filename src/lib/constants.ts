import type { BetHistoryFilters, UserData } from "@/types";

export const INITIAL_BALANCE = 1000;

export const DEFAULT_USER_DATA: UserData = {
  balances: {
    BTC: INITIAL_BALANCE,
    ETH: INITIAL_BALANCE,
    SOL: INITIAL_BALANCE,
  },
  settings: {
    selectedCurrency: "BTC",
    martingaleEnabled: false,
    stopWin: null,
    stopLoss: null,
  },
};

export const DEFAULT_BET_HISTORY = [];

export const DEFAULT_BET_FILTERS: BetHistoryFilters = {
  search: "",
  outcome: "all",
  minAmount: null,
  maxAmount: null,
};

export const MAX_BET_HISTORY_ITEMS = 20;

export const STORAGE_KEYS = {
  USER_DATA: "crypto-bet-user-data",
  BET_HISTORY: "crypto-bet-history",
} as const;
