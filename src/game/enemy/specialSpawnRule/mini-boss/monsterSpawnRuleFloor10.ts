import type { Enemy, Monster } from "../../../../lib/type";

export function getMonsterFloorTwo(
  enemies: Enemy[],
  monster: Monster[],
): Enemy[] {
  const specialMonster = monster.find((m) => m.slug === "cave-rat");

  // Replace two enemy of the array with the special monster for the haunted floor, taking the localisation of the first enemy in the array
  if (specialMonster && enemies.length > 1) {
    for (let i = 0; i < 2; i++) {
      enemies[i] = {
        x: enemies[i].x,
        y: enemies[i].y,
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
    }
  }
  return enemies;
}

export function getMiniBossForFloor10(
  enemies: Enemy[],
  monster: Monster[],
): Enemy[] {
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
  }
  return enemies;
}
