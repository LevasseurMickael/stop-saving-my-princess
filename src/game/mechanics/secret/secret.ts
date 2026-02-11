import { stateDungeon, statePlayer, stateStats } from "../../state";

// Conditions for unlocking the secret area on each floor
export function checkSecretCondition() {
  if (stateDungeon.currentFloor === 0) {
    return stateStats.kills >= 3;
  }
  if (stateDungeon.currentFloor === 1) {
    return statePlayer.deathCount === 0;
  }
  if (stateDungeon.currentFloor === 2) {
    return stateStats.kills >= 1;
  }
  return stateStats.kills >= 2;
}
