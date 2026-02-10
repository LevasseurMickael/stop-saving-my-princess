import attack from "../mechanics/attack";
import { map } from "../map/map";
import { saveGame, setFloorResult } from "../mechanics/save";
import { state } from "../state";
import { loadFloor } from "../map/floors";
import { enemiesTurn } from "../mechanics/turn";
import type { Direction } from "../../lib/type";

// Player entity with position and facing direction
const player = {
  x: 0,
  y: 0,
  facing: "down" as Direction,
};

let deathCount = 0;

// Handle player input
window.addEventListener("keydown", (e) => {
  let acted = false;

  let newX = player.x;
  let newY = player.y;

  if (e.key === "z") {
    newY--;
    player.facing = "up";
  } else if (e.key === "s") {
    newY++;
    player.facing = "down";
  } else if (e.key === "q") {
    newX--;
    player.facing = "left";
  } else if (e.key === "d") {
    newX++;
    player.facing = "right";
  }

  // movement
  if (newX !== player.x || newY !== player.y) {
    if (map[newY][newX] !== 1) {
      player.x = newX;
      player.y = newY;
    }

    acted = true;
  }

  // directional attack
  if (e.key === "ArrowUp") {
    player.facing = "up";
    attack();
    acted = true;
  }
  if (e.key === "ArrowDown") {
    player.facing = "down";
    attack();
    acted = true;
  }
  if (e.key === "ArrowLeft") {
    player.facing = "left";
    attack();
    acted = true;
  }
  if (e.key === "ArrowRight") {
    player.facing = "right";
    attack();
    acted = true;
  }

  // After player acts, enemies take their turn
  if (acted && state.turn === "player") {
    state.turn = "enemies";
    enemiesTurn();
    state.turn = "player";
  }

  // Check for secret item or floor transition after moving
  if (map[newY][newX] === 2 && state.secretUnlocked) {
    state.hasSecretItem = true;
    map[newY][newX] = 0; // Remove secret item from map
  }
  // Floor transition
  if (map[newY][newX] === 3) {
    setFloorResult(state.currentFloor, state.hasSecretItem ? "1" : "2");
    state.currentFloor++;
    saveGame();
    loadFloor();
  }
});

export { player, deathCount };
