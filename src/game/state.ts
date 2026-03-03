import type {
  Enemy,
  SecretHintWall,
  GameEvent,
  Direction,
  HealingRoom,
  SecretRoom,
} from "../lib/type";

const MaxFloors = 50; // Maximum number of floors in the game, used for initializing floor state

// Dungeon related state, separated for clarity and potential future expansion
export const stateDungeon = {
  currentFloor: 31,
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
    attack: 99999,
    attackRange: 1,
    resurectionCount: 0,
  },

  // Track unlocked skills separately for clarity and potential future mechanics that interact with specific unlocks
  unlockedSkills: {
    stunEnemyOncePerFloor: false, // from Smoke Breath
    fireBreathOncePerFloor: true, // from Dragon's Breath
  },

  unlockedPassives: {
    AreaDamageOnAttack: false, // # From Flame Pulse
    canPushEnemiesBehind: false, // # From Heavy Tail
    canSeeExits: true, // # From True Sight Orb, allows player to see exit location on the map
    canSeeHintWalls: true, // # From Owl Beak, allows player to see hint walls on the map
    damageEnemyOnFirstDamageTakenPerFloor: false, // # From Vengeful Spirit
    dungeonmapFragment: true, // # From Dungeon Map Fragment, reveals part of the map for the current floor
    emptyChest: false, // TODO from Empty Chest, has no effect but is required for certain secrets
    extraDamageWhenLowHp: false, // # From Ancient Dominance
    fearLowLevelEnemies: false, // # From Ancient Roar
    ghostDamageNegation: false, // # From Ethereal Scales
    negateMagicOncePerFloor: false, // # From Runic Barrier
    normalDamageToGhosts: false, // # From Soul Claw
    reduceDamageOncePerFloor: false, // # From Hardened Scales
    reducedDetection: false, // # From Shadow Veil, reduces chance of being detected by traps and certain enemies
    reduceEnemyActionSpeed: false, // # From War Discipline, reduces enemy action speed by 1 turn
  },

  // Track unlocked passives and their effects separately for clarity and potential future mechanics that interact with specific unlocks
  passiveOncePerFloorUsed: {
    negateDamegeOncePerFloor: true,
    negateMagicOncePerFloor: true,
    firstDamageTakenOncePerFloor: true,
  },

  // Track unlocked skills and their effects separately for clarity and potential future mechanics that interact with specific unlocks
  skillUsedThisFloor: {
    stunEnemyOncePerFloor: true,
    fireBreathOncePerFloor: true,
  },

  // Track unlocked items and their effects separately for clarity and potential future mechanics that interact with specific unlocks
  unlockedItems: {
    keyLevel: 5, // 0 = no keys, 1 = basic doors, 2 = iron doors, 3 = silver doors, 4 = arcane seals, 5 = royal locks
    ghostVisionLevel: 5, // 0 = no ghost vision, 1 = see nearby ghosts from Spectral Lantern, 2 = see all ghosts in the same room from Spectral Eye, 3 = ghosts always visible from Phantom Lantern
    moreHealFromSanctuary: 0.1, // 0 = no heal, 2 = heal 2 on new floor HP from Ancient Roost
  },

  // Track various types of damage reduction separately for clarity and potential future mechanics that interact with specific types
  reducedDamage: {
    type: {
      melee: 0,
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
  secretRoom: null as SecretRoom | null,
  chest: false, // Track if the chest on the current floor has been opened for conditions that require it
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
