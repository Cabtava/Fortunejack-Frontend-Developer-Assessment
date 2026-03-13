import { format } from "date-fns";

export function formatDateTime(value: string): string {
  return format(new Date(value), "MMM d, yyyy HH:mm:ss");
}

export function formatCurrencyAmount(value: number): string {
  return value.toFixed(2);
}

export function formatProfitLoss(value: number): string {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(2)}`;
}
