import type { Enemy } from "../../../lib/type";
import { knockbackPlayer } from "../../mechanics/knockback";
import { isBlockedByShield } from "../../mechanics/shield";
import { handleGameEvent } from "../../secret/secretEvaluation/secretSystem";
import { damageEnemyOnFirstDamageTakenPerFloor } from "../../secret/secretUnlock/itemEffect/passives/damageEnemyOnFirstDamageTakenPerFloor";
import { ghostDamageNegation } from "../../secret/secretUnlock/itemEffect/passives/ghostDamageNegation";
import { negateMagicOncePerFloor } from "../../secret/secretUnlock/itemEffect/passives/negateMagicOncePerFloor";
import { reduceDamageOncePerFloor } from "../../secret/secretUnlock/itemEffect/passives/reduceDamageOncePerFloor";
import { reducedDamage } from "../../secret/secretUnlock/itemEffect/reducedDamage";
import { statePlayer, stateSecret } from "../../state";
import { friendlyDamage } from "./pattern-helper/friendlyDamage";

export function attackPattern(enemy: Enemy, player: { x: number; y: number }) {
  const distX = player.x - enemy.x;
  const distY = player.y - enemy.y;
  // If enemy
  if (Math.abs(distX) + Math.abs(distY) <= enemy.attackRange) {
    if (isBlockedByShield(enemy)) {
      handleGameEvent({ type: "enemy_hit", blocker: true });
      knockbackPlayer(enemy);
      return;
    }
    // enemy attacks player and does at least 1 damage, even if player has high damage reduction
    handleGameEvent({ type: "enemy_hit", blocker: false });
    damageEnemyOnFirstDamageTakenPerFloor(enemy);
    if (ghostDamageNegation(enemy)) {
      return;
    }
    if (negateMagicOncePerFloor(enemy)) {
      return;
    }
    if (reduceDamageOncePerFloor()) {
      return;
    }
    stateSecret.damageFromFamily[enemy.monsterFamilly!] =
      (stateSecret.damageFromFamily[enemy.monsterFamilly!] || 0) +
      Math.max(1, enemy.attack - reducedDamage(enemy));
    console.log(
      `Damage from family ${enemy.monsterFamilly}:`,
      stateSecret.damageFromFamily[enemy.monsterFamilly!],
    );
    statePlayer.stat.hp = Math.max(
      0,
      statePlayer.stat.hp - Math.max(1, enemy.attack - reducedDamage(enemy)),
    );

    if (enemy.attackWeapon === "magic") {
      friendlyDamage(enemy);
    }
    // Check if player dies from the attack and reset position and HP if so
    if (statePlayer.stat.hp <= 0) {
      statePlayer.deathCount++;
      statePlayer.stat.hp = statePlayer.stat.maxHp;
      player.x = statePlayer.spawn.x;
      player.y = statePlayer.spawn.y;
    }
    return;
  }
}
