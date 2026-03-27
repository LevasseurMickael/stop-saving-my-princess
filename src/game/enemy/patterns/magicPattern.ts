import { audioManager } from "../../../audio/audioManager";
import type { Enemy } from "../../../lib/type";
import { map } from "../../map/map";
import { attackPattern } from "./attackPattern";
import {
  hasLineOfSight,
  isInMagicAoeRange,
} from "./pattern-helper/inAttackRange";

export function magicPattern(enemy: Enemy, player: { x: number; y: number }) {
  if (
    isInMagicAoeRange(enemy, player) &&
    enemy.attackChargeTurn === 0 &&
    hasLineOfSight(enemy, player, map)
  ) {
    attackPattern(enemy, player);
    audioManager.playSound("enemy_attack_magic");
    enemy.attackChargeTurn = enemy.attackChargeTurnMax; // Reset charge turn after attacking
    return;
  } else if (
    isInMagicAoeRange(enemy, player) &&
    enemy.attackChargeTurn > 0 &&
    hasLineOfSight(enemy, player, map)
  ) {
    enemy.attackChargeTurn -= 1;
  }
}
