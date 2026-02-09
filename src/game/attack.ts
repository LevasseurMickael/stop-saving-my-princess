import { player } from "./player";
import { map } from "./map/map";
import { checkSecretCondition } from "./secret";
import { state } from "./state";
import { isOccupied } from "./enemy";

export default function attack() {
  for (const enemy of state.enemies) {
    if (!enemy.alive) continue;

    const distX = enemy.x - player.x;
    const distY = enemy.y - player.y;

    if (Math.abs(distX) + Math.abs(distY) === 1) {
      // Attack hits enemy
      enemy.hp--;

      // Enemy is stunned for 1 turn
      enemy.stunnedTurns = 1;

      // Enemy is stunned, skip their next turn
      enemy.stunnedTurns = 1;

      // Enemy is knocked back if possible
      const knockbackX = enemy.x + Math.sign(distX);
      const knockbackY = enemy.y + Math.sign(distY);

      if (
        map[knockbackY]?.[knockbackX] === 0 &&
        !isOccupied(knockbackX, knockbackY, enemy)
      ) {
        enemy.x = knockbackX;
        enemy.y = knockbackY;
      }

      // Enemy dies if HP reaches 0
      if (enemy.hp <= 0) {
        enemy.alive = false;
        state.kills++;
      }

      if (checkSecretCondition() && !state.secretUnlocked) {
        state.secretUnlocked = true;
        map[7][7] = 2; // Unlock secret area
      }
      return true; // Attack hit an enemy
    }
  }
  return false; // Attack missed
}
