import type { HealingRoom } from "../../../lib/type";
import { findValidHealingRoomLocation } from "./findValidLocation";

export function createHealingRoom(
  map: number[][],
  rand: () => number,
): HealingRoom | null {
  const location = findValidHealingRoomLocation(map, rand);
  if (!location) return null;

  const { x: doorX, y: doorY, direction } = location;

  const roomWidth = 3;
  const roomHeight = 2;

  let roomX: number, roomY: number, healX: number, healY: number;

  switch (direction) {
    case "up":
      roomX = doorX - 1;
      roomY = doorY - roomHeight;
      healX = doorX;
      healY = doorY - roomHeight;
      break;

    case "down":
      roomX = doorX - 1;
      roomY = doorY;
      healX = doorX;
      healY = doorY + roomHeight - 1;
      break;

    case "left":
      roomX = doorX - roomWidth;
      roomY = doorY - 1;
      healX = doorX - roomWidth + 1;
      healY = doorY - 1;
      break;

    case "right":
      roomX = doorX;
      roomY = doorY - 1;
      healX = doorX + roomWidth - 1;
      healY = doorY;
      break;
  }

  // Carve out the healing room
  for (let dy = 0; dy < roomHeight; dy++) {
    for (let dx = 0; dx < roomWidth; dx++) {
      map[roomY + dy][roomX + dx] = 0; // Empty space
    }
  }
  return {
    x: healX,
    y: healY,
    doorX,
    doorY,
    roomIndex: -1, // Will be set later when we find which room this is adjacent to
    isUnlocked: false,
  };
}
