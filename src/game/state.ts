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
  completedFloors: [] as number[],
  enemies: [] as Enemy[],
};

// Player related state, separated for clarity and potential future expansion
export const statePlayer = {
  spawn: { x: 0, y: 0 },
  hp: 5,
  maxHp: 5,
  attack: 1,
  attackRange: 1,
  resurectionCount: 0,

  // Track unlocked skills separately for clarity and potential future mechanics that interact with specific unlocks
  unlockedSkills: {
    stunEnemyOncePerFloor: false, // from Smoke Breath
    fireBreathOncePerFloor: false, // from Dragon's Breath
    canPushEnemiesBehind: false, // from Heavy Tail
    normalDamageToGhosts: false, // from Soul Claw
    ghostDamageNegation: false, // from Ethereal Scales
    AreaDamageOnAttack: false, // from Flame Pulse
    reduceDamageOncePerFloor: false, // from Hardened Scales
    negateMagicOncePerFloor: false, // from Runic Barrier
    damageEnemyOnFirstDamageTakenPerFloor: false, // from Vengeful Spirit
    fearLowLevelEnemies: false, // from Ancient Roar
    extraDamageWhenLowHp: false, // from Ancient Dominance
  },

  // Track unlocked items and their effects separately for clarity and potential future mechanics that interact with specific unlocks
  unlockedItems: {
    keyLevel: 0, // 0 = no keys, 1 = basic doors, 2 = iron doors, 3 = silver doors, 4 = arcane seals, 5 = royal locks
    ghostVisionLevel: 0, // 0 = no ghost vision, 1 = see nearby ghosts from Spectral Lantern, 2 = see all ghosts in the same room from Spectral Eye, 3 = ghosts always visible from Phantom Lantern
    healOnNewFloor: 0, // 0 = no heal, 2 = heal 2 on new floor HP from Ancient Roost
    reducedDetection: false, // from Shadow Veil, reduces chance of being detected by traps and certain enemies
    dungeonmapFragment: false, // from Dungeon Map Fragment, reveals part of the map for the current floor
    canSeeHintWalls: false, // from Owl Beak, allows player to see hint walls on the map
    canSeeExits: false, // from True Sight Orb, allows player to see exit location on the map
  },
  // Track various types of damage reduction separately for clarity and potential future mechanics that interact with specific types
  reducedDamage: {
    physical: 0,
    ranged: 0,
    magic: 0,
    ghost: 0,
    vermin: 0,
    royalGuard: 0,
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
};

// Turn management state to control flow between player and enemy actions
export const stateTurn = {
  turn: "player" as "player" | "enemies",
};

// Stats and progression related state, separated for clarity and potential future expansion
export const stateStats = {
  monsterStatReduction: {
    reduceEnemyActionSpeed: false, // from War Discipline, reduces enemy action speed by 1 turn
    livingArmorHp: 0,
  },
  enemyKillCount: {
    // Slime family kill counts for tracking progression towards certain unlocks or achievements
    greenSlime: 0,
    redSlime: 0,
    crystalSlime: 0,
    venomSlime: 0,

    // Vermin family kill counts for tracking progression towards certain unlocks or achievements
    caveRat: 0,
    shadowBat: 0,
    fireBeetle: 0,
    tunnelSpider: 0,

    // Undead family kill counts for tracking progression towards certain unlocks or achievements
    skeleton: 0,
    wraith: 0,
    boneArcher: 0,
    rottingChampion: 0,

    // Ghost family kill counts for tracking progression towards certain unlocks or achievements
    lostSpirit: 0,
    cryingSpecter: 0,
    phantomKnight: 0,

    // Mage family kill counts for tracking progression towards certain unlocks or achievements
    cultMage: 0,
    arcaneSentinel: 0,
    hexBinder: 0,

    // Living armor kill counts for tracking progression towards certain unlocks or achievements
    rustyArmor: 0,
    royalGuardArmor: 0,
    cursedHalberdArmor: 0,

    // Royal family kill counts for tracking progression towards certain unlocks or achievements
    knightRecruit: 0,
    royalArcher: 0,
    royalSpearmaster: 0,
    templarCaptain: 0,
  },
  hasSecretItem: false,
  secretUnlocked: false,
};
