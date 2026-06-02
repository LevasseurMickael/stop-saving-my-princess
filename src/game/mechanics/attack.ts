import {
  stateDynamic,
  stateKillCount,
  statePlayer,
  stateShield,
} from "../state";
import type { TargetCondition } from "../../lib/type";
import { knockbackEnemy } from "./knockback";

import { map } from "../map/map";
import { handleGameEvent } from "../secret/secretEvaluation/secretSystem";
import { normalDamageToGhost } from "../secret/secretUnlock/itemEffect/passives/normalDamageToGhost";
import { canPushEnemiesBehind } from "../secret/secretUnlock/itemEffect/passives/canPushEnemiesBehind";
import { areaDamageOnAttack } from "../secret/secretUnlock/itemEffect/passives/areaDamageOnAttack";
import { getAttackOffset } from "./getAttackOffset";
import { extraDamageWhenLowHp } from "../secret/secretUnlock/itemEffect/passives/extraDamageWhenLowHp";
import { tileIndex } from "../../graphicContext/tile_index";
import { audioManager } from "../../audio/audioManager";

function getAttackTarget(x: number, y: number): TargetCondition {
  const tile = map[y]?.[x];

  const hasEnemy = stateDynamic.enemies.some(
    (enemy) => enemy.alive && enemy.x === x && enemy.y === y,
  );

  if (hasEnemy) return "enemy";
  if (tile === tileIndex.exit) return "stair";
  if (tile === tileIndex.hintWall || tile === tileIndex.wall) return "wall";
  return "empty";
}

// Handle player attack action
export default function attack() {
  // Cannot attack while shield is not retracted
  if (stateShield.shield.state !== "retracted") {
    return;
  }

  // Calculate target tile based on player's facing direction
  const { dx, dy, behindx, behindy, aoe } = getAttackOffset(statePlayer.facing);
  const targetX = statePlayer.x + dx;
  const targetY = statePlayer.y + dy;

  const target = getAttackTarget(targetX, targetY);

  areaDamageOnAttack(aoe);
  canPushEnemiesBehind(behindx, behindy);

    audioManager.playSound("attack");


  // Check if attack hits any enemy
  const hitEnemy = stateDynamic.enemies.some((enemy) => {
    if (!enemy.alive) return false;

    if (targetX === enemy.x && targetY === enemy.y) {
      // Attack hits enemy
      enemy.hp = Math.max(
        0,
        enemy.hp -
          Math.max(
            1,
            statePlayer.stat.attack * extraDamageWhenLowHp() -
              normalDamageToGhost(enemy),
          ),
      );

      // Enemy is stunned for 1 turn
      enemy.stunnedTurns = 1;

      // Enemy is knocked back if possible
      knockbackEnemy(enemy);

      // Enemy dies if HP reaches 0
      if (enemy.hp <= 0) {
        enemy.alive = false;
        // Increment kill count for the enemy's slug, defaulting to 0 if slug is undefined
        stateKillCount[enemy.slug || ""] =
          (stateKillCount[enemy.slug || ""] || 0) + 1;
        handleGameEvent({ type: "enemy_kill" });
      }

      // Check if secret condition is met after attack and handle event
      handleGameEvent({
        type: "attack",
        direction: statePlayer.facing,
        target: "enemy",
        targetX,
        targetY,
      });
      return true; // Attack hit an enemy
    }
  });

  if (!hitEnemy) {
    // If attack missed, still handle the attack event for secret conditions
    handleGameEvent({
      type: "attack",
      direction: statePlayer.facing,
      target,
      targetX,
      targetY,
    });
  }
}
