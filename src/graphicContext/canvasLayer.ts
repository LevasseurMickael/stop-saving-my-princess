export interface GameLayers {
  background: HTMLCanvasElement; // Sol, murs statiques
  entities: HTMLCanvasElement; // Portes, coffres (objets qui changent d'état)
  characters: HTMLCanvasElement; // Joueur, ennemis (objets qui bougent)
  ui: HTMLCanvasElement; // HUD, interface
}

/**
 * Contextes de rendu pour chaque layer
 */
export interface GameContexts {
  background: CanvasRenderingContext2D;
  entities: CanvasRenderingContext2D;
  characters: CanvasRenderingContext2D;
  ui: CanvasRenderingContext2D;
}

export function createCanvasLayer(
  width: number,
  height: number,
): {
  layer: GameLayers;
  contexts: GameContexts;
} {
  const container = document.createElement("div");
  container.style.position = "relative";
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
  document.body.appendChild(container);

  const createLayer = (zIndex: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = zIndex.toString();
    container.appendChild(canvas);
    return canvas!;
  };

  const layer: GameLayers = {
    background: createLayer(0), // For static elements like floor tiles, walls and hintwalls
    entities: createLayer(1), // For dynamic static elements like door, chest, stair, props
    characters: createLayer(2), // For player, enemies, projectile, effects
    ui: createLayer(3), // For HUD, health bars, damage numbers, and other UI elements
  };

  const contexts: GameContexts = {
    background: layer.background.getContext("2d")!,
    entities: layer.entities.getContext("2d")!,
    characters: layer.characters.getContext("2d")!,
    ui: layer.ui.getContext("2d")!,
  };

  return { layer, contexts };
}
