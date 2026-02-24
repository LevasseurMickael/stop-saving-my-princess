import { statePlayer } from "../../../../state";

export function reducedDetection() {
  if (statePlayer.unlockedPassives.reducedDetection) {
    return 1;
  }
  return 0;
}
