// Update the enemy facing direction based on their movement and attack direction.

import type { Enemy } from "../../lib/type";

export function updateEnemyFacing(enemy: Enemy, dx: number, dy: number): void {
  if (dx > 0) {
    enemy.facing = "right";
  } else if (dx < 0) {
    enemy.facing = "left";
  } else if (dy > 0) {
    enemy.facing = "down";
  } else if (dy < 0) {
    enemy.facing = "up";
  }
}

// Function to make the enemy face towards the player based on their relative position
export function faceTowardsPlayer(
  enemy: Enemy,
  player: { x: number; y: number },
): void {
  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;

  if (Math.abs(dx) > Math.abs(dy)) {
    // Face horizontally
    enemy.facing = dx > 0 ? "right" : "left";
  } else {
    // Face vertically
    enemy.facing = dy > 0 ? "down" : "up";
  }
}
