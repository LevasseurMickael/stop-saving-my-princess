import type { Enemy } from "../../../../lib/type";

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
