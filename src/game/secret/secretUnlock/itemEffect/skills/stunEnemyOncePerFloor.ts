// aoe around the player which stuns and knockback the enemies, can only be used once per floor
import { stateDynamic, statePlayer } from "../../../../state";
import { knockbackEnemy } from "../../../../mechanics/knockback";
import { hasLineOfSight } from "../../../../enemy/patterns/pattern-helper/inAttackRange";
import { map } from "../../../../map/map";

export function stunEnemyOncePerFloor() {
  if (!statePlayer.skillUsedThisFloor.stunEnemyOncePerFloor) {
    return;
  }

  stateDynamic.enemies.forEach((enemy) => {
    if (!hasLineOfSight(enemy, statePlayer, map)) return;
    if (!enemy.alive) return;
    const distX = Math.abs(enemy.x - statePlayer.x);
    const distY = Math.abs(enemy.y - statePlayer.y);
    if (distX <= 3 && distY <= 3) {
      enemy.stunnedTurns = 2; // Stun for 2 turns
      knockbackEnemy(enemy); // Knockback away from player
      knockbackEnemy(enemy); // Knockback again to increase distance
    }
  });

  statePlayer.skillUsedThisFloor.stunEnemyOncePerFloor = false; // Mark as used for this floor
}
