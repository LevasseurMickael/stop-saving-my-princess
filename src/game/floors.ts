import { enemies } from "./enemy";
import { GridSize } from "./map";
import { player } from "./player";
import { state } from "./state";
import { loadMap } from "./map";

export function createEmptyFloor() {
  const map = Array.from({ length: GridSize }, () => Array(GridSize).fill(0));
  for (let y = 0; y < GridSize; y++) {
    for (let x = 0; x < GridSize; x++) {
      if (x === 0 || x === GridSize - 1 || y === 0 || y === GridSize - 1) {
        map[y][x] = 1; // Wall
      }
    }
  }
  map[14][14] = 3; // stairs

  return map;
}

export function loadFloor() {
  state.kills = 0;
  state.hasSecretItem = false;
  state.secretUnlocked = false;
  for (const enemy of enemies) {
    enemy.alive = true;
  }

  player.x = 1;
  player.y = 1;

  loadMap();
}
