import type { Enemy } from "../../lib/type";
import { isOccupied } from "../entities/enemy";
import { player } from "../entities/player";
import { map } from "../map/map";

export function knockbackPlayer(enemy: Enemy) {
  const distX = player.x - enemy.x;
  const distY = player.y - enemy.y;

  // Calculate knockback direction (opposite of enemy's position)
  const knockbackX = player.x + Math.sign(distX);
  const knockbackY = player.y + Math.sign(distY);

  // Check if knockback position is valid (not a wall and not occupied by an enemy)
  if (
    map[knockbackY]?.[knockbackX] === 0 &&
    !isOccupied(knockbackX, knockbackY, enemy)
  ) {
    player.x = knockbackX;
    player.y = knockbackY;
  }
}

// Calculate knockback position for enemy based on player's position and move enemy if valid
export function knockbackEnemy(enemy: Enemy) {
  const distX = enemy.x - player.x;
  const distY = enemy.y - player.y;

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
