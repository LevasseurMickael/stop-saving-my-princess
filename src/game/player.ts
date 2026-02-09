import attack from "./attack";
import { map } from "./map/map";
import { saveGame, setFloorResult } from "./save";
import { state } from "./state";
import { loadFloor } from "./map/floors";
import { enemiesTurn } from "./turn";

const player = {
  x: 0,
  y: 0,
};

let deathCount = 0;

window.addEventListener("keydown", (e) => {
  let acted = false;

  let newX = player.x;
  let newY = player.y;

  if (e.key === "ArrowUp" || e.key === "w") newY--;
  else if (e.key === "ArrowDown" || e.key === "s") newY++;
  else if (e.key === "ArrowLeft" || e.key === "a") newX--;
  else if (e.key === "ArrowRight" || e.key === "d") newX++;

  // movement
  if (newX !== player.x || newY !== player.y) {
    if (map[newY][newX] !== 1) {
      player.x = newX;
      player.y = newY;
    }

    acted = true;
  }

  if (e.key === " ") {
    attack();
    acted = true;
  }

  if (acted && state.turn === "player") {
    state.turn = "enemies";
    enemiesTurn();
    state.turn = "player";
  }

  if (map[newY][newX] === 2 && state.secretUnlocked) {
    state.hasSecretItem = true;
    map[newY][newX] = 0; // Remove secret item from map
  }
  if (map[newY][newX] === 3) {
    setFloorResult(state.currentFloor, state.hasSecretItem ? "1" : "2");
    state.currentFloor++;
    saveGame();
    loadFloor();
  }
});

export { player, deathCount };
