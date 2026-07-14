import { drawSprite } from "./drawSprite";

export const sprites = {
  "player-walk-1": {
    sheetSrc: "./player_sheet.png",
    x: 0,
    y: 0,
    width: 64,
    height: 64,
  },
  "player-walk-2": {
    sheetSrc: "./player_sheet.png",
    x: 64,
    y: 0,
    width: 64,
    height: 64,
  },
  "player-walk-3": {
    sheetSrc: "./player_sheet.png",
    x: 128,
    y: 0,
    width: 64,
    height: 64,
  },
};

let animationFrame = 0;

export function getPlayerSprite(
  ctx: CanvasRenderingContext2D,
  player: any,
  tileSize: number,
) {
  const frame = Math.floor(animationFrame / 10) % 4; // Change frame every 10 ticks
  const spriteKey = `player-walk-${frame}`;

  drawSprite(ctx, spriteKey, player.x, player.y, tileSize);

  animationFrame++;
}
