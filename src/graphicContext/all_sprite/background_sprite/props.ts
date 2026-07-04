import type { SpriteConfig } from "../../../lib/type";

export const propSprites: Record<string, SpriteConfig> = {
  "stairs-down": {
    sheetSrc: "/wall_props_32px.png",
    x: 128,
    y: 32,
    width: 32,
    height: 32,
  },
  "stairs-up": {
    sheetSrc: "/wall_props_32px.png",
    x: 160,
    y: 32,
    width: 32,
    height: 32,
  },
  "door-closed": {
    sheetSrc: "/wall_props_32px.png",
    x: 160,
    y: 0,
    width: 32,
    height: 32,
  },
  "door-open": {
    sheetSrc: "/wall_props_32px.png",
    x: 128,
    y: 0,
    width: 32,
    height: 32,
  },
  "hint-wall": {
    sheetSrc: "/wall_props_32px.png",
    x: 160,
    y: 64,
    width: 32,
    height: 32,
  },
  "chest-closed": {
    sheetSrc: "/wall_props_32px.png",
    x: 128,
    y: 96,
    width: 32,
    height: 32,
  },
  "chest-open": {
    sheetSrc: "/wall_props_32px.png",
    x: 160,
    y: 96,
    width: 32,
    height: 32,
  },
  "floor-healing": {
    sheetSrc: "/wall_props_32px.png",
    x: 96,
    y: 64,
    width: 32,
    height: 32,
  },
  "floor-healing-taken": {
    sheetSrc: "/wall_props_32px.png",
    x: 96,
    y: 96,
    width: 32,
    height: 32,
  },
};
