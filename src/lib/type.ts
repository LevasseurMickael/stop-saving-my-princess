// =======================
// Core gameplay types
// =======================

// Types for game entities and mechanics
export type Enemy = {
  x: number;
  y: number;
  stunnedTurns?: number; // number of turns the enemy is stunned
  hp: number;
  alive: boolean;
  pattern: string;
};

// Player type is defined in player.ts to avoid circular dependencies
export type Direction = "up" | "down" | "left" | "right";

// Secret conditions and related types
export type Room = { x: number; y: number; w: number; h: number };

export type SecretWall = { x: number; y: number; revealed: boolean };

// =======================
// Core gameplay types
// =======================

// Event types for game actions and conditions for secrets
export type GameEvent =
  | { type: "move"; x: number; y: number }
  | { type: "attack"; direction: Direction }
  | { type: "shield_deploy" }
  | { type: "shield_retract" }
  | { type: "shield_active" }
  | { type: "wait" }
  | { type: "enemy_hit"; blocker: boolean }
  | { type: "enemy_kill" }
  | { type: "turn_end" };

// =======================
// Secret conditions
// =======================

// Conditions for unlocking secrets based on player actions, positions, and game events
export type PositionCondition =
  | { kind: "on_tile"; x: number; y: number }
  | { kind: "adjacent_to"; x: number; y: number }
  | { kind: "facing_wall"; x: number; y: number };

// Action conditions for secrets based on player actions and states
export type ActionCondition =
  | { kind: "attack"; direction?: Direction }
  | { kind: "shield"; state: "deploying" | "active" | "retracting" }
  | { kind: "wait" };

// Context conditions for secrets that depend on specific game contexts or interactions
export type ContextCondition =
  | { kind: "block_hit" }
  | { kind: "knockback_into_wall" };

// General condition type that encompasses all specific condition types for secrets
export type SecretCondition =
  | PositionCondition
  | ActionCondition
  | SequenceCondition
  | ContextCondition;

// Sequence conditions for secrets that require a specific sequence of actions or events
export type SequenceCondition = {
  kind: "sequence";
  steps: SecretCondition[];
};

// =======================
// Floor secret
// =======================

// Type for floor secrets that includes the floor number, tier, hint, condition for unlocking, and unlocked state
export type FloorSecret = {
  floor: number;
  tier: 1 | 2 | 3;
  hint: string;
  condition: SecretCondition;
  unlocked: boolean;
};

// Type for secret hint walls that includes position, floor, hint, tier, and revealed state
export type SecretHintWall = {
  x: number;
  y: number;
  floor: number;
  hint: string;
  tier: 1 | 2 | 3;
  revealed: boolean;
};
