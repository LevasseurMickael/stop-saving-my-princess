import { state } from "./state";

export function setFloorResult(floor: number, value: "1" | "2") {
  state.floorState =
    state.floorState.substring(0, floor) +
    value +
    state.floorState.substring(floor + 1);
}

export function getFloorResult(floor: number) {
  return state.floorState[floor];
}

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
