// This file contains the function to render the map tiles based on the map data structure. It is imported in main.ts to keep the code organized and maintainable.

import { canSeeExits } from "../game/secret/secretUnlock/itemEffect/passives/canSeeExits";
import { canSeeHintWalls } from "../game/secret/secretUnlock/itemEffect/passives/canSeeHintWall";
import { dungeonmapFragment } from "../game/secret/secretUnlock/itemEffect/passives/dungeonmapFragment";

export function getMapSprite(
  ctx: CanvasRenderingContext2D,
  map: number[][],
  GridSize: number,
  GridSizeWidth: number,
  TileSize: number,
) {
  for (let y = 0; y < GridSize; y++) {
    for (let x = 0; x < GridSizeWidth; x++) {
      let baseColor: string = "";

      if (map[y][x] === 1) {
        baseColor = "gray";
      } else if (map[y][x] === 2) {
        baseColor = "gold";
      } else if (map[y][x] === 3) {
        baseColor = canSeeExits();
      } else if (map[y][x] === 4) {
        baseColor = canSeeHintWalls();
      } else if (map[y][x] === 5) {
        baseColor = "teal";
      } else if (map[y][x] === 6) {
        baseColor = "green";
      } else {
        baseColor = "black";
      }

      if (!dungeonmapFragment(x, y)) {
        baseColor = "darkgray";
      }

      ctx.fillStyle = baseColor;
      ctx.fillRect(x * TileSize, y * TileSize, TileSize, TileSize);
    }
  }
}
