import type { GameEvent, SecretCondition } from "../../../lib/type";
import { stateSecret } from "../../state";

export function evaluateCondition(condition: SecretCondition): boolean {
  switch (condition.kind) {
    case "sequence":
      return evaluateSequence(condition.steps);
    case "wait":
      return evaluateWait(condition.turns ?? 1);
    case "attack":
      return evaluateAttack(condition);
    case "shield":
      return evaluateShield(condition);
    case "move":
      return evaluateMove(condition);
    case "repeat_floor_condition":
      return evaluateRepeat(condition.floor);
    default:
      return false;
  }
}

function evaluateSequence(steps: SecretCondition[]): boolean {
  let index = stateSecret.eventHistory.length - 1;

  for (let i = steps.length - 1; i >= 0; i--) {
    const step = steps[i];
    let found = false;

    while (index >= 0) {
      if (eventMatchesCondition(stateSecret.eventHistory[index], step)) {
        found = true;
        index--;
        break;
      }
      index--;
    }

    if (!found) return false;
  }

  return true;
}

function evaluateWait(turns: number): boolean {
  let count = 0;
  for (let i = stateSecret.eventHistory.length - 1; i >= 0; i--) {
    if (stateSecret.eventHistory[i].type === "wait") {
      count++;
      if (count >= turns) return true;
    } else {
      break;
    }
  }
  return false;
}

function evaluateAttack(
  condition: Extract<SecretCondition, { kind: "attack" }>,
) {
  const lastEvent =
    stateSecret.eventHistory[stateSecret.eventHistory.length - 1];
  if (!lastEvent || lastEvent.type !== "attack") return false;
  if (condition.direction && lastEvent.direction !== condition.direction)
    return false;

  return true;
}

function evaluateShield(
  condition: Extract<SecretCondition, { kind: "shield" }>,
) {
  const expectedType = `shield_${condition.state}` as GameEvent["type"];
  return stateSecret.eventHistory.some((e) => e.type === expectedType);
}

function eventMatchesCondition(event: GameEvent, condition: SecretCondition) {
  if (condition.kind === "wait") {
    const lastIndex = stateSecret.eventHistory.length - 1;
    let count = 0;
    for (let i = lastIndex; i >= 0; i--) {
      if (stateSecret.eventHistory[i].type === "wait") {
        count++;
        if (count >= condition.turns) return true;
      } else {
        break;
      }
    }
    return false;
  }
  if (condition.kind === "attack") {
    if (event.type !== "attack") return false;
    if ("direction" in condition && condition.direction !== event.direction)
      return false;
    return true;
  }
  if (condition.kind === "shield") {
    return event.type === `shield_${condition.state}`;
  }
  return false;
}
