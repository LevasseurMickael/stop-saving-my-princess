import type {
  ContextCondition,
  GameEvent,
  PositionCondition,
  SecretCondition,
  TargetCondition,
} from "../../../lib/type";
import { map } from "../../map/map";
import { statePlayer, stateSecret, stateShield } from "../../state";

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
    case "on_tile":
    case "adjacent_to":
    case "facing_tile":
      return evaluatePosition(condition);

    case "enemy_present":
    case "enemy_killed_last":
    case "no_enemy_alive":
    case "took_damage":
    case "did_not_move":
      return evaluateContext(condition);

    default:
      return false;
  }
}

// =======================
// Sequence
// =======================

// Evaluate a sequence of conditions by checking the event history in reverse order to find matches for each step in the sequence
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

// =======================
// Attack / Shield / Move / Wait / Repeat
// =======================

// Evaluate attack conditions by checking the last attack event against the specified direction and target conditions
function evaluateAttack(
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

// Evaluate shield conditions by checking the last event against the expected shield state change event type
function evaluateShield(
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

  const hasEnemy = stateSecret.enemies.some(
    (enemy) => enemy.alive && enemy.x === facingX && enemy.y === facingY,
  );

  if (hasEnemy) return "enemy";
  if (tile === 3) return "stair";
  if (tile === 4 || tile === 1) return "wall";
  return "empty";
}

// Evaluate move conditions by counting consecutive move events from the end of the event history to see if it meets the required number of steps for the condition
function evaluateMove(
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

function isAdjacentToTileType(
  x: number,
  y: number,
  tileType?: TargetCondition,
): boolean {
  const adjacentTiles = [
    map[y - 1]?.[x],
    map[y + 1]?.[x],
    map[y]?.[x - 1],
    map[y]?.[x + 1],
  ];

  if (tileType === "wall") {
    return adjacentTiles.some((tile) => tile === 4 || tile === 1);
  } else if (tileType === "stair") {
    return adjacentTiles.some((tile) => tile === 3);
  } else if (tileType === "empty") {
    return adjacentTiles.some((tile) => tile === 0);
  }
  return false;
}

// Evaluate wait conditions by counting consecutive wait events from the end of the event history
function evaluateWait(turns: number): boolean {
  let count = 0;

  for (let i = stateSecret.eventHistory.length - 1; i >= 0; i--) {
    const e = stateSecret.eventHistory[i];
    if (e.type === "wait") {
      count++;
      if (count >= turns) return true;
    } else {
      break;
    }
  }
  return false;
}

// Evaluate repeat floor conditions by checking if the specified floor number is included in the list of completed floors in the secret state
function evaluateRepeat(floor: number): boolean {
  return stateSecret.completedFloors?.includes(floor) ?? false;
}

// =======================
// Position Conditions
// =======================

function evaluatePosition(condition: PositionCondition): boolean {
  const player = {
    x: statePlayer.x,
    y: statePlayer.y,
    facing: statePlayer.facing,
  };
  switch (condition.kind) {
    case "on_tile":
      return map[player.y][player.x] === condition.tile;
    case "adjacent_to":
      const adjacentTiles = [
        { x: player.x, y: player.y - 1 },
        { x: player.x, y: player.y + 1 },
        { x: player.x - 1, y: player.y },
        { x: player.x + 1, y: player.y },
      ];
      return adjacentTiles.some((pos) => {
        const tile = map[pos.y]?.[pos.x];
        return tile === condition.tile;
      });

    case "facing_tile":
      const dx =
        player.facing === "right" ? 1 : player.facing === "left" ? -1 : 0;
      const dy = player.facing === "down" ? 1 : player.facing === "up" ? -1 : 0;

      const facingX = player.x + dx;
      const facingY = player.y + dy;
      const facingTile = map[facingY]?.[facingX];
      return facingTile === condition.tile;
    default:
      return false;
  }
}

// =======================
// Context Conditions
// =======================

function evaluateContext(condition: ContextCondition): boolean {
  switch (condition.kind) {
    case "enemy_present":
      return stateSecret.enemies.some((e) => e.alive);
    case "enemy_killed_last":
      return stateSecret.eventHistory.at(-1)?.type === "enemy_kill";
    case "no_enemy_alive":
      return stateSecret.enemies.every((e) => !e.alive);
    case "took_damage":
      const lastHit = stateSecret.eventHistory
        .slice()
        .reverse()
        .find((e) => e.type === "enemy_hit");
      if (!lastHit) return false;
      return condition.blocked ? lastHit.blocker === true : true;
    case "did_not_move":
      let count = 0;
      for (let i = stateSecret.eventHistory.length - 1; i >= 0; i--) {
        if (stateSecret.eventHistory[i].type !== "move") {
          count++;
          if (count >= condition.turns) return true;
        } else break;
      }
      return false;
    default:
      return false;
  }
}

// =======================
// Event matching helper (for sequences)
// =======================

// Check if a given game event matches a specific secret condition by comparing the event type and relevant properties based on the condition's kind
function eventMatchesCondition(
  event: GameEvent,
  condition: SecretCondition,
): boolean {
  switch (condition.kind) {
    case "wait":
      const lastEvent = stateSecret.eventHistory.slice(-condition.turns);
      return (
        lastEvent.length === condition.turns &&
        lastEvent.every((e) => e.type === "wait")
      );

    case "attack":
      if (event.type !== "attack") return false;
      if (condition.direction && event.direction !== condition.direction)
        return false;
      if (condition.target && event.target !== condition.target) return false;
      return true;

    case "shield":
      const expectedType = `shield_${condition.state}` as GameEvent["type"];
      if (event.type !== expectedType) return false;
      if (condition.facing) {
        const facingTarget = getFacingTarget();
        return facingTarget === condition.facing;
      }
      return true;

    case "move":
      if (event.type !== "move") return false;
      if (condition.along && "x" in event && "y" in event) {
        return isAdjacentToTileType(event.x, event.y, condition.along);
      }
      return true;

    case "on_tile":
    case "adjacent_to":
    case "facing_tile":
      return evaluatePosition(condition);

    case "enemy_present":
    case "enemy_killed_last":
    case "no_enemy_alive":
    case "took_damage":
    case "did_not_move":
      return evaluateContext(condition);

    default:
      return false;
  }
}
