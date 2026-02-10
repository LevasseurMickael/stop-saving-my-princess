import { player } from "../entities/player";
import { state } from "../state";
import type { Direction } from "../../lib/type";
import { knockbackEnemy } from "./knockback";
import { handleGameEvent } from "./secret/secretSystem";

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
  const hitEnemy = state.enemies.some((enemy) => {
    if (!enemy.alive) return false;

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

      // Check if secret condition is met after attack and handle event
      handleGameEvent({ type: "attack", direction: player.facing });
      return true; // Attack hit an enemy
    }
  });

  if (!hitEnemy) {
    // If attack missed, still handle the attack event for secret conditions
    handleGameEvent({ type: "wait" });
  }
}
