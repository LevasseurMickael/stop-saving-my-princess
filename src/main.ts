import {
  map,
  TileSize,
  GridSize,
  GridSizeWidth,
  loadMap,
} from "./game/map/map";
import {
  stateDungeon,
  stateDynamic,
  statePlayer,
  stateStats,
} from "./game/state";
import "./game/player/player";
import {
  getPlayerAttackSprite,
  getPlayerSprite,
} from "./graphicContext/playerContext";
import { getEnemiesSprite } from "./graphicContext/enemiesContext";
import { getHudSprite } from "./graphicContext/hudContext";
import { getMapSprite } from "./graphicContext/mapContext";

// Initialize canvas and rendering context
const canvas = document.createElement("canvas");
canvas.width = 1200;
canvas.height = 800;
document.body.appendChild(canvas);

// Render the game state to the canvas
const ctx = canvas.getContext("2d")!;

// Initial clear
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Render function to draw the map, player, enemies, and HUD
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw map tiles
  getMapSprite(ctx, map, GridSize, GridSizeWidth, TileSize);

  // Draw player
  getPlayerSprite(ctx, statePlayer, TileSize);

  // Draw radius where the player attack is effective
  getPlayerAttackSprite(ctx, statePlayer, TileSize);

  // Draw enemies
  getEnemiesSprite(ctx, stateDynamic, TileSize);

  // Draw HUD
  getHudSprite(ctx, statePlayer, stateStats, stateDungeon);
}

// Load initial floor and start game loop
loadMap();

// Main game loop using requestAnimationFrame for smooth rendering
function gameLoop() {
  render();
  requestAnimationFrame(gameLoop);
}

gameLoop();
