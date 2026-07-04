import { sceneManager } from "../../ui/sceneManager";
import { stateDungeon, statePlayer } from "../state";
import { audioManager } from "../../audio/audioManager";
import { stopGameLoop } from "../../main";

export function showVictoryScreen() {

  document.getElementById("victory-floor")!.textContent = 
    `Floor reached: ${stateDungeon.currentFloor + 1}`;
  document.getElementById("victory-deaths")!.textContent = 
    `Deaths: ${statePlayer.deathCount}`;

  sceneManager.switchSceneTo("victory");
  audioManager.playMusic("victory");
}

export function showGameOverScreen() {
  console.log("💀 Game Over!");

  // Arrêter la game loop
  stopGameLoop();


  document.getElementById("game-over-floor")!.textContent = 
    `Floor reached: ${stateDungeon.currentFloor + 1}`;
  document.getElementById("game-over-deaths")!.textContent = 
    `Deaths: ${statePlayer.deathCount}`;

  sceneManager.switchSceneTo("game_over");
  audioManager.playMusic("game_over");
}