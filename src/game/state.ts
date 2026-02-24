import type {
  Enemy,
  SecretHintWall,
  GameEvent,
  Direction,
  HealingRoom,
} from "../lib/type";

const MaxFloors = 50; // Maximum number of floors in the game, used for initializing floor state

// Dungeon related state, separated for clarity and potential future expansion
export const stateDungeon = {
  currentFloor: 26,
  floorState: "0".repeat(MaxFloors),
  runSeed: Date.now(), // Unique seed for each run
};

// Secret related state, separated for clarity and potential future expansion
export const stateSecret = {
  eventHistory: [] as GameEvent[],
  turnCounter: 0,
  hintWall: [] as SecretHintWall[],
  completedFloors: [] as number[],
  enemies: [] as Enemy[],
  damageFromFamily: {} as Record<string, number>, // Track damage taken from each enemy family for conditions that require it
  healedAtFullHp: false, // Track if the player has healed at full HP for conditions that require it
  visitAllRoom: [] as number[], // Track visited rooms for conditions that require it
  cornersVisited: new Set<string>(), // Track visited corners for conditions that require it, stored as "x,y"
};

// Player related state, separated for clarity and potential future expansion
export const statePlayer = {
  spawn: { x: 0, y: 0 },
  stat: {
    hp: 500,
    maxHp: 500,
    attack: 999999999999999,
    attackRange: 1,
    resurectionCount: 0,
  },

  // Track unlocked skills separately for clarity and potential future mechanics that interact with specific unlocks
  unlockedSkills: {
    stunEnemyOncePerFloor: false, // from Smoke Breath
    fireBreathOncePerFloor: false, // from Dragon's Breath
  },

  unlockedPassives: {
    AreaDamageOnAttack: false, // from Flame Pulse
    canPushEnemiesBehind: false, // from Heavy Tail
    canSeeExits: false, // from True Sight Orb, allows player to see exit location on the map
    canSeeHintWalls: false, // from Owl Beak, allows player to see hint walls on the map
    damageEnemyOnFirstDamageTakenPerFloor: false, // from Vengeful Spirit
    dungeonmapFragment: false, // from Dungeon Map Fragment, reveals part of the map for the current floor
    emptyChest: false, // from Empty Chest, has no effect but is required for certain secrets
    extraDamageWhenLowHp: false, // from Ancient Dominance
    fearLowLevelEnemies: false, // from Ancient Roar
    ghostDamageNegation: false, // from Ethereal Scales
    negateMagicOncePerFloor: false, // from Runic Barrier
    normalDamageToGhosts: false, // from Soul Claw
    reduceDamageOncePerFloor: false, // from Hardened Scales
    reducedDetection: false, // from Shadow Veil, reduces chance of being detected by traps and certain enemies
    reduceEnemyActionSpeed: false, // from War Discipline, reduces enemy action speed by 1 turn
  },

  skillUsedThisFloor: {
    stunEnemyOncePerFloor: false,
    fireBreathOncePerFloor: false,
  },

  // Track unlocked items and their effects separately for clarity and potential future mechanics that interact with specific unlocks
  unlockedItems: {
    keyLevel: 0, // 0 = no keys, 1 = basic doors, 2 = iron doors, 3 = silver doors, 4 = arcane seals, 5 = royal locks
    ghostVisionLevel: 0, // 0 = no ghost vision, 1 = see nearby ghosts from Spectral Lantern, 2 = see all ghosts in the same room from Spectral Eye, 3 = ghosts always visible from Phantom Lantern
    moreHealFromSanctuary: 0, // 0 = no heal, 2 = heal 2 on new floor HP from Ancient Roost
  },

  // Track various types of damage reduction separately for clarity and potential future mechanics that interact with specific types
  reducedDamage: {
    type: {
      physical: 100,
      ranged: 0,
      magic: 0,
    },
    family: {
      ghost: 0,
      vermin: 0,
      "living armor": 0,
      royal: 0,
    },
  },
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
  healingRoom: null as HealingRoom | null,
};

// Turn management state to control flow between player and enemy actions
export const stateTurn = {
  turn: "player" as "player" | "enemies",
};

// Stats and progression related state, separated for clarity and potential future expansion
export const stateStats = {
  hasSecretItem: false,
  secretUnlocked: false,
};

export const stateKillCount: Record<string, number> = {
  // Slime family kill counts for tracking progression towards certain unlocks or achievements
  "green-slime": 0,
  "red-slime": 0,
  "crystal-slime": 0,
  "venom-slime": 0,

  // Vermin family kill counts for tracking progression towards certain unlocks or achievements
  "cave-rat": 0,
  "shadow-bat": 0,
  "fire-beetle": 0,
  "tunnel-spider": 0,

  // Undead family kill counts for tracking progression towards certain unlocks or achievements
  skeleton: 0,
  wraith: 0,
  "bone-archer": 0,
  "rotting-champion": 0,

  // Ghost family kill counts for tracking progression towards certain unlocks or achievements
  "lost-spirit": 0,
  "crying-specter": 0,
  "phantom-knight": 0,

  // Mage family kill counts for tracking progression towards certain unlocks or achievements
  "cult-mage": 0,
  "arcane-sentinel": 0,
  "hex-binder": 0,

  // Living armor kill counts for tracking progression towards certain unlocks or achievements
  "rusty-armor": 0,
  "royal-guard-armor": 0,
  "cursed-halberd-armor": 0,

  // Royal family kill counts for tracking progression towards certain unlocks or achievements
  "knight-recruit": 0,
  "royal-archer": 0,
  "royal-spearmaster": 0,
  "templar-captain": 0,
};
