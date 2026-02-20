import type { FloorSecret } from "../../../../lib/type";

export const floorToThirtyConditions: FloorSecret[] = [
  // =====================
  // TIER 1 — Floors 21–30
  // =====================

  {
    // unlock immediately, should unlock when getting in the sanctuary room
    floor: 21,
    tier: 2,
    hint: "« The sanctuary hides a secret. »",
    unlocked: false,
    condition: {
      kind: "find_healing_room", // NEW
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
    // kill family condition may not be set
    floor: 27,
    tier: 3,
    hint: "« Let the undead rest. »",
    unlocked: false,
    condition: {
      kind: "kill_family",
      family: "undead",
      count: 8,
    },
  },
  {
    // TODO Condition may have not been set, does require family ghost monsters to spawn
    floor: 28,
    tier: 3,
    hint: "« Les écailles éthérées révèlent l'invisible. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "has_skill", skill: "ghostDamageNegation" }, // NEW
        { kind: "no_damage_from_family", family: "ghost" }, // NEW
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
    // visit all rooms condition may not be set up correctly
    floor: 30,
    tier: 3,
    hint: "« He who explores all finds all. »",
    unlocked: false,
    condition: {
      kind: "visit_all_rooms", // NEW
    },
  },
];
