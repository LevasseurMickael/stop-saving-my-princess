// This file contains the function to render the enemies on the canvas based on their state. It is imported in main.ts to keep the code organized and maintainable.

import { getGhostVisionLevel } from "../game/mechanics/secret/secretUnlock/itemEffect/items/ghostVisionLevel";
import type { Enemy } from "../lib/type";
import { enemyColors } from "./enemies/enemiesColors";

export function getEnemiesSprite(
  ctx: CanvasRenderingContext2D,
  stateDynamic: { enemies: Enemy[] },
  TileSize: number,
) {
  for (const enemy of stateDynamic.enemies) {
    if (!enemy.alive) continue;

    const color =
      enemy.name !== undefined ? enemyColors[enemy.name] || "red" : "red";

    if (enemy.monsterFamilly === "ghost") {
      ctx.globalAlpha = getGhostVisionLevel(enemy);
    }

    ctx.fillStyle = color;
    ctx.fillRect(enemy.x * TileSize, enemy.y * TileSize, TileSize, TileSize);

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
    //multi-action marker
    if (enemy.actionPerTurn > 1) {
      ctx.fillStyle = "black";
      ctx.fillRect(
        enemy.x * TileSize + TileSize / 3,
        enemy.y * TileSize + TileSize / 3,
        TileSize / 3,
        TileSize / 3,
      );
    }

    ctx.globalAlpha = 1; // Reset alpha after drawing the enemy
  }
}
