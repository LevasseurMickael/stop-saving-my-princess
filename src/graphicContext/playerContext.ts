// src/graphicContext/playerContext.ts

import { drawSprite } from "./drawSprite";

export function getPlayerSprite(
  ctx: CanvasRenderingContext2D,
  statePlayer: { 
    x: number; 
    y: number; 
    animX: number;      // ← AJOUTER
    animY: number;      // ← AJOUTER
    facing: string; 
  },
  TileSize: number,
) {
  const spriteKey = "player";
  
  if (spriteKey) {
    drawSprite(
      ctx,
      spriteKey,
      statePlayer.animX,  // ← REMPLACER x par animX
      statePlayer.animY,  // ← REMPLACER y par animY
      TileSize,
      statePlayer.facing,
    );
  } else {
    ctx.fillStyle = "blue";
    ctx.fillRect(
      statePlayer.animX * TileSize,  // ← REMPLACER
      statePlayer.animY * TileSize,  // ← REMPLACER
      TileSize,
      TileSize,
    );
  }
}

export function getPlayerAttackSprite(
  ctx: CanvasRenderingContext2D,
  statePlayer: { 
    x: number; 
    y: number; 
    animX: number;      // ← AJOUTER
    animY: number;      // ← AJOUTER
    facing: string; 
  },
  TileSize: number,
) {
  ctx.fillStyle = "rgba(134, 106, 11, 0.97)";
  ctx.fillRect(
    (statePlayer.animX +  // ← REMPLACER x par animX
      (statePlayer.facing === "right"
        ? 1
        : statePlayer.facing === "left"
        ? -1
        : 0)) *
      TileSize,
    (statePlayer.animY +  // ← REMPLACER y par animY
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