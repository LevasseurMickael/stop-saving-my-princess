import { statePlayer } from "../../../../state";

export function extraDamageWhenLowHp() {
  if (!statePlayer.unlockedPassives.extraDamageWhenLowHp) return 1;

  const damageMultiplier =
    1 + (1 - statePlayer.stat.hp / statePlayer.stat.maxHp);
  return damageMultiplier;
}
