// Is used in enemiesContext to determine the opacity of ghost familly monsters.

import type { Enemy } from "../../../../../lib/type";
import { statePlayer } from "../../../../state";

//We check if a monster type ghost is in the range of the player, if the ghost vision level is 1, we check if the ghost is in the 8 tiles around the player, if the ghost vision level is 2, we check if the ghost is in the 24 tiles around the player, and if the ghost vision level is 3 or higher, we return 0.7 to make all ghosts visible.
function isGhostAroundPlayer(enemy: Enemy, range: number) {
  const playerX = statePlayer.x;
  const playerY = statePlayer.y;
  const enemyX = enemy.x;
  const enemyY = enemy.y;

  return (
    Math.abs(playerX - enemyX) <= range && Math.abs(playerY - enemyY) <= range
  );
}

export function getGhostVisionLevel(enemy: Enemy) {
  // Ghost familly monster are invisible if ghostVsionLevel is 0, they are visible directly around the player if ghostVisionLevel is 1, they are visible in a larger area around the player if ghostVisionLevel is 2, and they are always visible if ghostVisionLevel is 3 or higher.

  if (statePlayer.unlockedItems.ghostVisionLevel === 0) {
    return 0;
  }
  // if ghostVision level is 1, ghost are visible when directly around the player, so we check if the enemy is in the 8 tiles around the player.
  else if (statePlayer.unlockedItems.ghostVisionLevel === 1) {
    {
      return isGhostAroundPlayer(enemy, 1) ? 0.7 : 0;
    }
  } else if (statePlayer.unlockedItems.ghostVisionLevel === 2) {
    return isGhostAroundPlayer(enemy, 3) ? 0.7 : 0;
  } else if (statePlayer.unlockedItems.ghostVisionLevel >= 3) {
    return 0.7;
  }

  return 0;
}
