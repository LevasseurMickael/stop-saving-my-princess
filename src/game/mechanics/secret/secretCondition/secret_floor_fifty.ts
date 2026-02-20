import type { FloorSecret } from "../../../../lib/type";

export const floorToFiftyConditions: FloorSecret[] = [
  // =====================
  // TIER 1 — Floors 41–50
  // =====================

  {
    // sequence does not work, has skill may not be set, phantom knight may not spawn
    floor: 41,
    tier: 4,
    hint: "« The claws of the soul and the ancient flames. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "has_skill", skill: "normalDamageToGhosts" },
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
    // May not work
    floor: 43,
    tier: 4,
    hint: "« The sanctuary at full strength hides more. »",
    unlocked: false,
    condition: {
      kind: "heal_at_full_hp", // NEW
    },
  },
  {
    // attack corners condition may not be set up correctly
    floor: 44,
    tier: 4,
    hint: "« Strike the four corners of the world. »",
    unlocked: false,
    condition: {
      kind: "attack_corners", // NEW
      count: 4,
    },
  },
  {
    // door has no level yet
    floor: 45,
    tier: 4,
    hint: "« The royal locks finally open. »",
    unlocked: false,
    condition: {
      kind: "unlock_healing_door", // NEW
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
    // visit all rooms, kill family, no damage from family
    floor: 49,
    tier: 4,
    hint: "« The perfect dragon masters everything. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "visit_all_rooms" },
        { kind: "kill_family", family: "royal", count: 8 },
        { kind: "no_damage_from_family", family: "ghost" },
        { kind: "on_spawn" },
      ],
    },
  },
];
