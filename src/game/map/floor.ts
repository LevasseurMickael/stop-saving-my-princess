import {
  stateDungeon,
  stateDynamic,
  statePlayer,
  stateSecret,
  stateStats,
} from "../state";
import { loadMap } from "./map";

export function enterNextFloor() {
  stateDungeon.currentFloor++;

  stateStats.kills = 0;
  stateStats.hasSecretItem = false;
  stateStats.secretUnlocked = false;

  stateSecret.eventHistory.length = 0;
  stateSecret.turnCounter = 0;

  stateDynamic.enemies.length = 0;
  stateDynamic.secrets.length = 0;

  loadMap();

  statePlayer.x = statePlayer.spawn.x;
  statePlayer.y = statePlayer.spawn.y;
}
