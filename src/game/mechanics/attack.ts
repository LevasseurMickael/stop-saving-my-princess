import { player } from "../entities/player";
import { map } from "../map/map";
import { checkSecretCondition } from "../mechanics/secret";
import { state } from "../state";
import { isOccupied } from "../entities/enemy";
import type { Direction } from "../../lib/type";
import { knockbackEnemy } from "./knockback";

// Calculate attack offset based on player's facing direction
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

// Handle player attack action
export default function attack() {
  // Cannot attack while shield is not retracted
  if (state.shield.state !== "retracted") {
    return;
  }

  // Calculate target tile based on player's facing direction
  const { dx, dy } = getAttackOffset(player.facing);
  const targetX = player.x + dx;
  const targetY = player.y + dy;

  // Check if attack hits any enemy
  for (const enemy of state.enemies) {
    if (!enemy.alive) continue;

    if (targetX === enemy.x && targetY === enemy.y) {
      // Attack hits enemy
      enemy.hp--;

      // Enemy is stunned for 1 turn
      enemy.stunnedTurns = 1;

      // Enemy is knocked back if possible
      knockbackEnemy(enemy);

      // Enemy dies if HP reaches 0
      if (enemy.hp <= 0) {
        enemy.alive = false;
        state.kills++;
      }

      // Check if secret condition is met after the attack and unlock secret area if so
      if (checkSecretCondition() && !state.secretUnlocked) {
        state.secretUnlocked = true;
        if (state.secrets.length > 0) {
          const secret = state.secrets[0];
          secret.unlocked = true;
          map[secret.y][secret.x] = 2; // Unlock secret area
        }
      }
      return true; // Attack hit an enemy
    }
  }
  return false; // Attack missed
}
