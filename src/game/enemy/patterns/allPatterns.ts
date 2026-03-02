import type { Enemy } from "../../../lib/type";
import { magicPattern } from "./magicPattern";
import { meleePattern } from "./meleePattern";
import { patrolPattern } from "./patrolPattern";
import { rangedPattern } from "./rangedPattern";
import { runAwayPattern } from "./runAwayPattern";

export function allMonsterPatterns(
  enemy: Enemy,
  player: { x: number; y: number },
  map: number[][],
) {
  switch (enemy.pattern) {
    // Patrol pattern: move randomly within the room
    case "patrol":
      patrolPattern(enemy, map);
      break;

    case "runAway":
      runAwayPattern(enemy, player, map);
      break;

    case "melee":
      meleePattern(enemy, player, map);
      break;

    case "ranged":
      rangedPattern(enemy, player, map);
      break;

    case "magic":
      magicPattern(enemy, player);
      break;
  }
}
