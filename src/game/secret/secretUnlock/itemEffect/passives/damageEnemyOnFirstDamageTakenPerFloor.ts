import type { Enemy } from "../../../../../lib/type";
import { stateDungeon, statePlayer } from "../../../../state";

// Handle the effect of damaging an enemy on the first time the player takes damage each floor
export function damageEnemyOnFirstDamageTakenPerFloor(enemy: Enemy) {
  if (
    statePlayer.unlockedPassives.damageEnemyOnFirstDamageTakenPerFloor &&
    statePlayer.passiveOncePerFloorUsed.firstDamageTakenOncePerFloor
  ) {
    statePlayer.passiveOncePerFloorUsed.firstDamageTakenOncePerFloor = false;
    enemy.hp = Math.max(
      1,
      Math.floor(enemy.hp - stateDungeon.currentFloor * 0.3),
    );
  }
}
