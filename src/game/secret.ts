import { state } from "./state";

const secrets = [
  { kills: 3 }, // floor 0
  { kills: 2 }, // floor 1
  { kills: 4 }, // floor 2
];

export function getSecretKills() {
  return secrets[state.currentFloor]?.kills ?? 3;
}
