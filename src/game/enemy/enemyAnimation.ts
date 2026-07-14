import type { Enemy } from "../../lib/type";


const ANIMATION_DURATION = 100;

export interface EnemyAnimation {
  isMoving: boolean;
  startTime: number;
  fromX: number;
  fromY: number;
}

interface EnemyAttackAnimation {
  isAttacking: boolean;
  startTime: number;
  startX: number;
  startY: number;
  facing: string;
}

const animationMap = new Map<Enemy, EnemyAnimation>();
const attackAnimationMap = new Map<Enemy, EnemyAttackAnimation>(); // enemy -> attack start time

export function startEnemyAnimation(enemy: Enemy, fromX: number, fromY: number) {
  animationMap.set(enemy, {
    isMoving: true,
    startTime: Date.now(),
    fromX,
    fromY,
  });
}

export function updateEnemiesAnimation(enemies: Enemy[]) {
  enemies.forEach((enemy) => {
    const anim = animationMap.get(enemy);
    if (!anim) {
      // Si pas d'animation, synchroniser animX/animY avec x/y
      enemy.animX = enemy.x;
      enemy.animY = enemy.y;
      return;
    }

    const elapsed = Date.now() - anim.startTime;
    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

    // Interpoler la position
    enemy.animX = anim.fromX + (enemy.x - anim.fromX) * progress;
    enemy.animY = anim.fromY + (enemy.y - anim.fromY) * progress;

    if (progress >= 1) {
      animationMap.delete(enemy);
    }
  });
}

export function startEnemyAttackAnimation(enemy: Enemy) {
  attackAnimationMap.set(enemy, {
    isAttacking: true,
    startTime: Date.now(),
    startX: enemy.animX ?? enemy.x,
    startY: enemy.animY ?? enemy.x,
    facing: enemy.facing,
  });
}

export function updateEnemiesAttackAnimation(enemies: Enemy[]) {
  enemies.forEach((enemy) => {
    const anim = attackAnimationMap.get(enemy);
    if (!anim) return;

    const elapsed = Date.now() - anim.startTime;
    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

    let bounceDistance: number;
    if (progress < 0.5) {
      bounceDistance = progress * 2 * 0.2; // Aller jusqu'à 20% de la tile
    } else {
      bounceDistance = (1 - progress) * 2 * 0.2; // Revenir à la position initiale
    }

    const offsetX = (anim.facing === "right" ? 1 : anim.facing === "left" ? -1 : 0) * bounceDistance;
    const offsetY = (anim.facing === "down" ? 1 : anim.facing === "up" ? -1 : 0) * bounceDistance;

    enemy.animX = anim.startX + offsetX;
    enemy.animY = anim.startY + offsetY;

    if (progress >= 1) {
      attackAnimationMap.delete(enemy);
      enemy.animX = enemy.x;
      enemy.animY = enemy.y;
    }
  });
}