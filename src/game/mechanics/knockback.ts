import type { Enemy } from "../../lib/type";
import { isOccupied } from "../entities/enemy";

import { map } from "../map/map";
import { statePlayer } from "../state";

export function knockbackPlayer(enemy: Enemy) {
  const distX = statePlayer.x - enemy.x;
  const distY = statePlayer.y - enemy.y;

  // Calculate knockback direction (opposite of enemy's position)
  const knockbackX = statePlayer.x + Math.sign(distX);
  const knockbackY = statePlayer.y + Math.sign(distY);

  // Check if knockback position is valid (not a wall and not occupied by an enemy)
  if (
    map[knockbackY]?.[knockbackX] === 0 &&
    !isOccupied(knockbackX, knockbackY, enemy)
  ) {
    statePlayer.x = knockbackX;
    statePlayer.y = knockbackY;
  }
}

// Calculate knockback position for enemy based on player's position and move enemy if valid
export function knockbackEnemy(enemy: Enemy) {
  const distX = enemy.x - statePlayer.x;
  const distY = enemy.y - statePlayer.y;

  // Calculate knockback direction (away from player)
  const knockbackX = enemy.x + Math.sign(distX);
  const knockbackY = enemy.y + Math.sign(distY);

  // Check if knockback position is valid (not a wall and not occupied by another enemy)
  if (
    map[knockbackY]?.[knockbackX] === 0 &&
    !isOccupied(knockbackX, knockbackY, enemy)
  ) {
    enemy.x = knockbackX;
    enemy.y = knockbackY;
  }
}
