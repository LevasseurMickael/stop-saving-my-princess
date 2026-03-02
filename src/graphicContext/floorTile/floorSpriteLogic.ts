import { getFloorTileSprite } from "./floorTileCache";

export function floorSpriteLogic(
  map: number[][],
  x: number,
  y: number,
): string | null {
  if (map[y][x] !== 0) return null;

  return getFloorTileSprite(x, y);
}
