import {
  stateDungeon,
  stateDynamic,
  stateKillCount,
  statePlayer,
  stateSecret,
  stateStats,
} from "../state";
import { loadMap } from "./map";

export function enterNextFloor() {
  stateDungeon.currentFloor++;

  for (const key in stateKillCount) {
    if (Object.prototype.hasOwnProperty.call(stateKillCount, key)) {
      stateKillCount[key] = 0;
    }
  }
  stateStats.hasSecretItem = false;
  stateStats.secretUnlocked = false;
  stateDynamic.healingRoom!.isUnlocked = false;

  stateSecret.eventHistory.length = 0;
  stateSecret.turnCounter = 0;

  stateDynamic.enemies.length = 0;
  stateDynamic.secrets.length = 0;

  statePlayer.skillUsedThisFloor.stunEnemyOncePerFloor = false;
  statePlayer.skillUsedThisFloor.fireBreathOncePerFloor = false;

  loadMap();

  statePlayer.x = statePlayer.spawn.x;
  statePlayer.y = statePlayer.spawn.y;
}
