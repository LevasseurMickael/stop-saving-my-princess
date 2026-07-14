import { sceneManager } from "../../ui/sceneManager";
import { audioManager } from "../../audio/audioManager";
import { stopGameLoop } from "../../main";
import { stateStats } from "../state";

export function showVictoryScreen() {
  stopGameLoop();

  sceneManager.switchSceneTo("victory");
  audioManager.playMusic("victory");
}

export function showGameOverScreen() {
  console.log("💀 Game Over!");

  stateStats.hasSecretItem = false;
  stateStats.secretUnlocked = false;

  // Arrêter la game loop
  stopGameLoop();

  sceneManager.switchSceneTo("game_over");
  audioManager.playMusic("game_over");
}