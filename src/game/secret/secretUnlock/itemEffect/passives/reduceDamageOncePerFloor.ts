import { statePlayer } from "../../../../state";

export function reduceDamageOncePerFloor() {
  if (
    statePlayer.unlockedPassives.reduceDamageOncePerFloor &&
    statePlayer.passiveOncePerFloorUsed.negateDamegeOncePerFloor
  ) {
    statePlayer.passiveOncePerFloorUsed.negateDamegeOncePerFloor = false;
    return true;
  }
  return false;
}
