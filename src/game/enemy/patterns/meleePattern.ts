import type { Enemy } from "../../../lib/type";
import { reducedEnemyActionSpeed } from "../../secret/secretUnlock/itemEffect/passives/reduceEnemyActionSpeed";
import { attackPattern } from "./attackPattern";
import {
  hasLineOfSight,
  isInAttackRange,
} from "./pattern-helper/inAttackRange";
import { tryToMoveTowardsPlayer } from "./pattern-helper/tryToMoveTowardsPlayer";

export function meleePattern(
  enemy: Enemy,
  player: { x: number; y: number },
  map: number[][],
) {
  const actions = Math.max(1, enemy.actionPerTurn - reducedEnemyActionSpeed());

  if (isInAttackRange(enemy, player) && hasLineOfSight(enemy, player, map)) {
    attackPattern(enemy, player);
    return;
  }

  for (let i = 0; i < actions; i++) {
    if (isInAttackRange(enemy, player) && hasLineOfSight(enemy, player, map)) {
      attackPattern(enemy, player);
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
