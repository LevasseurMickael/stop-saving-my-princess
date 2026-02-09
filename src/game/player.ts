import attack from "./attack";
import { map, spawn } from "./map";
import { enemies } from "./enemy";
import { saveGame, setFloorResult } from "./save";
import { state } from "./state";
import { loadFloor } from "./floors";
import { enemyTurn } from "./turn";

const player = {
  x: 1,
  y: 1,
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

  for (const enemy of enemies) {
    if (enemy.alive && player.x === enemy.x && player.y === enemy.y) {
      console.log("dead");
      player.x = spawn.x;
      player.y = spawn.y;
      state.deathCount++;
    }
  }
  if (e.key === " ") {
    attack();
    acted = true;
  }

  if (acted) {
    enemyTurn();
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
