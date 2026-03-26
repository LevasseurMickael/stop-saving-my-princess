// This file contains the function to render the enemies on the canvas based on their state. It is imported in main.ts to keep the code organized and maintainable.

import { getGhostVisionLevel } from "../game/secret/secretUnlock/itemEffect/items/ghostVisionLevel";
import { dungeonmapFragment } from "../game/secret/secretUnlock/itemEffect/passives/dungeonmapFragment";
import type { Enemy } from "../lib/type";
import { drawSprite } from "./drawSprite";
import { enemyColors } from "./enemies/enemiesColors";

export function getEnemiesSprite(
  ctx: CanvasRenderingContext2D,
  stateDynamic: { enemies: Enemy[] },
  TileSize: number,
) {
  for (const enemy of stateDynamic.enemies) {
    if (!enemy.alive) continue;
    let spriteKey: string | null = null;
    let spriteAttackKey: string | null = null;
    let spriteAttackChargeTurn: number | null = null;

    if (!dungeonmapFragment(enemy.x, enemy.y)) {
      continue; // Skip rendering if the tile is not visible on the map
    }

    // find the name of the current monster in the enemiesSprite object
    if (!enemy.name) return;
    spriteKey = enemy.name;
    spriteAttackKey = enemy.attackWeapon;
    spriteAttackChargeTurn = enemy.attackChargeTurn;

    const color =
      enemy.name !== undefined ? enemyColors[enemy.name] || "red" : "red";

    if (enemy.monsterFamilly === "ghost") {
      ctx.globalAlpha = getGhostVisionLevel(enemy);
    }

    if (spriteKey) {
      drawSprite(
        ctx,
        spriteKey,
        enemy.x,
        enemy.y,
        TileSize,
        enemy.facing,
        spriteAttackKey,
        spriteAttackChargeTurn,
      );
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(enemy.x * TileSize, enemy.y * TileSize, TileSize, TileSize);
    }

    // Ranged marker
    if (enemy.attackRange >= 3) {
      ctx.strokeStyle = "yellow";
      ctx.strokeRect(
        enemy.x * TileSize,
        enemy.y * TileSize,
        TileSize,
        TileSize,
      );
    }

    ctx.globalAlpha = 1; // Reset alpha after drawing the enemy
  }
}
