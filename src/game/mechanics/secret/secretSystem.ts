import type { FloorSecret, GameEvent } from "../../../lib/type";
import { map } from "../../map/map";
import {
  stateDungeon,
  stateDynamic,
  stateSecret,
  stateStats,
} from "../../state";
import { allSecretConditions } from "./allSecret";
import { evaluateCondition } from "./secretEvaluator";

export function handleGameEvent(event: GameEvent) {
  stateSecret.eventHistory.push(event);

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

  if (stateDynamic.secrets.length > 0) {
    const room = stateDynamic.secrets[0];
    map[room.y][room.x] = 2; // Unlock secret area on the map
  }
  console.log(`Secret for floor ${secret.floor} unlocked!`);
}
