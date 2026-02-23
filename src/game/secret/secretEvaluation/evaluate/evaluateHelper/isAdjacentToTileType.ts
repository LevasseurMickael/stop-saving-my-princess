import type { TargetCondition } from "../../../../../lib/type";
import { map } from "../../../../map/map";

export function isAdjacentToTileType(
  x: number,
  y: number,
  tileType?: TargetCondition,
): boolean {
  const adjacentTiles = [
    map[y - 1]?.[x],
    map[y + 1]?.[x],
    map[y]?.[x - 1],
    map[y]?.[x + 1],
  ];

  if (tileType === "wall") {
    return adjacentTiles.some((tile) => tile === 4 || tile === 1);
  } else if (tileType === "stair") {
    return adjacentTiles.some((tile) => tile === 3);
  } else if (tileType === "empty") {
    return adjacentTiles.some((tile) => tile === 0);
  }
  return false;
}
