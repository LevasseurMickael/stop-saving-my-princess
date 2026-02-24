import type { Enemy } from "../../../../../lib/type";
import { statePlayer } from "../../../../state";

// This passive allows the player to deal normal damage to ghost enemies.
export function normalDamageToGhost(enemy: Enemy) {
  if (
    !statePlayer.unlockedPassives.normalDamageToGhosts &&
    enemy.monsterFamilly === "ghost"
  ) {
    return 999999; // effectively no damage
  }
  return 0;
}
