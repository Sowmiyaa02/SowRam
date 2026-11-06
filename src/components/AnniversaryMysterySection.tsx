import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, HelpCircle, CheckCircle2, AlertCircle, ArrowRight, Sparkles, Flame } from 'lucide-react';
import { SiteContentConfig } from '../data/romanticContent';
import { romanticAudio } from '../utils/soundEffects';

interface Props {
  content: SiteContentConfig;
  onProceedToQuiz: () => void;
}

export const AnniversaryMysterySection: React.FC<Props> = ({ content, onProceedToQuiz }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState<number>(0);

  const { anniversaryMystery } = content;

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);

    if (index === anniversaryMystery.correctAnswerIndex) {
      setIsAnsweredCorrectly(true);
      setCurrentHint(null);
      romanticAudio.playSuccess();
      romanticAudio.playSparkle();

      // Trigger celebratory confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#e11d48', '#10b981', '#f59e0b', '#fb7185'],
        });
      } catch {
        // ignore
      }
    } else {
      romanticAudio.playWrong();
      setAttemptCount((prev) => prev + 1);
      const hintIndex = attemptCount % anniversaryMystery.wrongHints.length;
      setCurrentHint(anniversaryMystery.wrongHints[hintIndex]);
    }
  };

  return (
    <section className="relative min-h-screen py-16 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#08120b] via-[#15050c] to-[#0d0408]">
      {/* Decorative backdrop */}
      <div className="absolute top-1/3 left-10 w-80 h-80 rounded-full bg-emerald-900/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-rose-900/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center text-center">
        {/* Section Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md mb-6">
          <Flame className="w-4 h-4 text-emerald-400" />
          <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold">
            Our Special Day 🥹
          </span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-emerald-100 to-amber-200 mb-4">
          {anniversaryMystery.headline}
        </h2>
        <p className="text-sm sm:text-base text-rose-200/90 max-w-lg mb-8 leading-relaxed font-light">
          {anniversaryMystery.question}
        </p>

        {/* The Riddle Box */}
        <div className="w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/25 mb-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-6 h-6 text-rose-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-rose-300 uppercase">
              Choose the Special Reason:
            </span>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {anniversaryMystery.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === anniversaryMystery.correctAnswerIndex;

              let btnStyle = 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-rose-400/40 text-rose-100';

              if (isSelected) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-950/80 text-emerald-200 shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-400/40';
                } else {
                  btnStyle = 'border-rose-600 bg-rose-950/70 text-rose-200 ring-2 ring-rose-500/30';
                }
              } else if (isAnsweredCorrectly && isCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-950/70 text-emerald-200';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left font-medium transition-all duration-300 flex items-center justify-between group cursor-pointer ${btnStyle}`}
                >
                  <span className="text-sm sm:text-base">{option}</span>
                  {isSelected && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                  )}
                  {isSelected && !isCorrect && (
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Wrong Answer Hint Banner */}
          {currentHint && !isAnsweredCorrectly && (
            <div className="mt-5 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-sm flex items-center gap-3 text-left animate-shake">
              <span className="text-xl">🙈</span>
              <p className="leading-snug">{currentHint}</p>
            </div>
          )}
        </div>

        {/* Revealed Photos & Celebration */}
        {isAnsweredCorrectly && (
          <div className="w-full max-w-3xl glass-panel-emerald p-6 sm:p-8 rounded-3xl border border-emerald-500/40 shadow-2xl mb-8 animate-fade-in text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Correct Answer Revealed! ❤️</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white mb-3 leading-relaxed">
              “{anniversaryMystery.celebrationText}”
            </h3>

            {/* Revealed Photo Grid with Floating Hearts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
              {anniversaryMystery.revealPhotos.map((photo, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-emerald-400/30 shadow-lg aspect-square group relative"
                >
                  <img
                    src={photo}
                    alt={`Revealed Memory ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] text-emerald-200 font-medium">
                      {i === 0
                        ? 'Our Kisses 💋'
                        : i === 1
                        ? 'Deep Lip Kiss 🫦'
                        : i === 2
                        ? 'Birthday Post-it 💚'
                        : 'Tight Bike Hug 🛵'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Section Button */}
            <button
              onClick={() => {
                romanticAudio.playSparkle();
                onProceedToQuiz();
              }}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-base shadow-lg shadow-emerald-950/60 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-300/30"
            >
              <span>How Well Do You Know Your Girl? 💚</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
