export function keyLevelLogic(
  statePlayer: any,
  stateDynamic: any,
) {
  if (
    statePlayer.unlockedItems.keyLevel >= stateDynamic.healingRoom?.doorLevel!
  ) {
    stateDynamic.healingRoom.isUnlocked = true;
  } else {
    return false; // Player cannot pass through the door
  }
}
