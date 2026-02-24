import { stateDynamic, statePlayer } from "../../../../state";

export function areaDamageOnAttack(aoe: { dx: number; dy: number }[]) {
  if (!statePlayer.unlockedPassives.AreaDamageOnAttack) {
    return;
  }

  aoe.forEach(({ dx, dy }) => {
    const targetX = statePlayer.x + dx;
    const targetY = statePlayer.y + dy;

    stateDynamic.enemies.forEach((enemy) => {
      if (!enemy.alive) return;
      if (targetX === enemy.x && targetY === enemy.y) {
        enemy.hp -= Math.round(statePlayer.stat.attack * 0.5); // Deal minor splash damage (50% of player's attack)
        if (enemy.hp <= 0) {
          enemy.alive = false;
        }
      }
    });
  });
}
