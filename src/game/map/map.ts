import { generateDungeon } from "./dungeonGenerator";
import {
  stateDungeon,
  stateDynamic,
  statePlayer,
  stateSecret,
  stateStats,
} from "../state";
import { spawnEnemies } from "../entities/enemy";
import { findSecretRoom } from "./secretRoom";
import { createHintTile } from "./hintTile";
import { allSecretConditions } from "../mechanics/secret/allSecret";

const TileSize = 32;
const GridSize = 24;

let map: number[][] = [];

export function loadMap() {
  // Reset state for new floor
  stateSecret.eventHistory.length = 0;
  stateSecret.turnCounter = 0;
  stateStats.secretUnlocked = false;
  stateDynamic.enemies = [];
  stateDynamic.secrets = [];

  // Generate a new dungeon layout for the current floor
  const floorSeed = Math.floor(Math.random() * 1000000);
  const dungeon = generateDungeon(floorSeed);

  // Set global map and spawn points
  map = dungeon.map;

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
  stateDynamic.enemies = spawnEnemies(dungeon.rooms, {
    x: statePlayer.x,
    y: statePlayer.y,
  });

  // Find secret room and add to state
  const secretRoom = findSecretRoom(map);
  stateDynamic.secrets = secretRoom ? [{ ...secretRoom, unlocked: false }] : [];
  return dungeon.rooms;
}

export { map, TileSize, GridSize };
