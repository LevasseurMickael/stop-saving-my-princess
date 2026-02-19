import type { Room, SecretHintWall } from "../../lib/type";
import { stateDynamic, stateSecret } from "../state";
import { map } from "./map";

function isInHealingRoom(x: number, y: number): boolean {
  const healingRoom = stateDynamic.healingRoom;
  if (!healingRoom) return false;

  const distance = Math.abs(x - healingRoom.x) + Math.abs(y - healingRoom.y);
  return distance <= 4; // Player is on or adjacent to the healing room center
}

// Create a hint tile in a random valid location within the given rooms
export function createHintTile(
  floor: number,
  tier: 1 | 2 | 3,
  hint: string,
  rooms: Room[],
): SecretHintWall | null {
  const candidates: { x: number; y: number }[] = [];

  for (const room of rooms) {
    for (let x = room.x - 1; x <= room.x + room.w; x++) {
      for (let y = room.y - 1; y <= room.y + room.h; y++) {
        if (map[y]?.[x] === 1) {
          const adjacentEmpty = [
            map[y - 1]?.[x],
            map[y + 1]?.[x],
            map[y]?.[x - 1],
            map[y]?.[x + 1],
          ].some((tile) => tile === 0);

          if (adjacentEmpty) {
            // Vérifier qu'on n'est pas proche de la healing room
            if (!isInHealingRoom(x, y)) {
              candidates.push({ x, y });
            }
          }
        }
      }
    }
  }

  if (candidates.length === 0) return null;

  const choice = candidates[Math.floor(Math.random() * candidates.length)];

  // Mark the chosen tile as a hint wall (using tile type 4) on the map
  map[choice.y][choice.x] = 4;

  // Create a new SecretHintWall object with the chosen coordinates, floor, hint text, tier, and revealed state, and add it to the stateSecret.hintWall array for tracking
  const newWall: SecretHintWall = {
    x: choice.x,
    y: choice.y,
    floor,
    hint,
    tier,
    revealed: false,
  };
  stateSecret.hintWall.push(newWall);
  return newWall;
}

// Hint is shown if the player is adjacent to the hint wall
export function checkHintTile(
  playerX: number,
  playerY: number,
  hintTiles: SecretHintWall[],
) {
  for (const wall of hintTiles) {
    if (
      (playerX === wall.x && Math.abs(playerY - wall.y) === 1) ||
      (playerY === wall.y && Math.abs(playerX - wall.x) === 1)
    ) {
      if (!wall.revealed) {
        wall.revealed = true;
        console.log(`Hint: ${wall.hint}`);
      }
    }
  }
}
