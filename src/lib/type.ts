export type Enemy = {
  x: number;
  y: number;
  stunnedTurns?: number; // number of turns the enemy is stunned
  hp: number;
  alive: boolean;
  pattern: string;
};

export type Direction = "up" | "down" | "left" | "right";

export type Room = { x: number; y: number; w: number; h: number };
