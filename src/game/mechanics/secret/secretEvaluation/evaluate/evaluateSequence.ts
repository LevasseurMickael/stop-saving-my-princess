import type { GameEvent, SecretCondition } from "../../../../../lib/type";
import { map } from "../../../../map/map";
import { stateSecret } from "../../../../state";
import { evaluateCondition } from "../secretEvaluator";
import { evaluateContext } from "./evaluateContext";
import { getTileTargetType } from "./evaluateHelper/getTileTargetType";
import { isAdjacentToTileType } from "./evaluateHelper/isAdjacentToTileType";
import { evaluateMovePattern } from "./evaluateMovePattern";
import { evaluatePosition } from "./evaluatePosition";

export function evaluateSequence(steps: SecretCondition[]): boolean {
  // Séparer les conditions d'état (évaluées maintenant)
  // des conditions d'événements (dans l'historique)
  const eventSteps: SecretCondition[] = [];
  const stateSteps: SecretCondition[] = [];

  for (const step of steps) {
    if (isStateCondition(step)) {
      stateSteps.push(step);
    } else {
      eventSteps.push(step);
    }
  }

  // Vérifier toutes les conditions d'état
  for (const step of stateSteps) {
    if (!evaluateCondition(step)) {
      return false;
    }
  }

  // Vérifier que les N derniers événements matchent EXACTEMENT
  const history = stateSecret.eventHistory;
  if (history.length < eventSteps.length) {
    return false;
  }

  const startIndex = history.length - eventSteps.length;
  for (let i = 0; i < eventSteps.length; i++) {
    const event = history[startIndex + i];
    const step = eventSteps[i];

    if (!eventMatchesCondition(event, step)) {
      return false;
    }
  }

  return true;
}

function isStateCondition(condition: SecretCondition): boolean {
  switch (condition.kind) {
    case "on_tile":
    case "on_spawn":
    case "adjacent_to":
    case "facing_tile":
    case "enemy_nearby":
    case "enemy_present":
    case "no_enemy_alive":
      return true;
    default:
      return false;
  }
}

// Check if a given game event matches a specific secret condition by comparing the event type and relevant properties based on the condition's kind
function eventMatchesCondition(
  event: GameEvent,
  condition: SecretCondition,
): boolean {
  switch (condition.kind) {
    case "attack":
      if (event.type !== "attack") return false;
      if (condition.direction && event.direction !== condition.direction)
        return false;
      if (condition.target && event.target !== condition.target) return false;
      return true;

    case "shield":
      const expectedType = `shield_${condition.state}` as GameEvent["type"];
      if (event.type !== expectedType) return false;
      if (
        condition.facing &&
        event.type === "shield_deploying" &&
        "facingX" in event
      ) {
        const tile = map[event.facingY]?.[event.facingX];
        const facingTarget = getTileTargetType(tile);
        return facingTarget === condition.facing;
      }
      return true;

    case "move":
      if (event.type !== "move") return false;
      if (condition.along && "x" in event && "y" in event) {
        return isAdjacentToTileType(event.x, event.y, condition.along);
      }
      return true;

    case "wait":
      if (event.type !== "wait") return false;
      if (condition.turns && "turns" in event) {
        return event.turns >= condition.turns;
      }
      return true;

    case "on_tile":
    case "on_spawn":
    case "adjacent_to":
    case "facing_tile":
    case "enemy_nearby":
      return evaluatePosition(condition);

    case "enemy_present":
    case "enemy_killed_last":
    case "no_enemy_alive":
    case "took_damage":
    case "did_not_move":
    case "different_walls_attacked":
      return evaluateContext(condition);

    case "move_pattern":
      return evaluateMovePattern(condition);

    default:
      return false;
  }
}
