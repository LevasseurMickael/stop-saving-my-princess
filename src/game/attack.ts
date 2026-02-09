import { player } from "./player";
import { map } from "./map/map";
import { checkSecretCondition } from "./secret";
import { state } from "./state";
import { enemiesTurn } from "./turn";

export default function attack() {
  let attacked = false;
  for (const enemy of state.enemies) {
    const dx = enemy.x - player.x;
    const dy = enemy.y - player.y;
    if (Math.abs(dx) + Math.abs(dy) === 1 && enemy.alive) {
      enemy.alive = false;
      state.kills++;
      attacked = true;

      if (checkSecretCondition() && !state.secretUnlocked) {
        state.secretUnlocked = true;
        map[7][7] = 2; // Unlock secret area
      }
      break;
    }
  }
  if (attacked) {
    enemiesTurn();
  }
}
