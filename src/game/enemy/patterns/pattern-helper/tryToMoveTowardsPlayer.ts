import type { Enemy } from "../../../../lib/type";
import { isOccupied } from "../../enemy";

export function tryToMoveTowardsPlayer(
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
