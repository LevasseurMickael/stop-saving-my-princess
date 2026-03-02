// This file contains the function to render the map tiles based on the map data structure. It is imported in main.ts to keep the code organized and maintainable.

import { canSeeExits } from "../game/secret/secretUnlock/itemEffect/passives/canSeeExits";
import { canSeeHintWalls } from "../game/secret/secretUnlock/itemEffect/passives/canSeeHintWall";
import { dungeonmapFragment } from "../game/secret/secretUnlock/itemEffect/passives/dungeonmapFragment";
import { stateDynamic } from "../game/state";
import { drawSprite } from "./drawSprite";
import { floorSpriteLogic } from "./floorTile/floorSpriteLogic";
import { getCachedImage } from "./imageLoader";
import { tileIndex } from "./tile_index";
import { wallSpriteLogic } from "./wallSpriteLogic";

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
      let tileImage: HTMLImageElement | null = null;
      let spriteKey: string | null = null;

      if (map[y][x] === tileIndex.wall) {
        spriteKey = wallSpriteLogic(map, x, y);
        if (!spriteKey) {
          baseColor = "gray";
        }

        // treasure chest graphic logic
      } else if (map[y][x] === tileIndex.chest) {
        tileImage = getCachedImage("/chest.png");
        baseColor = "gold";
      } else if (map[y][x] === tileIndex.exit) {
        const exitColor = canSeeExits();
        if (exitColor === "purple") {
          spriteKey = "stairs-down";
        }
        baseColor = exitColor; // Fallback

        // hintWall graphic logic
      } else if (map[y][x] === tileIndex.hintWall) {
        const hintWallColor = canSeeHintWalls();
        if (hintWallColor === "white") {
          spriteKey = "hint-wall";
        }
        baseColor = hintWallColor; // Fallback
      }
      // secret door graphic logic
      else if (map[y][x] === tileIndex.secretDoor) {
        if (stateDynamic.healingRoom?.isUnlocked) {
          spriteKey = "door-open";
        } else {
          spriteKey = "door-closed";
        }
        baseColor = "teal";
      }
      // healing room graphic logic
      else if (map[y][x] === tileIndex.healingRoom) {
        baseColor = "green";
      } else {
        spriteKey = floorSpriteLogic(map, x, y);
        baseColor = "black";
      }

      if (!dungeonmapFragment(x, y)) {
        baseColor = "darkgray";
      }

      if (spriteKey) {
        drawSprite(ctx, spriteKey, x, y, TileSize);
      } else {
        ctx.fillStyle = baseColor;
        ctx.fillRect(x * TileSize, y * TileSize, TileSize, TileSize);
      }
    }
  }
}
