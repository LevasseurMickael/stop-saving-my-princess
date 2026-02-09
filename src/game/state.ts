import type { Enemy } from "../lib/type";

const MaxFloors = 25;

export const state = {
  currentFloor: 0,
  floorState: "0".repeat(MaxFloors),
  kills: 0,
  hasSecretItem: false,
  deathCount: 0,
  secretUnlocked: false,
  enemies: [] as Enemy[],
  secrets: [] as { x: number; y: number; unlocked: boolean }[],
  spawn: { x: 0, y: 0 },
};
