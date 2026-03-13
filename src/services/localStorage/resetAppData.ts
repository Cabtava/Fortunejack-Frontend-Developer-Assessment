import { resetBetHistory } from "./betHistoryStorage";
import { resetUserData } from "./userStorage";

export function resetAppData(): void {
  resetUserData();
  resetBetHistory();
}
