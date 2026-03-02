// Hint walls can not be seen starting floor 25 if canSeeHintWalls is not unlocked, but can be seen if it is unlocked

import { stateDungeon, statePlayer } from "../../../../state";

export const canSeeHintWalls = () => {
  if (
    !statePlayer.unlockedPassives.canSeeHintWalls &&
    stateDungeon.currentFloor >= 20
  ) {
    return "";
  }
  return "white";
};
