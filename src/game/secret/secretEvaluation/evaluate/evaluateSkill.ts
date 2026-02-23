import type { SkillCondition } from "../../../../lib/type";
import { statePlayer } from "../../../state";

// Evaluates skill-related conditions based on the player's current state and unlocked skills.
export function evaluateSkill(condition: SkillCondition): boolean {
  switch (condition.kind) {
    case "has_skill":
      return statePlayer.unlockedSkills[condition.skill] === true;
    case "use_skill":
      return statePlayer.skillUsedThisFloor[condition.skill] === true;
  }
  return false;
}
