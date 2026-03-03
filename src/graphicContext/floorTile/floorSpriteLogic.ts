import { tileIndex } from "../tile_index";
import { getFloorTileSprite } from "./floorTileCache";

export function floorSpriteLogic(
  map: number[][],
  x: number,
  y: number,
): string | null {
  if (
    map[y][x] !== tileIndex.empty &&
    map[y][x] !== tileIndex.secretDoor &&
    map[y][x] !== tileIndex.chest &&
    map[y][x] !== tileIndex.exit &&
    map[y][x] !== tileIndex.healingRoom
  )
    return null;

  return getFloorTileSprite(x, y);
}
