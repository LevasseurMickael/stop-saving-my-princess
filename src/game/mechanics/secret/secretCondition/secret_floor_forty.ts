import type { FloorSecret } from "../../../../lib/type";

export const floorToFortyConditions: FloorSecret[] = [
  // =====================
  // TIER 1 — Floors 31–40
  // =====================

  {
    floor: 31,
    tier: 3,
    hint: "« Les serrures arcanes s'ouvrent aux initiés. »",
    unlocked: false,
    condition: {
      kind: "has_key_level",
      level: 4,
    },
  },
  {
    floor: 32,
    tier: 3,
    hint: "« La garde royale tombe face au dragon. »",
    unlocked: false,
    condition: {
      kind: "kill_family",
      family: "royal",
      count: 5,
    },
  },
  {
    floor: 33,
    tier: 3,
    hint: "« Le rituel ancien demande précision. »",
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
    floor: 34,
    tier: 3,
    hint: "« Le souffle du dragon révèle ce qui brûle. »",
    unlocked: false,
    condition: {
      kind: "use_skill", // NEW
      skill: "fireBreathOncePerFloor",
    },
  },
  {
    floor: 35,
    tier: 3,
    hint: "« Vois au-delà du voile. »",
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
    floor: 37,
    tier: 3,
    hint: "« Tous les types de gelée cachent un secret. »",
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
      axis: "horizontal",
      count: 5,
    },
  },
  {
    floor: 39,
    tier: 3,
    hint: "« La souffrance bloquée mène à la révélation. »",
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
    hint: "« Le silence absolu après la tempête. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [{ kind: "no_enemy_alive" }, { kind: "on_spawn" }],
    },
  },
];
