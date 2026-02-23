import type { ItemCondition } from "../../../../../lib/type";
import { statePlayer } from "../../../../state";

// Evaluates item-related conditions based on the current player state
export function evaluateItem(condition: ItemCondition): boolean {
  switch (condition.kind) {
    case "has_key_level":
      return statePlayer.unlockedItems.keyLevel >= condition.level;
    case "has_ghost_vision":
      return statePlayer.unlockedItems.ghostVisionLevel >= condition.level;
  }
  return false;
}
