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
      kind: "sequence",
      steps: [{ kind: "wait", turns: 3 }],
    },
  },

  {
    floor: 2,
    tier: 1,
    hint: "« Tout chemin mérite un regard avant d’être suivi. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "adjacent_to", tile: 3 },
        { kind: "wait", turns: 1 },
      ],
    },
  },

  {
    floor: 3,
    tier: 1,
    hint: "« Tous les obstacles ne sont pas silencieux. »",
    unlocked: false,
    condition: {
      kind: "attack",
      target: "wall",
    },
  },

  {
    floor: 4,
    tier: 1,
    hint: "« Les murs écoutent quand on les regarde. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "facing_tile", tile: 1 },
        { kind: "wait", turns: 1 },
      ],
    },
  },

  {
    floor: 5,
    tier: 1,
    hint: "« Le monde se révèle à ceux qui observent tout. »",
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
    floor: 6,
    tier: 1,
    hint: "« Se protéger est parfois une action en soi. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "shield", state: "deploying" },
        { kind: "shield", state: "retracting" },
      ],
    },
  },

  {
    floor: 7,
    tier: 1,
    hint: "« La patience donne du poids au geste. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [{ kind: "wait", turns: 1 }, { kind: "attack" }],
    },
  },

  {
    floor: 8,
    tier: 1,
    hint: "« Certains suivent les chemins, d’autres les contours. »",
    unlocked: false,
    condition: {
      kind: "move",
      steps: 4,
      along: "wall",
    },
  },

  {
    floor: 9,
    tier: 1,
    hint: "« Le danger révèle parfois ce qu’on cache. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "enemy_present" },
        { kind: "facing_tile", tile: 1 },
        { kind: "wait", turns: 1 },
      ],
    },
  },

  {
    floor: 10,
    tier: 1,
    hint: "« Frapper le vide attire parfois l’attention. »",
    unlocked: false,
    condition: {
      kind: "attack",
      target: "empty",
    },
  },

  {
    floor: 11,
    tier: 1,
    hint: "« Même inutile, la défense a sa place. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "shield", state: "active" },
        { kind: "wait", turns: 1 },
      ],
    },
  },

  {
    floor: 12,
    tier: 1,
    hint: "« Là où tout commence, rien n’est jamais fini. »",
    unlocked: false,
    condition: {
      kind: "on_tile",
      tile: 0, // spawn
    },
  },

  {
    floor: 13,
    tier: 1,
    hint: "« Ce qui monte n’est pas toujours la seule voie. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "facing_tile", tile: 3 },
        { kind: "wait", turns: 1 },
      ],
    },
  },

  {
    floor: 14,
    tier: 1,
    hint: "« Tous les murs ne racontent pas la même histoire. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "attack", target: "wall" },
        { kind: "attack", target: "wall" },
      ],
    },
  },

  {
    floor: 15,
    tier: 1,
    hint: "« Quand le silence s’installe, écoute mieux. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [{ kind: "enemy_killed_last" }, { kind: "wait", turns: 2 }],
    },
  },

  // =====================
  // TIER 2 — Floors 16–25
  // =====================

  {
    floor: 16,
    tier: 2,
    hint: "« Certains obstacles ne cèdent qu’à la retenue. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "shield", state: "active", facing: "wall" },
        { kind: "wait", turns: 1 },
      ],
    },
  },

  {
    floor: 17,
    tier: 2,
    hint: "« Le rythme importe plus que la force. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "attack" },
        { kind: "wait", turns: 1 },
        { kind: "attack" },
      ],
    },
  },

  {
    floor: 18,
    tier: 2,
    hint: "« Les formes simples cachent parfois des vérités complexes. »",
    unlocked: false,
    condition: {
      kind: "move",
      steps: 4,
    },
  },

  {
    floor: 19,
    tier: 2,
    hint: "« Ce qui est montré puis caché laisse une trace. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "shield", state: "deploying", facing: "wall" },
        { kind: "shield", state: "retracting" },
      ],
    },
  },

  {
    floor: 20,
    tier: 2,
    hint: "« L’intention précède l’impact. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "facing_tile", tile: 1 },
        { kind: "wait", turns: 1 },
        { kind: "attack", target: "wall" },
      ],
    },
  },

  {
    floor: 21,
    tier: 2,
    hint: "« Regarder ailleurs ouvre parfois le bon chemin. »",
    unlocked: false,
    condition: {
      kind: "attack",
      target: "empty",
    },
  },

  {
    floor: 22,
    tier: 2,
    hint: "« Les secrets vivent entre les transitions. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "adjacent_to", tile: 1 },
        { kind: "wait", turns: 1 },
        { kind: "adjacent_to", tile: 3 },
        { kind: "wait", turns: 1 },
      ],
    },
  },

  {
    floor: 23,
    tier: 2,
    hint: "« Encaisser révèle ce qui était dissimulé. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "shield", state: "active" },
        { kind: "took_damage", blocked: true },
        { kind: "did_not_move", turns: 1 },
      ],
    },
  },

  {
    floor: 24,
    tier: 2,
    hint: "« La maîtrise commence par le renoncement. »",
    unlocked: false,
    condition: {
      kind: "did_not_move",
      turns: 1,
    },
  },

  {
    floor: 25,
    tier: 2,
    hint: "« Ceux qui survivent comprennent ce qu’ils ont déjà vu. »",
    unlocked: false,
    condition: {
      kind: "repeat_floor_condition",
      floor: 1,
    },
  },
];
