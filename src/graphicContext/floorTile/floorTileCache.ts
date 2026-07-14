const floorTileCache = new Map<string, string>();

export function getFloorTileSprite(x: number, y: number): string {
  const cacheKey = `${x},${y}`;
  if (floorTileCache.has(cacheKey)) {
    return floorTileCache.get(cacheKey)!;
  }

  const seed = (x * 73856093) ^ (y * 19349663); // Simple hash function for coordinates
  const pseudo = Math.abs(Math.sin(seed) * 10000);
  const random = pseudo - Math.floor(pseudo);

  let spriteKey: string;
  if (random < 0.2) {
    const variant = Math.floor(random * 40) % 4; // Random number between 0 and 3
    spriteKey = `floor-${variant + 2}`;
  } else {
    spriteKey = "floor-1";
  }
  floorTileCache.set(cacheKey, spriteKey);
  return spriteKey;
}

export function clearFloorTileCache(): void {
  floorTileCache.clear();
}
