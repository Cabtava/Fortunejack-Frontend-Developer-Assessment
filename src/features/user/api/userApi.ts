import { DEFAULT_USER_DATA } from "@/lib/constants";
import type { Currency, UserData } from "@/types";
import { getUserData, saveUserData } from "@/services/localStorage/userStorage";
import { simulateApiCall } from "@/services/mockApi/mockApiUtils";

export async function getUser(): Promise<UserData> {
  return simulateApiCall(() => getUserData(), {
    errorMessage: "Failed to load user data.",
  });
}

export async function updateUser(nextUserData: UserData): Promise<UserData> {
  return simulateApiCall(
    () => {
      saveUserData(nextUserData);
      return nextUserData;
    },
    {
      errorMessage: "Failed to update user data.",
    },
  );
}

export async function updateSelectedCurrency(
  currency: Currency,
): Promise<UserData> {
  return simulateApiCall(
    () => {
      const currentUser = getUserData();

      const updatedUser: UserData = {
        ...currentUser,
        settings: {
          ...currentUser.settings,
          selectedCurrency: currency,
        },
      };

      saveUserData(updatedUser);

      return updatedUser;
    },
    {
      errorMessage: "Failed to update selected currency.",
    },
  );
}

export async function resetUser(): Promise<UserData> {
  return simulateApiCall(
    () => {
      saveUserData(DEFAULT_USER_DATA);
      return DEFAULT_USER_DATA;
    },
    {
      errorMessage: "Failed to reset user data.",
    },
  );
}
