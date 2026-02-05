const canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 512;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d")!;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, 512, 512);

const TileSize = 32;
const GridSize = 16;

const map: number[][] = Array.from({ length: GridSize }, () =>
  Array(GridSize).fill(0),
);

for (let y = 0; y < GridSize; y++) {
  for (let x = 0; x < GridSize; x++) {
    if (x === 0 || x === GridSize - 1 || y === 0 || y === GridSize - 1) {
      map[y][x] = 1; // Wall
    }
  }
}

const player = {
  x: 1,
  y: 1,
};

window.addEventListener("keydown", (e) => {
  let newX = player.x;
  let newY = player.y;

  if (e.key === "ArrowUp") newY--;
  else if (e.key === "ArrowDown") newY++;
  else if (e.key === "ArrowLeft") newX--;
  else if (e.key === "ArrowRight") newX++;
  else if (e.key === "w") newY--;
  else if (e.key === "s") newY++;
  else if (e.key === "a") newX--;
  else if (e.key === "d") newX++;
  if (map[newY][newX] !== 1) {
    player.x = newX;
    player.y = newY;
  }
});

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < GridSize; y++) {
    for (let x = 0; x < GridSize; x++) {
      if (map[y][x] === 1) {
        ctx.fillStyle = "gray";
        ctx.fillRect(x * TileSize, y * TileSize, TileSize, TileSize);
      }
    }
  }
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x * TileSize, player.y * TileSize, TileSize, TileSize);
}

function gameLoop() {
  render();
  requestAnimationFrame(gameLoop);
}

gameLoop();
