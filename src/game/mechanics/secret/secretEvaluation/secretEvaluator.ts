import type {
  ContextCondition,
  FamilyCondition,
  GameEvent,
  HealingRoomCondition,
  ItemCondition,
  PositionCondition,
  SecretCondition,
  SkillCondition,
  TargetCondition,
} from "../../../../lib/type";
import { monsters } from "../../../enemy/monsters";
import { map } from "../../../map/map";
import {
  stateDynamic,
  stateKillCount,
  statePlayer,
  stateSecret,
  stateShield,
} from "../../../state";
import {
  evaluateMovePatternLShape,
  evaluateMovePatternSpiral,
  evaluateMovePatternSquare,
  evaluateMovePatternZigzag,
} from "./evaluatePattern";

export function evaluateCondition(condition: SecretCondition): boolean {
  switch (condition.kind) {
    case "sequence":
      return evaluateSequence(condition.steps);
    case "attack":
      return evaluateAttack(condition);
    case "shield":
      return evaluateShield(condition);
    case "move":
      return evaluateMove(condition);
    case "repeat_floor_condition":
      return evaluateRepeat(condition.floor);
    case "on_tile":
    case "on_spawn":
    case "adjacent_to":
    case "facing_tile":
    case "enemy_nearby":
      return evaluatePosition(condition);

    case "enemy_present":
    case "enemy_killed_last":
    case "enemy_kill":
    case "no_enemy_alive":
    case "took_damage":
    case "did_not_move":
    case "different_walls_attacked":
      return evaluateContext(condition);

    case "has_skill":
    case "use_skill":
      return evaluateSkill(condition);

    case "has_key_level":
    case "has_ghost_vision":
      return evaluateItem(condition);

    case "kill_family":
    case "kill_all_family_types":
    case "no_damage_from_family":
      return evaluateFamily(condition);

    case "find_healing_room":
    case "heal_at_full_hp":
    case "unlock_healing_door":
      return evaluateHealingRoom(condition);

    case "move_pattern":
      return evaluateMovePattern(condition);

    case "visit_all_rooms":
      return evaluateVisitAllRooms(condition.steps);

    default:
      return false;
  }
}

// =======================
// Skills, Items, Healing Rooms, Patterns, Families
// =======================

function evaluateSkill(condition: SkillCondition): boolean {
  switch (condition.kind) {
    case "has_skill":
      return statePlayer.unlockedSkills[condition.skill] === true;
    case "use_skill":
      return statePlayer.skillUsedThisFloor[condition.skill] === true;
  }
  return false;
}

function evaluateItem(condition: ItemCondition): boolean {
  switch (condition.kind) {
    case "has_key_level":
      return statePlayer.unlockedItems.keyLevel >= condition.level;
    case "has_ghost_vision":
      return statePlayer.unlockedItems.ghostVisionLevel >= condition.level;
  }
  return false;
}

function evaluateFamily(condition: FamilyCondition): boolean {
  switch (condition.kind) {
    case "kill_family":
      const familyKills = Object.entries(stateKillCount)
        .filter(([slug]) => {
          const enemy = stateSecret.enemies.find((e) => e.slug === slug);
          return enemy?.monsterFamilly === condition.family;
        })
        .reduce((sum, [, count]) => sum + count, 0);
      return familyKills >= condition.count;

    case "kill_all_family_types":
      const familyType = monsters
        .filter((m) => m.monsterFamilly === condition.family)
        .map((m) => m.slug);
      return familyType.every((slug) => stateKillCount[slug] > 0);

    case "no_damage_from_family":
      return stateSecret.damageFromFamily[condition.family] === 0;
    default:
      return false;
  }
}

function evaluateHealingRoom(condition: HealingRoomCondition): boolean {
  switch (condition.kind) {
    case "find_healing_room":
      return stateDynamic.healingRoom !== null;
    case "heal_at_full_hp":
      return stateSecret.healedAtFullHp === true;
    case "unlock_healing_door":
      if (!stateDynamic.healingRoom) return false;
      return (
        stateDynamic.healingRoom?.isUnlocked &&
        stateDynamic.healingRoom.doorLevel >= condition.doorLevel
      );
    default:
      return false;
  }
}

function evaluateMovePattern(
  condition: Extract<SecretCondition, { kind: "move_pattern" }>,
): boolean {
  switch (condition.pattern) {
    case "square":
      return evaluateMovePatternSquare(condition.size);
    case "L-shape":
      return evaluateMovePatternLShape(condition.direction);
    case "zigzag":
      return evaluateMovePatternZigzag(condition.axis, condition.count);
    case "spiral":
      return evaluateMovePatternSpiral(condition.clockwise);
    default:
      return false;
  }
}

function evaluateVisitAllRooms(steps: SecretCondition[]): boolean {
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

// =======================
// Sequence
// =======================

// Evaluate a sequence of conditions by checking the event history in reverse order to find matches for each step in the sequence
function evaluateSequence(steps: SecretCondition[]): boolean {
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

function getTileTargetType(
  tile: number | undefined,
  x?: number,
  y?: number,
): TargetCondition {
  if (x !== undefined && y !== undefined) {
    const hasEnemy = stateSecret.enemies.some(
      (enemy) => enemy.alive && enemy.x === x && enemy.y === y,
    );
    if (hasEnemy) return "enemy";
  }

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

    case "on_spawn":
      return (
        player.x === statePlayer.spawn.x && player.y === statePlayer.spawn.y
      );

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

    case "enemy_nearby":
      return stateSecret.enemies.some((enemy) => {
        if (!enemy.alive) return false;
        const distance =
          Math.abs(enemy.x - player.x) + Math.abs(enemy.y - player.y);
        return distance <= condition.distance;
      });

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

    case "enemy_kill":
      if (stateKillCount[condition.slug] === condition.count) {
        return true;
      }
      return false;

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

    case "different_walls_attacked":
      const attackedWalls = new Set<string>();
      for (let i = stateSecret.eventHistory.length - 1; i >= 0; i--) {
        const event = stateSecret.eventHistory[i];
        if (event.type === "attack" && event.target === "wall") {
          const key = `${event.targetX},${event.targetY}`;
          attackedWalls.add(key);
          if (attackedWalls.size >= condition.count) return true;
        }
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
