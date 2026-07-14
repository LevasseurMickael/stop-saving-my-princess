import { stateDungeon, statePlayer } from "../../state";
import { allSecretItems } from "../secretItem.ts/allFloor";

// Function to check and unlock secret item for the current floor if conditions are met and apply its effects to the player state
export function unlockingSecretItem() {
  const secret = allSecretItems.find(
    (s) => s.floor === stateDungeon.currentFloor + 1,
  );

  if (!secret) {
    console.log("No secret item for this floor.");
    return;
  }
  //
  if (secret.type === "unlockedSkills") {
    (statePlayer as any)[secret.type][secret.effect] = secret.value;
  } else if (secret.type === "unlockedItems") {
    (statePlayer as any)[secret.type][secret.effect] = secret.value;
  } else if (secret.type === "reducedDamage") {
    (statePlayer as any)[secret.type][secret.effect] =
      (statePlayer as any)[secret.type][secret.effect] + secret.value;
  } else if (secret.type === "stat") {
    if (secret.effect === "hp") {
      statePlayer.stat.maxHp += secret.value as number;
      statePlayer.stat.hp += secret.value as number; // Heal player by the same amount when max HP increases
    } else {
      (statePlayer as any)[secret.type][secret.effect] =
        (statePlayer as any)[secret.type][secret.effect] + secret.value;
    }
  } else if (secret.type === "unlockedPassives") {
    (statePlayer as any)[secret.type][secret.effect] = secret.value;
  }
  console.log("Secret item check complete. Current player state:", statePlayer);
}
