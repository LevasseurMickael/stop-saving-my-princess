import attack from "../mechanics/attack";
import { map } from "../map/map";
import { saveGame, setFloorResult } from "../mechanics/save";
import {
  stateDungeon,
  stateDynamic,
  statePlayer,
  stateSecret,
  stateShield,
  stateStats,
  stateTurn,
} from "../state";
import { enemiesTurn } from "../mechanics/turn";
import { updateShieldState } from "../mechanics/shield";
import { checkHintTile } from "../map/hintTile";

import { enterNextFloor } from "../map/floor";
import { handleGameEvent } from "../secret/secretEvaluation/secretSystem";
import { unlockingSecretItem } from "../secret/secretUnlock/secretUnlock";
import { keyLevelLogic } from "../secret/secretUnlock/itemEffect/items/keyLevel";
import { isOccupied } from "../enemy/enemy";
import { stunEnemyOncePerFloor } from "../secret/secretUnlock/itemEffect/skills/stunEnemyOncePerFloor";
import { fireBreathOncePerFloor } from "../secret/secretUnlock/itemEffect/skills/fireBreathOncePerFloor";
import { tileIndex } from "../../graphicContext/tile_index";
import { audioManager } from "../../audio/audioManager";
import { getIsPaused } from "../../main";
import { startAttackAnimation, startMoveAnimation } from "./playerAnimation";


let lastActionTime = 0;
const ACTION_DELAY_MS = 150;



// Handle player input
window.addEventListener("keydown", (e) => { 


  // Ignore input if the game is paused
  if (getIsPaused()) return;

  if (Date.now() - lastActionTime < ACTION_DELAY_MS) {
    return; // Ignore input if it's within the action delay period
  }
  // Track if the player has taken an action (move, attack, or toggle shield) to determine if enemies should take their turn
  let acted = false;

  // Calculate new position based on input and current facing direction
  const shieldBlocking = stateShield.shield.state !== "retracted";

  // Initialize newX and newY to current position
  let newX = statePlayer.x;
  let newY = statePlayer.y;

  // Cannot move while shield is blocking
  if (!shieldBlocking) {
    // Movement input (ZQSD for movement, Arrow keys for attack)
    if (e.key === "z") {
      newY--;
      statePlayer.facing = "up";
      startMoveAnimation(statePlayer.x, statePlayer.y); // Start move animation from current position
    } else if (e.key === "s") {
      newY++;
      statePlayer.facing = "down";
      startMoveAnimation(statePlayer.x, statePlayer.y); // Start move animation from current position
    } else if (e.key === "q") {
      newX--;
      statePlayer.facing = "left";
      startMoveAnimation(statePlayer.x, statePlayer.y); // Start move animation from current position
    } else if (e.key === "d") {
      newX++;
      statePlayer.facing = "right";
      startMoveAnimation(statePlayer.x, statePlayer.y); // Start move animation from current position
    }

    if (e.key === "a" && statePlayer.unlockedSkills.stunEnemyOncePerFloor) {
      stunEnemyOncePerFloor();
      acted = true;
    }

    if (e.key === "e" && statePlayer.unlockedSkills.fireBreathOncePerFloor) {
      fireBreathOncePerFloor();
      acted = true;
    }

    // movement
    if (newX !== statePlayer.x || newY !== statePlayer.y) {
      if (
        map[newY][newX] === tileIndex.secretDoor &&
        stateDynamic.healingRoom?.isUnlocked !== true
      ) {
        keyLevelLogic(statePlayer, stateDynamic)
          ? ""
          : handleGameEvent({ type: "wait", turns: 1 });
        acted = true;
      } else if (
        map[newY][newX] === tileIndex.treasureDoor &&
        !stateDynamic.secretRoom?.doorSecret
      ) {
        // Check if the player has unlocked the secret condition for this floor to open the secret room door
        if (stateStats.secretUnlocked) {
          if (!stateDynamic.secretRoom) {
            return; // Just in case, should not happen
          }
          // Secret validated, open the door
          if (stateStats.secretUnlocked) {
            // If the secret is unlocked, unlock the door
            audioManager.playSound("door_open");
            stateDynamic.secretRoom.doorSecret = true;
            statePlayer.x = newX;
            statePlayer.y = newY;
            handleGameEvent({
              type: "move",
              x: statePlayer.x,
              y: statePlayer.y,
            });
            acted = true;
          } else {
            // Secret not unlocked, door remains closed and player waits for a turn
            handleGameEvent({ type: "wait", turns: 1 });
            acted = true;
          }
        }
      } else if (
        map[newY][newX] !== tileIndex.wall &&
        map[newY][newX] !== tileIndex.hintWall &&
        (!isOccupied(newX, newY, stateDynamic.enemies) ||
          // Player can move onto enemy tiles if they are ghosts, but not other types of monsters
          stateDynamic.enemies.every(
            (e) => e.x !== newX || e.y !== newY || e.monsterFamilly === "ghost",
          ))
      ) {
        statePlayer.x = newX;
        statePlayer.y = newY;



        handleGameEvent({ type: "move", x: statePlayer.x, y: statePlayer.y });
        audioManager.playSound("footstep");
        acted = true;
      } else {
        handleGameEvent({ type: "wait", turns: 1 });
        acted = true;
      }
    }

    // directional attack
    if (e.key === "ArrowUp") {
      statePlayer.facing = "up";
      startAttackAnimation();
      attack();
      acted = true;
    }
    if (e.key === "ArrowDown") {
      statePlayer.facing = "down";
      startAttackAnimation();
      attack();
      acted = true;
    }
    if (e.key === "ArrowLeft") {
      statePlayer.facing = "left";
      startAttackAnimation();
      attack();
      acted = true;
    }
    if (e.key === "ArrowRight") {
      statePlayer.facing = "right";
      startAttackAnimation();
      attack();
      acted = true;
    }
  } else {
    handleGameEvent({ type: "wait", turns: 1 });
    acted = true; // Player can only toggle shield, so we consider that as acting
  }

  // Getting out the shield to block enemy attacks
  if (e.key === " ") {
    if (stateShield.shield.state === "retracted") {
      audioManager.playSound("shield_deploy");
      stateShield.shield.state = "deploying";
      const dx =
        statePlayer.facing === "right"
          ? 1
          : statePlayer.facing === "left"
            ? -1
            : 0;
      const dy =
        statePlayer.facing === "down"
          ? 1
          : statePlayer.facing === "up"
            ? -1
            : 0;
      const shieldX = statePlayer.x + dx;
      const shieldY = statePlayer.y + dy;
      handleGameEvent({
        type: "shield_deploying",
        facingX: shieldX,
        facingY: shieldY,
      });
      acted = true;
    } else if (stateShield.shield.state === "active") {
      audioManager.playSound("shield_retract");
      stateShield.shield.state = "retracting";
      handleGameEvent({ type: "shield_retracting" });
      acted = true;
    }
  }

  checkHintTile(statePlayer.x, statePlayer.y, stateSecret.hintWall);

  // After player acts, enemies take their turn
  if (acted && stateTurn.turn === "player") {
    lastActionTime = Date.now();
    stateTurn.turn = "enemies";
    updateShieldState();
    enemiesTurn();
    stateTurn.turn = "player";
  }

  // Check for secret item or floor transition after moving
  if (map[newY][newX] === tileIndex.chest && stateStats.secretUnlocked) {
    stateStats.hasSecretItem = true;
    audioManager.playSound("chest_open");
    unlockingSecretItem();
  }

  if (map[newY][newX] === tileIndex.healingRoom) {
    // Player is healed ten percent of max HP when entering the healing room center
    const healAmount = Math.ceil(
      statePlayer.stat.maxHp *
        (0.1 + statePlayer.unlockedItems.moreHealFromSanctuary),
    );
    statePlayer.stat.hp = Math.min(
      statePlayer.stat.hp + healAmount,
      statePlayer.stat.maxHp,
    );
    audioManager.playSound("heal");
    stateDynamic.healUsed = true;
    if (statePlayer.stat.hp === statePlayer.stat.maxHp) {
      stateSecret.healedAtFullHp = true;
    }
  }

  // Floor transition
  if (map[newY][newX] === tileIndex.exit) {
    audioManager.playSound("floor_transition");
    setFloorResult(
      stateDungeon.currentFloor,
      stateStats.hasSecretItem ? "1" : "2",
    );
    saveGame();
    enterNextFloor();
  }
});
