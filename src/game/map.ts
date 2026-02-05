import { createEmptyFloor } from "./floors";

const TileSize = 32;
const GridSize = 16;

let map = createEmptyFloor();

export function loadMap() {
  map = createEmptyFloor();
}

export { map, TileSize, GridSize };
