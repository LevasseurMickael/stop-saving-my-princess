import type { Enemy } from "../../../lib/type";
import { statePlayer } from "../../state";
import { isOccupied } from "../enemy";
import { attackPattern } from "./attackPattern";

export function chasePattern(
  enemy: Enemy,
  player: { x: number; y: number },
  map: number[][],
) {
  // Move towards player
  const distX = player.x - enemy.x;
  const distY = player.y - enemy.y;

  // If enemy is adjacent to player and try to enter the player's tile, the player dies
  attackPattern(enemy, player);

  // Move in the direction that reduces distance to player, prioritizing horizontal movement if distances are equal
  if (Math.abs(distX) > Math.abs(distY)) {
    const stepX = enemy.x + Math.sign(distX);

    // Check if enemy tries to move onto player's tile, which would result in player death
    if (stepX === player.x && enemy.y === player.y) {
      return;
    }

    // Check if the new position is valid (not a wall and not occupied by another enemy)
    if (map[enemy.y]?.[stepX] === 0 && !isOccupied(stepX, enemy.y, enemy)) {
      enemy.x = stepX;
    }
  } else {
    // Prioritize vertical movement if distances are equal
    const stepY = enemy.y + Math.sign(distY);
    if (enemy.x === player.x && stepY === player.y) {
      statePlayer.deathCount++;
      return;
    }

    // Check if the new position is valid (not a wall and not occupied by another enemy)
    if (map[stepY]?.[enemy.x] === 0 && !isOccupied(enemy.x, stepY, enemy)) {
      enemy.y = stepY;
    }
  }
  return;
}
