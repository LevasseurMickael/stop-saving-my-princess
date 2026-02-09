import { generateFloor } from "./floorGenerator";
import { state } from "./state";

const TileSize = 32;
const GridSize = 16;

let map = generateFloor(state.currentFloor);

export function loadMap() {
  map = generateFloor(state.currentFloor);
}

export { map, TileSize, GridSize };
