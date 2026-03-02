import { statePlayer } from "../../../../state";

// Reduces the area where the enemy can detect the player.
export function reducedDetection() {
  if (statePlayer.unlockedPassives.reducedDetection) {
    return 1;
  }
  return 0;
}
