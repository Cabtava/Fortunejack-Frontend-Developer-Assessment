export type Currency = "BTC" | "ETH" | "SOL";

export type BetOutcome = "win" | "loss";

export interface UserBalances {
  BTC: number;
  ETH: number;
  SOL: number;
}

export interface UserSettings {
  selectedCurrency: Currency;
  martingaleEnabled: boolean;
  stopWin: number | null;
  stopLoss: number | null;
}

export interface UserData {
  balances: UserBalances;
  settings: UserSettings;
}

export interface BetRecord {
  id: string;
  currency: Currency;
  amount: number;
  outcome: BetOutcome;
  payout: number;
  profitLoss: number;
  timestamp: string;
}

export interface CoinFlipResult {
  isWin: boolean;
  payout: number;
  selectedCrypto: Currency;
  timestamp: string;
}

export interface CoinFlipResponse {
  success: boolean;
  result: CoinFlipResult;
}

export interface BetHistoryFilters {
  search: string;
  outcome: "all" | BetOutcome;
  minAmount: number | null;
  maxAmount: number | null;
}

export interface BetStatistics {
  totalBets: number;
  wins: number;
  losses: number;
  winRate: number;
  biggestWin: number;
  biggestLoss: number;
  currentProfitLoss: number;
}
