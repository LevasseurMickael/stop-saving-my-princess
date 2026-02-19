import type { FloorSecret } from "../../../lib/type";

export const allSecretConditions: FloorSecret[] = [
  // =====================
  // TIER 1 — Floors 1–15
  // =====================

  {
    floor: 1,
    tier: 1,
    hint: "« L’impatience empêche de voir. »",
    unlocked: false,
    condition: {
      kind: "enemy_kill",
      slug: "green-slime",
      count: 3,
    },
  },
];
