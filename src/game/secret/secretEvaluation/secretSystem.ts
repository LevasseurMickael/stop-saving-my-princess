import type { FloorSecret, GameEvent } from "../../../lib/type";

import {
  stateDungeon,
  stateDynamic,
  stateSecret,
  stateStats,
} from "../../state";
import { map } from "../../map/map";
import { allSecretConditions } from "../allSecretCondition";
import { evaluateCondition } from "./secretEvaluator";
import { tileIndex } from "../../../graphicContext/tile_index";

export function handleGameEvent(event: GameEvent) {
  stateSecret.eventHistory.push(event);

  // DEBUG: Logger tous les événements
  // console.log("Event:", event.type);
  // console.log(
  //   "History:",
  //   stateSecret.eventHistory.map((e) => e.type),
  // );

  if (stateSecret.eventHistory.length > 20) {
    stateSecret.eventHistory.shift(); // Keep only the last 20 events
  }
  evaluateCurrentFloorSecret();
}

function evaluateCurrentFloorSecret() {
  if (stateStats.secretUnlocked) return;

  const floor = stateDungeon.currentFloor + 1; // Floors are 1-indexed for secrets
  const secret = allSecretConditions.find((s) => s.floor === floor);

  if (!secret) return;

  if (evaluateCondition(secret.condition)) {
    unlockSecret(secret);
  }
}

function unlockSecret(secret: FloorSecret) {
  stateStats.secretUnlocked = true;
  secret.unlocked = true;

  const currentFloor = stateDungeon.currentFloor + 1;
  if (!stateSecret.completedFloors.includes(currentFloor)) {
    stateSecret.completedFloors.push(currentFloor);
  }

  if (stateDynamic.secrets.length > 0) {
    const room = stateDynamic.secrets[0];
    map[room.y][room.x] = tileIndex.chest; // Unlock secret area on the map
  }
  console.log(`Secret for floor ${secret.floor} unlocked!`);
}
