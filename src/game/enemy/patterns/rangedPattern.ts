import type { Enemy } from "../../../lib/type";
import { reducedEnemyActionSpeed } from "../../secret/secretUnlock/itemEffect/passives/reduceEnemyActionSpeed";
import { attackPattern } from "./attackPattern";
import { isInAttackRange } from "./pattern-helper/inAttackRange";
import { tryToMoveTowardsPlayer } from "./pattern-helper/tryToMoveTowardsPlayer";

export function rangedPattern(
  enemy: Enemy,
  player: { x: number; y: number },
  map: number[][],
) {
  const actions = Math.max(1, enemy.actionPerTurn - reducedEnemyActionSpeed());

  // Charge attack for a few turns before attacking
  if (isInAttackRange(enemy, player) && enemy.attackChargeTurn === 0) {
    attackPattern(enemy, player);
    enemy.attackChargeTurn = enemy.attackChargeTurnMax; // Reset charge turn after attacking
    return;
  } else if (isInAttackRange(enemy, player) && enemy.attackChargeTurn > 0) {
    enemy.attackChargeTurn -= 1;
  }

  for (let i = 0; i < actions; i++) {
    if (isInAttackRange(enemy, player)) {
      return;
    }
    const distX = player.x - enemy.x;
    const distY = player.y - enemy.y;

    let moved = false;
    if (Math.abs(distX) > Math.abs(distY)) {
      moved = tryToMoveTowardsPlayer(enemy, Math.sign(distX), 0, map, player);
      if (!moved) {
        tryToMoveTowardsPlayer(enemy, 0, Math.sign(distY), map, player);
      }
    } else if (Math.abs(distY) > Math.abs(distX)) {
      moved = tryToMoveTowardsPlayer(enemy, 0, Math.sign(distY), map, player);
      if (!moved) {
        tryToMoveTowardsPlayer(enemy, Math.sign(distX), 0, map, player);
      }
    } else {
      moved = tryToMoveTowardsPlayer(enemy, Math.sign(distX), 0, map, player);
      if (!moved) {
        moved = tryToMoveTowardsPlayer(enemy, 0, Math.sign(distY), map, player);
      }
    }
    if (!moved) {
      break; // No valid move, end turn
    }
  }
}
