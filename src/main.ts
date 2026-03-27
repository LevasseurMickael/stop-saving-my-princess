import {
  map,
  TileSize,
  GridSize,
  GridSizeWidth,
  loadMap,
} from "./game/map/map";
import { stateDungeon, stateDynamic, statePlayer } from "./game/state";
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
import { getWarFogSprite } from "./graphicContext/contexts/warFogContext";
import { audioManager } from "./audio/audioManager";
import { sceneManager } from "./ui/sceneManager";

// Created canvas layers and their contexts
const { layer, contexts } = createCanvasLayer(1280, 960);

// Created a global render function that will be called every frame
let ctxBackground: CanvasRenderingContext2D;
let ctxEntities: CanvasRenderingContext2D;
let ctxCharacters: CanvasRenderingContext2D;
let ctxWarFog: CanvasRenderingContext2D;
let ctxUI: CanvasRenderingContext2D;

// Flag to control when to redraw the background (static elements)
let backgroundDirty = true;

// Function to mark background as dirty when something changes that requires a redraw
export function markBackgroundDirty() {
  backgroundDirty = true;
}

// Game loop control
let gameLoopRunning = false;
let animationFrameId: number | null = null;

/// Render the background layer (floor, walls, hint walls) - only if dirty
function renderBackground() {
  if (!backgroundDirty) return;

  ctxBackground.clearRect(0, 0, 1280, 960);
  getBackgroundSprite(ctxBackground, map, GridSize, GridSizeWidth, TileSize);
  backgroundDirty = false;
}

/// Render the entities layer (chests, doors, stairs) - needs to be called every frame because of dynamic elements like doors opening
function renderEntities() {
  ctxEntities.clearRect(0, 0, 1280, 960);
  getEntitiesSprite(ctxEntities, map, GridSize, GridSizeWidth, TileSize);
}

// Render the characters layer (player, enemies, projectiles) - needs to be called every frame for movement and animations
function renderCharacters() {
  ctxCharacters.clearRect(0, 0, 1280, 960);

  // Draw player
  getPlayerSprite(ctxCharacters, statePlayer, TileSize);

  // Draw player attack radius
  getPlayerAttackSprite(ctxCharacters, statePlayer, TileSize);

  // Draw enemies
  getEnemiesSprite(ctxCharacters, stateDynamic, TileSize);
}

function renderWarFog() {
  ctxWarFog.clearRect(0, 0, 1280, 960);
  getWarFogSprite(ctxWarFog, GridSize, GridSizeWidth, TileSize);
}

// Render the UI layer (HUD, health bars, etc.) - needs to be called every frame for dynamic UI updates
function renderUI() {
  ctxUI.clearRect(0, 0, 1280, 960);
  getHudSprite(ctxUI);
}

// Main render function that calls individual layer renderers
function render() {
  renderBackground(); // ← Only redraw if something changed that requires it (e.g. new floor, secret revealed)
  renderEntities(); // ← Every frame (doors opening/closing, chests opening, etc.)
  renderCharacters(); // ← Every frame (movements)
  renderWarFog(); // ← Every frame (fog of war changes)
  renderUI(); // ← Every frame (HP change, etc.)
}

// ========================================
// GAME LOOP
// ========================================
function startGameLoop() {
  if (gameLoopRunning) return; // Prevent multiple loops from being started
  gameLoopRunning = true;

  function loop() {
    render();
    animationFrameId = requestAnimationFrame(loop);
  }
  loop();
}

function stopGameLoop() {
  gameLoopRunning = false;
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

// ========================================
// GAME ACTIONS
// ========================================
function startNewGame() {
  sceneManager.switchSceneTo("game");

  stateDungeon.currentFloor = 0;
  statePlayer.stat.hp = statePlayer.stat.maxHp;
  statePlayer.deathCount = 0;

  loadMap();
  startGameLoop();
  // audioManager.playMusic("dungeon_1_10");
}

function continueGame() {
  sceneManager.switchSceneTo("game");
  // loadSavedGame();
  loadMap();
  startGameLoop();

  const floor = stateDungeon.currentFloor;
  if (floor <= 10) {
    // audioManager.playMusic("dungeon_1_10");
  } else if (floor <= 20) {
    // audioManager.playMusic("dungeon_11_20");
  } else if (floor <= 30) {
    // audioManager.playMusic("dungeon_21_30");
  } else if (floor <= 40) {
    // audioManager.playMusic("dungeon_31_40");
  } else {
    // audioManager.playMusic("dungeon_41_50");
  }
}

function pauseGame() {
  stopGameLoop();
  sceneManager.switchSceneTo("pause");
}

function resumeGame() {
  sceneManager.switchSceneTo("game");
  startGameLoop();
}

function quitToMainMenu() {
  stopGameLoop();
  sceneManager.switchSceneTo("menu");
  audioManager.playMusic("menu");
}

// ========================================
// MENU SETUP
// ========================================
function setupMenuButtons() {
  // "New Game" button
  document.getElementById("btn-new-game")!.addEventListener("click", () => {
    audioManager.playSound("ui_click");
    startNewGame();
  });

  // "Continue" button
  document.getElementById("btn-continue")!.addEventListener("click", () => {
    audioManager.playSound("ui_click");
    continueGame();
  });

  // "Options" button
  document.getElementById("btn-options")!.addEventListener("click", () => {
    audioManager.playSound("ui_click");
    sceneManager.switchSceneTo("options");
  });

  // "Quit" button
  document.getElementById("btn-quit")!.addEventListener("click", () => {
    audioManager.playSound("ui_click");
    window.close(); // Note: This may not work in all browsers due to security restrictions, consider showing a confirmation dialog instead or simply returning to the main menu
  });
}

function setupOptionsButtons() {
  // Volume Master
  const masterSlider = document.getElementById(
    "volume-master",
  ) as HTMLInputElement;
  const masterValue = document.getElementById("volume-master-value");

  masterSlider.addEventListener("input", (e) => {
    const value = (e.target as HTMLInputElement).valueAsNumber;
    audioManager.setMasterVolume(value / 100);
    if (masterValue) masterValue.textContent = `${value}%`;
  });

  // Volume Musique
  const musicSlider = document.getElementById(
    "volume-music",
  ) as HTMLInputElement;
  const musicValue = document.getElementById("volume-music-value");

  musicSlider.addEventListener("input", (e) => {
    const value = (e.target as HTMLInputElement).valueAsNumber;
    audioManager.setMusicVolume(value / 100);
    if (musicValue) musicValue.textContent = `${value}%`;
  });

  // Volume SFX
  const sfxSlider = document.getElementById("volume-sfx") as HTMLInputElement;
  const sfxValue = document.getElementById("volume-sfx-value");

  sfxSlider.addEventListener("input", (e) => {
    const value = (e.target as HTMLInputElement).valueAsNumber;
    audioManager.setSfxVolume(value / 100);
    if (sfxValue) sfxValue.textContent = `${value}%`;
  });

  // Bouton "Back"
  document.getElementById("btn-back")!.addEventListener("click", () => {
    audioManager.playSound("ui_click");
    sceneManager.goBack();
  });
}

// Init function to load resources and start the game loop

async function startGame() {
  console.log("Loading images...");
  await preloadAllImage();
  console.log("Images loaded!");

  console.log("loading sounds...");
  await audioManager.preloadSounds();
  await audioManager.preloadMusic();
  console.log("Sounds loaded!");

  // Assign contexts to global variables for use in render functions
  ctxBackground = contexts.background;
  ctxEntities = contexts.entities;
  ctxCharacters = contexts.characters;
  ctxWarFog = contexts.warFog;
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
