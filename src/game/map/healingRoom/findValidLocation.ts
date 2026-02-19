export function findValidHealingRoomLocation(
  map: number[][],
  rand: () => number,
): {
  x: number;
  y: number;
  direction: "up" | "down" | "left" | "right";
} | null {
  const roomCandidates: {
    x: number;
    y: number;
    direction: "up" | "down" | "left" | "right";
  }[] = [];

  const width = map[0].length;
  const height = map.length;

  const roomWidth = 3; // Width of the corridor leading to the healing room
  const roomHeight = 2; // Height of the healing room

  for (let y = 3; y < height - 3; y++) {
    for (let x = 3; x < width - 3; x++) {
      if (
        map[y][x] === 0 &&
        canPlaceRoom(map, x - 1, y - roomHeight - 1, roomWidth, roomHeight)
      ) {
        roomCandidates.push({ x, y: y - 1, direction: "up" });
      }
      if (
        map[y][x] === 0 &&
        canPlaceRoom(map, x - 1, y + 1, roomWidth, roomHeight)
      ) {
        roomCandidates.push({ x, y: y + 1, direction: "down" });
      }
      if (
        map[y][x] === 0 &&
        canPlaceRoom(map, x - roomWidth - 1, y - 1, roomWidth, roomHeight)
      ) {
        roomCandidates.push({ x: x - 1, y, direction: "left" });
      }
      if (
        map[y][x] === 0 &&
        canPlaceRoom(map, x + 1, y - 1, roomWidth, roomHeight)
      ) {
        roomCandidates.push({ x: x + 1, y, direction: "right" });
      }
    }
  }

  if (roomCandidates.length === 0) return null;

  return roomCandidates[Math.floor(rand() * roomCandidates.length)];
}

export function canPlaceRoom(
  map: number[][],
  x: number,
  y: number,
  width: number,
  height: number,
): boolean {
  if (
    x < 1 ||
    y < 1 ||
    x + width >= map[0].length - 1 ||
    y + height >= map.length - 1
  ) {
    return false; // Out of bounds
  }

  for (let dy = -1; dy <= height; dy++) {
    for (let dx = -1; dx <= width; dx++) {
      const tile = map[y + dy]?.[x + dx];
      if (tile !== 1) {
        return false; // Not a solid wall, can't place room here
      }
    }
  }

  return true;
}
