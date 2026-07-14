import { tileIndex } from "./tile_index";

export function wallSpriteLogic(
  map: number[][],
  x: number,
  y: number,
): string | null {
  // Check if the current tile is a wall, if not return null
  const isEmpty = (checkY: number, checkX: number): boolean => {
    if (checkY < 0 || checkY >= map.length) return false;
    if (checkX < 0 || !map[checkY] || checkX >= map[checkY].length)
      return false;
    return map[checkY][checkX] === tileIndex.empty;
  };

  const isWall = (checkY: number, checkX: number): boolean => {
    if (checkY < 0 || checkY >= map.length) return true;
    if (checkX < 0 || !map[checkY] || checkX >= map[checkY].length) return true;
    return map[checkY][checkX] === tileIndex.wall;
  };

  const isHealingRoom = (checkY: number, checkX: number): boolean => {
    if (checkY < 0 || checkY >= map.length) return false;
    if (checkX < 0 || !map[checkY] || checkX >= map[checkY].length)
      return false;
    return map[checkY][checkX] === tileIndex.healingRoom;
  };

  const isSecretRoom = (checkY: number, checkX: number): boolean => {
    if (checkY < 0 || checkY >= map.length) return false;
    if (checkX < 0 || !map[checkY] || checkX >= map[checkY].length)
      return false;
    return map[checkY][checkX] === tileIndex.chest;
  };

  // Check if adjacent tile is and tileIndex.empty to determine if we need to draw a wall sprite and which one, one for each direction (top, bottom, left, right, corners, isolated, dead-ends)
  const topEmpty = isEmpty(y - 1, x);
  const bottomEmpty = isEmpty(y + 1, x);
  const leftEmpty = isEmpty(y, x - 1);
  const rightEmpty = isEmpty(y, x + 1);
  const topLeftEmpty = isEmpty(y - 1, x - 1);
  const topRightEmpty = isEmpty(y - 1, x + 1);
  const bottomLeftEmpty = isEmpty(y + 1, x - 1);
  const bottomRightEmpty = isEmpty(y + 1, x + 1);

  //Check if adjacent tile is a wall to determine if we need to draw a continuation of the wall or a corner
  const topWall = isWall(y - 1, x);
  const bottomWall = isWall(y + 1, x);
  const leftWall = isWall(y, x - 1);
  const rightWall = isWall(y, x + 1);

  const healingAreaAdjacent =
    isHealingRoom(y - 1, x) ||
    isHealingRoom(y + 1, x) ||
    isHealingRoom(y, x - 1) ||
    isHealingRoom(y, x + 1);

  const chestAdjacent =
    isSecretRoom(y - 1, x) ||
    isSecretRoom(y + 1, x) ||
    isSecretRoom(y, x - 1) ||
    isSecretRoom(y, x + 1);

  // Determine the appropriate wall sprite based on adjacent empty tiles and walls

  if (
    topEmpty &&
    leftEmpty &&
    !bottomEmpty &&
    !rightEmpty &&
    !healingAreaAdjacent &&
    !chestAdjacent
  ) {
    return "wall-corner-top-left";
  } else if (
    !topEmpty &&
    !leftEmpty &&
    !bottomEmpty &&
    !rightEmpty &&
    bottomRightEmpty &&
    !healingAreaAdjacent &&
    !chestAdjacent
  ) {
    return "wall-corner-top-left";
  } else if (
    topEmpty &&
    rightEmpty &&
    !bottomEmpty &&
    !leftEmpty &&
    !healingAreaAdjacent &&
    !chestAdjacent
  ) {
    return "wall-corner-top-right";
  } else if (
    !topEmpty &&
    !leftEmpty &&
    !bottomEmpty &&
    !rightEmpty &&
    bottomLeftEmpty &&
    !healingAreaAdjacent &&
    !chestAdjacent
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
    (healingAreaAdjacent || chestAdjacent)
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
