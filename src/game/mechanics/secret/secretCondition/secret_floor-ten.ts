import type { FloorSecret } from "../../../../lib/type";

export const floorToTenConditions: FloorSecret[] = [
  // =====================
  // TIER 1 — Floors 1–10
  // =====================

  {
    floor: 1,
    tier: 1,
    hint: "« When three jellies fall, the path reveals itself. »",
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
    hint: "« Rats flee from secrets, but leave their mark behind. »",
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
    hint: "« The still one sees further. »",
    unlocked: false,
    condition: { kind: "did_not_move", turns: 3 },
  },
  {
    floor: 4,
    tier: 1,
    hint: "« Stone answers violence. »",
    unlocked: false,
    condition: { kind: "attack", target: "wall" },
  },
  {
    floor: 5,
    tier: 1,
    hint: "« Between rest and stone, a path hides. »",
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
    hint: "« When the final breath fades, something awakens. »",
    unlocked: false,
    condition: { kind: "no_enemy_alive" },
  },
  {
    floor: 7,
    tier: 1,
    hint: "« Even the void can be struck.” »",
    unlocked: false,
    condition: { kind: "attack", target: "empty" },
  },
  {
    floor: 8,
    tier: 1,
    hint: "« Perfect defense reveals the unseen. »",
    unlocked: false,
    condition: {
      kind: "took_damage",
      blocked: true,
    },
  },
  {
    floor: 9,
    tier: 1,
    hint: "« Three stones, three scars. »",
    unlocked: false,
    condition: {
      kind: "different_walls_attacked",
      count: 3,
    },
  },
  {
    floor: 10,
    tier: 1,
    hint: "«The fleshless archer guards the key. »",
    unlocked: false,
    condition: {
      kind: "enemy_kill",
      slug: "bone-archer",
      count: 1,
    },
  },
];
