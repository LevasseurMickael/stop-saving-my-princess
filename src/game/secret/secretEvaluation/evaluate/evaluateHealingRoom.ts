import type { HealingRoomCondition } from "../../../../lib/type";
import { stateDynamic, stateSecret } from "../../../state";

// Function to evaluate healing room conditions for secrets
export function evaluateHealingRoom(condition: HealingRoomCondition): boolean {
  switch (condition.kind) {
    case "find_healing_room":
      return stateDynamic.healingRoom !== null;
    case "heal_at_full_hp":
      return stateSecret.healedAtFullHp === true;
    case "unlock_healing_door":
      if (!stateDynamic.healingRoom) return false;
      return (
        stateDynamic.healingRoom.isUnlocked &&
        stateDynamic.healingRoom.doorLevel >= condition.doorLevel
      );
    default:
      return false;
  }
}
