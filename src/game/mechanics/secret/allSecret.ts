import type { FloorSecret } from "../../../lib/type";

export const allSecretConditions: FloorSecret[] = [
  // =====================
  // TIER 1 — Floors 1–15
  // =====================

  {
    // Todo now it require one turn to wait instead of 3
    floor: 1,
    tier: 1,
    hint: "« L’impatience empêche de voir. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [{ kind: "wait", turns: 3 }],
    },
  },
];
