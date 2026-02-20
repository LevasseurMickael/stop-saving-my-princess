import type { Enemy, Monster } from "../../../lib/type";
import { getMonsterFamily } from "./monster-required/familySpawnRule";
import { getMonsterMultiple } from "./monster-required/monsterSpawnRule";

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

export function getMonsterForSpecialFloor(
  floor: number,
  monster: Monster[],
  enemies: Enemy[],
) {
  // =====================
  // Floors 1–10
  // =====================

  if (floor === 2) {
    const list = [{ name: "cave-rat", numberToSpawn: 2 }];
    return getMonsterMultiple(enemies, monster, list);
  } else if (floor === 10) {
    const list = [{ name: "bone-archer", numberToSpawn: 1 }];
    return getMonsterMultiple(enemies, monster, list);
  }

  // =====================
  // Floors 11–20
  // =====================
  else if (floor === 11) {
    const list = [
      { name: "green-slime", numberToSpawn: 1 },
      { name: "red-slime", numberToSpawn: 1 },
    ];
    return getMonsterMultiple(enemies, monster, list);
  } else if (floor === 12) {
    const list = [{ name: "skeleton", numberToSpawn: 2 }];
    return getMonsterMultiple(enemies, monster, list);
  } else if (floor === 14) {
    const list = [{ name: "lost-spirit", numberToSpawn: 1 }];
    return getMonsterMultiple(enemies, monster, list);
  } else if (floor === 17) {
    const family = "vermin";
    return getMonsterFamily(enemies, monster, family);
  } else if (floor === 18) {
    const list = [{ name: "knight-recruit", numberToSpawn: 2 }];
    return getMonsterMultiple(enemies, monster, list);
  }

  // =====================
  // Floors 21–30
  // =====================
  else if (floor === 22) {
    const list = [{ name: "rusty-armor", numberToSpawn: 2 }];
    return getMonsterMultiple(enemies, monster, list);
  } else if (floor === 24) {
    const list = [{ name: "cult-mage", numberToSpawn: 2 }];
    return getMonsterMultiple(enemies, monster, list);
  } else if (floor === 26) {
    const list = [{ name: "green-slime", numberToSpawn: 3 }];
    console.log(enemies);
    return getMonsterMultiple(enemies, monster, list);
  } else if (floor === 27) {
    const family = "undead";
    return getMonsterFamily(enemies, monster, family);
  }

  // =====================
  // Floors 31–40
  // =====================
  else if (floor === 32) {
    const family = "living armor";
    return getMonsterFamily(enemies, monster, family);
  } else if (floor === 37) {
    const family = "slime";
    const newFloorEnemies = getMonsterFamily(enemies, monster, family);
    const list = [
      { name: "green-slime", numberToSpawn: 1 },
      { name: "red-slime", numberToSpawn: 1 },
      { name: "crystal-slime", numberToSpawn: 1 },
      { name: "venom-slime", numberToSpawn: 1 },
    ];
    return getMonsterMultiple(newFloorEnemies, monster, list);
  }

  // =====================
  // Floors 41–50
  // =====================
  else if (floor === 42) {
    const list = [
      { name: "green-slime", numberToSpawn: 1 },
      { name: "cave-rat", numberToSpawn: 1 },
      { name: "skeleton", numberToSpawn: 1 },
      { name: "lost-spirit", numberToSpawn: 1 },
    ];
    return getMonsterMultiple(enemies, monster, list);
  } else if (floor === 46) {
    const list = [
      { name: "knight-recruit", numberToSpawn: 1 },
      { name: "royal-archer", numberToSpawn: 1 },
      { name: "royal-spearmaster", numberToSpawn: 1 },
      { name: "templar-captain", numberToSpawn: 1 },
    ];
    return getMonsterMultiple(enemies, monster, list);
  } else if (floor === 49) {
    const family = "royal";
    const newFloorEnemies = getMonsterFamily(enemies, monster, family);
    const list = [{ name: "phantom-knight", numberToSpawn: 2 }];
    return getMonsterMultiple(newFloorEnemies, monster, list);
  } else {
    return enemies;
  }
}
