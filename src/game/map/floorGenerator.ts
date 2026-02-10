import { GridSize } from "./map";

// Simple procedural floor generator using a seed
export function generateFloor(seed: number) {
  const map = Array.from({ length: GridSize }, () => Array(GridSize).fill(0));

  // Simple procedural generation using the seed
  for (let y = 0; y < GridSize; y++) {
    for (let x = 0; x < GridSize; x++) {
      if (x === 0 || x === GridSize - 1 || y === 0 || y === GridSize - 1) {
        map[y][x] = 1; // Wall
      }
    }
  }

  const blocks = 4 + (seed % 3); // Number of blocks based on seed

  for (let i = 0; i < blocks; i++) {
    const x = 2 + ((seed * (i + 3)) % (GridSize - 4));
    const y = 2 + ((seed * (i + 7)) % (GridSize - 4));
    map[y][x] = 1; // Add a block
  }

  map[GridSize - 2][GridSize - 2] = 3; // stairs

  return map;
}
