import type { Enemy, SecretHintWall, GameEvent, Direction } from "../lib/type";

const MaxFloors = 25;

export const state = {};

// Dungeon related state, separated for clarity and potential future expansion
export const stateDungeon = {
  currentFloor: 0,
  floorState: "0".repeat(MaxFloors),
  runSeed: Date.now(), // Unique seed for each run
};

// Secret related state, separated for clarity and potential future expansion
export const stateSecret = {
  eventHistory: [] as GameEvent[],
  turnCounter: 0,
  hintWall: [] as SecretHintWall[],
};

// Player related state, separated for clarity and potential future expansion
export const statePlayer = {
  spawn: { x: 0, y: 0 },
  hp: 5,
  maxHp: 5,
  deathCount: 0,
  x: 0,
  y: 0,
  facing: "down" as Direction,
};

// Shield state for managing shield mechanics and interactions
export const stateShield = {
  shield: {
    state: "retracted" as "retracted" | "deploying" | "active" | "retracting",
  },
};

// Dynamic entities and secrets that change during gameplay
export const stateDynamic = {
  enemies: [] as Enemy[],
  secrets: [] as { x: number; y: number; unlocked: boolean }[],
};

// Turn management state to control flow between player and enemy actions
export const stateTurn = {
  turn: "player" as "player" | "enemies",
};

// Stats and progression related state, separated for clarity and potential future expansion
export const stateStats = {
  kills: 0,
  hasSecretItem: false,
  secretUnlocked: false,
};
