import type { SecretCondition } from "../../../lib/type";
import { evaluateFamily } from "./evaluate/evaluateFamily";
import { evaluateHealingRoom } from "./evaluate/evaluateHealingRoom";
import { evaluateItem } from "./evaluate/evaluateItem";
import { evaluateSkill } from "./evaluate/evaluateSkill";
import { evaluateMovePattern } from "./evaluate/evaluateMovePattern";
import { evaluateVisitAllRooms } from "./evaluate/evaluateVisitAllRoom";
import { evaluateSequence } from "./evaluate/evaluateSequence";
import { evaluateAttack } from "./evaluate/evaluateAttack";
import { evaluateShield } from "./evaluate/evaluateShield";
import { evaluateMove } from "./evaluate/evaluateMove";
import { evaluatePosition } from "./evaluate/evaluatePosition";
import { evaluateContext } from "./evaluate/evaluateContext";

export function evaluateCondition(condition: SecretCondition): boolean {
  switch (condition.kind) {
    case "sequence":
      return evaluateSequence(condition.steps);
    case "attack":
      return evaluateAttack(condition);
    case "shield":
      return evaluateShield(condition);
    case "move":
      return evaluateMove(condition);
    case "on_tile":
    case "on_spawn":
    case "adjacent_to":
    case "facing_tile":
    case "enemy_nearby":
      return evaluatePosition(condition);

    case "enemy_present":
    case "enemy_killed_last":
    case "enemy_kill":
    case "no_enemy_alive":
    case "took_damage":
    case "did_not_move":
    case "different_walls_attacked":
      return evaluateContext(condition);

    case "has_skill":
    case "use_skill":
      return evaluateSkill(condition);

    case "has_key_level":
    case "has_ghost_vision":
      return evaluateItem(condition);

    case "kill_family":
    case "kill_all_family_types":
    case "no_damage_from_family":
      return evaluateFamily(condition);

    case "find_healing_room":
    case "heal_at_full_hp":
    case "unlock_healing_door":
      return evaluateHealingRoom(condition);

    case "move_pattern":
      return evaluateMovePattern(condition);

    case "visit_all_rooms":
      return evaluateVisitAllRooms(condition.steps);

    default:
      return false;
  }
}
