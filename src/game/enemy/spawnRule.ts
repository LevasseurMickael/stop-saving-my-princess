import type { Monster } from "../../lib/type";

export function getMonsterSpawnForFloor(monster: Monster, floor: number) {
  const delta = floor - monster.difficulty;
  if (delta < -3) return 0; // No spawn if difficulty is much higher than floor
  if (delta < 0) return 1; // Rare spawn if difficulty is lower than floor
  if (delta < 5) return 3; // Normal spawn if difficulty is close to floor
  if (delta < 15) return 2; // Common spawn if difficulty is moderately lower than floor
  return 1; // Rare spawn if difficulty is too much lower than floor
}

export function getFloorBudgetForMonsters(floor: number) {
  return Math.floor(3 + floor * 0.8); // Base budget plus scaling with floor
}
