import { player } from "./player";
import { map } from "./map/map";
import { checkSecretCondition } from "./secret";
import { state } from "./state";
import { isOccupied } from "./enemy";
import type { Direction } from "../lib/type";

function getAttackOffset(facing: Direction) {
  switch (facing) {
    case "up":
      return { dx: 0, dy: -1 };
    case "down":
      return { dx: 0, dy: 1 };
    case "left":
      return { dx: -1, dy: 0 };
    case "right":
      return { dx: 1, dy: 0 };
  }
}

export default function attack() {
  const { dx, dy } = getAttackOffset(player.facing);
  const targetX = player.x + dx;
  const targetY = player.y + dy;

  for (const enemy of state.enemies) {
    if (!enemy.alive) continue;

    if (targetX === enemy.x && targetY === enemy.y) {
      // Attack hits enemy
      enemy.hp--;

      // Enemy is stunned for 1 turn
      enemy.stunnedTurns = 1;

      // Enemy is knocked back if possible
      const knockbackX = enemy.x + dx;
      const knockbackY = enemy.y + dy;

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
