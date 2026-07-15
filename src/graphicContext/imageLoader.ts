const imageCache: Map<string, HTMLImageElement> = new Map();

export function loadImage(src: string): Promise<HTMLImageElement> {
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src)!);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

export async function preloadAllImage(): Promise<void> {
  const imageSources = [
    "./dragon_sprite_32px.png",
    "./ghost_32px.png",
    "./living_armour_32px.png",
    "./mage_32px.png",
    "./royal_knight_32px.png",
    "./slime_32px.png",
    "./vermin_32px.png",
    "./undead_32px.png",
    "./wall_props_32px.png",
  ];
  try {
    await Promise.all(imageSources.map((src) => loadImage(src)));
  } catch (error) {
    console.error("Error preloading images:", error);
  }
}

export function getCachedImage(src: string): HTMLImageElement | null {
  return imageCache.get(src) || null;
}
