export function keyLevelLogic(
  statePlayer: any,
  stateDynamic: any,
  map: number[][],
  newX: number,
  newY: number,
) {
  if (
    statePlayer.unlockedItems.keyLevel >= stateDynamic.healingRoom?.doorLevel!
  ) {
    stateDynamic.healingRoom.isUnlocked = true;
  } else {
    return false; // Player cannot pass through the door
  }
}
