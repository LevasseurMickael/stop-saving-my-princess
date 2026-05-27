export class ActionDelay {
  private delayMs: number = 0;
  private lastActionTime: number = 0;
  private isDelaying: boolean = false;

  constructor(delayMs: number) {
    this.delayMs = delayMs;
  }

  // Check if the player can perform an action based on the delay timer
  public canAct(): boolean {
    const now = Date.now();
    return now - this.lastActionTime >= this.delayMs;
  }

  // Record the time of the last action and start the delay timer
  public recordAction(): void {
    this.lastActionTime = Date.now();
    this.isDelaying = true;
  }

  // Get the remaining time before the player can act again
  public getRemainingDelay(): number {
    const elapsed = Date.now() - this.lastActionTime;
    return Math.max(0, this.delayMs - elapsed);
  }

  // Get the progress of the delay as a value between 0 and 1
  public getDelayProgress(): number {
    const remaining = this.getRemainingDelay();
    return 1 - remaining / this.delayMs;
  }

  // Wait for the delay to complete before allowing the next action
  public async waitForDelay(): Promise<void> {
    const remaining = this.getRemainingDelay();
    if (remaining > 0) {
      return new Promise((resolve) => setTimeout(resolve, remaining));
    }
  }

  // Reset the delay timer, allowing the player to act immediately
  public reset(): void {
    this.lastActionTime = 0;
    this.isDelaying = false;
  }

  // Set a new delay duration in milliseconds
  public setDelay(delayMs: number): void {
    this.delayMs = delayMs;
  }
}

// Create a global instance of ActionDelay with a default delay of 150ms, which can be used throughout the game to manage action timing
export const actionDelay = new ActionDelay(150);