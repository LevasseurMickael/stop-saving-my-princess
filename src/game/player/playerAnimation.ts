// src/game/player/playerAnimation.ts

import { statePlayer } from "../state";

const ANIMATION_DURATION = 100; // 100ms
let isAnimating = false;
let animationStartTime = 0;
let animStartX = 0;
let animStartY = 0;

// Variables pour les attaques
let isAttacking = false;
let attackStartTime = 0;
let attackStartX = 0;
let attackStartY = 0;

export function startMoveAnimation(fromX: number, fromY: number) {
  isAnimating = true;
  animationStartTime = Date.now();
  animStartX = fromX;
  animStartY = fromY;
}

export function startAttackAnimation() {
  isAttacking = true;
  attackStartTime = Date.now();
  attackStartX = statePlayer.animX;
  attackStartY = statePlayer.animY;
}

export function updatePlayerAnimation() {
  // ✅ Animation de déplacement
  if (isAnimating) {
    const elapsed = Date.now() - animationStartTime;
    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

    // Interpoler entre la position de départ et la position finale
    statePlayer.animX = animStartX + (statePlayer.x - animStartX) * progress;
    statePlayer.animY = animStartY + (statePlayer.y - animStartY) * progress;

    if (progress >= 1) {
      isAnimating = false;
      statePlayer.animX = statePlayer.x;
      statePlayer.animY = statePlayer.y;
    }
  }

  // ✅ Animation d'attaque (rebond simple)
  if (isAttacking) {
    const elapsed = Date.now() - attackStartTime;
    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

    // Rebond : aller à 80% vers la direction, puis revenir
    const direction = progress < 0.5 ? progress * 2 : (1 - progress) * 2;
    
    const offsetX = (statePlayer.facing === "right" ? 1 : statePlayer.facing === "left" ? -1 : 0) * direction * 0.3;
    const offsetY = (statePlayer.facing === "down" ? 1 : statePlayer.facing === "up" ? -1 : 0) * direction * 0.3;

    statePlayer.animX = attackStartX + offsetX;
    statePlayer.animY = attackStartY + offsetY;

    if (progress >= 1) {
      isAttacking = false;
      statePlayer.animX = statePlayer.x;
      statePlayer.animY = statePlayer.y;
    }
  }
}