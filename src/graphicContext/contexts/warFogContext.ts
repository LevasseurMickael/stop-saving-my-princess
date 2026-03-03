import { dungeonmapFragment } from "../../game/secret/secretUnlock/itemEffect/passives/dungeonmapFragment";

export function getWarFogSprite(
  ctx: CanvasRenderingContext2D,
  GridSize: number,
  GridSizeWidth: number,
  TileSize: number,
) {
  ctx.fillStyle = "rgba(16, 16, 16, 0.99)"; // War fog color with opacity

  for (let y = 0; y < GridSize; y++) {
    for (let x = 0; x < GridSizeWidth; x++) {
      if (!dungeonmapFragment(x, y)) {
        ctx.fillRect(x * TileSize, y * TileSize, TileSize, TileSize);
      }
    }
  }
}
