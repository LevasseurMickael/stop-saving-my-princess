const canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 512;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d")!;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, 512, 512);

ctx.fillStyle = "blue";
ctx.fillRect(32, 32, 32, 32);
