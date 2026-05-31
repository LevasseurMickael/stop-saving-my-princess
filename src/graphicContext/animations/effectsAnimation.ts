export interface EffectAnimation {
  x: number;
  y: number;
  type: "aoe" | "hit";
  startTime: number;
  duration: number;
  range?: number
}

const activeEffects: EffectAnimation[] = [];

export function createAOEEffect(centerX: number, centerY: number, duration: number = 200, range: number) {
  activeEffects.push({
    x: centerX,
    y: centerY,
    type: "aoe",
    startTime: Date.now(),
    duration,
    range,
  });
}

export function createHitEffect(targetX: number, targetY: number, duration: number = 150) {
  activeEffects.push({
    x: targetX,
    y: targetY,
    type: "hit",
    startTime: Date.now(),
    duration
  });
}

export function updateEffect(): void {
  const now = Date.now();

  for(let i = activeEffects.length - 1; i>=0; i--) {
    if(now - activeEffects[i].startTime > activeEffects[i].duration) {
      activeEffects.splice(i, 1)
    }
  }
}

// src/graphicContext/animations/effectsAnimation.ts

export function renderEffects(ctx: CanvasRenderingContext2D, tileSize: number): void {
  const now = Date.now();

  // Dessiner les hit effects d'abord
  activeEffects.forEach((effect) => {
    if (effect.type === "hit") {
      const elapsed = now - effect.startTime;
      const progress = Math.min(elapsed / effect.duration, 1);
      renderHitEffect(ctx, effect, tileSize, progress);
    }
  });

  // Puis les AOE effects (par-dessus)
  activeEffects.forEach((effect) => {
    if (effect.type === "aoe") {
      const elapsed = now - effect.startTime;
      const progress = Math.min(elapsed / effect.duration, 1);
      renderAOEEffect(ctx, effect, tileSize, progress);
    }
  });
}

function renderAOEEffect(ctx: CanvasRenderingContext2D, effect: EffectAnimation, tileSize: number, progress: number): void {
  const x = effect.x * tileSize + tileSize / 2;
  const y = effect.y * tileSize + tileSize / 2;

  const maxRadius = (effect.range || 3) * tileSize;
  const radius = maxRadius * progress;

  const opacity = 1 - progress;

  ctx.fillStyle = `rgba(255, 100, 100, ${opacity * 0.6})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function renderHitEffect(ctx: CanvasRenderingContext2D, effect: EffectAnimation, tileSize: number, progress: number): void {
  const x = effect.x * tileSize;
  const y = effect.y * tileSize;

  const opacity = (1 - progress) * 0.8;

  ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  ctx.fillRect(x, y, tileSize, tileSize);

  const redOpacity = (1 - progress) * 0.5;
  ctx.strokeStyle = `rgba(255, 0, 0, ${redOpacity})`;
  ctx.lineWidth = 2;
  ctx.strokeRect(x - 2, y - 2, tileSize + 4, tileSize + 4)
}