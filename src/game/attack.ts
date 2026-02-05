import { enemy } from "./enemy";
import { player } from "./player";
import { map } from "./map";
import { getSecretKills } from "./secret";
import { state } from "./state";
import { enemyTurn } from "./turn";

export default function attack() {
  const dx = enemy.x - player.x;
  const dy = enemy.y - player.y;
  if (Math.abs(dx) + Math.abs(dy) === 1 && enemy.alive) {
    enemy.alive = false;
    state.kills++;
    enemyTurn(); // Move enemy immediately after being killed

    // Todo to delete later, respawn enemy after 3 seconds
    // setTimeout(() => {
    //   enemy.x = 5;
    //   enemy.y = 5;
    //   enemy.alive = true;
    // }, 300);

    if (state.kills === getSecretKills()) {
      state.secretUnlocked = true;
      map[7][7] = 2; // Unlock secret area
    }
  }
}
