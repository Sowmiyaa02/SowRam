/**
 * Romantic Audio Engine:
 * - Plays local MP3 if available (/audio/paathi-nee-paathi-naa.mp3)
 * - Has an authentic Web Audio API romantic melody generator (harp & music-box style) as pure fallback
 * - Plays cute chime/sparkle/heart-explosion sound effects!
 */

class RomanticAudioManager {
  private audioCtx: AudioContext | null = null;
  private bgAudio: HTMLAudioElement | null = null;
  private isSynthesizing: boolean = false;
  private synthInterval: number | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.65;
  private isPlaying: boolean = false;
  private isFileLoadedSuccessfully: boolean = false;

  constructor() {
    // Audio context will be initialized on first user interaction
  }

  private initAudioCtx() {
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.bgAudio) {
      this.bgAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgAudio) {
      this.bgAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsFileLoaded(): boolean {
    return this.isFileLoadedSuccessfully;
  }

  public async startMusic(src: string = '/audio/paathi-nee-paathi-naa.mp3'): Promise<boolean> {
    this.initAudioCtx();
    this.isPlaying = true;

    try {
      if (!this.bgAudio) {
        this.bgAudio = new Audio(src);
        this.bgAudio.loop = true;
        this.bgAudio.volume = this.volume;
        this.bgAudio.muted = this.isMuted;

        this.bgAudio.addEventListener('canplaythrough', () => {
          this.isFileLoadedSuccessfully = true;
        });

        this.bgAudio.addEventListener('error', () => {
          this.isFileLoadedSuccessfully = false;
          this.startAmbientSynth();
        });
      }

      await this.bgAudio.play();
      this.isFileLoadedSuccessfully = true;
      return true;
    } catch {
      this.isFileLoadedSuccessfully = false;
      this.startAmbientSynth();
      return true;
    }
  }

  public pauseMusic() {
    this.isPlaying = false;
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
    this.stopAmbientSynth();
  }

  public togglePlay(src: string = '/audio/paathi-nee-paathi-naa.mp3'): boolean {
    if (this.isPlaying) {
      this.pauseMusic();
      return false;
    } else {
      this.startMusic(src);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Play romantic chime note
  public playTone(freq: number, duration: number = 1.2, type: OscillatorType = 'sine') {
    if (this.isMuted) return;
    this.initAudioCtx();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2 * this.volume, this.audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // ignore
    }
  }

  // Romantic gentle music box melody
  private startAmbientSynth() {
    if (this.isSynthesizing) return;
    this.isSynthesizing = true;

    const scale = [311.13, 349.23, 392.0, 466.16, 523.25, 622.25, 698.46, 783.99];
    let step = 0;

    this.synthInterval = window.setInterval(() => {
      if (!this.isPlaying || this.isMuted) return;
      const note = scale[step % scale.length];
      this.playTone(note, 2.2, 'sine');

      if (step % 2 === 0) {
        setTimeout(() => {
          if (this.isPlaying && !this.isMuted) {
            this.playTone(note * 1.25, 1.8, 'triangle');
          }
        }, 300);
      }
      step = (step + Math.floor(Math.random() * 3) + 1) % scale.length;
    }, 1800);
  }

  private stopAmbientSynth() {
    this.isSynthesizing = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  // Sound effects
  public playSparkle() {
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.4, 'triangle'), i * 80);
    });
  }

  public playSuccess() {
    [392.0, 523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.6, 'sine'), i * 110);
    });
  }

  public playWrong() {
    [329.63, 293.66].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.5, 'sine'), i * 150);
    });
  }

  public playHeartExplosion() {
    const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 1.4, 'sine');
      }, idx * 90);
    });
  }
}

export const romanticAudio = new RomanticAudioManager();
