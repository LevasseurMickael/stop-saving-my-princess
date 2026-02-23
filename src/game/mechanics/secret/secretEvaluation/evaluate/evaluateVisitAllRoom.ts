import type { SecretCondition } from "../../../../../lib/type";
import { stateSecret } from "../../../../state";
import { evaluatePosition } from "./evaluatePosition";

export function evaluateVisitAllRooms(steps: SecretCondition[]): boolean {
  for (const step of steps) {
    if (step.kind === "adjacent_to" && evaluatePosition(step)) {
      stateSecret.visitAllRoom.push(step.tile);
    } else if (step.kind === "on_spawn" && evaluatePosition(step)) {
      stateSecret.visitAllRoom.push(0);
    }
  }
  // Check if array contain 0, 3, 4, 6
  const requiredTiles = [0, 3, 4, 6];
  if (requiredTiles.every((tile) => stateSecret.visitAllRoom.includes(tile))) {
    return true;
  }
  return false;
}
