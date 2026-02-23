import type { SecretCondition } from "../../../../../lib/type";
import { stateSecret } from "../../../../state";

// Evaluate attack conditions by checking the last attack event against the specified direction and target conditions
export function evaluateAttack(
  condition: Extract<SecretCondition, { kind: "attack" }>,
): boolean {
  // Get the last event from the event history and check if it's an attack event
  const lastEvent = stateSecret.eventHistory.at(-1);
  // If there is no last event or if the last event is not an attack, return false
  if (!lastEvent || lastEvent.type !== "attack") return false;

  // Check if the attack event matches the specified direction and target conditions
  if (condition.direction && lastEvent.direction !== condition.direction)
    return false;

  // If a target condition is specified, check if the attack event's target matches the condition's target
  if (condition.target && lastEvent.target !== condition.target) return false;

  return true;
}
