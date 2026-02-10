import type { FloorSecret, GameEvent } from "../../../lib/type";
import { map } from "../../map/map";
import { state } from "../../state";
import { allSecretConditions } from "./allSecret";
import { evaluateCondition } from "./secretEvaluator";

export function handleGameEvent(event: GameEvent) {
  state.eventHistory.push(event);

  if (state.eventHistory.length > 20) {
    state.eventHistory.shift(); // Keep only the last 20 events
  }
  evaluateCurrentFloorSecret();
}

function evaluateCurrentFloorSecret() {
  if (state.secretUnlocked) return;

  const floor = state.currentFloor + 1; // Floors are 1-indexed for secrets
  const secret = allSecretConditions.find((s) => s.floor === floor);

  if (!secret) return;

  if (evaluateCondition(secret.condition)) {
    unlockSecret(secret);
  }
}

function unlockSecret(secret: FloorSecret) {
  state.secretUnlocked = true;
  secret.unlocked = true;

  if (state.secrets.length > 0) {
    const room = state.secrets[0];
    map[room.y][room.x] = 2; // Unlock secret area on the map
  }
  console.log(`Secret for floor ${secret.floor} unlocked!`);
}
