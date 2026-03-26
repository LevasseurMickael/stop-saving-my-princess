// This file contain the function to determine the facing direction of the player or the enemies and return the corresponding y coordinate of the sprite sheet.

export function getFacingDirection(
  facing: string,
  attackWeapon?: string,
  charging?: number,
): number {
  if (attackWeapon === "ranged" && charging === 1) {
    switch (facing) {
      case "down":
        return 128;
      case "left":
        return 160;
      case "right":
        return 192;
      case "up":
        return 224;
      default:
        return 128; // Default to down if facing is not recognized
    }
  }
  switch (facing) {
    case "down":
      return 0;
    case "left":
      return 32;
    case "right":
      return 64;
    case "up":
      return 96;
    default:
      return 0; // Default to down if facing is not recognized
  }
}
