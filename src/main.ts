import {
  map,
  TileSize,
  GridSize,
  GridSizeWidth,
  loadMap,
} from "./game/map/map";
import { stateDungeon, stateDynamic, statePlayer, stateTurn } from "./game/state";
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
import { updatePlayerAnimation } from "./game/player/playerAnimation";
import { updateEnemiesAnimation, updateEnemiesAttackAnimation } from "./game/enemy/enemyAnimation";
import { renderEffects, updateEffects } from "./graphicContext/animations/effectsAnimation";

// const { layer, contexts } = createCanvasLayer(1280, 960);

// Variables globales
let ctxBackground: CanvasRenderingContext2D;
let ctxEntities: CanvasRenderingContext2D;
let ctxCharacters: CanvasRenderingContext2D;
let ctxWarFog: CanvasRenderingContext2D;
let ctxUI: CanvasRenderingContext2D;

let backgroundDirty = true;

export function markBackgroundDirty() {
  backgroundDirty = true;
}

let gameLoopRunning = false;
let animationFrameId: number | null = null;
let isPaused = false;

export function getIsPaused() {
  return isPaused;
}

// ========================================
// RENDER FUNCTIONS
// ========================================

function renderBackground() {
  if (!backgroundDirty) return;
  ctxBackground.clearRect(0, 0, 1280, 960);
  getBackgroundSprite(ctxBackground, map, GridSize, GridSizeWidth, TileSize);
  backgroundDirty = false;
}

function renderEntities() {
  ctxEntities.clearRect(0, 0, 1280, 960);
  getEntitiesSprite(ctxEntities, map, GridSize, GridSizeWidth, TileSize);
}

function renderCharacters() {
  ctxCharacters.clearRect(0, 0, 1280, 960);
  getPlayerSprite(ctxCharacters, statePlayer, TileSize);
  getPlayerAttackSprite(ctxCharacters, statePlayer, TileSize);
  getEnemiesSprite(ctxCharacters, stateDynamic, TileSize);
}

function renderWarFog() {
  ctxWarFog.clearRect(0, 0, 1280, 960);
  getWarFogSprite(ctxWarFog, GridSize, GridSizeWidth, TileSize);
}

function renderUI() {
  ctxUI.clearRect(0, 0, 1280, 960);
  getHudSprite(ctxUI);
}

function render() {
  updatePlayerAnimation();
  updateEnemiesAnimation(stateDynamic.enemies);
  updateEnemiesAttackAnimation(stateDynamic.enemies);
  updateEffects();
  renderBackground();
  renderEntities();
  renderCharacters();
  renderWarFog();
  renderUI();
  renderEffects(ctxUI, TileSize);
}

// ========================================
// GAME LOOP
// ========================================

function startGameLoop() {
  console.log("🎮 startGameLoop() called");
  if (gameLoopRunning) {
    console.warn("⚠️ Game loop already running");
    return;
  }
  
  gameLoopRunning = true;

  function loop() {
    render();
    if (gameLoopRunning) {
      animationFrameId = requestAnimationFrame(loop);
    }
  }
  
  loop();
  console.log("  ✅ Game loop started");
}

export function stopGameLoop() {
  console.log("⏸️ stopGameLoop() called");
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
  console.log("🆕 startNewGame() called");
  
  sceneManager.switchSceneTo("game");
  console.log("  ✅ Scene switched to game");

  stateDungeon.currentFloor = 0;
  statePlayer.stat.hp = statePlayer.stat.maxHp;
  statePlayer.deathCount = 0;
  stateTurn.turn = "player";

  console.log("  ✅ Game state reset");
  
  loadMap();
  console.log("  ✅ Map loaded");
  
  // ✅ Forcer le redraw
  markBackgroundDirty();
  console.log("  ✅ Background marked dirty");
  
  startGameLoop();
  audioManager.startDungeonMusicRotation();
}

function continueGame() {
  console.log("▶️ continueGame() called");
  
  sceneManager.switchSceneTo("game");
  // TODO activate loading game, verify game is saved correctly
  // loadSavedGame();
  loadMap();
  
  markBackgroundDirty();
  startGameLoop();

  audioManager.startDungeonMusicRotation();
}

function pauseGame() {
  console.log("⏸️ pauseGame() called");
  isPaused = true;
  stopGameLoop();
  sceneManager.switchSceneTo("pause");
}

function resumeGame() {
  console.log("▶️ resumeGame() called");
  isPaused = false;
  stateTurn.turn = "player";
  sceneManager.switchSceneTo("game");
  markBackgroundDirty();
  startGameLoop();
}

function quitToMainMenu() {
  console.log("🏠 quitToMainMenu() called");
  isPaused = false;
  stopGameLoop();
  sceneManager.switchSceneTo("menu");
  audioManager.playMusic("menu");
}

// ========================================
// MENU SETUP
// ========================================

function setupMenuButtons() {
  console.log("🔧 setupMenuButtons()");
  
  document.getElementById("btn-new-game")!.addEventListener("click", () => {
    console.log("🖱️ New Game clicked");
    audioManager.playSound("ui_click");
    startNewGame();
  });

  document.getElementById("btn-continue")!.addEventListener("click", () => {
    console.log("🖱️ Continue clicked");
    audioManager.playSound("ui_click");
    continueGame();
  });

  document.getElementById("btn-options")!.addEventListener("click", () => {
    console.log("🖱️ Options clicked");
    audioManager.playSound("ui_click");
    sceneManager.switchSceneTo("options");
  });

  document.getElementById("btn-quit")!.addEventListener("click", () => {
    console.log("🖱️ Quit clicked");
    audioManager.playSound("ui_click");
    window.close();
  });
}

function setupOptionsButtons() {
  console.log("🔧 setupOptionsButtons()");
  
  const masterSlider = document.getElementById("volume-master") as HTMLInputElement;
  const masterValue = document.getElementById("volume-master-value");

  masterSlider.addEventListener("input", (e) => {
    const value = (e.target as HTMLInputElement).valueAsNumber;
    audioManager.setMasterVolume(value / 100);
    if (masterValue) masterValue.textContent = `${value}%`;
  });

  const musicSlider = document.getElementById("volume-music") as HTMLInputElement;
  const musicValue = document.getElementById("volume-music-value");

  musicSlider.addEventListener("input", (e) => {
    const value = (e.target as HTMLInputElement).valueAsNumber;
    audioManager.setMusicVolume(value / 100);
    if (musicValue) musicValue.textContent = `${value}%`;
  });

  const sfxSlider = document.getElementById("volume-sfx") as HTMLInputElement;
  const sfxValue = document.getElementById("volume-sfx-value");

  sfxSlider.addEventListener("input", (e) => {
    const value = (e.target as HTMLInputElement).valueAsNumber;
    audioManager.setSfxVolume(value / 100);
    if (sfxValue) sfxValue.textContent = `${value}%`;
  });

  document.getElementById("btn-back")!.addEventListener("click", () => {
    console.log("🖱️ Back clicked");
    audioManager.playSound("ui_click");
    sceneManager.goBack();
  });
}

function setupPauseButtons() {
  console.log("🔧 setupPauseButtons()");
  
  document.getElementById("btn-resume")!.addEventListener("click", () => {
    console.log("🖱️ Resume clicked");
    audioManager.playSound("ui_click");
    resumeGame();
  });

  document.getElementById("btn-options-pause")!.addEventListener("click", () => {
    console.log("🖱️ Options (pause) clicked");
    audioManager.playSound("ui_click");
    sceneManager.switchSceneTo("options");
  });

  document.getElementById("btn-quit-menu")!.addEventListener("click", () => {
    console.log("🖱️ Quit to menu clicked");
    audioManager.playSound("ui_click");
    quitToMainMenu();
  });
}

function setupGameButtons() {
  console.log("🔧 setupGameButtons()");
  
  document.getElementById("btn-pause")!.addEventListener("click", () => {
    console.log("🖱️ Pause button clicked");
    audioManager.playSound("ui_click");
    pauseGame();
  });
}

function setupKeyboardShortcuts() {
  console.log("🔧 setupKeyboardShortcuts()");
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sceneManager.getCurrentScene() === "game" && !isPaused) {
      console.log("⌨️ Escape pressed (game)");
      pauseGame();
    } else if (e.key === "Escape" && sceneManager.getCurrentScene() === "pause") {
      console.log("⌨️ Escape pressed (pause)");
      resumeGame();
    }
  });
}

function setupVictoryButtons() {
  document.getElementById("btn-victory-menu")!.addEventListener("click", () => {
    console.log("🏠 Victory -> Menu");
    audioManager.playSound("ui_click");
    quitToMainMenu();
  });
}

function setupGameOverButtons() {
  document.getElementById("btn-game-over-menu")!.addEventListener("click", () => {
    console.log("🏠 Game Over -> Menu");
    audioManager.playSound("ui_click");
    quitToMainMenu();
  });

  document.getElementById("btn-game-over-retry")!.addEventListener("click", () => {
    console.log("🔄 Retrying game");
    audioManager.playSound("ui_click");
    startNewGame();
  });
}

// ========================================
// INITIALIZATION
// ========================================

async function startGame() {
  console.log("🎮 startGame() called");

  try {
    console.log("📦 Loading images...");
    await preloadAllImage();
    console.log("✅ Images loaded!");

    console.log("🎵 Loading sounds...");
    await audioManager.preloadSounds();
    await audioManager.preloadMusic();
    console.log("✅ Sounds loaded!");

    // ✅ CRÉER LES CANVAS APRÈS QUE LE DOM SOIT CHARGÉ
    console.log("🎨 Creating canvas layers...");
    const { layer, contexts } = createCanvasLayer(1280, 960);
    console.log("✅ Canvas layers created!");

    // ✅ ASSIGNER LES CONTEXTES
    ctxBackground = contexts.background;
    ctxEntities = contexts.entities;
    ctxCharacters = contexts.characters;
    ctxWarFog = contexts.warFog;
    ctxUI = contexts.ui;
    console.log("✅ Canvas contexts assigned!");

    // ✅ SETUP BOUTONS
    setupMenuButtons();
    setupOptionsButtons();
    setupPauseButtons();
    setupGameButtons();
    setupVictoryButtons();
    setupGameOverButtons();
    setupKeyboardShortcuts();
    console.log("✅ All buttons set up!");

    // ✅ DÉMARRER SUR LE MENU
    sceneManager.switchSceneTo("menu");
    audioManager.playMusic("menu");
    
    console.log("✅ Game initialized successfully!");
  } catch (error) {
    console.error("❌ Error during initialization:", error);
    if (error instanceof Error) {
      console.error("Stack:", error.stack);
    }
  }
}

console.log("📋 About to call startGame()");
startGame();
console.log("📋 startGame() call completed");