import { clearFloorTileCache } from "../../graphicContext/floorTile/floorTileCache";
import { markBackgroundDirty } from "../../main";
import { showVictoryScreen } from "../mechanics/finishGame";
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

  if (stateDungeon.currentFloor >= 50) {
    showVictoryScreen();
    return;
  }

  for (const key in stateKillCount) {
    if (Object.prototype.hasOwnProperty.call(stateKillCount, key)) {
      stateKillCount[key] = 0;
    }
  }
  stateStats.hasSecretItem = false;
  stateStats.secretUnlocked = false;
  stateDynamic.healingRoom!.isUnlocked = false;
  stateDynamic.healUsed = false;

  stateSecret.eventHistory.length = 0;
  stateSecret.turnCounter = 0;
  stateSecret.visitAllRoom = [];

  stateDynamic.enemies.length = 0;
  stateDynamic.secrets.length = 0;

  // Reset one-time passive effects for the new floor
  statePlayer.passiveOncePerFloorUsed.negateDamegeOncePerFloor = true;
  statePlayer.passiveOncePerFloorUsed.negateMagicOncePerFloor = true;
  statePlayer.passiveOncePerFloorUsed.firstDamageTakenOncePerFloor = true;

  // Reset player state for the new floor
  statePlayer.skillUsedThisFloor.stunEnemyOncePerFloor = true;
  statePlayer.skillUsedThisFloor.fireBreathOncePerFloor = true;

  clearFloorTileCache();
  markBackgroundDirty();

  loadMap();

  statePlayer.x = statePlayer.spawn.x;
  statePlayer.y = statePlayer.spawn.y;

}
