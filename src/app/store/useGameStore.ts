import { create } from "zustand";
import { initialGameStoreState } from "./gameStore.initial";
import type { GameStore } from "./gameStore.types";

export const useGameStore = create<GameStore>((set) => ({
  ...initialGameStoreState,

  setSelectedCurrency: (currency) =>
    set((state) => ({
      settings: {
        ...state.settings,
        selectedCurrency: currency,
      },
    })),

  setBetAmount: (amount) =>
    set((state) => ({
      settings: {
        ...state.settings,
        betAmount: amount,
      },
    })),

  setMartingaleEnabled: (enabled) =>
    set((state) => ({
      settings: {
        ...state.settings,
        martingaleEnabled: enabled,
      },
    })),

  setStopWin: (value) =>
    set((state) => ({
      settings: {
        ...state.settings,
        stopWin: value,
      },
    })),

  setStopLoss: (value) =>
    set((state) => ({
      settings: {
        ...state.settings,
        stopLoss: value,
      },
    })),

  setSearchFilter: (value) =>
    set((state) => ({
      historyFilters: {
        ...state.historyFilters,
        search: value,
      },
    })),

  setOutcomeFilter: (value) =>
    set((state) => ({
      historyFilters: {
        ...state.historyFilters,
        outcome: value,
      },
    })),

  setMinAmountFilter: (value) =>
    set((state) => ({
      historyFilters: {
        ...state.historyFilters,
        minAmount: value,
      },
    })),

  setMaxAmountFilter: (value) =>
    set((state) => ({
      historyFilters: {
        ...state.historyFilters,
        maxAmount: value,
      },
    })),

  resetHistoryFilters: () =>
    set({
      historyFilters: initialGameStoreState.historyFilters,
    }),

  startAutoBet: (initialAmount) =>
    set((state) => ({
      autoBet: {
        ...state.autoBet,
        isAutoBetting: true,
        currentAutoBetAmount: initialAmount,
        initialAutoBetAmount: initialAmount,
        sessionProfitLoss: 0,
        totalAutoBetsPlaced: 0,
      },
    })),

  stopAutoBet: () =>
    set((state) => ({
      autoBet: {
        ...state.autoBet,
        isAutoBetting: false,
      },
    })),

  setCurrentAutoBetAmount: (amount) =>
    set((state) => ({
      autoBet: {
        ...state.autoBet,
        currentAutoBetAmount: amount,
      },
    })),

  addSessionProfitLoss: (value) =>
    set((state) => ({
      autoBet: {
        ...state.autoBet,
        sessionProfitLoss: state.autoBet.sessionProfitLoss + value,
      },
    })),

  incrementAutoBetCount: () =>
    set((state) => ({
      autoBet: {
        ...state.autoBet,
        totalAutoBetsPlaced: state.autoBet.totalAutoBetsPlaced + 1,
      },
    })),

  resetAutoBetSession: () =>
    set({
      autoBet: initialGameStoreState.autoBet,
    }),

  hydrateSettings: (settings) =>
    set((state) => ({
      settings: {
        ...state.settings,
        ...settings,
      },
    })),

  resetGameSettings: () =>
    set({
      settings: initialGameStoreState.settings,
    }),
}));
