// This file contains the function to render the map tiles based on the map data structure. It is imported in main.ts to keep the code organized and maintainable.

import { canSeeExits } from "../game/secret/secretUnlock/itemEffect/passives/canSeeExits";
import { canSeeHintWalls } from "../game/secret/secretUnlock/itemEffect/passives/canSeeHintWall";

export function getMapSprite(
  ctx: CanvasRenderingContext2D,
  map: number[][],
  GridSize: number,
  GridSizeWidth: number,
  TileSize: number,
) {
  for (let y = 0; y < GridSize; y++) {
    for (let x = 0; x < GridSizeWidth; x++) {
      if (map[y][x] === 1) {
        ctx.fillStyle = "gray";
      } else if (map[y][x] === 2) {
        ctx.fillStyle = "gold";
      } else if (map[y][x] === 3) {
        ctx.fillStyle = canSeeExits();
      } else if (map[y][x] === 4) {
        ctx.fillStyle = canSeeHintWalls();
      } else if (map[y][x] === 5) {
        ctx.fillStyle = "teal";
      } else if (map[y][x] === 6) {
        ctx.fillStyle = "green";
      } else {
        ctx.fillStyle = "black";
      }
      ctx.fillRect(x * TileSize, y * TileSize, TileSize, TileSize);
    }
  }
}
