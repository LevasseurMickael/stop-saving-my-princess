type SoundEffect =
  | "attack"
  | "hit"
  | "heal"
  | "pickup"
  | "door_open"
  | "chest_open"
  | "death"
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
      attack: "/stop-saving-my-princess/sounds/sfx/attack.mp3", // TODO
      hit: "/stop-saving-my-princess/sounds/sfx/hit.mp3", // TODO
      heal: "/stop-saving-my-princess/sounds/sfx/heal.mp3", // Done
      pickup: "/stop-saving-my-princess/sounds/sfx/pickup.mp3",
      death: "/stop-saving-my-princess/sounds/sfx/death.mp3",
      door_open: "/stop-saving-my-princess/sounds/sfx/door_open.mp3",
      chest_open: "/stop-saving-my-princess/sounds/sfx/chest_open.mp3", // TODO
      player_hurt: "/stop-saving-my-princess/sounds/sfx/player_hurt.mp3",
      enemy_attack_bow: "/stop-saving-my-princess/sounds/sfx/enemy_attack_bow.mp3", // TODO
      enemy_attack_magic: "/stop-saving-my-princess/sounds/sfx/enemy_attack_magic.mp3", // TODO
      enemy_attack_melee: "/stop-saving-my-princess/sounds/sfx/enemy_attack_melee.mp3", // TODO
      enemy_death: "/stop-saving-my-princess/sounds/sfx/enemy_death.mp3",
      footstep: "/stop-saving-my-princess/sounds/sfx/footstep.mp3", // TODO
      shield_deploy: "/stop-saving-my-princess/sounds/sfx/shield_deploy.mp3",
      shield_block: "/stop-saving-my-princess/sounds/sfx/shield_block.mp3",
      shield_retract: "/stop-saving-my-princess/sounds/sfx/shield_retract.mp3",
      skill_stun: "/stop-saving-my-princess/sounds/sfx/skill_stun.mp3", // TODO
      skill_fire_breath: "/stop-saving-my-princess/sounds/sfx/skill_fire_breath.mp3", // TODO
      floor_transition: "/stop-saving-my-princess/sounds/sfx/floor_transition.mp3",
      secret_unlocked: "/stop-saving-my-princess/sounds/sfx/secret_unlocked.mp3",
      ui_click: "/stop-saving-my-princess/sounds/sfx/ui_click.mp3",
      ui_hover: "/stop-saving-my-princess/sounds/sfx/ui_hover.mp3",
    };

    for (const [key, path] of Object.entries(soundFiles)) {
      const audio = new Audio(path);
      audio.volume = this.sfxVolume * this.masterVolume;
      this.sounds.set(key as SoundEffect, audio);
    }
  }

  async preloadMusic() {
    const musicFiles: Record<MusicTrack, string> = {
      menu: "/stop-saving-my-princess/sounds/music/menu.mp3",
      dungeon_1: "/stop-saving-my-princess/sounds/music/dungeon_1.mp3",
      dungeon_2: "/stop-saving-my-princess/sounds/music/dungeon_2.mp3",
      dungeon_3: "/stop-saving-my-princess/sounds/music/dungeon_3.mp3",
      dungeon_4: "/stop-saving-my-princess/sounds/music/dungeon_4.mp3",
      dungeon_5: "/stop-saving-my-princess/sounds/music/dungeon_5.mp3",
      game_over: "/stop-saving-my-princess/sounds/music/game_over.mp3",
      victory: "/stop-saving-my-princess/sounds/music/victory.mp3",
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
      console.log(`🎵 Music "${track}" ended, playing next...`);
      this.playNextDungeonMusic();
    };
  }

  // ✅ AJOUTER : Démarrer la rotation de musique dungeon
  startDungeonMusicRotation() {
    console.log("🎵 Starting dungeon music rotation...");
    if (this.currentMusic) {
    this.currentMusic.pause();
    this.currentMusic = null;
  }
    this.isRotating = true;
    this.currentMusicIndex = 0;
    setTimeout(() => {
    if (this.isRotating) {
      console.log("🎵 Playing first dungeon music...");
      this.playMusic(this.dungeonMusics[0]);
    }
  }, 100);
  }

  // ✅ AJOUTER : Jouer la musique suivante
  private playNextDungeonMusic() {
    if (!this.isRotating) return;

    this.currentMusicIndex = (this.currentMusicIndex + 1) % this.dungeonMusics.length;
    const nextTrack = this.dungeonMusics[this.currentMusicIndex];
    
    console.log(`🎵 Playing next music: ${nextTrack} (${this.currentMusicIndex + 1}/5)`);
    this.playMusic(nextTrack);
  }

  // ✅ AJOUTER : Arrêter la rotation
  stopDungeonMusicRotation() {
    console.log("⏹️ Stopping dungeon music rotation...");
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
