import { knockbackEnemy } from "../../../../mechanics/knockback";
import { stateDynamic, statePlayer } from "../../../../state";

// Check if the player has unlocked the ability to push enemies behind them when attacking
export function canPushEnemiesBehind(bx: number, by: number): void {
  // Vérifier si le passive est activé
  if (!statePlayer.unlockedPassives.canPushEnemiesBehind) {
    return;
  }

  // Position derrière le joueur
  const behindX = statePlayer.x + bx;
  const behindY = statePlayer.y + by;

  // Chercher un ennemi derrière le joueur
  const enemyBehind = stateDynamic.enemies.find(
    (enemy) => enemy.alive && enemy.x === behindX && enemy.y === behindY,
  );

  // Si un ennemi est trouvé, le pousser en arrière
  if (enemyBehind) {
    enemyBehind.stunnedTurns = 1; // Stun the enemy for 1 turn when pushed
    knockbackEnemy(enemyBehind);
  }
}
