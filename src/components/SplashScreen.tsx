import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Flame, ArrowRight } from 'lucide-react';
import { romanticAudio } from '../utils/soundEffects';

interface Props {
  onEnter: () => void;
}

export const SplashScreen: React.FC<Props> = ({ onEnter }) => {
  const [isFading, setIsFading] = useState<boolean>(false);

  const handleStart = () => {
    setIsFading(true);
    romanticAudio.startMusic();
    romanticAudio.playSparkle();
    romanticAudio.playSuccess();
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-radial from-[#18040a] via-[#090205] to-[#020b06] px-4 text-center transition-opacity duration-700 select-none overflow-hidden ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Radiant ambient glow orbs in emerald & crimson */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-rose-600/25 blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      {/* Floating glowing green and red hearts in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-soft"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + (i % 5)}s`,
              opacity: 0.35 + (i % 4) * 0.15,
            }}
          >
            {i % 2 === 0 ? (
              <span className="text-2xl sm:text-3xl text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]">💚</span>
            ) : (
              <span className="text-2xl sm:text-3xl text-rose-500 drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]">❤️</span>
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto">
        {/* Date pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-950/50 backdrop-blur-md mb-8 shadow-lg shadow-emerald-950/60 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-200 uppercase">
            07 • 11 • 2026 ❤️
          </span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
        </div>

        {/* Big S O W R A M Glowing Name */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
          {['S', 'O', 'W', 'R', 'A', 'M'].map((letter, idx) => (
            <span
              key={idx}
              className={`text-5xl sm:text-7xl md:text-8xl font-black font-serif-luxury tracking-widest drop-shadow-[0_0_25px_rgba(244,63,94,0.6)] ${
                idx < 3
                  ? 'text-transparent bg-clip-text bg-gradient-to-b from-rose-200 via-pink-300 to-rose-500'
                  : 'text-transparent bg-clip-text bg-gradient-to-b from-emerald-200 via-emerald-300 to-teal-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.6)]'
              }`}
            >
              {letter}
            </span>
          ))}
          <span className="text-4xl sm:text-6xl text-rose-500 animate-heart-pulse ml-1">❤️</span>
        </div>

        {/* Subtitle */}
        <h2 className="text-lg sm:text-2xl font-serif-luxury italic text-emerald-300 font-semibold mb-2 drop-shadow-md">
          Our Own Little World 💚
        </h2>
        <p className="text-xs sm:text-sm text-rose-200/80 mb-8 font-light max-w-xs">
          A sacred universe created by Sowmiyaa with all her heart for Ramesh Nagale.
        </p>

        {/* Enter Button */}
        <button
          onClick={handleStart}
          className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-emerald-600 via-rose-600 to-emerald-500 hover:from-emerald-500 hover:to-rose-500 text-white font-extrabold text-lg sm:text-xl shadow-2xl shadow-rose-950/80 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-emerald-300/40"
        >
          <Heart className="w-6 h-6 text-emerald-200 fill-emerald-200 animate-pulse" />
          <span>Step Inside Our World 💚</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>

        <span className="mt-4 text-[11px] text-emerald-400/80 font-mono">
          Featuring: “Paathi Nee Paathi Naa” ❤️🎶
        </span>
      </div>
    </div>
  );
};
