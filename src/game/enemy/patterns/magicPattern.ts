import type { Enemy } from "../../../lib/type";
import { attackPattern } from "./attackPattern";
import { isInMagicAoeRange } from "./pattern-helper/inAttackRange";

export function magicPattern(enemy: Enemy, player: { x: number; y: number }) {
  if (isInMagicAoeRange(enemy, player) && enemy.attackChargeTurn === 0) {
    attackPattern(enemy, player);
    enemy.attackChargeTurn = enemy.attackChargeTurnMax; // Reset charge turn after attacking
    return;
  } else if (isInMagicAoeRange(enemy, player) && enemy.attackChargeTurn > 0) {
    enemy.attackChargeTurn -= 1;
  }
}
