import { tileIndex } from "../../../../graphicContext/tile_index";
import type { Enemy } from "../../../../lib/type";
import { updateEnemyFacing } from "../../../mechanics/enemyFacing";
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

  if (map[newY][newX] === tileIndex.empty && !isOccupied(newX, newY, enemy)) {
    enemy.x = newX;
    enemy.y = newY;

    updateEnemyFacing(enemy, dx, dy);

    return true;
  }
  return false;
}
