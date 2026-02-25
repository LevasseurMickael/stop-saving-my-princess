import type { Enemy } from "../../lib/type";
import { map } from "../map/map";
import { stateDungeon, stateDynamic, statePlayer } from "../state";
import { reducedDetection } from "../secret/secretUnlock/itemEffect/passives/reducedDetection";
import { allMonsterPatterns } from "../enemy/patterns/allPatterns";
import { runAwayPattern } from "../enemy/patterns/runAwayPattern";
import { fearLowLevelEnemies } from "../secret/secretUnlock/itemEffect/passives/fearLowLevelEnemies";

// Process all enemies' turns
export function enemiesTurn() {
  for (const enemy of stateDynamic.enemies) {
    enemyTurn(enemy, statePlayer, map);
  }
}

// Process a single enemy's turn based on its behavior pattern
export function enemyTurn(
  enemy: Enemy,
  player: { x: number; y: number },
  map: number[][],
) {
  // Enemy is stunned, skip turn
  if (enemy.stunnedTurns && enemy.stunnedTurns > 0) {
    enemy.stunnedTurns--;
    return;
  }

  const dist = Math.abs(enemy.x - player.x) + Math.abs(enemy.y - player.y);
  const lowHp = enemy.hp <= Math.ceil(enemy.maxHp * 0.2);
  const lowDifficulty =
    enemy.difficulty !== undefined &&
    stateDungeon.currentFloor !== undefined &&
    enemy.difficulty - stateDungeon.currentFloor >= 10;

  if (
    (lowHp && dist <= 4 && fearLowLevelEnemies()) ||
    (lowDifficulty && dist <= 4 && fearLowLevelEnemies())
  ) {
    runAwayPattern(enemy, player, map);
    return;
  }

  if (
    enemy.pattern === "patrol" &&
    dist <= 4 - reducedDetection() &&
    enemy.attackWeapon === "melee"
  ) {
    enemy.pattern = "melee";
  }

  // aggro area for patrol pattern

  // if (enemy.pattern === "patrol" && dist <= 4 - reducedDetection()) {
  //   enemy.pattern = "chase";
  // }
  // lost interest if player is far away
  if (
    (enemy.pattern === "chase" ||
      enemy.pattern === "runAway" ||
      enemy.pattern === "melee") &&
    dist > 4 - reducedDetection()
  ) {
    enemy.pattern = "patrol";
  }

  // enemy is stunned, skip turn
  if (enemy.stunnedTurns && enemy.stunnedTurns > 0) {
    enemy.stunnedTurns--;
    return;
  }

  // Enemy is dead, skip turn
  if (!enemy.alive) return;

  // Handle enemy behavior based on its pattern
  allMonsterPatterns(enemy, player, map);
}
