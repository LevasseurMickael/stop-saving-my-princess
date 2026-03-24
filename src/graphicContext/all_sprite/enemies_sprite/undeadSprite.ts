import type { SpriteConfig } from "../../../lib/type";

export const undeadSprite: Record<string, SpriteConfig> = {
  Skeleton: {
    sheetSrc: "/undead_32px.png",
    x: 0,
    y: 0,
    width: 32,
    height: 32,
  },
  Wraith: {
    sheetSrc: "/undead_32px.png",
    x: 32,
    y: 0,
    width: 32,
    height: 32,
  },
  "Bone Archer": {
    sheetSrc: "/undead_32px.png",
    x: 64,
    y: 0,
    width: 32,
    height: 32,
  },
  "Rotting Champion": {
    sheetSrc: "/undead_32px.png",
    x: 96,
    y: 0,
    width: 32,
    height: 32,
  },
};
