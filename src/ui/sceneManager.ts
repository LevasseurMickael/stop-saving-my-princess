type Scene = "menu" | "game" | "options" | "pause" | "game_over" | "victory";

class SceneManager {
  private currentScene: Scene = "menu";
  private previousScene: Scene | null = null;

  switchSceneTo(scene: Scene) {
    this.previousScene = this.currentScene;
    this.currentScene = scene;
    console.log(`Switched to scene: ${scene}`);

    this.hideAllScenes();

    this.showScene(scene);

  }

  goBack() {
    if (this.previousScene) {
      this.switchSceneTo(this.previousScene);
    }
  }

  getCurrentScene() {
    return this.currentScene;
  }

  private hideAllScenes() {
    document.querySelectorAll(".scene").forEach((el) => {
      el.classList.remove("active");
    });
  }

  private showScene(scene: Scene) {
    const containers: Record<Scene, string> = {
      menu: "menu-container",
      game: "game-container",
      options: "options-container",
      pause: "pause-container",
      game_over: "game-over-container",
      victory: "victory-container",
    };

    const containerId = containers[scene];
    const container = document.getElementById(containerId);

    if (container) {
      console.log(`Showing scene container: ${containerId}`);
      container.classList.add("active");
    } else {
      console.error(`Container for scene "${scene}" not found!`);
    }
  }
}
  
export const sceneManager = new SceneManager();
