import type { PositionCondition } from "../../../../../lib/type";
import { map } from "../../../../map/map";
import { statePlayer, stateSecret } from "../../../../state";

// Evaluate position-based conditions by checking the player's current position, facing direction, and nearby enemies against the specified condition criteria
export function evaluatePosition(condition: PositionCondition): boolean {
  const player = {
    x: statePlayer.x,
    y: statePlayer.y,
    facing: statePlayer.facing,
  };
  switch (condition.kind) {
    case "on_tile":
      return map[player.y][player.x] === condition.tile;

    case "on_spawn":
      return (
        player.x === statePlayer.spawn.x && player.y === statePlayer.spawn.y
      );

    case "adjacent_to":
      const adjacentTiles = [
        { x: player.x, y: player.y - 1 },
        { x: player.x, y: player.y + 1 },
        { x: player.x - 1, y: player.y },
        { x: player.x + 1, y: player.y },
      ];
      return adjacentTiles.some((pos) => {
        const tile = map[pos.y]?.[pos.x];
        return tile === condition.tile;
      });

    case "facing_tile":
      const dx =
        player.facing === "right" ? 1 : player.facing === "left" ? -1 : 0;
      const dy = player.facing === "down" ? 1 : player.facing === "up" ? -1 : 0;

      const facingX = player.x + dx;
      const facingY = player.y + dy;
      const facingTile = map[facingY]?.[facingX];
      return facingTile === condition.tile;

    case "enemy_nearby":
      return stateSecret.enemies.some((enemy) => {
        if (!enemy.alive) return false;
        const distance =
          Math.abs(enemy.x - player.x) + Math.abs(enemy.y - player.y);
        return distance <= condition.distance;
      });

    default:
      return false;
  }
}
