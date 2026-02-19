import type { FloorSecret } from "../../../../lib/type";

export const floorToTwentyConditions: FloorSecret[] = [
  // =====================
  // TIER 1 — Floors 11–20
  // =====================

  {
    floor: 11,
    tier: 2,
    hint: "« Le rouge brûle après le vert. »",
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
    hint: "« Les os se souviennent. »",
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
    hint: "« Suis les contours de l'ombre. »",
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
    hint: "« Ce qui est invisible peut être vu. »",
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
    hint: "« Le rythme de la bataille révèle la vérité. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "attack" },
        { kind: "did_not_move", turns: 1 },
        { kind: "attack" },
      ],
    },
  },
  {
    floor: 16,
    tier: 2,
    hint: "« Les portes s'ouvrent à ceux qui cherchent. »",
    unlocked: false,
    condition: {
      kind: "has_key_level", // NEW
      level: 1,
    },
  },
  {
    floor: 17,
    tier: 2,
    hint: "« La vermine cache ses secrets dans les ténèbres. »",
    unlocked: false,
    condition: {
      kind: "kill_family", // NEW
      family: "vermin",
      count: 4,
    },
  },
  {
    floor: 18,
    tier: 2,
    hint: "« Les recrues parlent trop. »",
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
    hint: "« La défense face au mur est une clé. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "shield", state: "active", facing: "wall" },
        { kind: "did_not_move", turns: 1 },
      ],
    },
  },
  {
    floor: 20,
    tier: 2,
    hint: "« Le danger proche révèle les chemins cachés. »",
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
