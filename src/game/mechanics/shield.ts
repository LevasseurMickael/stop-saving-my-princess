import type { Enemy } from "../../lib/type";
import { player } from "../entities/player";
import { state } from "../state";

// Update shield state based on current state
export function updateShieldState() {
  if (state.shield.state === "deploying") {
    state.shield.state = "active";
  } else if (state.shield.state === "retracting") {
    state.shield.state = "retracted";
  }
}

// Check if an enemy's attack is blocked by the player's shield
export function isBlockedByShield(enemy: Enemy) {
  if (state.shield.state !== "active") {
    return false;
  }

  const dx = enemy.x - player.x;
  const dy = enemy.y - player.y;

  switch (player.facing) {
    case "up":
      return dx === 0 && dy === -1;
    case "down":
      return dx === 0 && dy === 1;
    case "left":
      return dx === -1 && dy === 0;
    case "right":
      return dx === 1 && dy === 0;
  }
}
