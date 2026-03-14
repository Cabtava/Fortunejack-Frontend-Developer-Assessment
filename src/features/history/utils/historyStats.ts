import type { BetRecord, BetStatistics } from "@/types";

export function calculateBetStatistics(history: BetRecord[]): BetStatistics {
  const totalBets = history.length;
  const wins = history.filter((bet) => bet.outcome === "win").length;
  const losses = totalBets - wins;

  const profitValues = history.map((bet) => bet.profitLoss);

  const biggestWin = profitValues.length
    ? Math.max(...profitValues.filter((value) => value > 0), 0)
    : 0;

  const biggestLoss = profitValues.length
    ? Math.min(...profitValues.filter((value) => value < 0), 0)
    : 0;

  const currentProfitLoss = profitValues.reduce((sum, value) => sum + value, 0);

  const winRate = totalBets > 0 ? (wins / totalBets) * 100 : 0;

  return {
    totalBets,
    wins,
    losses,
    winRate,
    biggestWin,
    biggestLoss,
    currentProfitLoss,
  };
}
