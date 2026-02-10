import { spawnEnemies } from "../entities/enemy";
import { GridSize } from "./map";
import { player } from "../entities/player";
import { state } from "../state";
import { loadMap } from "./map";

// Functions related to floor generation and management
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

// Load the current floor, reset player and enemies
export function loadFloor() {
  state.kills = 0;
  state.hasSecretItem = false;
  state.secretUnlocked = false;
  // Clear existing enemies
  state.enemies.length = 0;
  // Spawn new enemies for the floor
  state.enemies.push(...spawnEnemies(loadMap(), state.spawn));

  player.x = 1;
  player.y = 1;

  loadMap();
}
