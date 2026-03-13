import { DEFAULT_USER_DATA, STORAGE_KEYS } from "@/lib/constants";
import type { UserData } from "@/types";
import { getStorageItem, setStorageItem } from "./storage";

export function getUserData(): UserData {
  return getStorageItem<UserData>(STORAGE_KEYS.USER_DATA, DEFAULT_USER_DATA);
}

export function saveUserData(userData: UserData): void {
  setStorageItem(STORAGE_KEYS.USER_DATA, userData);
}

export function resetUserData(): void {
  setStorageItem(STORAGE_KEYS.USER_DATA, DEFAULT_USER_DATA);
}
