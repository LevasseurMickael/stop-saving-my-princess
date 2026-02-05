import { map, TileSize, GridSize } from "./game/map";
import { player } from "./game/player";
import { enemies } from "./game/enemy";
import { state } from "./game/state";

const canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 512;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d")!;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, 512, 512);

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // map
  for (let y = 0; y < GridSize; y++) {
    for (let x = 0; x < GridSize; x++) {
      if (map[y][x] === 1) {
        ctx.fillStyle = "gray";
      } else if (map[y][x] === 2) {
        ctx.fillStyle = "gold";
      } else if (map[y][x] === 3) {
        ctx.fillStyle = "purple";
      } else {
        ctx.fillStyle = "black";
      }
      ctx.fillRect(x * TileSize, y * TileSize, TileSize, TileSize);
    }
  }

  // player
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x * TileSize, player.y * TileSize, TileSize, TileSize);

  //  enemy
  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    ctx.fillStyle = "red";
    ctx.fillRect(enemy.x * TileSize, enemy.y * TileSize, TileSize, TileSize);
  }

  // HUD
  ctx.font = "16px Arial";
  ctx.textBaseline = "top";
  ctx.fillStyle = "white";
  ctx.fillText(`Deaths: ${state.deathCount}`, 10, 10);
  ctx.fillText(`Kills: ${state.kills}`, 10, 30);
  ctx.fillText(`Secret: ${state.hasSecretItem}`, 10, 50);
  ctx.fillText(`Floor: ${state.currentFloor + 1}`, 10, 70);
}

function gameLoop() {
  render();
  requestAnimationFrame(gameLoop);
}

gameLoop();
