import type { SaveGame } from "../../lib/type";
import { stateDungeon, statePlayer, stateStats } from "../state";

export function setFloorResult(floor: number, value: "1" | "2") {
  stateDungeon.floorState =
    stateDungeon.floorState.substring(0, floor) +
    value +
    stateDungeon.floorState.substring(floor + 1);
}

// Get the result for a specific floor (e.g., "1" for secret item obtained, "2" for not obtained)
export function getFloorResult(floor: number) {
  return stateDungeon.floorState[floor];
}

// Save and load game state to/from localStorage
export function saveGame() {
  const save: SaveGame = {
    dungeon: {
      currentFloor: stateDungeon.currentFloor,
      floorState: stateDungeon.floorState,
      runSeed: stateDungeon.runSeed,
    },
    player: {
      hp: statePlayer.hp,
      maxHp: statePlayer.maxHp,
      deathCount: statePlayer.deathCount,
    },
    stats: {
      hasSecretItem: stateStats.hasSecretItem,
    },
  };
  localStorage.setItem("save", JSON.stringify(save));
}

export function loadGame() {
  const raw = localStorage.getItem("save");
  if (!raw) return;
  const save: SaveGame = JSON.parse(raw);

  stateDungeon.currentFloor = save.dungeon.currentFloor;
  stateDungeon.floorState = save.dungeon.floorState;
  stateDungeon.runSeed = save.dungeon.runSeed;

  statePlayer.hp = save.player.hp;
  statePlayer.maxHp = save.player.maxHp;
  statePlayer.deathCount = save.player.deathCount;

  stateStats.hasSecretItem = save.stats.hasSecretItem;
}
