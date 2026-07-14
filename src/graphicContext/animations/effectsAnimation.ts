import type { Enemy } from "../../lib/type";

export interface VisualEffect {
  x: number;
  y: number;
  type: "aoe" | "hit" | "skill_stun" | "skill_fire";
  startTime: number;
  duration: number;
  affectedTiles?: Array<{ x: number; y: number }>;
  attackWeapon?: string;
}

export const activeEffects: VisualEffect[] = [];

export function createAOEEffect(
  centerX: number, 
  centerY: number, 
  duration: number = 200,
  enemy: Enemy
) {
  
  const affectedTiles: Array<{ x: number; y: number }> = [];
  
  if (enemy.attackWeapon === "magic") {
    for (let x = centerX - enemy.attackRange; x <= centerX + enemy.attackRange; x++) {
      for (let y = centerY - enemy.attackRange; y <= centerY + enemy.attackRange; y++) {
        const dist = Math.abs(x - centerX) + Math.abs(y - centerY);
        if (dist <= enemy.attackRange) {
          affectedTiles.push({ x, y });
        }
      }
    }
  }
  
  activeEffects.push({
    x: centerX,
    y: centerY,
    type: "aoe",
    startTime: Date.now(),
    duration,
    affectedTiles,
    attackWeapon: enemy.attackWeapon, 
  });
}

export function createHitEffect(targetX: number, targetY: number, duration: number = 150) {
  
  activeEffects.push({
    x: targetX,
    y: targetY,
    type: "hit",
    startTime: Date.now(),
    duration,
  });
}

export function createStunSkillEffect(centerX: number, centerY: number, range: number, duration: number) {
  const affectedTiles : Array<{ x: number; y: number}> = [];

  for (let x = centerX - range; x <= centerX + range; x++) {
    for (let y = centerY - range; y <= centerY + range; y++) {
      const dist = Math.abs(x - centerX) + Math.abs(y - centerY);
      if(dist <= range) {
        affectedTiles.push({ x, y });
      }
    }
  }
  activeEffects.push({
    x: centerX,
    y: centerY,
    type: "skill_stun",
    startTime: Date.now(),
    duration,
    affectedTiles
  })
};

export function createFireBreathEffect(centerX: number, centerY: number, facing: string, range: number, duration: number) {
  const affectedTiles: Array<{ x: number; y: number }> = [];

  for (let dist = 1; dist <= range; dist++) {
    for (let offset = -dist; offset <= dist; offset++) {
      let x = centerX;
      let y = centerY;

      if (facing === "up") {
        x = centerX + offset;
        y = centerY - dist;
      } else if (facing === "down") {
        x = centerX + offset;
        y = centerY + dist;
      } else if (facing === "left") {
        x = centerX - dist;
        y = centerY + offset;
      } else if (facing === "right") {
        x = centerX + dist;
        y = centerY + offset;
      }

      affectedTiles.push({ x, y})
    }
  }

  activeEffects.push({
    x: centerX,
    y: centerY,
    type: "skill_fire",
    startTime: Date.now(),
    duration,
    affectedTiles
  })
};

export function updateEffects(): void {
  const now = Date.now();
  
  for (let i = activeEffects.length - 1; i >= 0; i--) {
    if (now - activeEffects[i].startTime > activeEffects[i].duration) {
      activeEffects.splice(i, 1);
    }
  }
}

export function renderEffects(ctx: CanvasRenderingContext2D, tileSize: number): void {
  const now = Date.now();

  activeEffects.forEach((effect) => {
    if (effect.type === "hit") {
      const elapsed = now - effect.startTime;
      const progress = Math.min(elapsed / effect.duration, 1);
      renderHitEffect(ctx, effect, tileSize, progress);
    }
  });

  activeEffects.forEach((effect) => {
    if (effect.type === "aoe" && effect.attackWeapon === "magic") {
      const elapsed = now - effect.startTime;
      const progress = Math.min(elapsed / effect.duration, 1);
      renderAOEEffect(ctx, effect, tileSize, progress);
    }
  });

  activeEffects.forEach((effect) => {
    if (effect.type === "skill_stun") {
      const elasped = now - effect.startTime;
      const progress = Math.min(elasped / effect.duration, 1);
      renderStunSkillEffect(ctx, effect, tileSize, progress);
    }
  });

  activeEffects.forEach((effect) => {
    if (effect.type === "skill_fire") {
      const elapsed = now - effect.startTime;
      const progress = Math.min(elapsed / effect.duration, 1)
      renderFireBreathEffect(ctx, effect, tileSize, progress)
    }
  })

}

function renderHitEffect(
  ctx: CanvasRenderingContext2D,
  effect: VisualEffect,
  tileSize: number,
  progress: number
): void {
  const x = effect.x * tileSize;
  const y = effect.y * tileSize;

  const opacity = (1 - progress) * 0.3;

  ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  ctx.fillRect(x, y, tileSize, tileSize);

  const redOpacity = (1 - progress) * 0.1;
  ctx.strokeStyle = `rgba(255, 0, 0, ${redOpacity})`;
  ctx.lineWidth = 1;
  ctx.strokeRect(x - 1, y - 1, tileSize + 2, tileSize + 2);
}

function renderAOEEffect(
  ctx: CanvasRenderingContext2D,
  effect: VisualEffect,
  tileSize: number,
  progress: number
): void {
  const opacity = 1 - progress;

  effect.affectedTiles?.forEach((tile) => {
    const x = tile.x * tileSize;
    const y = tile.y * tileSize;

    // Carré semi-transparent orange pour l'AOE magique
    ctx.fillStyle = `rgba(255, 150, 0, ${opacity * 0.5})`;
    ctx.fillRect(x, y, tileSize, tileSize);

    // Bordure
    ctx.strokeStyle = `rgba(255, 200, 0, ${opacity})`;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, tileSize, tileSize);
  });
}

function renderStunSkillEffect(ctx: CanvasRenderingContext2D, 
  effect: VisualEffect, 
  tileSize: number, 
  progress: number
): void {
  const opacity = 1 - progress;

  effect.affectedTiles?.forEach((tile) => {
    const x = tile.x * tileSize;
    const y = tile.y * tileSize;

    ctx.fillStyle = `rgba(100, 150, 255, ${opacity * 0.5})`;
    ctx.fillRect(x, y, tileSize, tileSize);

    ctx.strokeStyle = `rgba(150, 200, 255, ${opacity})`;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, tileSize, tileSize);
  });
}

function renderFireBreathEffect(
  ctx: CanvasRenderingContext2D,
  effect: VisualEffect,
  tileSize: number,
  progress: number
): void {
  const opacity = 1 - progress;

  effect.affectedTiles?.forEach((tile) => {
    const x = tile.x * tileSize;
    const y = tile.y * tileSize;

    ctx.fillStyle = `rgba(255, 100, 0, ${opacity * 0.6})`;
    ctx.fillRect(x, y, tileSize, tileSize);

    ctx.strokeStyle = `rgba(255, 150, 0, ${opacity})`;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, tileSize, tileSize)
  })
}