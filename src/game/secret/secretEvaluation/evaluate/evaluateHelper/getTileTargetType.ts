import type { TargetCondition } from "../../../../../lib/type";
import { stateSecret } from "../../../../state";

// Check the type of a tile (empty, wall, stair) and if it has an enemy on it, return "enemy" instead by checking the secret state for any alive enemies at the specified coordinates, then check the tile type based on the map data to determine if it's a stair, wall, or empty tile
export function getTileTargetType(
  tile: number | undefined,
  x?: number,
  y?: number,
): TargetCondition {
  if (x !== undefined && y !== undefined) {
    const hasEnemy = stateSecret.enemies.some(
      (enemy) => enemy.alive && enemy.x === x && enemy.y === y,
    );
    if (hasEnemy) return "enemy";
  }

  if (tile === 3) return "stair";
  if (tile === 4 || tile === 1) return "wall";
  return "empty";
}
