import { audioManager } from "../../../audio/audioManager";
import { createAOEEffect } from "../../../graphicContext/animations/effectsAnimation";
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
    createAOEEffect(enemy.x, enemy.y, 300, enemy);
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
  else if (!isInMagicAoeRange(enemy, player)) {
    enemy.attackChargeTurn = enemy.attackChargeTurnMax; // Reset charge turn if player is out of range
  }
}
