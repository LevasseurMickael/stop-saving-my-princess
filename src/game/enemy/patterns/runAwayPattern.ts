import { tileIndex } from "../../../graphicContext/tile_index";
import type { Enemy } from "../../../lib/type";
import { isOccupied } from "../enemy";

// Monster with low hp or difficulty level run away from the player until being 4 tail away from the player, then they get back to their original pattern.
export function runAwayPattern(
  enemy: Enemy,
  player: { x: number; y: number },
  map: number[][],
) {
  const distX = player.x - enemy.x;
  const distY = player.y - enemy.y;

  //If enemy hp is at 20% or below or the difference between the enemy difficulty and the current floor is at 10 or more, the enemy tries to run away

  enemy.pattern = "runAway";
  const fleeDirectionX = -Math.sign(distX);
  const fleeDirectionY = -Math.sign(distY);

  if (Math.abs(distX) >= Math.abs(distY)) {
    // Try to move horizontally away from the player
    if (tryMove(enemy, fleeDirectionX, 0, map)) return;
    // If horizontal move is blocked, try to move vertically
    if (tryMove(enemy, 0, fleeDirectionY, map)) return;
    if (tryMove(enemy, 0, -fleeDirectionY, map)) return;
    if (tryMove(enemy, -fleeDirectionX, 0, map)) return;
  } else {
    // Try to move vertically away from the player
    if (tryMove(enemy, 0, fleeDirectionY, map)) return;
    // If vertical move is blocked, try to move horizontally
    if (tryMove(enemy, fleeDirectionX, 0, map)) return;
    if (tryMove(enemy, -fleeDirectionX, 0, map)) return;
    if (tryMove(enemy, 0, -fleeDirectionY, map)) return;
  }
}

function tryMove(
  enemy: Enemy,
  stepX: number,
  stepY: number,
  map: number[][],
): boolean {
  const newX = enemy.x + stepX;
  const newY = enemy.y + stepY;

  if (map[newY]?.[newX] === tileIndex.empty && !isOccupied(newX, newY, enemy)) {
    enemy.x = newX;
    enemy.y = newY;
    return true;
  }
  return false;
}
