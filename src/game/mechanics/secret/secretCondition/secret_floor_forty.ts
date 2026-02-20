import type { FloorSecret } from "../../../../lib/type";

export const floorToFortyConditions: FloorSecret[] = [
  // =====================
  // TIER 1 — Floors 31–40
  // =====================

  {
    floor: 31,
    tier: 3,
    hint: "« The arcane locks open to the initiated. »",
    unlocked: false,
    condition: {
      kind: "has_key_level",
      level: 4,
    },
  },
  {
    // kill family condition may not be set, require enough royal family monsters to spawn
    floor: 32,
    tier: 3,
    hint: "« The royal guard falls before the dragon. »",
    unlocked: false,
    condition: {
      kind: "kill_family",
      family: "royal",
      count: 5,
    },
  },
  {
    // sequence does not work, did not move may be a problem
    floor: 33,
    tier: 3,
    hint: "« The ancient ritual demands precision. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "on_spawn" },
        { kind: "attack", direction: "up" },
        { kind: "did_not_move", turns: 1 },
        { kind: "attack", direction: "right" },
        { kind: "did_not_move", turns: 1 },
        { kind: "attack", direction: "down" },
        { kind: "did_not_move", turns: 1 },
        { kind: "attack", direction: "left" },
      ],
    },
  },
  {
    // use skill condition not set yet
    floor: 34,
    tier: 3,
    hint: "« The dragon's breath reveals what burns. »",
    unlocked: false,
    condition: {
      kind: "use_skill", // NEW
      skill: "fireBreathOncePerFloor",
    },
  },
  {
    floor: 35,
    tier: 3,
    hint: "« See beyond the veil. »",
    unlocked: false,
    condition: {
      kind: "has_ghost_vision", // NEW
      level: 3,
    },
  },
  {
    floor: 36,
    tier: 3,
    hint: "« We know what hole the triangle goes in right. »",
    unlocked: false,
    condition: {
      kind: "move_pattern", // NEW
      pattern: "square",
      size: 3,
    },
  },
  {
    // require all monster type to spawn
    floor: 37,
    tier: 3,
    hint: "« All types of jelly hide a secret. »",
    unlocked: false,
    condition: {
      kind: "kill_all_family_types",
      family: "slime",
      // green, red, crystal, venom
    },
  },
  {
    floor: 38,
    tier: 3,
    hint: "« Why are you looking behind you this much? »",
    unlocked: false,
    condition: {
      kind: "move_pattern", // NEW
      pattern: "zigzag",
      axis: "vertical",
      count: 5,
    },
  },
  {
    floor: 39,
    tier: 3,
    hint: "« Blocked suffering leads to revelation. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "shield", state: "active" },
        { kind: "took_damage", blocked: true },
        { kind: "did_not_move", turns: 2 },
      ],
    },
  },
  {
    floor: 40,
    tier: 3,
    hint: "« Absolute silence after the storm. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [{ kind: "no_enemy_alive" }, { kind: "on_spawn" }],
    },
  },
];
