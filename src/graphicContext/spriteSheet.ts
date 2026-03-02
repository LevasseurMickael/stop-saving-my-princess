import type { SpriteConfig } from "../lib/type";

export const sprites: Record<string, SpriteConfig> = {
  "stairs-down": {
    sheetSrc: "/map_sheet.png",
    x: 128,
    y: 192,
    width: 64,
    height: 64,
  },
  "stairs-up": {
    sheetSrc: "/map_sheet.png",
    x: 192,
    y: 192,
    width: 64,
    height: 64,
  },
  "door-closed": {
    sheetSrc: "/map_sheet.png",
    x: 0,
    y: 256,
    width: 64,
    height: 64,
  },
  "door-open": {
    sheetSrc: "/map_sheet.png",
    x: 0,
    y: 192,
    width: 64,
    height: 64,
  },
};
