// src/graphicContext/canvasLayer.ts

import { CanvasScaler } from "./canvasScaler";

export interface GameLayers {
  background: HTMLCanvasElement;
  entities: HTMLCanvasElement;
  characters: HTMLCanvasElement;
  warFog: HTMLCanvasElement;
  ui: HTMLCanvasElement;
}

export interface GameContexts {
  background: CanvasRenderingContext2D;
  entities: CanvasRenderingContext2D;
  characters: CanvasRenderingContext2D;
  warFog: CanvasRenderingContext2D;
  ui: CanvasRenderingContext2D;
}

export function createCanvasLayer(width: number, height: number) {
  const container = document.getElementById("game-canvas");
  if (!container) {
    throw new Error("Game canvas container not found");
  }

  container.innerHTML = "";
  container.style.position = "relative";
  container.style.width = "100%";
  container.style.height = "100%";

  // ✅ Créer les canvas
  const layer: GameLayers = {
    background: document.createElement("canvas"),
    entities: document.createElement("canvas"),
    characters: document.createElement("canvas"),
    warFog: document.createElement("canvas"),
    ui: document.createElement("canvas"),
  };

  // ✅ Configurer chaque canvas
  Object.values(layer).forEach((canvas, index) => {
    canvas.width = width;
    canvas.height = height;
    canvas.style.position = "absolute";
    canvas.style.top = "50%";
    canvas.style.left = "50%";
    canvas.style.transform = "translate(-50%, -50%)";
    canvas.style.imageRendering = "pixelated";
    canvas.style.zIndex = String(index);
    container.appendChild(canvas);
  });

  // ✅ Créer le scaler
  const scaler = new CanvasScaler(layer.background, width, height);

  // ✅ Créer les contextes
  const contexts: GameContexts = {
    background: layer.background.getContext("2d", { alpha: false })!,
    entities: layer.entities.getContext("2d", { alpha: true })!,
    characters: layer.characters.getContext("2d", { alpha: true })!,
    warFog: layer.warFog.getContext("2d", { alpha: true })!,
    ui: layer.ui.getContext("2d", { alpha: true })!,
  };

  // ✅ Fonction pour synchroniser l'échelle de tous les canvas
  const updateAllCanvasScales = () => {
    const { width: scaledWidth, height: scaledHeight } = scaler.getScaledSize();
    
    Object.values(layer).forEach((canvas) => {
      canvas.style.width = `${scaledWidth}px`;
      canvas.style.height = `${scaledHeight}px`;
    });
  };

  // ✅ Appeler une première fois
  updateAllCanvasScales();

  // ✅ Mettre à jour sur resize
  window.addEventListener("resize", updateAllCanvasScales);

  // ✅ RETOURNER LES RÉSULTATS
  return {
    layer,
    contexts,
    scaler,
  };
}