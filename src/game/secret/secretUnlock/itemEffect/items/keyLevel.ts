import { audioManager } from "../../../../../audio/audioManager";

export function keyLevelLogic(
  statePlayer: any,
  stateDynamic: any,
) {
  if (
    statePlayer.unlockedItems.keyLevel >= stateDynamic.healingRoom?.doorLevel!
  ) {
    stateDynamic.healingRoom.isUnlocked = true;
    audioManager.playSound("door_open");
  } else {
    return false; // Player cannot pass through the door
  }
}
