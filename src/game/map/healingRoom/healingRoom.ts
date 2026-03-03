import { tileIndex } from "../../../graphicContext/tile_index";
import type { HealingRoom, SecretRoom } from "../../../lib/type";
import { stateDungeon, stateStats } from "../../state";
import { findValidRoomLocation } from "./findValidLocation";

// Healing room generation logic:
// 1. Scan the map for valid locations to place a healing room (a small 2x3 room connected to a corridor).
// 2. Randomly select one of the valid locations.
// 3. Carve out the healing room in the map and return its details for later use (like placing the healing tile).
export function createRoom(
  map: number[][],
  rand: () => number,
  type: string,
): HealingRoom | null | SecretRoom {
  const location = findValidRoomLocation(map, rand);
  if (!location) return null;
  if (!type) return null;

  const { x: doorX, y: doorY, direction } = location;

  const roomWidth = 3;
  const roomHeight = 2;

  let roomX: number, roomY: number, healX: number, healY: number;

  const doorLevel = doorLevelLogic();

  // Calculate the position of the healing room based on the direction of the corridor it's attached to
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
      map[roomY + dy][roomX + dx] = tileIndex.empty; // Empty space
    }
  }
  if (type === "healingRoom") {
    return {
      x: healX,
      y: healY,
      doorX,
      doorY,
      roomIndex: -1, // Will be set later when we find which room this is adjacent to
      isUnlocked: false,
      doorLevel,
    };
  } else if (type === "secretRoom") {
    return {
      x: healX,
      y: healY,
      doorX,
      doorY,
      roomIndex: -1, // Will be set later when we find which room this is adjacent to
      isUnlocked: false,
      doorLevel,
    };
  }
  return null;
}

function doorLevelLogic() {
  if (stateDungeon.currentFloor < 5) {
    return 0; // Always open door
  } else if (stateDungeon.currentFloor < 14) {
    return 1; // basic door
  } else if (stateDungeon.currentFloor < 24) {
    return 2; // Iron door
  } else if (stateDungeon.currentFloor < 34) {
    return 3; // Silver door
  } else if (stateDungeon.currentFloor < 44) {
    return 4; // arcane seal
  } else {
    return 5; // royal lock
  }
}
