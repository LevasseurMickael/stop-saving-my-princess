import type { SecretCondition } from "../../../../../lib/type";
import { stateSecret } from "../../../../state";
import { isAdjacentToTileType } from "./evaluateHelper/isAdjacentToTileType";

// Evaluate move conditions by counting consecutive move events from the end of the event history to see if it meets the required number of steps for the condition
export function evaluateMove(
  condition: Extract<SecretCondition, { kind: "move" }>,
): boolean {
  let count = 0;
  if (condition.along) {
    for (let i = stateSecret.eventHistory.length - 1; i >= 0; i--) {
      const event = stateSecret.eventHistory[i];
      if (event.type === "move") {
        if (isAdjacentToTileType(event.x, event.y, condition.along)) {
          count++;
          if (count >= condition.steps) return true;
        } else {
          break;
        }
      } else {
        break;
      }
    }
  } else {
    for (let i = stateSecret.eventHistory.length - 1; i >= 0; i--) {
      const event = stateSecret.eventHistory[i];
      if (event.type === "move") {
        count++;
        if (count >= condition.steps) return true;
      } else {
        break;
      }
    }
  }
  return false;
}
