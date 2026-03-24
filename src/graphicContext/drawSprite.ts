import { allSpriteObject } from "./all_sprite/allSpriteObject";
import { getFacingDirection } from "./all_sprite/facingLogic";
import { getCachedImage } from "./imageLoader";

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  spriteKey: string,
  x: number,
  y: number,
  tileSize: number,
  facing?: string, // Optional facing parameter for directional sprites
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

  const spriteYFacing = facing ? getFacingDirection(facing) : sprite.y; // Default to 0 if facing is not provided

  ctx.drawImage(
    image,
    sprite.x,
    spriteYFacing,
    sprite.width,
    sprite.height,
    x * tileSize,
    y * tileSize,
    tileSize,
    tileSize,
  );
}
