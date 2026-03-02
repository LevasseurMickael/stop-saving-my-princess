import type { Enemy, Monster } from "../../../../lib/type";

// Replace one or multiple enemy of the array with the specified monster
export function getMonsterUnique(
  enemies: Enemy[],
  monster: Monster[],
  name: string,
  numberToSpawn: number,
  index: number,
  mult: number,
): Enemy[] {
  const specialMonster = monster.find((m) => m.slug === name);

  if (specialMonster && enemies.length > 1) {
    const max = Math.min(numberToSpawn + index, enemies.length);
    for (let i = index; i < max; i++) {
      enemies[i] = {
        x: enemies[i].x,
        y: enemies[i].y,
        alive: true,
        maxHp: Math.ceil(specialMonster.maxHp * mult),
        hp: Math.ceil(specialMonster.hp * mult),
        attack: Math.ceil(specialMonster.attack * mult),
        attackRange: specialMonster.attackRange,
        attackWeapon: specialMonster.attackWeapon,
        slug: specialMonster.slug,
        monsterFamilly: specialMonster.monsterFamilly,
        difficulty: specialMonster.difficulty,
        specialFloor: specialMonster.specialFloor,
        facing: specialMonster.facing,
        actionPerTurn: specialMonster.actionPerTurn,
        attackChargeTurn: specialMonster.attackChargeTurn,
        attackChargeTurnMax: specialMonster.attackChargeTurnMax,
        stunnedTurns: 0,
        pattern: "patrol",
        name: specialMonster.name,
      };
    }
  }
  return enemies;
}

// Replace multiple enemies of the array with the specified monsters
export function getMonsterMultiple(
  enemies: Enemy[],
  monster: Monster[],
  list: { name: string; numberToSpawn: number }[],
  mult: number,
): Enemy[] {
  list.forEach(({ name, numberToSpawn }) => {
    enemies = getMonsterUnique(
      enemies,
      monster,
      name,
      numberToSpawn,
      list.indexOf(
        list.find((m) => m.name === name) || { name: "", numberToSpawn: 0 },
      ),
      mult,
    );
  });
  return enemies;
}
