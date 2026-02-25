import type { Enemy } from "../../../lib/type";
import { reducedEnemyActionSpeed } from "../../secret/secretUnlock/itemEffect/passives/reduceEnemyActionSpeed";
import { isOccupied } from "../enemy";
import { attackPattern } from "./attackPattern";

export function meleePattern(
  enemy: Enemy,
  player: { x: number; y: number },
  map: number[][],
) {
  const actions = Math.max(1, enemy.actionPerTurn - reducedEnemyActionSpeed());

  if (isInAttackRange(enemy, player)) {
    attackPattern(enemy, player);
    return;
  }

  for (let i = 0; i < actions; i++) {
    if (isInAttackRange(enemy, player)) {
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

function isInAttackRange(
  enemy: Enemy,
  player: { x: number; y: number },
): boolean {
  const distX = Math.abs(enemy.x - player.x);
  const distY = Math.abs(enemy.y - player.y);
  return (
    (distX <= enemy.attackRange && distY === 0 && distX > 0) ||
    (distX === 0 && distY <= enemy.attackRange && distY > 0)
  );
}

function tryToMoveTowardsPlayer(
  enemy: Enemy,
  dx: number,
  dy: number,
  map: number[][],
  player: { x: number; y: number },
) {
  const newX = enemy.x + dx;
  const newY = enemy.y + dy;

  // Check if enemy tries to move onto player's tile
  if (newX === player.x && newY === player.y) {
    return false;
  }

  if (!map[newY] || map[newY][newX] === undefined) {
    return false; // Out of bounds
  }

  if (map[newY][newX] === 0 && !isOccupied(newX, newY, enemy)) {
    enemy.x = newX;
    enemy.y = newY;
    return true;
  }
  return false;
}
