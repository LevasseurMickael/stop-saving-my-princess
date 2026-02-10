import { map, TileSize, GridSize, loadMap } from "./game/map/map";
import { player } from "./game/entities/player";
import { state } from "./game/state";

// Initialize canvas and rendering context
const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 800;
document.body.appendChild(canvas);

// Render the game state to the canvas
const ctx = canvas.getContext("2d")!;

// Initial clear
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 800, 800);

// Render function to draw the map, player, enemies, and HUD
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw map tiles
  for (let y = 0; y < GridSize; y++) {
    for (let x = 0; x < GridSize; x++) {
      if (map[y][x] === 1) {
        ctx.fillStyle = "gray";
      } else if (map[y][x] === 2) {
        ctx.fillStyle = "gold";
      } else if (map[y][x] === 3) {
        ctx.fillStyle = "purple";
      } else if (map[y][x] === 4) {
        ctx.fillStyle = "white";
      } else {
        ctx.fillStyle = "black";
      }
      ctx.fillRect(x * TileSize, y * TileSize, TileSize, TileSize);
    }
  }

  // Draw player
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x * TileSize, player.y * TileSize, TileSize, TileSize);

  // Draw radius where the player attack is effective
  ctx.fillStyle = "rgba(134, 106, 11, 0.97)";
  ctx.fillRect(
    (player.x +
      (player.facing === "right" ? 1 : player.facing === "left" ? -1 : 0)) *
      TileSize,
    (player.y +
      (player.facing === "down" ? 1 : player.facing === "up" ? -1 : 0)) *
      TileSize,
    TileSize,
    TileSize,
  );

  // Draw enemies
  for (const enemy of state.enemies) {
    if (!enemy.alive) continue;
    ctx.fillStyle = "red";
    ctx.fillRect(enemy.x * TileSize, enemy.y * TileSize, TileSize, TileSize);
  }

  // Draw HUD
  ctx.font = "16px Arial";
  ctx.textBaseline = "top";
  ctx.fillStyle = "white";
  ctx.fillText(`Deaths: ${state.deathCount}`, 10, 10);
  ctx.fillText(`Kills: ${state.kills}`, 10, 30);
  ctx.fillText(`Secret: ${state.hasSecretItem}`, 10, 50);
  ctx.fillText(`Floor: ${state.currentFloor + 1}`, 10, 70);
}

// Load initial floor and start game loop
loadMap();

// Main game loop using requestAnimationFrame for smooth rendering
function gameLoop() {
  render();
  requestAnimationFrame(gameLoop);
}

gameLoop();
