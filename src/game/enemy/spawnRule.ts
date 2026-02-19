import type { Enemy, Monster } from "../../lib/type";

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
  if (floor === 10) {
    const specialMonster = monster.find((m) => m.slug === "bone-archer");
    // Replace one enemy of the array with the special monster for the haunted floor, taking the localisation of the first enemy in the array
    if (specialMonster && enemies.length > 0) {
      enemies[0] = {
        x: enemies[0].x,
        y: enemies[0].y,
        alive: true,
        hp: specialMonster.hp,
        attack: specialMonster.attack,
        attackRange: specialMonster.attackRange,
        attackWeapon: specialMonster.attackWeapon,
        slug: specialMonster.slug,
        monsterFamilly: specialMonster.monsterFamilly,
        difficulty: specialMonster.difficulty,
        specialFloor: specialMonster.specialFloor,
        facing: specialMonster.facing,
        actionPerTurn: specialMonster.actionPerTurn,
        stunnedTurns: 0,
        pattern: "stationary",
        name: specialMonster.name,
      };

      return enemies;
    }
  } else {
    return enemies;
  }
}
