import { tileIndex } from "./tile_index";

export function wallSpriteLogic(
  map: number[][],
  x: number,
  y: number,
): string | null {
  // Check if the current tile is a wall, if not return null
  if (!x) {
    return "wall";
  }
  if (!y) {
    return "wall";
  }

  // Check if adjacent tile is and tileIndex.empty to determine if we need to draw a wall sprite and which one, one for each direction (top, bottom, left, right)
  if (map[y - 1][x] === tileIndex.empty) {
    return "wall-top";
  } else if (map[y + 1][x] === tileIndex.empty) {
    return "wall-bottom";
  } else if (map[y][x - 1] === tileIndex.empty) {
    return "wall-left";
  } else if (map[y][x + 1] === tileIndex.empty) {
    return "wall-right";
  } else {
    return "wall";
  }
}
