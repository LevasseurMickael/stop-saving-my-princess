import { stateDungeon, statePlayer } from "../../../../state";

export function dungeonmapFragment(tileX: number, tileY: number): boolean {
  if (statePlayer.unlockedPassives.dungeonmapFragment) {
    return true;
  }

  if (stateDungeon.currentFloor < 30) {
    return true;
  }

  const playerX = statePlayer.x;
  const playerY = statePlayer.y;

  const distance = Math.abs(tileX - playerX) + Math.abs(tileY - playerY);

  return distance <= 3;
}
