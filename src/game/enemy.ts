import { state } from "./state";

export type Enemy = {
  x: number;
  y: number;
  alive: boolean;
  pattern: string;
};

export let enemies: Enemy[] = [
  { x: 5, y: 5, alive: true, pattern: "chase" },
  { x: 10, y: 10, alive: true, pattern: "horizontal" },
];

export function spawnEnemies() {
  const count = 2 + (state.currentFloor % 4); // Number of enemies based on floor

  return Array.from({ length: count }, (_, i) => ({
    x: 3 + i * 2,
    y: 3,
    alive: true,
    pattern: i % 2 === 0 ? "chase" : "horizontal",
  }));
}
