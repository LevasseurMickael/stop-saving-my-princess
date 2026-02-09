import { enemies } from "./enemy";
import { player } from "./player";
import { map } from "./map";
import { checkSecretCondition } from "./secret";
import { state } from "./state";
import { enemyTurn } from "./turn";

export default function attack() {
  for (const enemy of enemies) {
    const dx = enemy.x - player.x;
    const dy = enemy.y - player.y;
    if (Math.abs(dx) + Math.abs(dy) === 1 && enemy.alive) {
      enemy.alive = false;
      state.kills++;
      enemyTurn(); // Move enemy immediately after being killed

      if (checkSecretCondition() && !state.secretUnlocked) {
        state.secretUnlocked = true;
        map[7][7] = 2; // Unlock secret area
      }
    }
  }
}
