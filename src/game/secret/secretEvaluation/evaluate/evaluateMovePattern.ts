import type { SecretCondition } from "../../../../lib/type";
import {
  evaluateMovePatternLShape,
  evaluateMovePatternSpiral,
  evaluateMovePatternSquare,
  evaluateMovePatternZigzag,
} from "./evaluateHelper/evaluatePattern";

// Function to evaluate move pattern conditions for secrets
export function evaluateMovePattern(
  condition: Extract<SecretCondition, { kind: "move_pattern" }>,
): boolean {
  switch (condition.pattern) {
    case "square":
      return evaluateMovePatternSquare(condition.size);
    case "L-shape":
      return evaluateMovePatternLShape(condition.direction);
    case "zigzag":
      return evaluateMovePatternZigzag(condition.axis, condition.count);
    case "spiral":
      return evaluateMovePatternSpiral(condition.clockwise);
    default:
      return false;
  }
}
