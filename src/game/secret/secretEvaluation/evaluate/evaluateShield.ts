import type {
  GameEvent,
  SecretCondition,
  TargetCondition,
} from "../../../../lib/type";
import { map } from "../../../map/map";
import { statePlayer, stateSecret, stateShield } from "../../../state";
import { getTileTargetType } from "./evaluateHelper/getTileTargetType";

// Evaluate shield conditions by checking the last event against the expected shield state change event type
export function evaluateShield(
  condition: Extract<SecretCondition, { kind: "shield" }>,
): boolean {
  if (condition.state === "active") {
    if (stateShield.shield.state !== "active") return false;

    if (condition.facing) {
      const facingTarget = getFacingTarget();
      if (facingTarget !== condition.facing) return false;
    }
    return true;
  }
  const expectedType = `shield_${condition.state}` as GameEvent["type"];
  const lastEvent = stateSecret.eventHistory.at(-1);
  if (!lastEvent || lastEvent.type !== expectedType) return false;

  if (condition.facing) {
    if (lastEvent.type === "shield_deploying" && "facingX" in lastEvent) {
      const tile = map[lastEvent.facingY]?.[lastEvent.facingX];
      const targetType = getTileTargetType(tile);
      console.log("Shield facing target type:", targetType);
      if (targetType !== condition.facing) return false;
    }
  }
  return true;
}

// Check if the player is adjacent to a tile of a specific type by checking the four cardinal directions around the player's current position for the specified tile type
function getFacingTarget(): TargetCondition {
  const dx =
    statePlayer.facing === "right" ? 1 : statePlayer.facing === "left" ? -1 : 0;
  const dy =
    statePlayer.facing === "down" ? 1 : statePlayer.facing === "up" ? -1 : 0;

  const facingX = statePlayer.x + dx;
  const facingY = statePlayer.y + dy;

  const tile = map[facingY]?.[facingX];

  return getTileTargetType(tile, facingX, facingY);
}
