// =======================
// Core gameplay types
// =======================

// Types for game entities and mechanics
export type Enemy = {
  x: number;
  y: number;
  stunnedTurns?: number; // number of turns the enemy is stunned
  hp: number;
  attack: number;
  attackRange: number;
  attackWeapon: string;
  facing: Direction;
  actionPerTurn: number;
  alive: boolean;
  pattern: string;
  name?: string;
  slug?: string;
  monsterFamilly?: string;
  difficulty?: number;
  specialFloor?: string;
};

export type Monster = {
  name: string;
  slug: string;
  monsterFamilly: string;
  difficulty: number;
  hp: number;
  attack: number;
  attackRange: number;
  attackWeapon: string;
  specialFloor: string;
  facing: Direction;
  actionPerTurn: number;
};

export type SecretItem = {
  floor: number;
  name: string;
  type: "passive" | "usable" | "key" | "stat" | "utility" | "vision";
  effect: string;
  value: number | null;
  description: string;
};

// Player type is defined in player.ts to avoid circular dependencies
export type Direction = "up" | "down" | "left" | "right";

// Secret conditions and related types
export type Room = { x: number; y: number; w: number; h: number };

export type SecretWall = { x: number; y: number; revealed: boolean };

export type SaveGame = {
  dungeon: {
    currentFloor: number;
    floorState: string;
    runSeed: number;
  };
  player: {
    hp: number;
    maxHp: number;
    deathCount: number;
  };
  stats: {
    kills: number;
    hasSecretItem: boolean;
  };
};

export type HealingRoom = {
  x: number; //
  y: number;
  roomIndex: number;
  doorX: number;
  doorY: number;
  isUnlocked: boolean;
};

// =======================
// Core gameplay types
// =======================

// Event types for game actions and conditions for secrets
export type GameEvent =
  | { type: "move"; x: number; y: number }
  | {
      type: "attack";
      direction: Direction;
      target: TargetCondition;
      targetX: number;
      targetY: number;
    }
  | { type: "shield_deploying"; facingX: number; facingY: number }
  | { type: "shield_retracting" }
  | { type: "shield_active" }
  | { type: "enemy_hit"; blocker: boolean }
  | { type: "enemy_kill" };

// =======================
// Secret conditions
// =======================

// Conditions for unlocking secrets based on player actions, positions, and game events
export type PositionCondition =
  | { kind: "on_tile"; tile: number }
  | { kind: "on_spawn" }
  | { kind: "adjacent_to"; tile: number }
  | { kind: "facing_tile"; tile: number }
  | { kind: "enemy_nearby"; distance: number };

export type TargetCondition = "wall" | "enemy" | "empty" | "stair";

// Action conditions for secrets based on player actions and states
export type ActionCondition =
  | { kind: "attack"; direction?: Direction; target?: TargetCondition }
  | {
      kind: "shield";
      state: "deploying" | "active" | "retracting";
      facing?: TargetCondition;
    }
  | { kind: "move"; steps: number; along?: TargetCondition };

// Context conditions for secrets that depend on specific game contexts or interactions
export type ContextCondition =
  | { kind: "enemy_present" }
  | { kind: "enemy_killed_last" }
  | { kind: "no_enemy_alive" }
  | { kind: "took_damage"; blocked?: boolean }
  | { kind: "did_not_move"; turns: number }
  | { kind: "different_walls_attacked"; count: number };

// Meta conditions for secrets that depend on broader game states or progression
export type MetaCondition = { kind: "repeat_floor_condition"; floor: number };

// General condition type that encompasses all specific condition types for secrets
export type SecretCondition =
  | PositionCondition
  | ActionCondition
  | SequenceCondition
  | ContextCondition
  | MetaCondition;

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
