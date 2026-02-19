import type { Enemy, Room } from "../../lib/type";
import { stateDynamic } from "../state";
import { monsters } from "./monsters";
import {
  getMonsterForSpecialFloor,
  getMonsterSpawnForFloor,
} from "./spawnRule";

// Enemy can't get on the same tile as other enemies
export function isOccupied(x: number, y: number, self: Enemy) {
  return stateDynamic.enemies.some(
    (e) => e !== self && e.x === x && e.y === y && e.alive,
  );
}

// Spawn enemies in rooms based on the current floor and monster difficulty, ensuring they don't spawn on the player's starting position or on top of each other. The number and type of enemies are determined by a weighted random selection based on the floor's difficulty.
export function spawnEnemies(
  rooms: Room[],
  spawn: { x: number; y: number },
  floor: number,
): Enemy[] {
  const enemies: Enemy[] = [];
  // Start from 1 to skip the first room which is the spawn room
  for (let i = 1; i < rooms.length; i++) {
    const room = rooms[i];

    // Determine which monsters can spawn based on the floor and their difficulty
    const spawnableEnemies = monsters.filter((m) => floor >= m.difficulty - 3);

    // Create a weighted pool of monsters based on their spawn chances for the current floor
    const weightedPool = spawnableEnemies.flatMap((m) =>
      Array(getMonsterSpawnForFloor(m, floor)).fill(m),
    );

    // If the weighted pool is empty, it means no monsters can spawn for this floor, so we skip spawning in this room
    if (weightedPool.length === 0) return [];

    // Randomly determine the number of enemies to spawn in this room (1 or 2)
    const enemyCount = 1 + Math.floor(Math.random() * 2);

    // Spawn the determined number of enemies in the room, ensuring they don't spawn on top of each other or on the player's starting position
    for (let j = 0; j < enemyCount; j++) {
      const monster =
        weightedPool[Math.floor(Math.random() * weightedPool.length)];
      let x: number, y: number;
      do {
        x = room.x + Math.floor(Math.random() * room.w);
        y = room.y + Math.floor(Math.random() * room.h);
      } while (
        enemies.some((e: Enemy) => e.x === x && e.y === y) ||
        (x === spawn.x && y === spawn.y)
      );
      enemies.push({
        x, // Enemy position on x-axis
        y, // Enemy position on y-axis
        alive: true, // Enemy is alive
        hp: monster.hp, // Enemies hp
        attack: monster.attack, // Enemies attack
        attackRange: monster.attackRange, // Enemies can attack adjacent tiles
        attackWeapon: monster.attackWeapon, // Enemy weapon type
        facing: monster.facing, // Initial facing direction
        actionPerTurn: monster.actionPerTurn, // Enemies number of actions per turn
        stunnedTurns: 0, // No stun initially
        pattern: Math.random() < 0.5 ? "stationary" : "patrol", // Randomly assign pattern
        name: monster.name, // Name of the monster
        slug: monster.slug, // Slug identifier for the monster
        monsterFamilly: monster.monsterFamilly, // Familly of the monster
        difficulty: monster.difficulty, // Difficulty rating of the monster
        specialFloor: monster.specialFloor, // Special floor type for the monster
      });
    }
    getMonsterForSpecialFloor(floor, monsters, enemies);
  }
  return enemies;
}
