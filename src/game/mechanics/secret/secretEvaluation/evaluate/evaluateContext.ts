import type { ContextCondition } from "../../../../../lib/type";
import { stateKillCount, stateSecret } from "../../../../state";

// Evaluation function for context-based conditions that depend on the current game state or recent events to determine if a secret condition is met (e.g., if an enemy is present, if the player took damage recently, etc.)
export function evaluateContext(condition: ContextCondition): boolean {
  switch (condition.kind) {
    case "enemy_present":
      return stateSecret.enemies.some((e) => e.alive);

    case "enemy_killed_last":
      return stateSecret.eventHistory.at(-1)?.type === "enemy_kill";

    case "enemy_kill":
      if (stateKillCount[condition.slug] === condition.count) {
        return true;
      }
      return false;

    case "no_enemy_alive":
      return stateSecret.enemies.every((e) => !e.alive);

    case "took_damage":
      const lastHit = stateSecret.eventHistory
        .slice()
        .reverse()
        .find((e) => e.type === "enemy_hit");
      if (!lastHit) return false;
      return condition.blocked ? lastHit.blocker === true : true;

    case "did_not_move":
      let count = 0;
      for (let i = stateSecret.eventHistory.length - 1; i >= 0; i--) {
        if (stateSecret.eventHistory[i].type !== "move") {
          count++;
          if (count >= condition.turns) return true;
        } else break;
      }
      return false;

    case "different_walls_attacked":
      const attackedWalls = new Set<string>();
      for (let i = stateSecret.eventHistory.length - 1; i >= 0; i--) {
        const event = stateSecret.eventHistory[i];
        if (event.type === "attack" && event.target === "wall") {
          const key = `${event.targetX},${event.targetY}`;
          attackedWalls.add(key);
          if (attackedWalls.size >= condition.count) return true;
        }
      }
      return false;

    default:
      return false;
  }
}
