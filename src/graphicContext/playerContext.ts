// src/graphicContext/playerContext.ts

import { stateDungeon,  } from "../game/state";
import { drawSprite } from "./drawSprite";

export function getPlayerSprite(
  ctx: CanvasRenderingContext2D,
  statePlayer: { 
    x: number; 
    y: number; 
    animX: number;      // ← AJOUTER
    animY: number;      // ← AJOUTER
    facing: string; 
    floor0StartTime: number;  // ← AJOUTER
  },
  TileSize: number,
) {
  const spriteKey = "player";
  
  if (stateDungeon.currentFloor === 0) {
    const elapsedMs = Date.now() - statePlayer.floor0StartTime;
    const visibleMs = 5000; // 5 secondes
    const fadeOutMs = 2000; // 2 secondes de fade-out

    // Calculer l'opacité
    let auraOpacity = 1;
    if (elapsedMs > visibleMs) {
      const fadeProgress = (elapsedMs - visibleMs) / fadeOutMs;
      auraOpacity = Math.max(0, 1 - fadeProgress);
    }

    // Dessiner l'aura si visible
    if (auraOpacity > 0) {
      const pulse = (Math.sin(Date.now() / 500) + 1) / 2; // 0 à 1
      const size = 5 + pulse * 5; // 5 à 10 pixels

      ctx.strokeStyle = `rgba(255, 255, 0, ${(0.8 - pulse * 0.3) * auraOpacity})`;
      ctx.lineWidth = 5 + pulse;
      ctx.beginPath();
      ctx.arc(
        statePlayer.animX * TileSize + TileSize / 2,
        statePlayer.animY * TileSize + TileSize / 2,
        TileSize / 2 + size,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }
  }
  
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