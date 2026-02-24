// Stairs can not be seen starting floor 25 if canSeeExits is not unlocked, but can be seen if it is unlocked

import { stateDungeon, statePlayer } from "../../../../state";

export const canSeeExits = () => {
  if (
    !statePlayer.unlockedPassives.canSeeExits &&
    stateDungeon.currentFloor >= 25
  ) {
    return "";
  }
  return "purple";
};
