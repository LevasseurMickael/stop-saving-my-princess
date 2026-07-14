// If an enemy with magic attack pattern attack while enemies beside himself are in his attackRange, he will damage those enemies as well as the player. This function handle that damage to friendly enemies and should be called in the attackPattern function of magic attack pattern before damaging the player.

import type { Enemy } from "../../../../lib/type";
import { map } from "../../../map/map";
import { stateDynamic } from "../../../state";
import { hasLineOfSight } from "./inAttackRange";

export function friendlyDamage(enemy: Enemy) {
  stateDynamic.enemies.forEach((e: Enemy) => {
    if (hasLineOfSight(enemy, e, map)) {
      if (
        e !== enemy &&
        e.alive &&
        Math.abs(e.x - enemy.x) <= enemy.attackRange &&
        Math.abs(e.y - enemy.y) <= enemy.attackRange
      ) {
        e.hp = Math.max(0, Math.ceil(e.hp - enemy.attack));
        if (e.hp <= 0) {
          e.alive = false;
        }
      }
    }
  });
}
