import attack from "../mechanics/attack";
import { map } from "../map/map";
import { saveGame, setFloorResult } from "../mechanics/save";
import {
  stateDungeon,
  statePlayer,
  stateSecret,
  stateShield,
  stateStats,
  stateTurn,
} from "../state";
import { loadFloor } from "../map/floors";
import { enemiesTurn } from "../mechanics/turn";
import { updateShieldState } from "../mechanics/shield";
import { checkHintTile } from "../map/hintTile";
import { handleGameEvent } from "../mechanics/secret/secretSystem";

let deathCount = 0;

// Handle player input
window.addEventListener("keydown", (e) => {
  // Track if the player has taken an action (move, attack, or toggle shield) to determine if enemies should take their turn
  let acted = false;

  // Calculate new position based on input and current facing direction
  const shieldBlocking = stateShield.shield.state !== "retracted";

  // Initialize newX and newY to current position
  let newX = statePlayer.x;
  let newY = statePlayer.y;

  // Cannot move while shield is blocking
  if (!shieldBlocking) {
    // Movement input (ZQSD for movement, Arrow keys for attack)
    if (e.key === "z") {
      newY--;
      statePlayer.facing = "up";
    } else if (e.key === "s") {
      newY++;
      statePlayer.facing = "down";
    } else if (e.key === "q") {
      newX--;
      statePlayer.facing = "left";
    } else if (e.key === "d") {
      newX++;
      statePlayer.facing = "right";
    }

    // movement
    if (newX !== statePlayer.x || newY !== statePlayer.y) {
      if (map[newY][newX] !== 1 && map[newY][newX] !== 4) {
        statePlayer.x = newX;
        statePlayer.y = newY;
        handleGameEvent({ type: "move", x: statePlayer.x, y: statePlayer.y });
        acted = true;
      } else {
        handleGameEvent({ type: "wait" });
        acted = true;
      }
    }

    // directional attack
    if (e.key === "ArrowUp") {
      statePlayer.facing = "up";
      attack();
      acted = true;
    }
    if (e.key === "ArrowDown") {
      statePlayer.facing = "down";
      attack();
      acted = true;
    }
    if (e.key === "ArrowLeft") {
      statePlayer.facing = "left";
      attack();
      acted = true;
    }
    if (e.key === "ArrowRight") {
      statePlayer.facing = "right";
      attack();
      acted = true;
    }
  } else {
    handleGameEvent({ type: "wait" });
    acted = true; // Player can only toggle shield, so we consider that as acting
  }

  // Getting out the shield to block enemy attacks
  if (e.key === " ") {
    if (stateShield.shield.state === "retracted") {
      stateShield.shield.state = "deploying";
      acted = true;
    } else if (stateShield.shield.state === "active") {
      stateShield.shield.state = "retracting";
      acted = true;
    }
  }

  checkHintTile(statePlayer.x, statePlayer.y, stateSecret.hintWall);

  // After player acts, enemies take their turn
  if (acted && stateTurn.turn === "player") {
    stateTurn.turn = "enemies";
    updateShieldState();
    enemiesTurn();
    stateTurn.turn = "player";
  }

  // Check for secret item or floor transition after moving
  if (map[newY][newX] === 2 && stateStats.secretUnlocked) {
    stateStats.hasSecretItem = true;
    map[newY][newX] = 0; // Remove secret item from map
  }
  // Floor transition
  if (map[newY][newX] === 3) {
    setFloorResult(
      stateDungeon.currentFloor,
      stateStats.hasSecretItem ? "1" : "2",
    );
    stateDungeon.currentFloor++;
    saveGame();
    loadFloor();
  }
});

export { deathCount };
