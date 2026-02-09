import type { Enemy } from "../lib/type";

const MaxFloors = 25;

export const state = {
  // Dungeon related
  currentFloor: 0,
  floorState: "0".repeat(MaxFloors),
  runSeed: Date.now(), // Unique seed for each run

  // stats and progression
  kills: 0,
  hasSecretItem: false,
  deathCount: 0,
  secretUnlocked: false,

  // dynamic entities
  enemies: [] as Enemy[],
  secrets: [] as { x: number; y: number; unlocked: boolean }[],

  // player related
  spawn: { x: 0, y: 0 },
  hp: 5,
  maxHp: 5,

  // turn management
  turn: "player" as "player" | "enemies",
};
