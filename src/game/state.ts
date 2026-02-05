const MaxFloors = 25;

export const state = {
  currentFloor: 0,
  floorState: "0".repeat(MaxFloors),
  kills: 0,
  hasSecretItem: false,
  deathCount: 0,
  secretUnlocked: false,
};
