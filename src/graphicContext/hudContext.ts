// src/graphicContext/hudContext.ts

import { statePlayer, stateDungeon } from "../game/state";
import { getCurrentHintMessage } from "../ui/hintMessageSystem";
import { getCurrentChestMessage } from "../ui/chestMessageSystem";

export function getHudSprite(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, 1280, 960);

  // ✅ Étage (haut-centre)
  drawFloorInfo(ctx, 640, 0);

  // ✅ Techniques (haut-gauche, loin du bouton pause)
  drawSkills(ctx, 10, 0);

  // ✅ Stats du joueur (bas-gauche)
  drawPlayerStats(ctx, 10, 930);

  // ✅ Contrôles (bas-droit)
  drawControls(ctx, 1280, 960);

  drawHintMessage(ctx, 640, 900);
  drawChestMessage(ctx, 640, 840);
}

// ===== STATS DU JOUEUR =====
function drawPlayerStats(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const lineHeight = 25;
  const fontSize = 20;
  
  // Ressurection Count
  ctx.fillStyle = statePlayer.stat.resurectionCount > 0 ? "orange" : "lime";
  ctx.fillText(`💀 Ressurections: ${statePlayer.stat.resurectionCount}`, x, y);
  
  y -= lineHeight;
  
  // Attaque
  ctx.fillStyle = "white";
  ctx.fillText(`⚔ ATK: ${statePlayer.stat.attack}`, x, y);
  
  y -= lineHeight;
  
  ctx.fillStyle = "white";

  // HP
  const hpPercent = (statePlayer.stat.hp / statePlayer.stat.maxHp) * 100;
  const hpColor = hpPercent > 50 ? "lime" : hpPercent > 25 ? "orange" : "red";
  
  ctx.fillStyle = hpColor;
  ctx.fillText(`❤ HP: ${statePlayer.stat.hp}/${statePlayer.stat.maxHp}`, x, y);

  y -= lineHeight;

  ctx.font = `bold ${fontSize}px monospace`;
  ctx.fillStyle = "gold";
  ctx.textBaseline = "bottom";
  ctx.textAlign = "left";

  ctx.fillText("PLAYER", x, y);

}



// ===== INFO ÉTAGE =====
function drawFloorInfo(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const floorNumber = 50 - stateDungeon.currentFloor;
  
  ctx.font = "bold 20px monospace";
  ctx.fillStyle = "gold";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  ctx.fillText(`FLOOR ${floorNumber}`, x, y);

  ctx.textAlign = "left";
}

// ===== TECHNIQUES =====
function drawSkills(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const lineHeight = 20;
  const fontSize = 15;

  ctx.font = `bold ${fontSize}px monospace`;
  ctx.fillStyle = "gold";
  ctx.textBaseline = "top";
  ctx.textAlign = "left";

  ctx.fillText("SKILLS", x, y);

  y += lineHeight + 3;

  // Skill 1 : Stun
  const stunAvailable = statePlayer.skillUsedThisFloor.stunEnemyOncePerFloor;
  const stunUnlocked = statePlayer.unlockedSkills.stunEnemyOncePerFloor;
  
  if (!stunUnlocked) {
    ctx.fillStyle = "gray";
    ctx.fillText("⚡ STUN [A] - LOCKED", x, y);
  } else {
    ctx.fillStyle = stunAvailable ? "lime" : "red";
    ctx.fillText(stunAvailable ? "⚡ STUN [A]" : "⚡ STUN [A] - USED", x, y);
  }

  y += lineHeight;

  // Skill 2 : Fire Breath
  const fireAvailable = statePlayer.skillUsedThisFloor.fireBreathOncePerFloor;
  const fireUnlocked = statePlayer.unlockedSkills.fireBreathOncePerFloor;
  
  if (!fireUnlocked) {
    ctx.fillStyle = "gray";
    ctx.fillText("🔥 FIRE [E] - LOCKED", x, y);
  } else {
    ctx.fillStyle = fireAvailable ? "orange" : "red";
    ctx.fillText(fireAvailable ? "🔥 FIRE [E]" : "🔥 FIRE [E] - USED", x, y);
  }
}

// ===== CONTRÔLES =====
function drawControls(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const fontSize = 15;
  const lineHeight = 16;

  ctx.font = `${fontSize}px monospace`;
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.textBaseline = "bottom";
  ctx.textAlign = "right";

  
  
  ctx.fillText("[SPACE] Shield | [ESC] Pause", x - 10, y);
  y -= lineHeight;
  ctx.fillText("[A] Stun | [E] Fire", x - 10, y);
  y -= lineHeight;
  ctx.fillText("[↑/↓/←/→] Attack", x - 10, y);
  y -= lineHeight;
  ctx.fillText("[Z/Q/S/D] Move", x - 10, y);
}

// ===== MESSAGE D'ASTUCE =====

// src/graphicContext/hudContext.ts

function drawHintMessage(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const hintMessage = getCurrentHintMessage();
  if (!hintMessage) return;

  // ✅ AJOUTER : Mesurer le texte
  ctx.font = "14px monospace";
  const textMetrics = ctx.measureText(`💡 ${hintMessage.text}`);
  const textWidth = textMetrics.width;
  const padding = 40;
  const boxWidth = Math.min(textWidth + padding, 800); // Max 800px
  const boxHeight = 50;

  // Calculer l'opacité (fade out progressif)
  const elapsed = Date.now() - hintMessage.showTime;
  const fadeOutStart = hintMessage.duration - 1000;
  let opacity = 1;

  if (elapsed > fadeOutStart) {
    const fadeProgress = (elapsed - fadeOutStart) / 1000;
    opacity = Math.max(0, 1 - fadeProgress);
  }

  ctx.save();
  ctx.globalAlpha = opacity;

  // ✅ MODIFIER : Fond dynamique
  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fillRect(x - boxWidth / 2, y - boxHeight / 2, boxWidth, boxHeight);

  // ✅ MODIFIER : Bordure dynamique
  ctx.strokeStyle = "rgba(255, 200, 0, 0.8)";
  ctx.lineWidth = 2;
  ctx.strokeRect(x - boxWidth / 2, y - boxHeight / 2, boxWidth, boxHeight);

  // Texte
  ctx.fillStyle = "rgba(255, 200, 0, 1)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`💡 ${hintMessage.text}`, x, y);

  ctx.restore();
}

function drawChestMessage(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const chestMessage = getCurrentChestMessage();
  if (!chestMessage) return;

  const lines = chestMessage.text.split("\n");
  const lineHeight = 18;
  ctx.font = "14px monospace";

  const longestLine = lines.reduce((max, line) => {
    return Math.max(max, ctx.measureText(line).width);
  }, 0);

  const padding = 40;
  const boxWidth = Math.min(longestLine + padding, 800);
  const boxHeight = lines.length * lineHeight + 26;

  const elapsed = Date.now() - chestMessage.showTime;
  const fadeOutStart = chestMessage.duration - 1000;
  let opacity = 1;

  if (elapsed > fadeOutStart) {
    const fadeProgress = (elapsed - fadeOutStart) / 1000;
    opacity = Math.max(0, 1 - fadeProgress);
  }

  ctx.save();
  ctx.globalAlpha = opacity;

  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fillRect(x - boxWidth / 2, y - boxHeight / 2, boxWidth, boxHeight);

  ctx.strokeStyle = "rgba(120, 255, 180, 0.8)";
  ctx.lineWidth = 2;
  ctx.strokeRect(x - boxWidth / 2, y - boxHeight / 2, boxWidth, boxHeight);

  ctx.fillStyle = "rgba(120, 255, 180, 1)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, index) => {
    const lineY = startY + index * lineHeight;
    ctx.fillText(line, x, lineY);
  });

  ctx.restore();
}


