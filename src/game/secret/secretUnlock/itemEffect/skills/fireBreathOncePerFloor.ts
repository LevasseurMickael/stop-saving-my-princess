// aoe in a cone where the player if facing with a range of 5, it can only be used once per floor and it stuns enemies for 1 turn, it can be unlocked by a secret item in the game

import { audioManager } from "../../../../../audio/audioManager";
import type { Enemy } from "../../../../../lib/type";
import { map } from "../../../../map/map";
import { stateDynamic, statePlayer } from "../../../../state";

export function fireBreathOncePerFloor() {
  if (!statePlayer.unlockedSkills.fireBreathOncePerFloor) {
    return; // Skill not unlocked, do nothing
  }
  if (!statePlayer.skillUsedThisFloor.fireBreathOncePerFloor) {
    return; // Skill already used this floor, do nothing
  }

  stateDynamic.enemies.forEach((enemy) => {
    if (!enemy.alive) {
      return; // Skip dead enemies
    }

    const dx = enemy.x - statePlayer.x;
    const dy = enemy.y - statePlayer.y;

    // Check if enemy is within a cone in the direction the player is facing
    let inCone = false;
    switch (statePlayer.facing) {
      case "up":
        inCone = dy < 0 && Math.abs(dx) <= -dy && -dy <= 5;
        break;
      case "down":
        inCone = dy > 0 && Math.abs(dx) <= dy && dy <= 5;
        break;
      case "left":
        inCone = dx < 0 && Math.abs(dy) <= -dx && -dx <= 5;
        break;
      case "right":
        inCone = dx > 0 && Math.abs(dy) <= dx && dx <= 5;
        break;
    }

    if (inCone && coneLineOfSight(enemy, statePlayer, map)) {
      enemy.stunnedTurns = 1; // Stun for 1 turn
      // Damage the enemies for the same amount of damage as the player's normal attack, ignoring enemy defense
      enemy.hp -= statePlayer.stat.attack;
      if (enemy.hp <= 0) {
        enemy.alive = false;
      }
    }
  });

  statePlayer.skillUsedThisFloor.fireBreathOncePerFloor = false; // Mark as used for this floor
  audioManager.playSound("skill_fire_breath");
}

function coneLineOfSight(
  enemy: Enemy,
  player: { x: number; y: number },
  map: number[][],
): boolean {
  const distX = enemy.x - player.x;
  const distY = enemy.y - player.y;

  if (distX === 0 && distY === 0) {
    return false; // Enemy is on the same tile as player, consider it in line of sight
  }

  const stepX = Math.sign(distX);
  const stepY = Math.sign(distY);

  let x = player.x + stepX;
  let y = player.y + stepY;

  while (x !== enemy.x || y !== enemy.y) {
    if (!map[y] || map[y][x] === undefined || map[y][x] !== 0) {
      return false; // Blocked by wall or out of bounds
    }
    if (x !== enemy.x) x += stepX;
    if (y !== enemy.y) y += stepY;
  }

  return true; // Clear line of sight
}
