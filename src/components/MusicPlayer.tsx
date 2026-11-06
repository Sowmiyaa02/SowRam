import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Music,
  ExternalLink,
  Heart,
  Sparkles,
  Disc3,
} from 'lucide-react';
import { romanticAudio } from '../utils/soundEffects';
import { SiteContentConfig } from '../data/romanticContent';

interface Props {
  content: SiteContentConfig;
}

export const MusicPlayer: React.FC<Props> = ({ content }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.65);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { themeSong } = content.couple;

  useEffect(() => {
    setIsPlaying(romanticAudio.getIsPlaying());
  }, []);

  const handleTogglePlay = () => {
    const playing = romanticAudio.togglePlay(themeSong.audioSrc);
    setIsPlaying(playing);
    romanticAudio.playSparkle();
  };

  const handleToggleMute = () => {
    const muted = romanticAudio.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    romanticAudio.setVolume(val);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-[95vw] sm:max-w-md select-none">
      <div className="flex flex-col gap-2 p-2.5 sm:p-3 rounded-2xl sm:rounded-full bg-gradient-to-r from-[#20050e]/95 via-[#081b12]/95 to-[#05110a]/95 border-2 border-emerald-500/40 shadow-2xl backdrop-blur-2xl text-white">
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={handleTogglePlay}
            className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer border-2 ${
              isPlaying
                ? 'bg-gradient-to-tr from-emerald-600 to-rose-600 border-emerald-300 text-white shadow-lg shadow-emerald-950/80 animate-pulse'
                : 'bg-emerald-950/80 hover:bg-emerald-900 border-emerald-400/50 text-emerald-200'
            }`}
            title={isPlaying ? 'Pause Music' : 'Play Theme Song'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5 fill-current" />
            )}
          </button>

          {/* Song Info & Equalizer */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 min-w-0 cursor-pointer flex flex-col text-left"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-rose-400">❤️</span>
              <span className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-pink-100 to-amber-200 truncate">
                {themeSong.title}
              </span>
              <span className="text-xs text-emerald-400">💚</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-emerald-300/90 font-mono">
              <span className="truncate">Nitham Oru Vaanam • SowRam Theme</span>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3 shrink-0">
                  <span className="w-0.5 h-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-0.5 h-2/3 bg-rose-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-0.5 h-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>
          </div>

          {/* Volume & Details Toggle */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-emerald-500/30 shrink-0">
            <button
              onClick={handleToggleMute}
              className="p-1.5 rounded-full text-emerald-300 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1.5 accent-emerald-400 bg-white/20 rounded-lg cursor-pointer hidden sm:block"
              title={`Volume: ${Math.round(volume * 100)}%`}
            />

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-full text-xs text-emerald-400 hover:text-emerald-200 font-mono"
            >
              {isExpanded ? '▲' : '▼'}
            </button>
          </div>
        </div>

        {/* Expanded Drawer: Streaming Links & Details */}
        {isExpanded && (
          <div className="pt-2.5 pb-1 border-t border-emerald-500/20 text-xs text-left space-y-2 animate-fade-in">
            <p className="text-[11px] text-rose-200/90 italic">
              “Paathi Nee Paathi Naa ❤️ | Our SowRam Love Theme 💚”
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={themeSong.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/40 text-[10px] text-emerald-200 transition-colors"
              >
                <span>Spotify</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={themeSong.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-600/30 hover:bg-rose-600/50 border border-rose-400/40 text-[10px] text-rose-200 transition-colors"
              >
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <span className="text-[9px] text-white/50 ml-auto font-mono">
                Click Play for soundtrack
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
