// This file contains the function to draw the player on the canvas, it is imported in main.ts to keep the code organized and maintainable.

import { drawSprite } from "./drawSprite";

export function getPlayerSprite(
  ctx: CanvasRenderingContext2D,
  statePlayer: { x: number; y: number; facing: string },
  TileSize: number,
) {
  const spriteKey = "player";
  if (spriteKey) {
    drawSprite(
      ctx,
      spriteKey,
      statePlayer.x,
      statePlayer.y,
      TileSize,
      statePlayer.facing,
    );
  } else {
    ctx.fillStyle = "blue";
    ctx.fillRect(
      statePlayer.x * TileSize,
      statePlayer.y * TileSize,
      TileSize,
      TileSize,
    );
  }
}

export function getPlayerAttackSprite(
  ctx: CanvasRenderingContext2D,
  statePlayer: { x: number; y: number; facing: string },
  TileSize: number,
) {
  ctx.fillStyle = "rgba(134, 106, 11, 0.97)";
  ctx.fillRect(
    (statePlayer.x +
      (statePlayer.facing === "right"
        ? 1
        : statePlayer.facing === "left"
          ? -1
          : 0)) *
      TileSize,
    (statePlayer.y +
      (statePlayer.facing === "down"
        ? 1
        : statePlayer.facing === "up"
          ? -1
          : 0)) *
      TileSize,
    TileSize,
    TileSize,
  );
}
