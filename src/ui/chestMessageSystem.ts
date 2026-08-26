export interface ChestMessage {
  text: string;
  showTime: number;
  duration: number;
}

let currentChestMessage: ChestMessage | null = null;
let lastDisplayedText = "";

export function showChestMessage(text: string, duration: number = 5000) {
  if (text !== lastDisplayedText) {
    currentChestMessage = {
      text,
      showTime: Date.now(),
      duration,
    };
    lastDisplayedText = text;
    return;
  }

  if (currentChestMessage) {
    currentChestMessage.showTime = Date.now();
  }
}

export function getCurrentChestMessage(): ChestMessage | null {
  if (!currentChestMessage) return null;

  const elapsed = Date.now() - currentChestMessage.showTime;
  if (elapsed > currentChestMessage.duration) {
    currentChestMessage = null;
    lastDisplayedText = "";
    return null;
  }

  return currentChestMessage;
}

export function clearChestMessage() {
  currentChestMessage = null;
  lastDisplayedText = "";
}
