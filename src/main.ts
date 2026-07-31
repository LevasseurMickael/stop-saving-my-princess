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
  stateKillCount,
  statePlayer,
  stateSecret,
  stateStats,
  stateTurn,
} from "./game/state";
import "./game/player/player";
import {
  // getPlayerAttackSprite,
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
let splashShown = false;
let audioInitialized = false;

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
  // getPlayerAttackSprite(ctxCharacters, statePlayer, TileSize);
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
}

export function stopGameLoop() {
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
  statePlayer.floor0StartTime = Date.now();
  
  sceneManager.switchSceneTo("game");

  if (stateDynamic.healingRoom) {
    stateDynamic.healingRoom.isUnlocked = false;
  }
  if (stateDynamic.secretRoom) {
    stateDynamic.secretRoom.isUnlocked = false;
    stateDynamic.secretRoom.doorSecret = false;
  }
  if (stateStats.hasSecretItem) {
    stateStats.hasSecretItem = false;
  }
  if (stateStats.secretUnlocked) {
    stateStats.secretUnlocked = false;
  }
  
  stateDynamic.healUsed = false;
  stateDynamic.chest = false;

  // Full reset of secret progression trackers for a fresh run.
  for (const key in stateKillCount) {
    if (Object.prototype.hasOwnProperty.call(stateKillCount, key)) {
      stateKillCount[key] = 0;
    }
  }
  stateSecret.eventHistory.length = 0;
  stateSecret.turnCounter = 0;
  stateSecret.damageFromFamily = {};
  stateSecret.healedAtFullHp = false;
  stateSecret.visitAllRoom = [];
  stateSecret.cornersVisited.clear();

  stateDungeon.currentFloor = 0;
  statePlayer.stat.hp = statePlayer.stat.maxHp;
  statePlayer.deathCount = 0;
  stateTurn.turn = "player";

  
  loadMap();
  
  // ✅ Forcer le redraw
  markBackgroundDirty();
  
  startGameLoop();
  audioManager.startDungeonMusicRotation();
}

function continueGame() {
  
  sceneManager.switchSceneTo("game");
  if (stateDynamic.healingRoom) {
    stateDynamic.healingRoom.isUnlocked = false;
  }
  if (stateDynamic.secretRoom) {
    stateDynamic.secretRoom.isUnlocked = false;
    stateDynamic.secretRoom.doorSecret = false;
  }
  if (stateStats.hasSecretItem) {
    stateStats.hasSecretItem = false;
  }
  if (stateStats.secretUnlocked) {
    stateStats.secretUnlocked = false;
  }
  
  stateDynamic.healUsed = false;
  stateDynamic.chest = false;
  // loadSavedGame();
  loadMap();
  
  markBackgroundDirty();
  startGameLoop();

  audioManager.startDungeonMusicRotation();
}

function pauseGame() {
  isPaused = true;
  stopGameLoop();
  sceneManager.switchSceneTo("pause");
}

function resumeGame() {
  isPaused = false;
  stateTurn.turn = "player";
  sceneManager.switchSceneTo("game");
  markBackgroundDirty();
  startGameLoop();
}

function quitToMainMenu() {
  isPaused = false;

  // Always reset transient secret/chest state when leaving the run.
  stateStats.hasSecretItem = false;
  stateStats.secretUnlocked = false;
  stateDynamic.healUsed = false;
  stateDynamic.chest = false;
  if (stateDynamic.healingRoom) {
    stateDynamic.healingRoom.isUnlocked = false;
  }
  if (stateDynamic.secretRoom) {
    stateDynamic.secretRoom.isUnlocked = false;
    stateDynamic.secretRoom.doorSecret = false;
  }

  stopGameLoop();
  sceneManager.switchSceneTo("menu");
  audioManager.playMusic("menu");
}

// ========================================
// MENU SETUP
// ========================================

function setupMenuButtons() {
  
  document.getElementById("btn-new-game")!.addEventListener("click", () => {
    audioManager.playSound("ui_click");
    startNewGame();
  });

  document.getElementById("btn-continue")!.addEventListener("click", () => {
    audioManager.playSound("ui_click");
    continueGame();
  });

  document.getElementById("btn-options")!.addEventListener("click", () => {
    audioManager.playSound("ui_click");
    sceneManager.switchSceneTo("options");
  });

  document.getElementById("btn-quit")!.addEventListener("click", () => {
    audioManager.playSound("ui_click");
    window.close();
  });
}

function setupOptionsButtons() {
  
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
    audioManager.playSound("ui_click");
    sceneManager.goBack();
  });
}

function setupPauseButtons() {
  
  document.getElementById("btn-resume")!.addEventListener("click", () => {
    audioManager.playSound("ui_click");
    resumeGame();
  });

  document.getElementById("btn-options-pause")!.addEventListener("click", () => {
    audioManager.playSound("ui_click");
    sceneManager.switchSceneTo("options");
  });

  document.getElementById("btn-quit-menu")!.addEventListener("click", () => {
    audioManager.playSound("ui_click");
    quitToMainMenu();
  });
}

function setupGameButtons() {
  
  document.getElementById("btn-pause")!.addEventListener("click", () => {
    audioManager.playSound("ui_click");
    pauseGame();
  });
}

function setupKeyboardShortcuts() {
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sceneManager.getCurrentScene() === "game" && !isPaused) {
      pauseGame();
    } else if (e.key === "Escape" && sceneManager.getCurrentScene() === "pause") {
      resumeGame();
    }
  });
}

function setupVictoryButtons() {
  document.getElementById("btn-victory-menu")!.addEventListener("click", () => {
    audioManager.playSound("ui_click");
    quitToMainMenu();
  });
}

function setupGameOverButtons() {
  document.getElementById("btn-game-over-menu")!.addEventListener("click", () => {
    audioManager.playSound("ui_click");
    quitToMainMenu();
  });

  document.getElementById("btn-game-over-retry")!.addEventListener("click", () => {
    audioManager.playSound("ui_click");
    if (stateDynamic.healingRoom) {
    stateDynamic.healingRoom.isUnlocked = false;
  }
  if (stateDynamic.secretRoom) {
    stateDynamic.secretRoom.isUnlocked = false;
    stateDynamic.secretRoom.doorSecret = false;
  }
  if (stateStats.hasSecretItem) {
    stateStats.hasSecretItem = false;
  }

  if (stateStats.secretUnlocked) {
    stateStats.secretUnlocked = false;
  }
  
  
  stateDynamic.healUsed = false;
  stateDynamic.chest = false;
    startNewGame();
  });
}

// ========================================
// INITIALIZATION
// ========================================

async function startGame() {

  try {
    await preloadAllImage();

    await audioManager.preloadSounds();
    await audioManager.preloadMusic();

    // ✅ CRÉER LES CANVAS APRÈS QUE LE DOM SOIT CHARGÉ
    const {  contexts } = createCanvasLayer(1280, 960);

    // ✅ ASSIGNER LES CONTEXTES
    ctxBackground = contexts.background;
    ctxEntities = contexts.entities;
    ctxCharacters = contexts.characters;
    ctxWarFog = contexts.warFog;
    ctxUI = contexts.ui;

    // ✅ SETUP BOUTONS
    setupMenuButtons();
    setupOptionsButtons();
    setupPauseButtons();
    setupGameButtons();
    setupVictoryButtons();
    setupGameOverButtons();
    setupKeyboardShortcuts();
    setupSplashScreen();


    
  } catch (error) {
    console.error("❌ Error during initialization:", error);
    if (error instanceof Error) {
      console.error("Stack:", error.stack);
    }
  }
}

function setupSplashScreen() {
  const initSplash = () => {
    if (!splashShown) {
      console.log("✨ Splash screen clicked!");
      splashShown = true;
      
      // Passer au menu
      sceneManager.switchSceneTo("menu");
      
      // Lancer la musique
      if (!audioInitialized) {
        console.log("🎵 Starting menu music...");
        audioManager.playMusic("menu");
        audioInitialized = true;
      }
      
      // Retirer les listeners
      document.removeEventListener("click", initSplash);
      document.removeEventListener("keydown", initSplash);
    }
  };

  // Attendre un clic ou une touche
  document.addEventListener("click", initSplash, { once: true });
  document.addEventListener("keydown", initSplash, { once: true });
}

startGame();