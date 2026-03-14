import type { GameStoreState } from "./gameStore.types";

export const initialGameStoreState: GameStoreState = {
  settings: {
    selectedCurrency: "BTC",
    betAmount: "",
    martingaleEnabled: false,
    stopWin: null,
    stopLoss: null,
  },
  historyFilters: {
    search: "",
    outcome: "all",
    minAmount: null,
    maxAmount: null,
  },
  autoBet: {
    isAutoBetting: false,
    currentAutoBetAmount: null,
    initialAutoBetAmount: null,
    sessionProfitLoss: 0,
    totalAutoBetsPlaced: 0,
  },
};
