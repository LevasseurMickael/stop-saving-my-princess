import { generateDungeon } from "./dungeonGenerator";
import { state } from "./state";

const TileSize = 32;
const GridSize = 24;

let dungeon = generateDungeon(state.currentFloor);
let map = dungeon.map;
export let spawn = dungeon.spawn;

export function loadMap() {
  dungeon = generateDungeon(state.currentFloor);
  map = dungeon.map;
  spawn = dungeon.spawn;
}

export { map, TileSize, GridSize };
