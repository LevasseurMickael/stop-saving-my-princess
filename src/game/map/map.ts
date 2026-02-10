import { generateDungeon } from "./dungeonGenerator";
import { state } from "../state";
import { spawnEnemies } from "../entities/enemy";
import { findSecretRoom } from "./secretRoom";
import { createHintTile } from "./hintTile";

const hintText = "Le sang appelle le silence";
const TileSize = 32;
const GridSize = 24;

let map: number[][] = [];

export function loadMap() {
  // Generate a new dungeon layout for the current floor
  const floorSeed = Math.floor(Math.random() * 1000000);
  const dungeon = generateDungeon(floorSeed);

  // Set global map and spawn points
  map = dungeon.map;
  createHintTile(state.currentFloor, 1, hintText, dungeon.rooms);
  state.spawn = dungeon.spawn;
  state.enemies = spawnEnemies(dungeon.rooms, state.spawn);

  // Find secret room and add to state
  const secretRoom = findSecretRoom(map);
  state.secrets = secretRoom ? [{ ...secretRoom, unlocked: false }] : [];

  return dungeon.rooms;
}

export { map, TileSize, GridSize };
