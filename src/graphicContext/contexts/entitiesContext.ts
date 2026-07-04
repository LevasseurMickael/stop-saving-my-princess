import { canSeeExits } from "../../game/secret/secretUnlock/itemEffect/passives/canSeeExits";
import { canSeeHintWalls } from "../../game/secret/secretUnlock/itemEffect/passives/canSeeHintWall";
import { dungeonmapFragment } from "../../game/secret/secretUnlock/itemEffect/passives/dungeonmapFragment";
import { stateDynamic, stateStats } from "../../game/state";
import { drawSprite } from "../drawSprite";
import { tileIndex } from "../tile_index";

export function getEntitiesSprite(
  ctx: CanvasRenderingContext2D,
  map: number[][],
  GridSize: number,
  GridSizeWidth: number,
  TileSize: number,
) {
  for (let y = 0; y < GridSize; y++) {
    for (let x = 0; x < GridSizeWidth; x++) {
      let spriteKey: string | null = null;
      let tileImage: HTMLImageElement | null = null;
      let baseColor: string = "";

      // Dans le fog of war, ne rien dessiner
      if (!dungeonmapFragment(x, y)) {
        continue;
      }

      // Coffres
      if (map[y][x] === tileIndex.chest) {
        if (!stateStats.hasSecretItem) {
          spriteKey = "chest-closed";
        } else {
          spriteKey = "chest-open";
        }
      } else if (map[y][x] === tileIndex.treasureDoor) {
        if (stateStats.secretUnlocked) {
          // Secret room door becomes visible if secret condition is validated
          const secretRoom = stateDynamic.secretRoom;
          if (secretRoom?.doorSecret) {
            spriteKey = "door-open";
          } else {
            spriteKey = "door-closed";
          }
        }
      }
      // Escaliers (visibles selon canSeeExits)
      else if (map[y][x] === tileIndex.exit) {
        const exitColor = canSeeExits();
        if (exitColor === "purple") {
          spriteKey = "stairs-down";
        }
      }
      // Healing room floor
      else if (map[y][x] === tileIndex.healingRoom) {
        if (stateDynamic.healUsed) {
          spriteKey = "floor-healing-taken";
        } else {
          spriteKey = "floor-healing";
        }
        baseColor = "green";
      }
      // Portes (ouvertes/fermées)
      else if (map[y][x] === tileIndex.secretDoor) {
        if (stateDynamic.healingRoom?.isUnlocked) {
          spriteKey = "door-open";
        } else {
          spriteKey = "door-closed";
        }
      } else if (map[y][x] === tileIndex.hintWall) {
        const hintWallColor = canSeeHintWalls();
        if (hintWallColor === "white") {
          spriteKey = "hint-wall";
        }
        baseColor = hintWallColor; // Fallback
      }

      // Dessiner
      if (spriteKey) {
        drawSprite(ctx, spriteKey, x, y, TileSize);
      } else if (tileImage) {
        ctx.drawImage(
          tileImage,
          x * TileSize,
          y * TileSize,
          TileSize,
          TileSize,
        );
      }
    }
  }
}
