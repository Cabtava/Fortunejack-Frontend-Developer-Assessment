import type { BetHistoryFilters, Currency } from "@/types";

export interface AutoBetState {
  isAutoBetting: boolean;
  currentAutoBetAmount: number | null;
  initialAutoBetAmount: number | null;
  sessionProfitLoss: number;
  totalAutoBetsPlaced: number;
}

export interface GameSettingsState {
  selectedCurrency: Currency;
  betAmount: number | "";
  martingaleEnabled: boolean;
  stopWin: number | null;
  stopLoss: number | null;
}

export interface GameStoreState {
  settings: GameSettingsState;
  historyFilters: BetHistoryFilters;
  autoBet: AutoBetState;
}

export interface GameStoreActions {
  setSelectedCurrency: (currency: Currency) => void;
  setBetAmount: (amount: number | "") => void;
  setMartingaleEnabled: (enabled: boolean) => void;
  setStopWin: (value: number | null) => void;
  setStopLoss: (value: number | null) => void;

  setSearchFilter: (value: string) => void;
  setOutcomeFilter: (value: BetHistoryFilters["outcome"]) => void;
  setMinAmountFilter: (value: number | null) => void;
  setMaxAmountFilter: (value: number | null) => void;
  resetHistoryFilters: () => void;

  startAutoBet: (initialAmount: number) => void;
  stopAutoBet: () => void;
  setCurrentAutoBetAmount: (amount: number | null) => void;
  addSessionProfitLoss: (value: number) => void;
  incrementAutoBetCount: () => void;
  resetAutoBetSession: () => void;

  hydrateSettings: (settings: Partial<GameSettingsState>) => void;
  resetGameSettings: () => void;
}

export type GameStore = GameStoreState & GameStoreActions;
