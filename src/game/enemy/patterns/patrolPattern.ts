import { tileIndex } from "../../../graphicContext/tile_index";
import type { Enemy } from "../../../lib/type";
import { reducedEnemyActionSpeed } from "../../secret/secretUnlock/itemEffect/passives/reduceEnemyActionSpeed";
import { isOccupied } from "../enemy";

export function patrolPattern(enemy: Enemy, map: number[][]) {
  const directions = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
  ];

  for (
    let i = 0;
    i < Math.max(1, enemy.actionPerTurn - reducedEnemyActionSpeed());
    i++
  ) {
    const dir = directions[Math.floor(Math.random() * directions.length)];
    const newX = enemy.x + dir.dx;
    const newY = enemy.y + dir.dy;
    if (enemy.attackWeapon === "melee") {
      // Check if the new position is valid (not a wall and not occupied by another enemy)
      if (
        map[newY]?.[newX] === tileIndex.empty &&
        !isOccupied(newX, newY, enemy)
      ) {
        enemy.x = newX;
        enemy.y = newY;
      }
    } else {
      const moveOrNot = Math.random() < 0.2; // 20% chance to move
      if (
        moveOrNot &&
        map[newY]?.[newX] === tileIndex.empty &&
        !isOccupied(newX, newY, enemy)
      ) {
        enemy.x = newX;
        enemy.y = newY;
      }
    }
  }
}
