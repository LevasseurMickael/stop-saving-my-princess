import type { Enemy } from "../lib/type";
import { isOccupied } from "./enemy";
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
  // Enemy is stunned, skip turn
  if (enemy.stunnedTurns && enemy.stunnedTurns > 0) {
    enemy.stunnedTurns--;
    return;
  }

  // aggro area for patrol pattern
  const dist = Math.abs(enemy.x - player.x) + Math.abs(enemy.y - player.y);
  if (enemy.pattern === "patrol" && dist <= 3) {
    enemy.pattern = "chase";
  }
  // lost interest if player is far away
  if (enemy.pattern === "chase" && dist > 4) {
    enemy.pattern = "patrol";
  }

  // enemy is stunned, skip turn
  if (enemy.stunnedTurns && enemy.stunnedTurns > 0) {
    enemy.stunnedTurns--;
    return;
  }

  if (!enemy.alive) return;

  switch (enemy.pattern) {
    case "stationary":
      // Do nothing
      break;

    case "patrol":
      const directions = [
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
      ];
      // Simple random movement
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const newX = enemy.x + dir.dx;
      const newY = enemy.y + dir.dy;

      if (map[newY]?.[newX] === 0 && !isOccupied(newX, newY, enemy)) {
        enemy.x = newX;
        enemy.y = newY;
      }

      break;

    case "chase":
      // Move towards player
      const distX = player.x - enemy.x;
      const distY = player.y - enemy.y;

      // If enemy is adjacent to player and try to enter the player's tile, the player dies
      if (Math.abs(distX) + Math.abs(distY) === 1) {
        // enemy attacks player
        state.hp--;

        if (state.hp <= 0) {
          state.deathCount++;
          state.hp = state.maxHp;
          player.x = state.spawn.x;
          player.y = state.spawn.y;
        }
        return;
      }

      if (Math.abs(distX) > Math.abs(distY)) {
        const stepX = enemy.x + Math.sign(distX);

        if (stepX === player.x && enemy.y === player.y) {
          state.deathCount++;
          return;
        }

        if (map[enemy.y]?.[stepX] === 0 && !isOccupied(stepX, enemy.y, enemy)) {
          enemy.x = stepX;
        }
      } else {
        const stepY = enemy.y + Math.sign(distY);

        if (enemy.x === player.x && stepY === player.y) {
          state.deathCount++;
          return;
        }

        if (map[stepY]?.[enemy.x] === 0 && !isOccupied(enemy.x, stepY, enemy)) {
          enemy.y = stepY;
        }
      }
      return;
  }
}
