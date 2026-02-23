import type { Enemy } from "../../../../lib/type";
import { statePlayer } from "../../../state";

export function reducedDamage(enemy: Enemy): number {
  if (!enemy.monsterFamilly || !enemy.attackWeapon) return 0;
  // reduce dame from families and weapons the player has reduced damage unlocked in the statePlayer
  const reducedDamageFromFamily =
    statePlayer.reducedDamage.family?.[
      enemy.monsterFamilly as keyof typeof statePlayer.reducedDamage.family
    ] || 0;
  const reducedDamageFromWeapon =
    statePlayer.reducedDamage.type?.[
      enemy.attackWeapon as keyof typeof statePlayer.reducedDamage.type
    ] || 0;
  return reducedDamageFromFamily + reducedDamageFromWeapon;
}
