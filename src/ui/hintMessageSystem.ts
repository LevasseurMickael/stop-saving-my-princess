// src/game/ui/hintMessageSystem.ts

export interface HintMessage {
  text: string;
  showTime: number;
  duration: number;
}

let currentHintMessage: HintMessage | null = null;
let lastDisplayedText: string = ""; 

export function showHintMessage(text: string, duration: number = 5000) {
  if (text !== lastDisplayedText) {
    console.log(`💡 Hint: ${text}`);
    currentHintMessage = {
      text,
      showTime: Date.now(),
      duration,
    };
    lastDisplayedText = text;
  } else {
    if (currentHintMessage) {
      currentHintMessage.showTime = Date.now();
    }
  }
}

export function getCurrentHintMessage(): HintMessage | null {
  if (!currentHintMessage) return null;

  const elapsed = Date.now() - currentHintMessage.showTime;
  if (elapsed > currentHintMessage.duration) {
    currentHintMessage = null;
    lastDisplayedText = "";
    return null;
  }

  return currentHintMessage;
}

export function clearHintMessage() {
  currentHintMessage = null;
  lastDisplayedText = "";
}