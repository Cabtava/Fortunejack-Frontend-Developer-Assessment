interface ValidateBetInputParams {
  amount: number;
  balance: number;
}

export function validateBetInput({
  amount,
  balance,
}: ValidateBetInputParams): string | null {
  if (!Number.isFinite(amount)) {
    return "Bet amount must be a valid number.";
  }

  if (amount <= 0) {
    return "Bet amount must be greater than zero.";
  }

  if (amount > balance) {
    return "Insufficient balance for this bet.";
  }

  return null;
}

export function validateStopValue(value: number | null): string | null {
  if (value === null) {
    return null;
  }

  if (!Number.isFinite(value) || value < 0) {
    return "Stop values must be zero or greater.";
  }

  return null;
}
