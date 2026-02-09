import type { Enemy, Room } from "../../lib/type";

export function secretRoom(rooms: Room[], enemies: Enemy[]) {
  const secrets: { x: number; y: number; unlocked: boolean }[] = [];

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    // Skip the first room (starting room)
    if (i === 0) continue;

    // 50% chance to have a secret room
    if (Math.random() < 0.5) {
      let x: number, y: number;
      do {
        x = room.x + Math.floor(Math.random() * room.w);
        y = room.y + Math.floor(Math.random() * room.h);
      } while (enemies.some((e) => e.x === x && e.y === y));
      secrets.push({ x, y, unlocked: false });
    }
  }

  return secrets;
}
