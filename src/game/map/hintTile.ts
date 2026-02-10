import type { Room, SecretHintWall } from "../../lib/type";
import { state } from "../state";
import { map } from "./map";

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
            candidates.push({ x, y });
          }
        }
      }
    }
  }

  if (candidates.length === 0) return null;

  const choice = candidates[Math.floor(Math.random() * candidates.length)];

  // Mark hint tile on the map
  map[choice.y][choice.x] = 4;

  const newWall: SecretHintWall = {
    x: choice.x,
    y: choice.y,
    floor,
    hint,
    tier,
    revealed: false,
  };
  state.hintWall.push(newWall);
  return newWall;
}

export function checkHintTile(
  playerX: number,
  playerY: number,
  hintTiles: SecretHintWall[],
) {
  for (const wall of hintTiles) {
    if (Math.abs(playerX - wall.x) <= 1 && Math.abs(playerY - wall.y) === 1) {
      if (!wall.revealed) {
        wall.revealed = true;
        console.log(`Hint: ${wall.hint}`);
      }
    }
  }
}
