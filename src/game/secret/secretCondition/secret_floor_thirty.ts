import type { FloorSecret } from "../../../lib/type";

export const floorToThirtyConditions: FloorSecret[] = [
  // =====================
  // TIER 1 — Floors 21–30
  // =====================

  {
    floor: 21,
    tier: 2,
    hint: "« All secret does not require a key. »",
    unlocked: false,
    condition: {
      kind: "facing_tile",
      tile: 5,
    },
  },
  {
    floor: 22,
    tier: 2,
    hint: "« Truth hides beneath rust. »",
    unlocked: false,
    condition: {
      kind: "enemy_kill",
      slug: "rusty-armor",
      count: 2,
    },
  },
  {
    floor: 23,
    tier: 2,
    hint: "« The beginning is also an end. »",
    unlocked: false,
    condition: {
      kind: "on_spawn",
    },
  },
  {
    floor: 24,
    tier: 2,
    hint: "« The whispers must be silenced. »",
    unlocked: false,
    condition: {
      kind: "enemy_kill",
      slug: "cult-mage",
      count: 2,
    },
  },
  {
    floor: 25,
    tier: 2,
    hint: "« The wind strikes the four horizons. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "attack", direction: "up" },
        { kind: "attack", direction: "right" },
        { kind: "attack", direction: "down" },
        { kind: "attack", direction: "left" },
      ],
    },
  },
  {
    floor: 26,
    tier: 3,
    hint: "« What was true remains true. »",
    unlocked: false,
    condition: {
      kind: "enemy_kill",
      slug: "green-slime",
      count: 3,
    },
  },
  {
    floor: 27,
    tier: 3,
    hint: "« Let the undead rest. »",
    unlocked: false,
    condition: {
      kind: "no_enemy_alive",
    },
  },
  {
    floor: 28,
    tier: 3,
    hint: "« Can you see down below? »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "adjacent_to", tile: 3 },
        { kind: "has_passive", skill: "canSeeExits" },
      ],
    },
  },
  {
    floor: 29,
    tier: 3,
    hint: "« Five stones tell different stories. »",
    unlocked: false,
    condition: {
      kind: "different_walls_attacked",
      count: 5,
    },
  },
  {
    floor: 30,
    tier: 3,
    hint: "« He who explores all finds all. »",
    unlocked: false,
    condition: {
      kind: "visit_all_rooms",
      steps: [
        { kind: "adjacent_to", tile: 3 },
        { kind: "adjacent_to", tile: 4 },
        { kind: "adjacent_to", tile: 6 },
        { kind: "on_spawn" },
      ],
    },
  },
];
