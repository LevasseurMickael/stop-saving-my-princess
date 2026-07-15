type SoundEffect =
  | "attack"
  | "heal"
  | "door_open"
  | "chest_open"
  | "death"
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

type MusicTrack =
  | "menu"
  | "dungeon_1"
  | "dungeon_2"
  | "dungeon_3"
  | "dungeon_4"
  | "dungeon_5"
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
      attack: "sounds/sfx/attack.mp3", // Done
      heal: "sounds/sfx/heal.mp3", // Done
      death: "sounds/sfx/death.mp3", // Done
      door_open: "sounds/sfx/door_open.mp3", // Done
      chest_open: "sounds/sfx/chest_open.mp3", // Done
      enemy_attack_bow: "sounds/sfx/enemy_attack_bow.mp3", // Done
      enemy_attack_magic: "sounds/sfx/enemy_attack_magic.mp3", // Done
      enemy_attack_melee: "sounds/sfx/enemy_attack_melee.mp3", // Done
      enemy_death: "sounds/sfx/enemy_death.mp3", // Done
      footstep: "sounds/sfx/footstep.mp3", // Done
      shield_deploy: "sounds/sfx/shield_retract.mp3", // Done
      shield_block: "sounds/sfx/shield_block.mp3", // Done
      shield_retract: "sounds/sfx/shield_retract.mp3", // Done
      skill_stun: "sounds/sfx/skill_stun.mp3", // Done
      skill_fire_breath: "sounds/sfx/skill_fire_breath.mp3", // Done
      floor_transition: "sounds/sfx/floor_transition.mp3", // Done
      secret_unlocked: "sounds/sfx/secret_unlocked.mp3", // Done
      ui_click: "sounds/sfx/ui_click.mp3", // Done
    };

    for (const [key, path] of Object.entries(soundFiles)) {
      const audio = new Audio(path);
      audio.volume = this.sfxVolume * this.masterVolume;
      this.sounds.set(key as SoundEffect, audio);
    }
  }

  async preloadMusic() {
    const musicFiles: Record<MusicTrack, string> = {
      menu: "sounds/music/menu.mp3",
      dungeon_1: "sounds/music/dungeon_1.mp3",
      dungeon_2: "sounds/music/dungeon_2.mp3",
      dungeon_3: "sounds/music/dungeon_3.mp3",
      dungeon_4: "sounds/music/dungeon_4.mp3",
      dungeon_5: "sounds/music/dungeon_5.mp3",
      game_over: "sounds/music/game_over.mp3",
      victory: "sounds/music/victory.mp3",
    };

    for (const [key, path] of Object.entries(musicFiles)) {
      const audio = new Audio(path);
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

  private dungeonMusics: MusicTrack[] = [
    "dungeon_1",
    "dungeon_2",
    "dungeon_3",
    "dungeon_4",
    "dungeon_5",
  ];

  private currentMusicIndex: number = 0;
  private isRotating: boolean = false;

  getMusicForFloor(floor: number): MusicTrack {
    const index = floor % this.dungeonMusics.length;
    return this.dungeonMusics[index];
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

    newMusic.onended = () => {
      this.playNextDungeonMusic();
    };
  }

  // ✅ AJOUTER : Démarrer la rotation de musique dungeon
  startDungeonMusicRotation() {
    if (this.currentMusic) {
    this.currentMusic.pause();
    this.currentMusic = null;
  }
    this.isRotating = true;
    this.currentMusicIndex = 0;
    setTimeout(() => {
    if (this.isRotating) {
      this.playMusic(this.dungeonMusics[0]);
    }
  }, 100);
  }

  // ✅ AJOUTER : Jouer la musique suivante
  private playNextDungeonMusic() {
    if (!this.isRotating) return;

    this.currentMusicIndex = (this.currentMusicIndex + 1) % this.dungeonMusics.length;
    const nextTrack = this.dungeonMusics[this.currentMusicIndex];
    
    this.playMusic(nextTrack);
  }

  // ✅ AJOUTER : Arrêter la rotation
  stopDungeonMusicRotation() {
    this.isRotating = false;
    this.stopMusic();
    this.currentMusicIndex = 0;
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
