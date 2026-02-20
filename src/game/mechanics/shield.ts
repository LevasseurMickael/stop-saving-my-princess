import type { Enemy } from "../../lib/type";
import { statePlayer, stateShield } from "../state";
import { handleGameEvent } from "./secret/secretEvaluation/secretSystem";

// Update shield state based on current state
export function updateShieldState() {
  if (stateShield.shield.state === "deploying") {
    stateShield.shield.state = "active";
    handleGameEvent({ type: "shield_active" });
  } else if (stateShield.shield.state === "retracting") {
    stateShield.shield.state = "retracted";
  }
}

// Check if an enemy's attack is blocked by the player's shield
export function isBlockedByShield(enemy: Enemy) {
  if (stateShield.shield.state !== "active") {
    return false;
  }

  const dx = enemy.x - statePlayer.x;
  const dy = enemy.y - statePlayer.y;

  switch (statePlayer.facing) {
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
