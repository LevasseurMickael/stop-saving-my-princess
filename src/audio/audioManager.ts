type SoundEffect =
  | "attack"
  | "hit"
  | "heal"
  | "death"
  | "pickup"
  | "door_open"
  | "chest_open"
  | "player_hurt"
  | "enemy_attack_bow"
  | "enemy_attack_magic"
  | "enemy_attack_melee"
  | "enemy_death"
  | "footstep"
  | "shield_deploy"
  | "shield_block"
  | "shield_retract"
  | "skill_stun"
  | "skill_fire_breath"
  | "floor_transition"
  | "secret_unlocked"
  | "ui_click"
  | "ui_hover";

type MusicTrack =
  | "menu"
  | "dungeon_1_10"
  | "dungeon_11_20"
  | "dungeon_21_30"
  | "dungeon_31_40"
  | "dungeon_41_50"
  | "boss_1"
  | "game_over"
  | "victory";

class AudioManager {
  private sounds: Map<SoundEffect, HTMLAudioElement> = new Map();
  private music: Map<MusicTrack, HTMLAudioElement> = new Map();
  private currentMusic: HTMLAudioElement | null = null;

  private masterVolume: number = 1.0;
  private musicVolume: number = 0.5;
  private sfxVolume: number = 0.3;
  private muted = false;

  async preloadSounds() {
    const soundFiles: Record<SoundEffect, string> = {
      attack: "/sounds/sfx/attack.mp3", // Done
      hit: "/sounds/sfx/hit.mp3", // Done
      heal: "/sounds/sfx/heal.mp3", // Done
      death: "/sounds/sfx/death.mp3",
      pickup: "/sounds/sfx/pickup.mp3",
      door_open: "/sounds/sfx/door_open.mp3",
      chest_open: "/sounds/sfx/chest_open.mp3", // Done
      player_hurt: "/sounds/sfx/player_hurt.mp3",
      enemy_attack_bow: "/sounds/sfx/enemy_attack_bow.mp3",
      enemy_attack_magic: "/sounds/sfx/enemy_attack_magic.mp3",
      enemy_attack_melee: "/sounds/sfx/enemy_attack_melee.mp3",
      enemy_death: "/sounds/sfx/enemy_death.mp3",
      footstep: "/sounds/sfx/footstep.mp3", // Done
      shield_deploy: "/sounds/sfx/shield_deploy.mp3",
      shield_block: "/sounds/sfx/shield_block.mp3",
      shield_retract: "/sounds/sfx/shield_retract.mp3",
      skill_stun: "/sounds/sfx/skill_stun.mp3", // Done
      skill_fire_breath: "/sounds/sfx/skill_fire_breath.mp3", // Done
      floor_transition: "/sounds/sfx/floor_transition.mp3",
      secret_unlocked: "/sounds/sfx/secret_unlocked.mp3",
      ui_click: "/sounds/sfx/ui_click.mp3",
      ui_hover: "/sounds/sfx/ui_hover.mp3",
    };

    for (const [key, path] of Object.entries(soundFiles)) {
      const audio = new Audio(path);
      audio.volume = this.sfxVolume * this.masterVolume;
      this.sounds.set(key as SoundEffect, audio);
    }
  }

  async preloadMusic() {
    const musicFiles: Record<MusicTrack, string> = {
      menu: "/menu.mp3",
      dungeon_1_10: "/dungeon_1_10.mp3",
      dungeon_11_20: "/dungeon_11_20.mp3",
      dungeon_21_30: "/dungeon_21_30.mp3",
      dungeon_31_40: "/dungeon_31_40.mp3",
      dungeon_41_50: "/dungeon_41_50.mp3",
      boss_1: "/boss_1.mp3",
      game_over: "/game_over.mp3",
      victory: "/victory.mp3",
    };

    for (const [key, path] of Object.entries(musicFiles)) {
      const audio = new Audio(path);
      audio.loop = true;
      audio.volume = this.musicVolume * this.masterVolume;
      this.music.set(key as MusicTrack, audio);
    }
  }

  playSound(effect: SoundEffect) {
    if (this.muted) return;

    const sound = this.sounds.get(effect);
    if (sound) {
      const clone = sound.cloneNode() as HTMLAudioElement;
      clone.volume = this.sfxVolume * this.masterVolume;
      clone
        .play()
        .catch((e) => console.error(`Failed to play sound ${effect}:`, e));
    }
  }

  playMusic(track: MusicTrack, fadeInDuration: number = 1000) {
    if (this.muted) return;

    const newMusic = this.music.get(track);
    if (!newMusic) return;

    if (this.currentMusic && this.currentMusic !== newMusic) {
      this.fadeOut(this.currentMusic, 1000);
    }

    this.currentMusic = newMusic;
    newMusic.currentTime = 0;
    newMusic.volume = 0;
    this.currentMusic
      .play()
      .catch((e) => console.error(`Failed to play music ${track}:`, e));
    this.fadeIn(this.currentMusic, fadeInDuration);
  }

  stopMusic(fadeOutDuration: number = 1000) {
    if (this.currentMusic) {
      this.fadeOut(this.currentMusic, fadeOutDuration);
      this.currentMusic = null;
    }
  }

  private fadeIn(audio: HTMLAudioElement, duration: number) {
    const targetVolume = this.musicVolume * this.masterVolume;
    const steps = 60;
    const increment = targetVolume / steps;
    const interval = duration / steps;

    let current = 0;
    const fade = setInterval(() => {
      current += increment;
      if (current >= targetVolume) {
        audio.volume = targetVolume;
        clearInterval(fade);
      } else {
        audio.volume = current;
      }
    }, interval);
  }

  private fadeOut(audio: HTMLAudioElement, duration: number) {
    const initialVolume = audio.volume;
    const steps = 60;
    const decrement = initialVolume / steps;
    const interval = duration / steps;

    let current = initialVolume;
    const fade = setInterval(() => {
      current -= decrement;
      if (current <= 0) {
        audio.volume = 0;
        audio.pause();
        clearInterval(fade);
      } else {
        audio.volume = current;
      }
    }, interval);
  }

  setMasterVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
  }

  setMusicVolume(volume: number) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.currentMusic) {
      this.currentMusic.volume = this.musicVolume * this.masterVolume;
    }
  }

  setSfxVolume(volume: number) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.currentMusic?.pause();
    } else {
      this.currentMusic?.play();
    }
  }

  private updateAllVolumes() {
    for (const sound of this.sounds.values()) {
      sound.volume = this.sfxVolume * this.masterVolume;
    }
    for (const music of this.music.values()) {
      music.volume = this.musicVolume * this.masterVolume;
    }
  }
}

export const audioManager = new AudioManager();
