export type Enemy = {
  x: number;
  y: number;
  alive: boolean;
  pattern: "chase" | "horizontal" | "vertical";
};

export let enemies: Enemy[] = [
  { x: 5, y: 5, alive: true, pattern: "chase" },
  { x: 10, y: 10, alive: true, pattern: "horizontal" },
];
