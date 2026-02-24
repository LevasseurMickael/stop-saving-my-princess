import type { FloorSecret } from "../../../lib/type";

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
      level: 2,
    },
  },
  {
    floor: 32,
    tier: 3,
    hint: "« The armors falls before the dragon. »",
    unlocked: false,
    condition: {
      kind: "kill_family",
      family: "living armor",
      count: 8,
    },
  },
  {
    floor: 33,
    tier: 3,
    hint: "« The ancient ritual demands precision at the right place. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "on_spawn" },
        { kind: "attack", direction: "up" },
        { kind: "attack", direction: "up" },
        { kind: "attack", direction: "down" },
        { kind: "attack", direction: "down" },
        { kind: "attack", direction: "left" },
        { kind: "attack", direction: "right" },
        { kind: "attack", direction: "left" },
        { kind: "attack", direction: "right" },
        { kind: "shield", state: "deploying" },
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
      kind: "use_skill",
      skill: "fireBreathOncePerFloor",
    },
  },
  {
    floor: 35,
    tier: 3,
    hint: "« See beyond the veil. »",
    unlocked: false,
    condition: {
      kind: "has_ghost_vision",
      level: 3,
    },
  },
  {
    floor: 36,
    tier: 3,
    hint: "« We know what hole the triangle goes in right. »",
    unlocked: false,
    condition: {
      kind: "move_pattern",
      pattern: "square",
      size: 3,
    },
  },
  {
    floor: 37,
    tier: 3,
    hint: "« All types of jelly hide a secret. »",
    unlocked: false,
    condition: {
      kind: "kill_all_family_types",
      family: "slime",
    },
  },
  {
    floor: 38,
    tier: 3,
    hint: "« Why are you looking behind you this much? »",
    unlocked: false,
    condition: {
      kind: "move_pattern",
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
