import { allSpriteObject } from "./all_sprite/allSpriteObject";
import { getCachedImage } from "./imageLoader";

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  spriteKey: string,
  x: number,
  y: number,
  tileSize: number,
): void {
  const sprite = allSpriteObject[spriteKey];
  if (!sprite) {
    console.warn(`Sprite with key "${spriteKey}" not found.`);
    return;
  }

  const image = getCachedImage(sprite.sheetSrc);
  if (!image) {
    console.warn(`Image for sprite "${spriteKey}" not loaded yet.`);
    return;
  }

  ctx.drawImage(
    image,
    sprite.x,
    sprite.y,
    sprite.width,
    sprite.height,
    x * tileSize,
    y * tileSize,
    tileSize,
    tileSize,
  );
}
