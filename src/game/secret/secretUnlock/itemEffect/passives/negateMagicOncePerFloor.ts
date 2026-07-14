import type { Enemy } from "../../../../../lib/type";
import { statePlayer } from "../../../../state";

export function negateMagicOncePerFloor(enemy: Enemy) {
  if (
    statePlayer.unlockedPassives.negateMagicOncePerFloor &&
    statePlayer.passiveOncePerFloorUsed.negateMagicOncePerFloor &&
    enemy.attackWeapon === "magic"
  ) {
    statePlayer.passiveOncePerFloorUsed.negateMagicOncePerFloor = false;
    return true;
  }
  return false;
}
