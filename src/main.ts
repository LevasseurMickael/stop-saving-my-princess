import {
  map,
  TileSize,
  GridSize,
  GridSizeWidth,
  loadMap,
} from "./game/map/map";
import { stateDynamic, statePlayer } from "./game/state";
import "./game/player/player";
import {
  getPlayerAttackSprite,
  getPlayerSprite,
} from "./graphicContext/playerContext";
import { getEnemiesSprite } from "./graphicContext/enemiesContext";
import { getHudSprite } from "./graphicContext/hudContext";

import { preloadAllImage } from "./graphicContext/imageLoader";
import { getBackgroundSprite } from "./graphicContext/contexts/backgroundContext";
import { getEntitiesSprite } from "./graphicContext/contexts/entitiesContext";
import { createCanvasLayer } from "./graphicContext/canvasLayer";

// Created canvas layers and their contexts
const { layer, contexts } = createCanvasLayer(1200, 912);

// Created a global render function that will be called every frame
let ctxBackground: CanvasRenderingContext2D;
let ctxEntities: CanvasRenderingContext2D;
let ctxCharacters: CanvasRenderingContext2D;
let ctxUI: CanvasRenderingContext2D;

// Flag to control when to redraw the background (static elements)
let backgroundDirty = true;

// Function to mark background as dirty when something changes that requires a redraw
export function markBackgroundDirty() {
  backgroundDirty = true;
}

/// Render the background layer (floor, walls, hint walls) - only if dirty
function renderBackground() {
  if (!backgroundDirty) return;

  ctxBackground.clearRect(0, 0, 1200, 912);
  getBackgroundSprite(ctxBackground, map, GridSize, GridSizeWidth, TileSize);

  backgroundDirty = false;
}

/// Render the entities layer (chests, doors, stairs) - needs to be called every frame because of dynamic elements like doors opening
function renderEntities() {
  ctxEntities.clearRect(0, 0, 1200, 912);
  getEntitiesSprite(ctxEntities, map, GridSize, GridSizeWidth, TileSize);
}

// Render the characters layer (player, enemies, projectiles) - needs to be called every frame for movement and animations
function renderCharacters() {
  ctxCharacters.clearRect(0, 0, 1200, 912);

  // Draw player
  getPlayerSprite(ctxCharacters, statePlayer, TileSize);

  // Draw player attack radius
  getPlayerAttackSprite(ctxCharacters, statePlayer, TileSize);

  // Draw enemies
  getEnemiesSprite(ctxCharacters, stateDynamic, TileSize);
}

// Render the UI layer (HUD, health bars, etc.) - needs to be called every frame for dynamic UI updates
function renderUI() {
  ctxUI.clearRect(0, 0, 1200, 912);
  getHudSprite(ctxUI);
}

// Main render function that calls individual layer renderers
function render() {
  renderBackground(); // ← Only redraw if something changed that requires it (e.g. new floor, secret revealed)
  renderEntities(); // ← Every frame (doors opening/closing, chests opening, etc.)
  renderCharacters(); // ← Every frame (movements)
  renderUI(); // ← Every frame (HP change, etc.)
}

// Init function to load resources and start the game loop
async function startGame() {
  console.log("Loading images...");
  await preloadAllImage();
  console.log("Images loaded!");

  // Assign contexts to global variables for use in render functions
  ctxBackground = contexts.background;
  ctxEntities = contexts.entities;
  ctxCharacters = contexts.characters;
  ctxUI = contexts.ui;

  // Load the initial map and set up the game state
  loadMap();

  // Start the game loop
  gameLoop();
}

// Game loop using requestAnimationFrame for smooth rendering
function gameLoop() {
  render();
  requestAnimationFrame(gameLoop);
}

// Start the game
startGame();
