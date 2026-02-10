import type { Enemy, SecretHintWall, GameEvent } from "../lib/type";

const MaxFloors = 25;

export const state = {
  // Dungeon related
  currentFloor: 0,
  floorState: "0".repeat(MaxFloors),
  runSeed: Date.now(), // Unique seed for each run

  // Stats and progression
  kills: 0,
  hasSecretItem: false,
  deathCount: 0,
  secretUnlocked: false,

  // Dynamic entities
  enemies: [] as Enemy[],
  secrets: [] as { x: number; y: number; unlocked: boolean }[],

  // Player related
  spawn: { x: 0, y: 0 },
  hp: 5,
  maxHp: 5,

  // Turn management
  turn: "player" as "player" | "enemies",

  // Secret related
  eventHistory: [] as GameEvent[],
  turnCounter: 0,
  hintWall: [] as SecretHintWall[],

  // Shield state for managing shield mechanics and interactions
  shield: {
    state: "retracted" as "retracted" | "deploying" | "active" | "retracting",
  },
};
