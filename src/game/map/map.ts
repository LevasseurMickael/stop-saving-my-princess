import { generateDungeon } from "./dungeonGenerator";
import {
  stateDungeon,
  stateDynamic,
  statePlayer,
  stateSecret,
  stateStats,
} from "../state";
import { spawnEnemies } from "../enemy/enemy";
import { findSecretRoom } from "./secretRoom";
import { createHintTile } from "./hintTile";
import { allSecretConditions } from "../secret/allSecretCondition";
import { tileIndex } from "../../graphicContext/tile_index";

const TileSize = 24;
const GridSize = 38;
const GridSizeWidth = 50; // For wider maps in later floors

let map: number[][] = [];

export function loadMap() {
  // Reset state for new floor
  stateSecret.eventHistory.length = 0;
  stateSecret.turnCounter = 0;
  stateStats.secretUnlocked = false;
  stateDynamic.enemies = [];
  stateDynamic.secrets = [];

  // Generate a new dungeon layout for the current floor
  const dungeon = generateDungeon(stateDungeon.runSeed);

  // Set global map and spawn points
  map = dungeon.map;

  if (dungeon.healingRoom) {
    stateDynamic.healingRoom = dungeon.healingRoom;
    map[dungeon.healingRoom.doorY][dungeon.healingRoom.doorX] =
      tileIndex.secretDoor; // Mark healing room door on the map
    map[dungeon.healingRoom.y][dungeon.healingRoom.x] = tileIndex.healingRoom; // Mark healing room center on the map
  }

  // Check if there's a secret condition for this floor and create hint tile if so
  const secret = allSecretConditions.find(
    (s) => s.floor === stateDungeon.currentFloor + 1,
  );
  if (secret) {
    createHintTile(
      stateDungeon.currentFloor,
      secret.tier,
      secret.hint,
      dungeon.rooms,
    );
  }
  statePlayer.x = dungeon.spawn.x;
  statePlayer.y = dungeon.spawn.y;
  stateDynamic.enemies = spawnEnemies(
    dungeon.rooms,
    {
      x: statePlayer.x,
      y: statePlayer.y,
    },
    stateDungeon.currentFloor + 1,
  );

  // Synchronize stateSecret.enemies with stateDynamic.enemies for secret conditions
  stateSecret.enemies = stateDynamic.enemies;

  // Find secret room and add to state
  const secretRoom = findSecretRoom(map);
  stateDynamic.secrets = secretRoom ? [{ ...secretRoom, unlocked: false }] : [];
  return dungeon.rooms;
}

export { map, TileSize, GridSize, GridSizeWidth };
