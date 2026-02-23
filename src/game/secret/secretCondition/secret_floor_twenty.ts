import type { FloorSecret } from "../../../../lib/type";

export const floorToTwentyConditions: FloorSecret[] = [
  // =====================
  // TIER 1 — Floors 11–20
  // =====================

  {
    floor: 11,
    tier: 2,
    hint: "« Green comes before the flame. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "enemy_kill", slug: "green-slime", count: 1 },
        { kind: "enemy_kill", slug: "red-slime", count: 1 },
      ],
    },
  },
  {
    floor: 12,
    tier: 2,
    hint: "« Twice must the bones fall. »",
    unlocked: false,
    condition: {
      kind: "enemy_kill",
      slug: "skeleton",
      count: 2,
    },
  },
  {
    floor: 13,
    tier: 2,
    hint: "« Walk where stone brushes your side. »",
    unlocked: false,
    condition: {
      kind: "move",
      steps: 5,
      along: "wall",
    },
  },
  {
    floor: 14,
    tier: 2,
    hint: "« The unseen becomes visible when it falls. »",
    unlocked: false,
    condition: {
      kind: "enemy_kill",
      slug: "lost-spirit",
      count: 1,
    },
  },
  {
    floor: 15,
    tier: 2,
    hint: "« The rhythm of battle reveals the truth. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "attack" },
        { kind: "shield", state: "deploying" },
        { kind: "shield", state: "active" },
        { kind: "wait", turns: 1 },
        { kind: "shield", state: "retracting" },
        { kind: "attack" },
      ],
    },
  },
  {
    floor: 16,
    tier: 2,
    hint: "« One key proves your worth. »",
    unlocked: false,
    condition: {
      kind: "has_key_level",
      level: 1,
    },
  },
  {
    floor: 17,
    tier: 2,
    hint: "« Vermin hides its secrets in the shadows. »",
    unlocked: false,
    condition: {
      kind: "kill_family",
      family: "vermin",
      count: 8,
    },
  },
  {
    floor: 18,
    tier: 2,
    hint: "« Recruits speak too much. »",
    unlocked: false,
    condition: {
      kind: "enemy_kill",
      slug: "knight-recruit",
      count: 2,
    },
  },
  {
    floor: 19,
    tier: 2,
    hint: "« Defense against the wall is a key. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "shield", state: "deploying", facing: "wall" },
        { kind: "did_not_move", turns: 1 },
      ],
    },
  },
  {
    floor: 20,
    tier: 2,
    hint: "« Danger nearby reveals hidden paths. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "enemy_nearby", distance: 2 },
        { kind: "facing_tile", tile: 1 },
        { kind: "did_not_move", turns: 1 },
      ],
    },
  },
];
