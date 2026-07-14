export class CanvasScaler {
  private canvas: HTMLCanvasElement;
  private baseWidth: number;
  private baseHeight: number;
  private scale: number = 1;

  constructor(canvas: HTMLCanvasElement, baseWidth: number, baseHeight: number) {
    this.canvas = canvas;
    this.baseWidth = baseWidth;
    this.baseHeight = baseHeight;

    this.setupCanvas();
    this.updateScale();

    // Calculate canvas size
    window.addEventListener("resize", () => this.updateScale());
  }

  private setupCanvas() {
    // Set the canvas to the base size initially
    this.canvas.width = this.baseWidth;
    this.canvas.height = this.baseHeight;

    // Set CSS to make it responsive
    this.canvas.style.imageRendering = "pixelated"; // For crisp pixel art
    this.canvas.style.position = "absolute";
    this.canvas.style.left = "50%";
    this.canvas.style.top = "50%";
    this.canvas.style.transform = "translate(-50%, -50%)";
  }

  private updateScale() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate the scale factor to fit the canvas within the window while maintaining aspect ratio
    const scaleX = windowWidth / this.baseWidth;
    const scaleY = windowHeight / this.baseHeight;
    this.scale = Math.min(scaleX, scaleY);

    // Clamp the scale to prevent it from being too small or too large
    this.scale = Math.max(0.5, Math.min(this.scale, 2));

    // Apply the scale to the canvas
    this.canvas.style.width = `${this.baseWidth * this.scale}px`;
    this.canvas.style.height = `${this.baseHeight * this.scale}px`;
  }

  public getScale(): number {
    return this.scale;
  }

  public getScaledSize(): { width: number; height: number } {
    return {
      width: this.baseWidth * this.scale,
      height: this.baseHeight * this.scale,
    };
  }
}