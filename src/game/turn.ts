import { enemies } from "./enemy";
import { map } from "./map";
import { player } from "./player";
import { state } from "./state";

export function enemyTurn() {
  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;

    let moveX = 0;
    let moveY = 0;

    if (enemy.pattern === "chase") {
      if (Math.abs(dx) > Math.abs(dy)) {
        moveX = Math.sign(dx);
      } else {
        moveY = Math.sign(dy);
      }
    } else if (enemy.pattern === "horizontal") {
      moveX = Math.random() < 0.5 ? -1 : 1;
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
}
