import type { Enemy } from "../../../../lib/type";
import { isOccupied } from "../../enemy";

export function isInAttackRange(
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

export function isInMagicAoeRange(
  enemy: Enemy,
  player: { x: number; y: number },
): boolean {
  const distX = Math.abs(enemy.x - player.x);
  const distY = Math.abs(enemy.y - player.y);
  return distX <= enemy.attackRange && distY <= enemy.attackRange;
}

// Check if all tiles between enemy and player are 0 and with no enemies on them horizontally, vertically, or diagonally (for magic attacks)
export function hasLineOfSight(
  enemy: Enemy,
  player: { x: number; y: number },
  map: number[][],
): boolean {
  const distX = player.x - enemy.x;
  const distY = player.y - enemy.y;

  if (distX === 0) {
    // Vertical line of sight
    const stepY = Math.sign(distY);
    for (let y = enemy.y + stepY; y !== player.y; y += stepY) {
      if (!map[y] || map[y][enemy.x] === undefined || map[y][enemy.x] !== 0) {
        return false; // Blocked by wall or out of bounds
      }
      if (isOccupied(enemy.x, y, enemy) && enemy.attackWeapon !== "magic") {
        return false; // Blocked by another enemy
      }
    }
    return true;
  } else if (distY === 0) {
    // Horizontal line of sight
    const stepX = Math.sign(distX);
    for (let x = enemy.x + stepX; x !== player.x; x += stepX) {
      if (
        !map[enemy.y] ||
        map[enemy.y][x] === undefined ||
        map[enemy.y][x] !== 0
      ) {
        return false; // Blocked by wall or out of bounds
      }
      if (isOccupied(x, enemy.y, enemy) && enemy.attackWeapon !== "magic") {
        return false; // Blocked by another enemy
      }
    }
    return true;
  } else if (enemy.attackWeapon === "magic") {
    // Area of attackRange of the enemy,check if player is within that area and if there are no walls or enemies blocking the line of sight
    const stepX = Math.sign(distX);
    const stepY = Math.sign(distY);
    let x = enemy.x + stepX;
    let y = enemy.y + stepY;
    while (x !== player.x || y !== player.y) {
      if (!map[y] || map[y][x] === undefined || map[y][x] !== 0) {
        return false; // Blocked by wall or out of bounds
      }
      if (isOccupied(x, y, enemy)) {
        return false; // Blocked by another enemy
      }
      if (x !== player.x) x += stepX;
      if (y !== player.y) y += stepY;
    }
    return true;
  }

  return false; // Not aligned horizontally or vertically
}
