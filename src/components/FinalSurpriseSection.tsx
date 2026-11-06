import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Gift,
  Heart,
  Sparkles,
  Scroll,
  RotateCcw,
  Smile,
  X,
} from 'lucide-react';
import { SiteContentConfig } from '../data/romanticContent';
import { romanticAudio } from '../utils/soundEffects';

interface Props {
  content: SiteContentConfig;
}

export const FinalSurpriseSection: React.FC<Props> = ({ content }) => {
  const [isBoxOpened, setIsBoxOpened] = useState<boolean>(false);
  const [isHugModalOpen, setIsHugModalOpen] = useState<boolean>(false);
  const [hugCount, setHugCount] = useState<number>(1);

  const { finalSurprise, loveLetter, lastHug } = content;

  const handleOpenGiftBox = () => {
    setIsBoxOpened(true);
    romanticAudio.playSuccess();
    romanticAudio.playSparkle();

    try {
      confetti({
        particleCount: 160,
        spread: 95,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#10b981', '#f59e0b', '#fb7185', '#ffffff'],
      });
    } catch {
      // ignore
    }
  };

  const handleTriggerFinalHug = () => {
    setIsHugModalOpen(true);
    setHugCount((prev) => prev + 1);
    romanticAudio.playHeartExplosion();

    // Full screen heart explosion
    try {
      const end = Date.now() + 2500;
      const colors = ['#e11d48', '#10b981', '#fbbf24', '#f43f5e', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {
      // ignore
    }
  };

  return (
    <section className="relative min-h-screen py-16 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#041209] via-[#1c0610] to-[#0a0305]">
      {/* Background ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-rose-800/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-800/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-950/40 backdrop-blur-md mb-6">
          <Gift className="w-4 h-4 text-amber-300" />
          <span className="text-xs uppercase tracking-widest text-rose-200 font-semibold">
            Final Chapter 🎁
          </span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
        </div>

        <h2 className="text-4xl sm:text-6xl font-bold font-serif-luxury text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-100 to-emerald-200 mb-4">
          {finalSurprise.headline}
        </h2>

        {/* 1. Animated Gift Box Container (if not opened yet) */}
        {!isBoxOpened ? (
          <div className="w-full max-w-lg glass-panel p-8 sm:p-12 rounded-3xl border border-amber-400/30 shadow-2xl flex flex-col items-center text-center animate-pulse">
            <div
              onClick={handleOpenGiftBox}
              className="relative w-44 h-44 sm:w-52 sm:h-52 cursor-pointer group mb-6 transition-transform hover:scale-105 active:scale-95 duration-300"
            >
              {/* Gift Box Base */}
              <div className="w-full h-full rounded-3xl bg-gradient-to-tr from-rose-800 via-red-700 to-rose-600 shadow-2xl border-2 border-amber-300/40 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-md" />
                <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-amber-400 via-amber-200 to-amber-500 shadow-md" />

                <div className="absolute -top-3 w-16 h-16 rounded-full bg-amber-400 border-2 border-amber-200 shadow-lg flex items-center justify-center animate-bounce">
                  <Sparkles className="w-8 h-8 text-rose-900" />
                </div>

                <div className="relative z-10 w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Gift className="w-8 h-8 text-amber-200" />
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm sm:text-base text-rose-100/90 leading-relaxed font-light mb-8 max-w-md">
              {finalSurprise.messageParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <button
              onClick={handleOpenGiftBox}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-amber-500 via-rose-600 to-red-600 hover:from-amber-400 hover:to-red-500 text-white font-bold text-base sm:text-lg shadow-xl shadow-rose-950/60 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-amber-300/40"
            >
              {finalSurprise.openButtonText}
            </button>
          </div>
        ) : (
          /* 2. Unlocked Surprise Content */
          <div className="w-full space-y-12 animate-fade-in">
            {/* The Heartfelt Love Letter */}
            <div className="max-w-3xl mx-auto bg-[#fffbf2] text-slate-900 p-8 sm:p-12 rounded-3xl shadow-2xl border-4 border-amber-300/40 relative text-left">
              {/* Wax Seal Decor */}
              <div className="absolute -top-6 right-8 w-14 h-14 rounded-full bg-rose-700 border-2 border-rose-900 shadow-xl flex items-center justify-center text-amber-200">
                <Heart className="w-7 h-7 fill-amber-200 text-rose-800" />
              </div>

              <div className="flex items-center gap-2 text-rose-800 mb-6">
                <Scroll className="w-5 h-5 text-amber-700" />
                <span className="text-xs uppercase tracking-widest font-bold font-mono">
                  My Heart to You 💌
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-slate-900 mb-6">
                {loveLetter.salutation}
              </h3>

              <div className="space-y-4 text-base sm:text-lg font-serif-luxury text-slate-800 leading-relaxed font-normal">
                {loveLetter.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-amber-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-serif-luxury italic text-slate-600">
                    Forever your Sowmiyaa. 💚
                  </p>
                  <p className="text-2xl sm:text-3xl font-script text-rose-700 mt-1">
                    Sowmiyaa 💚
                  </p>
                </div>

                <div className="text-xs text-emerald-800 font-semibold bg-emerald-100/70 px-4 py-2 rounded-full border border-emerald-300 self-start sm:self-auto font-serif-luxury">
                  {loveLetter.motto}
                </div>
              </div>
            </div>

            {/* Special Birthday Couple Video Special */}
            <div className="max-w-3xl w-full mx-auto rounded-3xl overflow-hidden border-2 border-emerald-400/40 bg-black/80 shadow-2xl p-4 sm:p-6 mb-8 text-left backdrop-blur-xl">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <h3 className="text-lg sm:text-2xl font-serif-luxury font-bold text-white">
                    Our Special Birthday Video for Ramesh 🎬🎂
                  </h3>
                </div>
                <span className="text-xs text-emerald-300 font-mono">SowRam ❤️</span>
              </div>
              <div className="relative aspect-9/16 sm:aspect-16/10 rounded-2xl overflow-hidden bg-black mb-3 shadow-inner">
                <video
                  src="/videos/birthday-video.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain"
                  onPlay={() => romanticAudio.pauseMusic()}
                />
              </div>
              <p className="text-xs sm:text-sm text-emerald-200/90 font-serif-luxury">
                “Every beat of my heart belongs only to you, Ramesh. Happy Birthday to my forever world!” 🥹💚
              </p>
            </div>

            {/* Final Romantic Photo Grid */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-serif-luxury font-bold text-white mb-6">
                Every Smile, Every Memory with You 📸
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { src: '/images/26.jpg', tag: 'Our Kisses & Cuddles 💋' },
                  { src: '/images/27.jpg', tag: 'Deep Lip Kiss 🫦' },
                  { src: '/images/18_dab562c2.jpg', tag: 'Bike Hug 🛵' },
                  { src: '/images/13_a75e867c.jpg', tag: 'Happy Birthday My Love 💚' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl overflow-hidden aspect-square border-2 border-emerald-400/30 relative group shadow-lg"
                  >
                    <img
                      src={item.src}
                      alt={item.tag}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-[11px] text-rose-100 font-medium">{item.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grand Final Hug CTA Button */}
            <div className="flex flex-col items-center pt-8">
              <button
                onClick={handleTriggerFinalHug}
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-emerald-600 hover:from-rose-500 hover:to-emerald-500 text-white font-extrabold text-lg sm:text-2xl shadow-2xl shadow-rose-950/80 hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-amber-300/60"
              >
                <Heart className="w-7 h-7 text-rose-200 fill-rose-200 animate-heart-pulse" />
                <span>{lastHug.buttonText}</span>
                <Sparkles className="w-6 h-6 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              </button>
              <span className="text-xs sm:text-sm text-rose-300/80 mt-3 font-medium">
                Click for the biggest, warmest embrace in the universe!
              </span>
            </div>
          </div>
        )}

        {/* 3. Full-Screen Heart Explosion & Final Hug Modal */}
        {isHugModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 animate-fade-in overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setIsHugModalOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-w-2xl w-full mx-auto text-center px-4 py-8 flex flex-col items-center">
              {/* Pulsing Heart */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-rose-600/30 blur-2xl animate-pulse" />
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-rose-600 via-red-500 to-emerald-500 flex items-center justify-center shadow-2xl shadow-rose-900 border-2 border-amber-300/60">
                  <Heart className="w-14 h-14 sm:w-18 sm:h-18 text-white fill-white animate-heart-pulse" />
                </div>
              </div>

              {/* Exact Hug Title */}
              <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-amber-200 mb-6 drop-shadow-md">
                {lastHug.hugTitle}
              </h2>

              {/* Exact Hug Paragraphs */}
              <div className="space-y-4 text-base sm:text-xl font-serif-luxury text-rose-100 leading-relaxed font-light mb-8 max-w-xl">
                {lastHug.messageParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Sign Off */}
              <p className="text-xl sm:text-2xl font-serif-luxury font-bold text-emerald-300 mb-8">
                {lastHug.signOff}
              </p>

              {/* Interactive buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={handleTriggerFinalHug}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-950/60 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-300/30"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Hug Her Again ({hugCount} Hugs Given!) 🫂</span>
                </button>

                <button
                  onClick={() => setIsHugModalOpen(false)}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/20 transition-all cursor-pointer"
                >
                  <Smile className="w-4 h-4 text-amber-300" />
                  <span>Close & Cherish Our World</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
