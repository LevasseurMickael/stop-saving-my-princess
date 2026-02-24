import { statePlayer } from "../../../../state";

export function fearLowLevelEnemies() {
  if (!statePlayer.unlockedPassives.fearLowLevelEnemies) return false;
  return true;
}
