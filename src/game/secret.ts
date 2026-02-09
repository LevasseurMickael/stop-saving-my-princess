import { state } from "./state";

export function checkSecretCondition() {
  if (state.currentFloor === 0) {
    return state.kills >= 3;
  }
  if (state.currentFloor === 1) {
    return state.deathCount === 0;
  }
  if (state.currentFloor === 2) {
    return state.kills >= 1;
  }
  return state.kills >= 2;
}
