import { statePlayer } from "../../../../state";

// Reduces the number of movement and attack actions the enemy can perform in a turn by 1, effectively increasing the player's chances to react and strategize against them.
export function reducedEnemyActionSpeed() {
  if (statePlayer.unlockedPassives.reduceEnemyActionSpeed) {
    return 1;
  }
  return 0;
}
