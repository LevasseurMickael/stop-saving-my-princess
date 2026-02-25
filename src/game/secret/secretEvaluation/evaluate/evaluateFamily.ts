import type { FamilyCondition } from "../../../../lib/type";
import { monsters } from "../../../enemy/monsters";
import { stateKillCount, stateSecret } from "../../../state";

// Evaluates family-related conditions for secrets
export function evaluateFamily(condition: FamilyCondition): boolean {
  switch (condition.kind) {
    case "kill_family":
      const familyKills = Object.entries(stateKillCount)
        .filter(([slug]) => {
          const enemy = stateSecret.enemies.find((e) => e.slug === slug);
          return enemy?.monsterFamilly === condition.family;
        })
        .reduce((sum, [, count]) => sum + count, 0);
      return familyKills >= condition.count;

    case "kill_all_family_types":
      const familyType = monsters
        .filter((m) => m.monsterFamilly === condition.family)
        .map((m) => m.slug);
      return familyType.every((slug) => stateKillCount[slug] > 0);

    case "no_damage_from_family":
      return !stateSecret.damageFromFamily[condition.family] ? true : false;

    default:
      return false;
  }
}
