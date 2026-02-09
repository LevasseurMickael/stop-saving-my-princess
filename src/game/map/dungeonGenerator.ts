import { GridSize } from "./map";
import { player } from "../player";
import { rng } from "../rng";
import type { Room } from "../../lib/type";

function intersects(a: Room, b: Room) {
  return !(
    a.x + a.w <= b.x ||
    a.x >= b.x + b.w ||
    a.y + a.h <= b.y ||
    a.y >= b.y + b.h
  );
}

export function generateDungeon(seed: number) {
  // Start with all walls
  const map = Array.from({ length: GridSize }, () => Array(GridSize).fill(1));
  console.log("Generating dungeon with seed:", seed);

  const rand = rng(seed);
  const rooms: Room[] = [];

  // 3-5 rooms
  const roomCount = 5 + Math.floor(rand() * 3);

  for (let i = 0; i < roomCount; i++) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 10) {
      const w = 3 + Math.floor(rand() * 4); // Room width 3-6
      const h = 3 + Math.floor(rand() * 4); // Room height 3-6
      const x = 2 + Math.floor(rand() * (GridSize - w - 4)); // Ensure room fits within borders
      const y = 2 + Math.floor(rand() * (GridSize - h - 4));

      const room = { x, y, w, h };

      const expanded: Room = {
        x: room.x - 1,
        y: room.y - 1,
        w: room.w + 2,
        h: room.h + 2,
      };

      if (!rooms.some((r) => intersects(expanded, r))) {
        rooms.push(room);
        // Carve out the room
        for (let ry = y; ry < y + h; ry++) {
          for (let rx = x; rx < x + w; rx++) {
            map[ry][rx] = 0; // Empty space
          }
        }
        placed = true;
      }
      attempts++;
    }
  }

  // Connect rooms with corridors
  for (let i = 1; i < rooms.length; i++) {
    const a = rooms[i - 1];
    const b = rooms[i];

    const ax = a.x + Math.floor(a.w / 2);
    const ay = a.y + Math.floor(a.h / 2);
    const bx = b.x + Math.floor(b.w / 2);
    const by = b.y + Math.floor(b.h / 2);

    // Horizontal corridor
    for (let x = Math.min(ax, bx); x <= Math.max(ax, bx); x++) {
      map[ay][x] = 0;
    }
    // Vertical corridor
    for (let y = Math.min(ay, by); y <= Math.max(ay, by); y++) {
      map[y][bx] = 0;
    }
  }

  // Place stairs in the last room
  const lastRoom = rooms[rooms.length - 1];
  map[lastRoom.y + 1][lastRoom.x + 1] = 3;

  const spawnPlayerRoom = rooms[0];
  player.x = spawnPlayerRoom.x + Math.floor(spawnPlayerRoom.w / 2);
  player.y = spawnPlayerRoom.y + Math.floor(spawnPlayerRoom.h / 2);

  return { map, spawn: { x: player.x, y: player.y }, rooms };
}
