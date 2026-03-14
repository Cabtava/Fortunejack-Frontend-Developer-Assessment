import type { GameStore } from "./gameStore.types";

export const selectGameSettings = (state: GameStore) => state.settings;
export const selectHistoryFilters = (state: GameStore) => state.historyFilters;
export const selectAutoBetState = (state: GameStore) => state.autoBet;

export const selectSelectedCurrency = (state: GameStore) =>
  state.settings.selectedCurrency;
export const selectBetAmount = (state: GameStore) => state.settings.betAmount;
export const selectMartingaleEnabled = (state: GameStore) =>
  state.settings.martingaleEnabled;
export const selectStopWin = (state: GameStore) => state.settings.stopWin;
export const selectStopLoss = (state: GameStore) => state.settings.stopLoss;

export const selectSearchFilter = (state: GameStore) =>
  state.historyFilters.search;
export const selectOutcomeFilter = (state: GameStore) =>
  state.historyFilters.outcome;
export const selectMinAmountFilter = (state: GameStore) =>
  state.historyFilters.minAmount;
export const selectMaxAmountFilter = (state: GameStore) =>
  state.historyFilters.maxAmount;
