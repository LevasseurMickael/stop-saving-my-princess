import { state, stateDungeon } from "../state";

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
  localStorage.setItem(
    "save",
    JSON.stringify({
      state,
    }),
  );
}

export function loadGame() {
  const s = localStorage.getItem("save");
  if (!s) return;
  Object.assign(state, JSON.parse(s));
}
