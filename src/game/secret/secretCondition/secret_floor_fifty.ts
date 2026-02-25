import type { FloorSecret } from "../../../lib/type";

export const floorToFiftyConditions: FloorSecret[] = [
  // =====================
  // TIER 1 — Floors 41–50
  // =====================

  {
    floor: 41,
    tier: 4,
    hint: "« The claws of the soul and the ancient flames. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "has_passive", skill: "normalDamageToGhosts" },
        { kind: "has_skill", skill: "fireBreathOncePerFloor" },
        { kind: "enemy_kill", slug: "phantom-knight", count: 1 },
      ],
    },
  },
  {
    floor: 42,
    tier: 4,
    hint: "« Taste the blood of all families. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "enemy_kill", slug: "green-slime", count: 1 },
        { kind: "enemy_kill", slug: "cave-rat", count: 1 },
        { kind: "enemy_kill", slug: "skeleton", count: 1 },
        { kind: "enemy_kill", slug: "lost-spirit", count: 1 },
      ],
    },
  },
  {
    floor: 43,
    tier: 4,
    hint: "« The sanctuary at full strength hides more. »",
    unlocked: false,
    condition: {
      kind: "heal_at_full_hp",
    },
  },
  {
    floor: 44,
    tier: 4,
    hint: "« None of them remain untouched. »",
    unlocked: false,
    condition: {
      kind: "different_walls_attacked",
      count: 20,
    },
  },
  {
    floor: 45,
    tier: 4,
    hint: "« The royal locks finally open. »",
    unlocked: false,
    condition: {
      kind: "unlock_healing_door",
      doorLevel: 5,
    },
  },
  {
    floor: 46,
    tier: 4,
    hint: "« Eradicate all traces of the royal. »",
    unlocked: false,
    condition: {
      kind: "kill_all_family_types",
      family: "royal",
    },
  },
  {
    floor: 47,
    tier: 4,
    hint: "« The captain guards the ultimate secret. »",
    unlocked: false,
    condition: {
      kind: "enemy_kill",
      slug: "templar-captain",
      count: 1,
    },
  },
  {
    floor: 48,
    tier: 4,
    hint: "« Your drill is the drill that will pierce the heavens! »",
    unlocked: false,
    condition: {
      kind: "move_pattern",
      pattern: "spiral",
      clockwise: true,
    },
  },
  {
    floor: 49,
    tier: 4,
    hint: "« The perfect dragon masters everything. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        {
          kind: "visit_all_rooms",
          steps: [
            { kind: "adjacent_to", tile: 3 },
            { kind: "adjacent_to", tile: 4 },
            { kind: "adjacent_to", tile: 6 },
            { kind: "on_spawn" },
          ],
        },
        { kind: "no_enemy_alive" },
        { kind: "no_damage_from_family", family: "ghost" },
      ],
    },
  },
];
