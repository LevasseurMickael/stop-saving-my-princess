// =======================
// Core gameplay types
// =======================

import type { statePlayer } from "../game/state";

// Types for game entities and mechanics
export type Enemy = {
  x: number;
  y: number;
  stunnedTurns?: number; // number of turns the enemy is stunned
  maxHp: number;
  hp: number;
  attack: number;
  attackRange: number;
  attackWeapon: string;
  facing: Direction;
  actionPerTurn: number;
  attackChargeTurn: number;
  attackChargeTurnMax: number;
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
  isVisible: boolean;
  difficulty: number;
  maxHp: number;
  hp: number;
  attack: number;
  attackRange: number;
  attackWeapon: string;
  specialFloor: string;
  facing: Direction;
  actionPerTurn: number;
  attackChargeTurn: number;
  attackChargeTurnMax: number;
};

export type SecretItem = {
  floor: number;
  name: string;
  type:
    | "unlockedSkills"
    | "unlockedItems"
    | "reducedDamage"
    | "stat"
    | "unlockedPassives";
  effect: string;
  value: number | true;
  description: string;
};

export type statePlayer = {
  spawn: { x: number; y: number };
  stat: {
    hp: number;
    maxHp: number;
    attack: number;
    attackRange: number;
    resurectionCount: number;
  };
  unlockedSkills: {
    stunEnemyOncePerFloor: boolean;
    fireBreathOncePerFloor: boolean;
  };
  unlockedPassives: {
    reducedDetection: boolean;
    dungeonmapFragment: boolean;
    canSeeHintWalls: boolean;
    canSeeExits: boolean;
    reduceEnemyActionSpeed: boolean;
    canPushEnemiesBehind: boolean;
    normalDamageToGhosts: boolean;
    ghostDamageNegation: boolean;
    AreaDamageOnAttack: boolean;
    reduceDamageOncePerFloor: boolean;
    negateMagicOncePerFloor: boolean;
    damageEnemyOnFirstDamageTakenPerFloor: boolean;
    fearLowLevelEnemies: boolean;
    extraDamageWhenLowHp: boolean;
    emptyChest: boolean;
  };
  skillUsedThisFloor: {
    stunEnemyOncePerFloor: boolean;
    fireBreathOncePerFloor: boolean;
  };
  unlockedItems: {
    keyLevel: number;
    ghostVisionLevel: number;
    moreHealFromSanctuary: number;
  };
  reducedDamage: {
    physical: number;
    ranged: number;
    magic: number;
    ghost: number;
    vermin: number;
    livingArmor: number;
    royalGuard: number;
  };
  deathCount: number;
  x: number;
  y: number;
  facing: Direction;
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
  doorLevel: number; // 0 = no door, 1 = basic door, 2 = iron door, 3 = silver door, 4 = arcane seal, 5 = royal lock
};

// =======================
// Core gameplay types
// =======================

// Event types for game actions and conditions for secrets
export type GameEvent =
  | { type: "move"; x: number; y: number }
  | { type: "wait"; turns: number }
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
  | { kind: "enemy_kill"; slug: string; count: number }
  | { kind: "no_enemy_alive" }
  | { kind: "took_damage"; blocked?: boolean }
  | { kind: "did_not_move"; turns: number }
  | { kind: "different_walls_attacked"; count: number }
  | { kind: "wait"; turns: number };

export type SkillCondition =
  | { kind: "has_skill"; skill: keyof typeof statePlayer.unlockedSkills }
  | { kind: "use_skill"; skill: keyof typeof statePlayer.skillUsedThisFloor }
  | {
      kind: "kill_with_skill";
      skill: keyof typeof statePlayer.unlockedSkills;
      count: number;
    };

export type HealingRoomCondition =
  | { kind: "find_healing_room" }
  | { kind: "heal_at_full_hp" }
  | { kind: "unlock_healing_door"; doorLevel: number };

export type ItemCondition =
  | { kind: "has_key_level"; level: number }
  | { kind: "has_ghost_vision"; level: number }
  | { kind: "open_door_with_key"; keyLevel: number };

export type PatternCondition = { kind: "attack_corners"; count: number };

export type movementPattern =
  | { kind: "move_pattern"; pattern: "square"; size: number }
  | {
      kind: "move_pattern";
      pattern: "L-shape";
      direction: "normal" | "inverted" | "flipped" | "mirror";
    }
  | {
      kind: "move_pattern";
      pattern: "zigzag";
      axis: "horizontal" | "vertical";
      count: number;
    }
  | { kind: "move_pattern"; pattern: "spiral"; clockwise: boolean };

export type FamilyCondition =
  | { kind: "kill_family"; family: string; count: number }
  | { kind: "kill_all_family_types"; family: string }
  | { kind: "no_damage_from_family"; family: string };

// Meta conditions for secrets that depend on broader game states or progression
export type MetaCondition = { kind: "repeat_floor_condition"; floor: number };

// General condition type that encompasses all specific condition types for secrets
export type SecretCondition =
  | PositionCondition
  | ActionCondition
  | SequenceCondition
  | AllRoomCondition
  | ContextCondition
  | MetaCondition
  | HealingRoomCondition
  | ItemCondition
  | PatternCondition
  | FamilyCondition
  | movementPattern
  | SkillCondition;

// Sequence conditions for secrets that require a specific sequence of actions or events
export type SequenceCondition = {
  kind: "sequence";
  steps: SecretCondition[];
};

export type AllRoomCondition = {
  kind: "visit_all_rooms";
  steps: SecretCondition[];
};

// =======================
// Floor secret
// =======================

// Type for floor secrets that includes the floor number, tier, hint, condition for unlocking, and unlocked state
export type FloorSecret = {
  floor: number;
  tier: 1 | 2 | 3 | 4;
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
  tier: 1 | 2 | 3 | 4;
  revealed: boolean;
};
