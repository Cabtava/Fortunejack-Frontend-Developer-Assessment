export function getNextMartingaleAmount(
  previousAmount: number,
  didWin: boolean,
  initialAmount: number,
): number {
  if (didWin) {
    return initialAmount;
  }

  return previousAmount * 2;
}
