interface AutoBetStopParams {
  sessionProfitLoss: number;
  stopWin: number | null;
  stopLoss: number | null;
  nextBetAmount: number;
  currentBalance: number;
}

export function shouldStopAutoBet({
  sessionProfitLoss,
  stopWin,
  stopLoss,
  nextBetAmount,
  currentBalance,
}: AutoBetStopParams): boolean {
  const reachedStopWin = stopWin !== null && sessionProfitLoss >= stopWin;

  const reachedStopLoss =
    stopLoss !== null && sessionProfitLoss <= -Math.abs(stopLoss);

  const insufficientBalance = nextBetAmount > currentBalance;

  return reachedStopWin || reachedStopLoss || insufficientBalance;
}
