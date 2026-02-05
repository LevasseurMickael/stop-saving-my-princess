import { enemy } from "./enemy";
import { map } from "./map";
import { player } from "./player";

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
}
