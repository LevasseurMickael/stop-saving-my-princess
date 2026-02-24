import type { Enemy } from "../../../lib/type";
import { chasePattern } from "./chasePattern";
import { magicPattern } from "./magicPattern";
import { meleePattern } from "./meleePattern";
import { patrolPattern } from "./patrolPattern";
import { rangePattern } from "./rangePattern";
import { runAwayPattern } from "./runAwayPattern";

export function allMonsterPatterns(
  enemy: Enemy,
  player: { x: number; y: number },
  map: number[][],
) {
  switch (enemy.pattern) {
    // Stationary pattern: enemy does not move
    case "stationary":
      // Do nothing
      break;

    // Patrol pattern: move randomly within the room
    case "patrol":
      patrolPattern(enemy, map);
      break;

    case "chase":
      chasePattern(enemy, player, map);
      break;

    case "runAway":
      runAwayPattern(enemy, player, map);
      break;

    case "melee":
      meleePattern();
      break;

    case "range":
      rangePattern();
      break;

    case "magic":
      magicPattern();
      break;
  }
}
