import { sceneManager } from "../../ui/sceneManager";
import { audioManager } from "../../audio/audioManager";
import { stopGameLoop } from "../../main";

export function showVictoryScreen() {
  stopGameLoop();

  sceneManager.switchSceneTo("victory");
  audioManager.playMusic("victory");
}

export function showGameOverScreen() {
  console.log("💀 Game Over!");

  // Arrêter la game loop
  stopGameLoop();

  sceneManager.switchSceneTo("game_over");
  audioManager.playMusic("game_over");
}