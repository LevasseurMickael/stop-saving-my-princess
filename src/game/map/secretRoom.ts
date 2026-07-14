import { tileIndex } from "../../graphicContext/tile_index";
import { markBackgroundDirty } from "../../main";
import { stateDynamic, stateStats } from "../state";

import { map } from "./map";

export function revealTreasureRoom() {
  if (!stateDynamic.secretRoom) return;

  stateStats.secretUnlocked = true;

  for (const tile of stateDynamic.secretRoom.tiles) {
    map[tile.y][tile.x] = tileIndex.empty; // Mark secret room tiles as empty on the map
  }

  // Reveal the secret room door and chest on the map
  map[stateDynamic.secretRoom.doorY][stateDynamic.secretRoom.doorX] =
    tileIndex.treasureDoor; // Mark secret room door on the map

  map[stateDynamic.secretRoom.y][stateDynamic.secretRoom.x] = tileIndex.chest; // Mark secret room center as chest on the map

  // refresh the map to show the newly revealed door and chest

  markBackgroundDirty();
}
