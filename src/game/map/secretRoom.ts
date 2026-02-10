export function findSecretRoom(map: number[][]) {
  // Find all wall tiles adjacent to empty space, pick one randomly as secret room entrance
  const canditates: { x: number; y: number }[] = [];

  // Check all wall tiles and see if they are adjacent to an empty tile
  const directions = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
  ];

  // Start from 1 and end at length - 1 to avoid out of bounds
  for (let y = 1; y < map.length - 1; y++) {
    for (let x = 1; x < map[y].length - 1; x++) {
      if (map[y][x] !== 1) continue; // Must be a wall

      // Check if adjacent to empty space
      for (const d of directions) {
        if (map[y + d.dy][x + d.dx] === 0) {
          canditates.push({ x, y });
          break;
        }
      }
    }
  }
  // If no candidates found, return null (shouldn't happen in a valid map)
  if (canditates.length === 0) return null;
  // Pick a random candidate as the secret room entrance
  return canditates[Math.floor(Math.random() * canditates.length)];
}
