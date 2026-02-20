import type { FloorSecret } from "../../../../lib/type";

export const floorToTenConditions: FloorSecret[] = [
  // =====================
  // TIER 1 — Floors 1–10
  // =====================

  {
    floor: 1,
    tier: 1,
    hint: "« Les gelées vertes cachent des trésors. »",
    unlocked: false,
    condition: {
      kind: "enemy_kill",
      slug: "green-slime",
      count: 3,
    },
  },
  {
    floor: 2,
    tier: 1,
    hint: "« Les rats connaissent les passages secrets. »",
    unlocked: false,
    condition: {
      kind: "enemy_kill",
      slug: "cave-rat",
      count: 2,
    },
  },
  {
    floor: 3,
    tier: 1,
    hint: "« L'immobilité révèle ce qui est caché. »",
    unlocked: false,
    condition: { kind: "did_not_move", turns: 3 },
  },
  {
    floor: 4,
    tier: 1,
    hint: "« Frappe la pierre pour entendre sa réponse. »",
    unlocked: false,
    condition: { kind: "attack", target: "wall" },
  },
  {
    floor: 5,
    tier: 1,
    hint: "« Le repos cache plus qu'il n'y paraît. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "adjacent_to", tile: 6 },
        { kind: "adjacent_to", tile: 1 },
      ],
    },
  },
  {
    floor: 6,
    tier: 1,
    hint: "« Le silence complet révèle les mystères. »",
    unlocked: false,
    condition: { kind: "no_enemy_alive" },
  },
  {
    floor: 7,
    tier: 1,
    hint: "« L'intention compte plus que la cible. »",
    unlocked: false,
    condition: { kind: "attack", target: "empty" },
  },
  {
    floor: 8,
    tier: 1,
    hint: "« Le bouclier est plus qu'une défense. »",
    unlocked: false,
    condition: {
      kind: "took_damage",
      blocked: true,
    },
  },
  {
    floor: 9,
    tier: 1,
    hint: "« Trois pierres différentes, trois secrets. »",
    unlocked: false,
    condition: {
      kind: "different_walls_attacked",
      count: 3,
    },
  },
  {
    floor: 10,
    tier: 1,
    hint: "« L'archer des os détient une vérité. »",
    unlocked: false,
    condition: {
      kind: "enemy_kill",
      slug: "bone-archer",
      count: 1,
    },
  },
];
