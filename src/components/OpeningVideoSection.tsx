import React, { useState } from 'react';
import { Heart, Sparkles, Calendar, ArrowRight, Music, Flame, Video, X } from 'lucide-react';
import { SiteContentConfig } from '../data/romanticContent';
import { romanticAudio } from '../utils/soundEffects';

interface Props {
  content: SiteContentConfig;
  onComplete: () => void;
}

export const OpeningVideoSection: React.FC<Props> = ({ content, onComplete }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { openingScreen, couple } = content;

  const handleEnterHeart = () => {
    romanticAudio.startMusic();
    romanticAudio.playSparkle();
    romanticAudio.playSuccess();
    onComplete();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-radial from-[#1e050f] via-[#09150e] to-[#040805] px-4 py-12">
      {/* Radiant ambient glow orbs in emerald & rich ruby */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-emerald-500/25 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-rose-600/25 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

      {/* Floating Green Hearts Animation Shower */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-soft"
            style={{
              top: `${(i * 17) % 95}%`,
              left: `${(i * 23) % 96}%`,
              animationDelay: `${(i * 0.3) % 4}s`,
              animationDuration: `${5 + (i % 4)}s`,
              opacity: 0.3 + ((i % 5) * 0.15),
            }}
          >
            {i % 3 === 0 ? (
              <span className="text-2xl sm:text-4xl text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.9)]">💚</span>
            ) : i % 3 === 1 ? (
              <span className="text-xl sm:text-3xl text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.9)]">❤️</span>
            ) : (
              <span className="text-lg sm:text-2xl text-emerald-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]">💚</span>
            )}
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-20 max-w-4xl w-full mx-auto flex flex-col items-center text-center">
        {/* Date Display Pill */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-emerald-400/50 bg-emerald-950/70 backdrop-blur-md mb-6 shadow-xl shadow-emerald-950/70 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span className="text-xs sm:text-sm font-bold tracking-widest text-emerald-200 uppercase font-mono">
            {couple.romanticDateDisplay}
          </span>
          <span className="text-emerald-400">💚</span>
        </div>

        {/* Colorful Glowing Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif-luxury tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-rose-200 to-amber-200 drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]">
          {openingScreen.headline}
        </h1>

        <div className="flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-rose-500/30 bg-black/60 backdrop-blur-md mb-6 shadow-lg shadow-rose-950/50">
          <span className="font-serif-luxury italic text-sm sm:text-base md:text-lg text-rose-100 font-medium tracking-wide">
            {openingScreen.tagline}
          </span>
        </div>

        {/* Heart-Melting Narrative Letter Card */}
        <div className="relative w-full max-w-2xl glass-panel-emerald p-6 sm:p-10 rounded-3xl border border-emerald-500/40 mb-8 shadow-2xl overflow-hidden text-left bg-black/60 backdrop-blur-xl">
          {/* Header row */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-emerald-500/30">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-widest">
              <span className="text-lg">💚</span>
              <span>{openingScreen.badge}</span>
            </div>
            <span className="text-xs font-script text-rose-300 text-xl">From Sowmiyaa with all her soul</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white mb-4 flex items-center gap-2">
            <span>{openingScreen.salutation}</span>
          </h3>

          <div className="space-y-4 text-base sm:text-lg text-rose-100/95 leading-relaxed font-serif-luxury mb-6">
            <p>
              Today is the day the most handsome, gentle, and precious soul was born into this world — the boy who turned my entire life into heaven on earth. Every beat of my heart belongs only to you, Ramesh. 🥹💚
            </p>
            <p>
              If someone gave me a thousand lifetimes, I would search for you in every single one and choose you with no hesitation. You are my safe haven, my peace, my wildest laughter, and my favorite reality.
            </p>
            <p>
              I have created this little universe just for you, filled with our deepest memories, our late-night giggles, our warm hugs, and all the magical moments that make us SowRam.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-400/30 flex items-center gap-3 text-xs sm:text-sm text-emerald-200 font-medium mb-6">
            <Music className="w-5 h-5 text-emerald-300 shrink-0" />
            <span>
              Theme Song: <strong>“Paathi Nee Paathi Naa”</strong> (Nitham Oru Vaanam) 🎶💚
            </span>
          </div>

          <p className="text-base sm:text-lg font-serif-luxury italic text-emerald-300 font-semibold mb-6">
            {openingScreen.invitation}
          </p>

          {/* Quick couple photo preview with green heart highlights */}
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-emerald-500/20">
            {[
              { src: '/images/13_a75e867c.jpg', label: 'Birthday Post-it 💚' },
              { src: '/images/18_dab562c2.jpg', label: 'Bike Ride Hug 🛵' },
              { src: '/images/20_bc4d7471.jpg', label: 'Highway Smiles ☁️' },
              { src: '/images/15_e442ba55.jpg', label: 'Holding Hands 🤝' },
            ].map((imgItem, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden aspect-square border border-emerald-400/40 shadow-md group relative bg-black"
              >
                <img
                  src={imgItem.src}
                  alt={imgItem.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
                  <span className="text-[9px] text-emerald-200 truncate">{imgItem.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons: Play Entry Video & Enter My Heart */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => {
                setIsVideoModalOpen(true);
                romanticAudio.playSparkle();
              }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-black/60 hover:bg-black/80 text-emerald-200 hover:text-white font-bold text-sm sm:text-base shadow-xl border-2 border-emerald-400/50 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
            >
              <Video className="w-5 h-5 text-emerald-400" />
              <span>Watch Our Entry Video 🎬</span>
            </button>

            <button
              onClick={handleEnterHeart}
              className="group relative inline-flex items-center gap-3 px-10 py-4.5 rounded-full bg-gradient-to-r from-emerald-600 via-rose-600 to-emerald-500 hover:from-emerald-500 hover:to-rose-500 text-white font-extrabold text-base sm:text-lg shadow-2xl shadow-emerald-950/80 hover:shadow-emerald-600/80 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-2 border-emerald-300/50"
            >
              <span className="text-xl">💚</span>
              <span>{openingScreen.enterButtonText}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          <span className="mt-4 text-xs text-emerald-300/80 font-mono">
            Tap to open and play “Paathi Nee Paathi Naa” 🎶
          </span>
        </div>
      </div>

      {/* Entry Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-3xl w-full flex flex-col items-center text-center">
            <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white mb-3">
              Our Story Begins… ❤️🎬
            </h3>
            <div className="relative aspect-9/16 sm:aspect-16/10 w-full rounded-3xl overflow-hidden bg-black border-2 border-emerald-400/50 shadow-2xl mb-4">
              <video
                src="/videos/entry-video.mp4"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                onPlay={() => romanticAudio.pauseMusic()}
                onEnded={handleEnterHeart}
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleEnterHeart}
                className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all"
              >
                Skip Video & Enter My Heart ❤️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
