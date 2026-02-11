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
    // Todo sequence requier a wait after the attack, it should not be the case
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
        { kind: "enemy_nearby", distance: 3 },
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
      kind: "on_spawn",
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
      steps: [{ kind: "different_walls_attacked", count: 2 }],
    },
  },

  {
    // Todo will require more type of enemy and the last enemy_killed will have to be of a specific type and appearence, not just any enemy
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
    // Todo sequence is attack -> wait -> attack -> wait for unknown reason, not necessarily a bad thing but to investigate
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
    //Todo maybe to simple at this state of the game
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
    // Todo secret is shown if we activate the shield in a room and then get to a wall, should not happen, need to add a condition to check if the player was not adjacent to a wall in the previous turn
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
    // Todo it requier to wait again after attack on wall, the secret should show right after the attack, need to investigate
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
    //Todo do not seem to work, eventHistory may be the cause or wrong way to wait used
    floor: 22,
    tier: 2,
    hint: "« Les secrets vivent entre les transitions. »",
    unlocked: false,
    condition: {
      kind: "sequence",
      steps: [
        { kind: "on_spawn" },
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
    //Todo secret appear at the first action done
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
