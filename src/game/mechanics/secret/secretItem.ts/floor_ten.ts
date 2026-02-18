import type { SecretItem } from "../../../../lib/type";

export const items_1_to_10: SecretItem[] = [
  { floor: 1, name: "Smoke Breath", type: "usable", effect: "stun_adjacent_enemy", value: 1, description: "Stuns an adjacent enemy for one turn." },
  { floor: 2, name: "Iron Key", type: "key", effect: "unlock_basic_doors", value: null, description: "Opens basic locked doors." },
  { floor: 3, name: "Wind Current", type: "usable", effect: "dash_one_tile", value: 1, description: "Dash forward by one tile." },
  { floor: 4, name: "Hardened Scales", type: "passive", effect: "reduce_damage_once_per_floor", value: null, description: "Negates first damage taken each floor." },
  { floor: 5, name: "Ancient Roar", type: "passive", effect: "fear_adjacent_enemies", value: null, description: "Nearby enemies hesitate briefly." },
  { floor: 6, name: "Shadow Veil", type: "passive", effect: "reduce_detection_range", value: null, description: "Reduces enemy vision range." },
  { floor: 7, name: "Ember Spark", type: "usable", effect: "ignite_tile", value: 1, description: "Ignites a tile for minor damage." },
  { floor: 8, name: "Silver Key", type: "key", effect: "unlock_sealed_doors", value: null, description: "Opens reinforced doors." },
  { floor: 9, name: "Molting Ritual I", type: "stat", effect: "hp", value: 4, description: "Increase maximum HP by 4." },
  { floor: 10, name: "Claw Sharpening I", type: "stat", effect: "attack", value: 1, description: "Increase attack by 1." },
];