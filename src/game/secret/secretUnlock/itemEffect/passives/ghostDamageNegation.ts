import type { Enemy } from "../../../../../lib/type";
import { statePlayer } from "../../../../state";

export function ghostDamageNegation(enemy: Enemy) {
  if (
    statePlayer.unlockedPassives.ghostDamageNegation &&
    enemy.monsterFamilly === "ghost"
  ) {
    return true;
  }
  return false;
}
