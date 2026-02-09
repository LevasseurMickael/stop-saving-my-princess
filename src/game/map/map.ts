import { generateDungeon } from "./dungeonGenerator";
import { state } from "../state";
import { spawnEnemies } from "../enemy";
import { secretRoom } from "./secretRoom";

const TileSize = 32;
const GridSize = 24;

let dungeon = generateDungeon(state.currentFloor);
let map = dungeon.map;

state.spawn = dungeon.spawn;
state.enemies = spawnEnemies(dungeon.rooms, state.spawn);
state.secrets = secretRoom(dungeon.rooms, state.enemies);

export function loadMap() {
  dungeon = generateDungeon(state.currentFloor);
  map = dungeon.map;
  state.spawn = dungeon.spawn;
  state.enemies = spawnEnemies(dungeon.rooms, state.spawn);
  state.secrets = secretRoom(dungeon.rooms, state.enemies);
  return dungeon.rooms;
}

export { map, TileSize, GridSize };
