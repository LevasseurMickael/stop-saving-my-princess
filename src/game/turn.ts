import { enemy } from "./enemy";
import { map } from "./map";
import { player } from "./player";
import { state } from "./state";

export function enemyTurn() {
  if (!enemy.alive) return;
  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;

  let moveX = 0;
  let moveY = 0;

  if (Math.abs(dx) > Math.abs(dy)) {
    moveX = Math.sign(dx);
  } else {
    moveY = Math.sign(dy);
  }

  const newX = enemy.x + moveX;
  const newY = enemy.y + moveY;

  if (map[newY][newX] !== 1) {
    enemy.x = newX;
    enemy.y = newY;
  }

  // collision with player
  if (enemy.x === player.x && enemy.y === player.y) {
    player.x = 1;
    player.y = 1;
    state.deathCount++;
  }
}
