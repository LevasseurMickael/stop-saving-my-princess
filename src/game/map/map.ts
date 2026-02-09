import { generateDungeon } from "./dungeonGenerator";
import { state } from "../state";
import { spawnEnemies } from "../enemy";
import { secretRoom } from "./secretRoom";

const TileSize = 32;
const GridSize = 24;

let map: number[][] = [];

export function loadMap() {
  // Génère un seed entier unique pour cette floor
  const floorSeed = Math.floor(Math.random() * 1000000);
  const dungeon = generateDungeon(floorSeed);

  map = dungeon.map;
  state.spawn = dungeon.spawn;
  state.enemies = spawnEnemies(dungeon.rooms, state.spawn);
  state.secrets = secretRoom(dungeon.rooms, state.enemies);

  return dungeon.rooms;
}

export { map, TileSize, GridSize };
