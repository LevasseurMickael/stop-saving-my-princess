import type { Enemy } from "../../lib/type";
import { isOccupied } from "../enemy/enemy";
import { map } from "../map/map";
import { stateDynamic, statePlayer } from "../state";
import { isBlockedByShield } from "./shield";
import { knockbackPlayer } from "./knockback";
import { handleGameEvent } from "../secret/secretEvaluation/secretSystem";
import { reducedDamage } from "../secret/secretUnlock/itemEffect/reducedDamage";
import { reducedDetection } from "../secret/secretUnlock/itemEffect/passives/reducedDetection";
import { reducedEnemyActionSpeed } from "../secret/secretUnlock/itemEffect/passives/reduceEnemyActionSpeed";
import { reduceDamageOncePerFloor } from "../secret/secretUnlock/itemEffect/passives/reduceDamageOncePerFloor";

// Process all enemies' turns
export function enemiesTurn() {
  for (const enemy of stateDynamic.enemies) {
    enemyTurn(enemy, statePlayer, map);
  }
}

// Process a single enemy's turn based on its behavior pattern
export function enemyTurn(
  enemy: Enemy,
  player: { x: number; y: number },
  map: number[][],
) {
  // Enemy is stunned, skip turn
  if (enemy.stunnedTurns && enemy.stunnedTurns > 0) {
    enemy.stunnedTurns--;
    return;
  }

  // aggro area for patrol pattern
  const dist = Math.abs(enemy.x - player.x) + Math.abs(enemy.y - player.y);
  if (enemy.pattern === "patrol" && dist <= 4 - reducedDetection()) {
    enemy.pattern = "chase";
  }
  // lost interest if player is far away
  if (enemy.pattern === "chase" && dist > 4 - reducedDetection()) {
    enemy.pattern = "patrol";
  }

  // enemy is stunned, skip turn
  if (enemy.stunnedTurns && enemy.stunnedTurns > 0) {
    enemy.stunnedTurns--;
    return;
  }

  // Enemy is dead, skip turn
  if (!enemy.alive) return;

  // Handle enemy behavior based on its pattern
  switch (enemy.pattern) {
    // Stationary pattern: enemy does not move
    case "stationary":
      // Do nothing
      break;

    // Patrol pattern: move randomly within the room
    case "patrol":
      const directions = [
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
      ];

      for (
        let i = 0;
        i < Math.max(1, enemy.actionPerTurn - reducedEnemyActionSpeed());
        i++
      ) {
        const dir = directions[Math.floor(Math.random() * directions.length)];
        const newX = enemy.x + dir.dx;
        const newY = enemy.y + dir.dy;

        // Check if the new position is valid (not a wall and not occupied by another enemy)
        if (map[newY]?.[newX] === 0 && !isOccupied(newX, newY, enemy)) {
          enemy.x = newX;
          enemy.y = newY;
        }
      }
      break;

    case "chase":
      // Move towards player
      const distX = player.x - enemy.x;
      const distY = player.y - enemy.y;

      // If enemy is adjacent to player and try to enter the player's tile, the player dies
      if (Math.abs(distX) + Math.abs(distY) === 1) {
        if (isBlockedByShield(enemy)) {
          handleGameEvent({ type: "enemy_hit", blocker: true });
          knockbackPlayer(enemy);
          return;
        }
        // enemy attacks player and does at least 1 damage, even if player has high damage reduction
        handleGameEvent({ type: "enemy_hit", blocker: false });
        if (reduceDamageOncePerFloor()) {
          return;
        }
        statePlayer.stat.hp = Math.max(
          0,
          statePlayer.stat.hp -
            Math.max(1, enemy.attack - reducedDamage(enemy)),
        );
        console.log(statePlayer.stat.hp);
        // Check if player dies from the attack and reset position and HP if so
        if (statePlayer.stat.hp <= 0) {
          statePlayer.deathCount++;
          statePlayer.stat.hp = statePlayer.stat.maxHp;
          player.x = statePlayer.spawn.x;
          player.y = statePlayer.spawn.y;
        }
        return;
      }

      // Move in the direction that reduces distance to player, prioritizing horizontal movement if distances are equal
      if (Math.abs(distX) > Math.abs(distY)) {
        const stepX = enemy.x + Math.sign(distX);

        // Check if enemy tries to move onto player's tile, which would result in player death
        if (stepX === player.x && enemy.y === player.y) {
          statePlayer.deathCount++;
          return;
        }

        // Check if the new position is valid (not a wall and not occupied by another enemy)
        if (map[enemy.y]?.[stepX] === 0 && !isOccupied(stepX, enemy.y, enemy)) {
          enemy.x = stepX;
        }
      } else {
        // Prioritize vertical movement if distances are equal
        const stepY = enemy.y + Math.sign(distY);
        if (enemy.x === player.x && stepY === player.y) {
          statePlayer.deathCount++;
          return;
        }

        // Check if the new position is valid (not a wall and not occupied by another enemy)
        if (map[stepY]?.[enemy.x] === 0 && !isOccupied(enemy.x, stepY, enemy)) {
          enemy.y = stepY;
        }
      }
      return;
  }
}
