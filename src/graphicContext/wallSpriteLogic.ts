import { tileIndex } from "./tile_index";

export function wallSpriteLogic(
  map: number[][],
  x: number,
  y: number,
): string | null {
  // Check if the current tile is a wall, if not return null
  if (!x) {
    return "wall";
  }
  if (!y) {
    return "wall";
  }

  // Check if adjacent tile is and tileIndex.empty to determine if we need to draw a wall sprite and which one, one for each direction (top, bottom, left, right, corners, isolated, dead-ends)
  const topEmpty = map[y - 1] && map[y - 1][x] === tileIndex.empty;
  const bottomEmpty = map[y + 1] && map[y + 1][x] === tileIndex.empty;
  const leftEmpty = map[y][x - 1] === tileIndex.empty;
  const rightEmpty = map[y][x + 1] === tileIndex.empty;
  const topLeftEmpty = map[y - 1] && map[y - 1][x - 1] === tileIndex.empty;
  const topRightEmpty = map[y - 1] && map[y - 1][x + 1] === tileIndex.empty;
  const bottomLeftEmpty = map[y + 1] && map[y + 1][x - 1] === tileIndex.empty;
  const bottomRightEmpty = map[y + 1] && map[y + 1][x + 1] === tileIndex.empty;

  //Check if adjacent tile is a wall to determine if we need to draw a continuation of the wall or a corner
  const topWall = map[y - 1] && map[y - 1][x] === tileIndex.wall;
  const bottomWall = map[y + 1] && map[y + 1][x] === tileIndex.wall;
  const leftWall = map[y][x - 1] === tileIndex.wall;
  const rightWall = map[y][x + 1] === tileIndex.wall;

  const healingAreaAdjacent =
    (map[y - 1] && map[y - 1][x] === tileIndex.healingRoom) ||
    (map[y + 1] && map[y + 1][x] === tileIndex.healingRoom) ||
    map[y][x - 1] === tileIndex.healingRoom ||
    map[y][x + 1] === tileIndex.healingRoom;

  // Determine the appropriate wall sprite based on adjacent empty tiles and walls

  if (
    topEmpty &&
    leftEmpty &&
    !bottomEmpty &&
    !rightEmpty &&
    !healingAreaAdjacent
  ) {
    return "wall-corner-top-left";
  } else if (
    !topEmpty &&
    !leftEmpty &&
    !bottomEmpty &&
    !rightEmpty &&
    bottomRightEmpty &&
    !healingAreaAdjacent
  ) {
    return "wall-corner-top-left";
  } else if (
    topEmpty &&
    rightEmpty &&
    !bottomEmpty &&
    !leftEmpty &&
    !healingAreaAdjacent
  ) {
    return "wall-corner-top-right";
  } else if (
    !topEmpty &&
    !leftEmpty &&
    !bottomEmpty &&
    !rightEmpty &&
    bottomLeftEmpty &&
    !healingAreaAdjacent
  ) {
    return "wall-corner-top-right";
  } else if (bottomEmpty && leftEmpty && !topEmpty && !rightEmpty) {
    return "wall-corner-bottom-left";
  } else if (
    !topEmpty &&
    !leftEmpty &&
    !bottomEmpty &&
    !rightEmpty &&
    topRightEmpty
  ) {
    return "wall-corner-bottom-left";
  } else if (bottomEmpty && rightEmpty && !topEmpty && !leftEmpty) {
    return "wall-corner-bottom-right";
  } else if (
    !topEmpty &&
    !leftEmpty &&
    !bottomEmpty &&
    !rightEmpty &&
    topLeftEmpty
  ) {
    return "wall-corner-bottom-right";
  } else if (topEmpty && bottomEmpty && leftEmpty && rightEmpty) {
    return "wall-isolated";
  } else if (
    topEmpty &&
    !bottomEmpty &&
    leftEmpty &&
    rightEmpty &&
    !leftWall &&
    !rightWall
  ) {
    return "wall-dead-end up";
  } else if (
    !topEmpty &&
    bottomEmpty &&
    leftEmpty &&
    rightEmpty &&
    !leftWall &&
    !rightWall
  ) {
    return "wall-dead-end down";
  } else if (
    topEmpty &&
    bottomEmpty &&
    leftEmpty &&
    !rightEmpty &&
    !topWall &&
    !bottomWall
  ) {
    return "wall-dead-end left";
  } else if (
    topEmpty &&
    bottomEmpty &&
    !leftEmpty &&
    rightEmpty &&
    !topWall &&
    !bottomWall
  ) {
    return "wall-dead-end right";
  } else if (!topEmpty && !leftEmpty && bottomEmpty && !rightEmpty) {
    return "wall-top";
  } else if (
    !topEmpty &&
    !leftEmpty &&
    !bottomEmpty &&
    !rightEmpty &&
    healingAreaAdjacent
  ) {
    return "wall-top";
  } else if (topEmpty && !leftEmpty && !bottomEmpty && !rightEmpty) {
    return "wall-bottom";
  } else if (topEmpty && !leftEmpty && bottomEmpty && !rightEmpty) {
    return "wall-bottom";
  } else if (!topEmpty && !leftEmpty && !bottomEmpty && rightEmpty) {
    return "wall-left";
  } else if (!topEmpty && leftEmpty && !bottomEmpty && !rightEmpty) {
    return "wall-right";
  } else if (!topEmpty && leftEmpty && !bottomEmpty && rightEmpty) {
    return "wall-right";
  } else {
    return "wall";
  }
}
