import { floorSprites } from "./background_sprite/floor";
import { propSprites } from "./background_sprite/props";
import { wallSprites } from "./background_sprite/walls";
import { ghostSprite } from "./enemies_sprite/ghostSprite";
import { livingArmorSprite } from "./enemies_sprite/livingArmor";
import { mageSprite } from "./enemies_sprite/mageSprite";
import { royalKnightSprite } from "./enemies_sprite/royalKnight";
import { slimeSprite } from "./enemies_sprite/slimeSprite";
import { undeadSprite } from "./enemies_sprite/undeadSprite";
import { verminSprite } from "./enemies_sprite/vermin_sprite";
import { playerSprite } from "./player_sprite/playerSprite";

export const allSpriteObject = Object.assign(
  propSprites,
  floorSprites,
  wallSprites,
  slimeSprite,
  verminSprite,
  ghostSprite,
  royalKnightSprite,
  livingArmorSprite,
  mageSprite,
  undeadSprite,
  playerSprite,
);
