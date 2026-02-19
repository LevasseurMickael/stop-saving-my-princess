import type { FloorSecret } from "../../../../lib/type";

export const floorToThirtyConditions: FloorSecret[] = [
  // =====================
  // TIER 1 — Floors 21–30
  // =====================

  {
    floor: 21,
    tier: 2,
    hint: "« Le sanctuaire cache un secret. »",
    unlocked: false,
    condition: {
      kind: "find_healing_room", // NEW
    },
  },
  {
    floor: 22,
    tier: 2,
    hint: "« L'armure rouillée garde la connaissance. »",
    unlocked: false,
    condition: {
      kind: "enemy_kill",
      slug: "rusty-armor",
      count: 1,
    },
  },
  {
    floor: 23,
    tier: 2,
    hint: "« Retourne d'où tu viens. »",
    unlocked: false,
    condition: {
      kind: "on_spawn",
    },
  },
  {
    floor: 24,
    tier: 2,
    hint: "« Les cultistes murmurent des secrets. »",
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
    hint: "« Les quatre vents soufflent la vérité. »",
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
    hint: "« L'histoire se répète pour ceux qui écoutent. »",
    unlocked: false,
    condition: {
      kind: "repeat_floor_condition",
      floor: 1,
    },
  },
  {
    floor: 27,
    tier: 3,
    hint: "« Tous les morts doivent retourner au repos. »",
    unlocked: false,
    condition: {
      kind: "kill_all_family_types", // NEW
      family: "undead",
      // skeleton, wraith, bone-archer, rotting-champion
    },
  },
  {
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
    hint: "« Cinq pierres chantent des histoires différentes. »",
    unlocked: false,
    condition: {
      kind: "different_walls_attacked",
      count: 5,
    },
  },
  {
    floor: 30,
    tier: 3,
    hint: "« Celui qui explore tout trouve tout. »",
    unlocked: false,
    condition: {
      kind: "visit_all_rooms", // NEW
    },
  },
];
