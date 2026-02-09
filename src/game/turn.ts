import type { Enemy } from "../lib/type";
import { map } from "./map/map";
import { player } from "./player";
import { state } from "./state";

export function enemiesTurn() {
  for (const enemy of state.enemies) {
    enemyTurn(enemy, player, map);
  }
}

export function enemyTurn(
  enemy: Enemy,
  player: { x: number; y: number },
  map: number[][],
) {
  if (!enemy.alive) return;

  switch (enemy.pattern) {
    case "stationary":
      // Do nothing
      break;
    case "patrol":
      // Simple random movement
      const dx = Math.random() < 0.5 ? -1 : 1;
      const dy = Math.random() < 0.5 ? -1 : 1;
      if (map[enemy.y + dy][enemy.x + dx] === 0) {
        enemy.x += dx;
        enemy.y += dy;
      }
      break;
    case "chase":
      // Move towards player
      const distX = player.x - enemy.x;
      const distY = player.y - enemy.y;
      if (Math.abs(distX) + Math.abs(distY) === 1) {
        // Attack player
        state.deathCount++;
      } else {
        // Move towards player
        if (
          Math.abs(distX) > Math.abs(distY) &&
          map[enemy.y][enemy.x + Math.sign(distX)] === 0
        ) {
          enemy.x += Math.sign(distX);
        } else if (map[enemy.y + Math.sign(distY)][enemy.x] === 0) {
          enemy.y += Math.sign(distY);
        }
      }
      break;
  }
}
