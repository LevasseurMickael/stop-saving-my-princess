import type { Enemy, Monster } from "../../../../lib/type";

export function getMonsterFamily(
  enemies: Enemy[],
  monster: Monster[],
  family: string,
): Enemy[] {
  // Find all monsters in the specified family
  const familyMonsters = monster.filter((m) => m.monsterFamilly === family);

  // If there are no monsters in the family, return the original enemies array
  if (familyMonsters.length === 0) return enemies;

  // Replace all enemies with random monsters from the family, ensuring they don't spawn on top of each other or on the player's starting position
  if (familyMonsters && enemies.length > 1) {
    for (let i = 0; i < enemies.length; i++) {
      const selectedMonster =
        familyMonsters[Math.floor(Math.random() * familyMonsters.length)];
      enemies[i] = {
        x: enemies[i].x,
        y: enemies[i].y,
        alive: true,
        maxHp: selectedMonster.maxHp,
        hp: selectedMonster.hp,
        attack: selectedMonster.attack,
        attackRange: selectedMonster.attackRange,
        attackWeapon: selectedMonster.attackWeapon,
        slug: selectedMonster.slug,
        monsterFamilly: selectedMonster.monsterFamilly,
        difficulty: selectedMonster.difficulty,
        specialFloor: selectedMonster.specialFloor,
        facing: selectedMonster.facing,
        actionPerTurn: selectedMonster.actionPerTurn,
        stunnedTurns: 0,
        pattern: "stationary",
        name: selectedMonster.name,
      };
    }
  }
  return enemies;
}
