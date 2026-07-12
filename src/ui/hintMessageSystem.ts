export interface HintMessage {
  text: string;
  showTime: number; // timestamp
  duration: number; // en ms
}

let currentHintMessage: HintMessage | null = null;

export function showHintMessage(text: string, duration: number = 5000) {
  console.log(`💡 Hint: ${text}`);
  currentHintMessage = {
    text,
    showTime: Date.now(),
    duration,
  };
}

export function getCurrentHintMessage(): HintMessage | null {
  if (!currentHintMessage) return null;

  // Vérifier si le message est expiré
  const elapsed = Date.now() - currentHintMessage.showTime;
  if (elapsed > currentHintMessage.duration) {
    currentHintMessage = null;
    return null;
  }

  return currentHintMessage;
}

export function clearHintMessage() {
  currentHintMessage = null;
}