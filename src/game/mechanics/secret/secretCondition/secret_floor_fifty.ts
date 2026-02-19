import type { FloorSecret } from "../../../../lib/type";

export const floorToFiftyConditions: FloorSecret[] = [
  // =====================
  // TIER 1 — Floors 41–50
  // =====================

  {
    floor: 41,
    tier: 4,
    hint: "« Les griffes de l'âme et les flammes antiques. »",
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
    hint: "« Goûte au sang de toutes les familles. »",
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
    hint: "« Le sanctuaire à pleine force cache plus. »",
    unlocked: false,
    condition: {
      kind: "heal_at_full_hp", // NEW
    },
  },
  {
    floor: 44,
    tier: 4,
    hint: "« Frappe les quatre coins du monde. »",
    unlocked: false,
    condition: {
      kind: "attack_corners", // NEW
      count: 4,
    },
  },
  {
    floor: 45,
    tier: 4,
    hint: "« Les serrures royales s'ouvrent enfin. »",
    unlocked: false,
    condition: {
      kind: "unlock_healing_door", // NEW
      doorLevel: 5,
    },
  },
  {
    floor: 46,
    tier: 4,
    hint: "« Éradique toute trace des armures vivantes. »",
    unlocked: false,
    condition: {
      kind: "kill_all_family_types",
      family: "living armor",
      // rusty, royal-guard, cursed-halberd
    },
  },
  {
    floor: 47,
    tier: 4,
    hint: "« Le capitaine garde le secret ultime. »",
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
    hint: "« Marche en cercle autour de la vérité. »",
    unlocked: false,
    condition: {
      kind: "move_pattern",
      pattern: "circle", // NEW
    },
  },
  {
    floor: 49,
    tier: 4,
    hint: "« Le dragon parfait maîtrise tout. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "visit_all_rooms" },
        { kind: "kill_family", family: "royal", count: 3 },
        { kind: "no_damage_from_family", family: "ghost" },
        { kind: "on_spawn" },
      ],
    },
  },
];
