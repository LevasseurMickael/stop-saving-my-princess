import { tileIndex } from "../../../../../graphicContext/tile_index";
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
    return adjacentTiles.some(
      (tile) => tile === tileIndex.secretDoor || tile === tileIndex.wall,
    );
  } else if (tileType === "stair") {
    return adjacentTiles.some((tile) => tile === tileIndex.exit);
  } else if (tileType === "empty") {
    return adjacentTiles.some((tile) => tile === tileIndex.empty);
  }
  return false;
}
