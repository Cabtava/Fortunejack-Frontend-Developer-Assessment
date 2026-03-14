import { generateId } from "@/lib/utils";
import type { BetRecord, CoinFlipResponse, Currency, UserData } from "@/types";
import {
  getBetHistory,
  saveBetHistory,
} from "@/services/localStorage/betHistoryStorage";
import { getUserData, saveUserData } from "@/services/localStorage/userStorage";
import { simulateApiCall } from "@/services/mockApi/mockApiUtils";
import { MAX_BET_HISTORY_ITEMS } from "@/lib/constants";

interface PlaceBetParams {
  amount: number;
  currency: Currency;
}

interface PlaceBetResult {
  coinFlip: CoinFlipResponse;
  updatedUser: UserData;
  updatedHistory: BetRecord[];
  createdBet: BetRecord;
}

export async function flipCoin(
  amount: number,
  currency: Currency,
): Promise<CoinFlipResponse> {
  return simulateApiCall(
    () => {
      const isWin = Math.random() >= 0.5;

      return {
        success: true,
        result: {
          isWin,
          payout: isWin ? amount * 2 : 0,
          selectedCrypto: currency,
          timestamp: new Date().toISOString(),
        },
      };
    },
    {
      minDelay: 300,
      maxDelay: 3000,
      errorMessage: "Coin flip request failed.",
    },
  );
}

export async function placeBet({
  amount,
  currency,
}: PlaceBetParams): Promise<PlaceBetResult> {
  return simulateApiCall(
    () => {
      const currentUser = getUserData();
      const currentHistory = getBetHistory();
      const currentBalance = currentUser.balances[currency];

      if (amount <= 0) {
        throw new Error("Bet amount must be greater than zero.");
      }

      if (amount > currentBalance) {
        throw new Error("Insufficient balance for this bet.");
      }

      const isWin = Math.random() >= 0.5;
      const payout = isWin ? amount * 2 : 0;
      const profitLoss = isWin ? amount : -amount;
      const timestamp = new Date().toISOString();

      const createdBet: BetRecord = {
        id: generateId(),
        currency,
        amount,
        outcome: isWin ? "win" : "loss",
        payout,
        profitLoss,
        timestamp,
      };

      const updatedUser: UserData = {
        ...currentUser,
        balances: {
          ...currentUser.balances,
          [currency]: currentBalance + profitLoss,
        },
      };

      const updatedHistory = [createdBet, ...currentHistory].slice(
        0,
        MAX_BET_HISTORY_ITEMS,
      );

      saveUserData(updatedUser);
      saveBetHistory(updatedHistory);

      return {
        coinFlip: {
          success: true,
          result: {
            isWin,
            payout,
            selectedCrypto: currency,
            timestamp,
          },
        },
        updatedUser,
        updatedHistory,
        createdBet,
      };
    },
    {
      minDelay: 300,
      maxDelay: 3000,
      failureRate: 0.05,
      errorMessage: "Failed to place bet.",
    },
  );
}
