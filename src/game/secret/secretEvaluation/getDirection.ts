import type { Direction, GameEvent } from "../../../lib/type";

export function getDirections(moves: GameEvent[]): Direction[] {
  const directions: Direction[] = [];

  for (let i = 1; i < moves.length; i++) {
    const prev = moves[i - 1];
    const curr = moves[i];

    if ("x" in prev && "x" in curr && "y" in prev && "y" in curr) {
      if (curr.x > prev.x) directions.push("right");
      else if (curr.x < prev.x) directions.push("left");
      else if (curr.y > prev.y) directions.push("down");
      else if (curr.y < prev.y) directions.push("up");
    }
  }

  return directions;
}

export function arraysEqual<T>(a: T[], b: T[]): boolean {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}
