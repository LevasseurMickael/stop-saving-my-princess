// Simple seeded random number generator for random dungeon generation and enemy spawning
export function rng(seed: number) {
  let random = seed * 99991;
  return () => {
    random = (random * 1103515245 + 12345) % 2147483648;
    return random / 2147483648;
  };
}
