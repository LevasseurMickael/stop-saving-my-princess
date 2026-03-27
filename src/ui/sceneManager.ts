type Scene = "menu" | "game" | "options" | "pause" | "game_over" | "victory";

class SceneManager {
  private currentScene: Scene = "menu";
  private previousScene: Scene | null = null;

  switchSceneTo(scene: Scene) {
    this.previousScene = this.currentScene;
    this.currentScene = scene;
    console.log(`Switched to scene: ${scene}`);

    this.cleanupScene(this.previousScene);
    this.initializeScene(scene);
  }

  goBack() {
    if (this.previousScene) {
      this.switchSceneTo(this.previousScene);
    }
  }

  getCurrentScene(): Scene {
    return this.currentScene;
  }

  private cleanupScene(scene: Scene) {
    if (scene === "game") {
      // Perform any necessary cleanup for the game scene, such as removing event listeners or resetting state
      console.log("Cleaning up game scene...");
    }
    // Add cleanup logic for other scenes as needed
  }

  private initializeScene(scene: Scene) {
    switch (scene) {
      case "menu":
        // Initialize menu scene, such as setting up UI elements or playing music
        this.showMainMenu();
        console.log("Initializing menu scene...");
        break;
      case "game":
        // Initialize game scene, such as starting the game loop or resetting player state
        this.startGame();
        console.log("Initializing game scene...");
        break;
      case "options":
        // Initialize options scene, such as displaying settings or controls
        this.showOptions();
        console.log("Initializing options scene...");
        break;
      case "pause":
        // Initialize pause scene, such as showing pause menu or stopping game loop
        this.showPauseMenu();
        console.log("Initializing pause scene...");
        break;
      case "game_over":
        // Initialize game over scene, such as displaying score or restart option
        this.showGameOverScreen();
        console.log("Initializing game over scene...");
        break;
      case "victory":
        // Initialize victory scene, such as showing victory message or rewards
        this.showVictoryScreen();
        console.log("Initializing victory scene...");
        break;
    }
  }

  private showMainMenu() {
    // Logic to display main menu UI
    document.getElementById("menu-container")!.style.display = "block";
    document.getElementById("game-container")!.style.display = "none";
    // audioManager.playMusic("menu");
  }

  private startGame() {
    // Logic to start the game, such as initializing game state and starting the game loop
    document.getElementById("menu-container")!.style.display = "none";
    document.getElementById("game-container")!.style.display = "block";
    // audioManager.playMusic("dungeon_1_10");
  }

  private showOptions() {
    // Logic to display options menu UI
    document.getElementById("options-container")!.style.display = "block";
  }

  private showPauseMenu() {
    // Logic to display pause menu UI
    document.getElementById("pause-container")!.style.display = "block";
  }

  private showGameOverScreen() {
    // Logic to display game over screen UI
    document.getElementById("game-over-container")!.style.display = "block";
  }

  private showVictoryScreen() {
    // Logic to display victory screen UI
    document.getElementById("victory-container")!.style.display = "block";
  }
}

export const sceneManager = new SceneManager();
