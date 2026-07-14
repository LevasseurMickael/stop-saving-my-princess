import { drawSprite } from "../drawSprite";
import { floorSpriteLogic } from "../floorTile/floorSpriteLogic";
import { tileIndex } from "../tile_index";
import { wallSpriteLogic } from "../wallSpriteLogic";

export function getBackgroundSprite(
  ctx: CanvasRenderingContext2D,
  map: number[][],
  GridSize: number,
  GridSizeWidth: number,
  TileSize: number,
) {
  for (let y = 0; y < GridSize; y++) {
    for (let x = 0; x < GridSizeWidth; x++) {
      let baseColor: string = "";
      let spriteKey: string | null = null;

      // Murs
      if (map[y][x] === tileIndex.wall) {
        spriteKey = wallSpriteLogic(map, x, y);
        baseColor = "gray";
      }

      // Sol
      else if (
        map[y][x] === tileIndex.empty ||
        map[y][x] === tileIndex.secretDoor ||
        map[y][x] === tileIndex.chest ||
        map[y][x] === tileIndex.exit ||
        map[y][x] === tileIndex.healingRoom ||
        map[y][x] === tileIndex.treasureDoor
      ) {
        spriteKey = floorSpriteLogic(map, x, y);
        baseColor = "black";
      }
      // Autres tiles de fond
      else {
        baseColor = "black";
      }

      // Dessiner
      if (spriteKey) {
        drawSprite(ctx, spriteKey, x, y, TileSize);
      } else {
        ctx.fillStyle = baseColor;
        ctx.fillRect(x * TileSize, y * TileSize, TileSize, TileSize);
      }
    }
  }
}
