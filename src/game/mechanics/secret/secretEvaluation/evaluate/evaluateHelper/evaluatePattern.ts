import { stateSecret } from "../../../../../state";
import { arraysEqual, getDirections } from "../../getDirection";

export function evaluateMovePatternSquare(size: number): boolean {
  const moves = stateSecret.eventHistory
    .filter((e) => e.type === "move")
    .slice(-(size * 4 + 1)); // Get the last moves that could form a square

  if (moves.length < size * 4 + 1) return false; // Not enough moves to form a square

  const directions = getDirections(moves);

  let idx = 0;

  for (let i = 0; i < size; i++) {
    if (directions[idx++] !== "down") return false;
  }
  for (let i = 0; i < size; i++) {
    if (directions[idx++] !== "right") return false;
  }
  for (let i = 0; i < size; i++) {
    if (directions[idx++] !== "up") return false;
  }
  for (let i = 0; i < size; i++) {
    if (directions[idx++] !== "left") return false;
  }

  return true;
}

export function evaluateMovePatternLShape(variant: string): boolean {
  const moves = stateSecret.eventHistory
    .filter((e) => e.type === "move")
    .slice(-(6 + 1)); // Get the last 6 moves that could form an L-shape

  if (moves.length < 6 + 1) return false; // Not enough moves to form an L-shape

  const directions = getDirections(moves);

  const patterns: Record<string, string[]> = {
    normal: ["down", "down", "down", "right", "right", "right"],
    inverted: ["right", "right", "right", "down", "down", "down"],
    flipped: ["up", "up", "up", "right", "right", "right"],
    mirror: ["down", "down", "down", "left", "left", "left"],
  };

  return arraysEqual(directions, patterns[variant]);
}

export function evaluateMovePatternZigzag(
  axis: string,
  count: number,
): boolean {
  const moves = stateSecret.eventHistory
    .filter((e) => e.type === "move")
    .slice(-(count * 3 + 1)); // Get the last moves that could form a zigzag

  if (moves.length < count * 3 + 1) return false; // Not enough moves to form a zigzag

  const directions = getDirections(moves);

  if (axis === "horizontal") {
    for (let i = 0; i < count; i++) {
      const segment = directions.slice(i * 3, (i + 1) * 3);
      const expected = i % 2 === 0 ? "right" : "left";
      if (!segment.every((d) => d === expected)) return false;
    }
  } else if (axis === "vertical") {
    for (let i = 0; i < count; i++) {
      const segment = directions.slice(i * 3, (i + 1) * 3);
      const expected = i % 2 === 0 ? "down" : "up";
      if (!segment.every((d) => d === expected)) return false;
    }
  }

  return true;
}

export function evaluateMovePatternSpiral(clockwise: boolean): boolean {
  const moves = stateSecret.eventHistory
    .filter((e) => e.type === "move")
    .slice(-(16 + 1)); // Get the last moves that could form a spiral

  if (moves.length < 16 + 1) return false; // Not enough moves to form a spiral

  const directions = getDirections(moves);
  if (clockwise) {
    const expected = [
      ...Array(4).fill("right"),
      ...Array(3).fill("down"),
      ...Array(3).fill("left"),
      ...Array(2).fill("up"),
      ...Array(2).fill("right"),
      "down",
      "left",
    ];
    return arraysEqual(directions, expected);
  } else {
    const expected = [
      ...Array(4).fill("left"),
      ...Array(3).fill("down"),
      ...Array(3).fill("right"),
      ...Array(2).fill("up"),
      ...Array(2).fill("left"),
      "down",
      "right",
    ];
    return arraysEqual(directions, expected);
  }
}
