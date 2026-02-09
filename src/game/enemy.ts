import type { Enemy, Room } from "../lib/type";
import { state } from "./state";

// Enemy can't get on the same tile as other enemies
export function isOccupied(x: number, y: number, self: Enemy) {
  return state.enemies.some(
    (e) => e !== self && e.x === x && e.y === y && e.alive,
  );
}

// pattern stationary, patrol, chase

export function spawnEnemies(
  rooms: Room[],
  spawn: { x: number; y: number },
): Enemy[] {
  const enemies: Enemy[] = [];
  for (let i = 1; i < rooms.length; i++) {
    const room = rooms[i];

    // 1-2 enemies per room
    const enemyCount = 1 + Math.floor(Math.random() * 2);

    for (let j = 0; j < enemyCount; j++) {
      let x: number, y: number;
      do {
        x = room.x + Math.floor(Math.random() * room.w);
        y = room.y + Math.floor(Math.random() * room.h);
      } while (
        enemies.some((e) => e.x === x && e.y === y) ||
        (x === spawn.x && y === spawn.y)
      );
      enemies.push({
        x,
        y,
        alive: true,
        pattern: Math.random() < 0.5 ? "stationary" : "patrol",
      });
    }
  }
  return enemies;
}
