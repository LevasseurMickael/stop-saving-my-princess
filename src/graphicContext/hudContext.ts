// This file contains the function to render the HUD (Heads-Up Display) on the canvas, showing player stats and game information. It is imported in main.ts to keep the code organized and maintainable.

export function getHudSprite(
  ctx: CanvasRenderingContext2D,
  statePlayer: {
    deathCount: number;
    stat: {
      hp: number;
      maxHp: number;
    };
  },
  stateStats: {
    hasSecretItem: boolean;
  },
  stateKillCount: Record<string, number>,
  stateDungeon: { currentFloor: number },
) {
  ctx.font = "16px Arial";
  ctx.textBaseline = "top";
  ctx.fillStyle = "white";
  ctx.fillText(`Deaths: ${statePlayer.deathCount}`, 10, 10);
  ctx.fillText(`HP: ${statePlayer.stat.hp}/${statePlayer.stat.maxHp}`, 10, 30);
  ctx.fillText(`Secret: ${stateStats.hasSecretItem}`, 10, 50);
  ctx.fillText(`Floor: ${stateDungeon.currentFloor + 1}`, 10, 70);
  ctx.fillText(`Green-slime killed: ${stateKillCount["green-slime"]}`, 10, 90);
}
