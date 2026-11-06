import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Award,
  Sparkles,
  Gamepad2,
  RefreshCw,
  Camera,
  Flame,
} from 'lucide-react';
import { SiteContentConfig, QuizQuestion } from '../data/romanticContent';
import { romanticAudio } from '../utils/soundEffects';

interface Props {
  content: SiteContentConfig;
  onProceedToMemories: () => void;
  onOpenCustomizer?: () => void;
}

// Background couple photos for the animated moving backdrop behind quiz questions
const QUIZ_BACKGROUND_PHOTOS = [
  { url: '/images/26.jpg', caption: 'Sweet Kisses & Warm Hugs 💋' },
  { url: '/images/27.jpg', caption: 'Deep Intimate Embrace 🫦' },
  { url: '/images/14_10cf6bb8.jpg', caption: 'Tilak Temple Wall Hug 💚' },
  { url: '/images/23_583d551c.jpg', caption: 'Resting On Your Shoulder 🥹' },
  { url: '/images/18_dab562c2.jpg', caption: 'Bike Ride Tight Waist Hug 🛵' },
  { url: '/images/20_bc4d7471.jpg', caption: 'Cloudy Highway Smiles ☁️' },
  { url: '/images/15_e442ba55.jpg', caption: 'Saturday 07:41 pm Holding Hands 🤝' },
  { url: '/images/1_b217d761.jpg', caption: 'Pure Happiness Together 💫' },
  { url: '/images/21_54fa7506.jpg', caption: 'Interlocked Forever 💚' },
  { url: '/images/22_7b611d89.jpg', caption: 'Side By Side Snuggle 🫂' },
  { url: '/images/8_3d884414.jpg', caption: 'Passports Held In Hand 🕊️' },
  { url: '/images/7_992f0743.jpg', caption: 'Unnaiyandri Enaku Yethu Yethirkaalame 💚' },
  { url: '/images/26.jpg', caption: 'Forever SowRam Madness ❤️' },
  { url: '/images/27.jpg', caption: 'Our Little World 🌍' },
  { url: '/images/13_a75e867c.jpg', caption: 'Happy Birthday My Love 🎂' },
];

export const LoveQuizSection: React.FC<Props> = ({
  content,
  onProceedToMemories,
  onOpenCustomizer,
}) => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const { loveQuiz } = content;
  const questions: QuizQuestion[] = loveQuiz.questions;
  const currentQ = questions[currentIndex];
  const selectedAnswer = userAnswers[currentQ?.id];
  const isAnswered = selectedAnswer !== undefined;
  const isCorrect = isAnswered && selectedAnswer === currentQ?.correctAnswerIndex;

  // Current moving background photo corresponding to current question
  const currentBackdrop =
    QUIZ_BACKGROUND_PHOTOS[currentIndex % QUIZ_BACKGROUND_PHOTOS.length];

  // Accurate calculation without double-counting
  const totalScore = Object.entries(userAnswers).reduce((acc, [qIdStr, chosenOpt]) => {
    const qId = Number(qIdStr);
    const q = questions.find((item) => item.id === qId);
    if (q && q.correctAnswerIndex === chosenOpt) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return; // Locked once chosen

    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));

    if (optionIndex === currentQ.correctAnswerIndex) {
      romanticAudio.playSuccess();
    } else {
      romanticAudio.playWrong();
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all questions
      setIsQuizCompleted(true);
      romanticAudio.playSuccess();
      try {
        confetti({
          particleCount: 140,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#10b981', '#f43f5e', '#fbbf24', '#ffffff'],
        });
      } catch {
        // ignore
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // 1. Initial Start Screen
  if (!hasStarted) {
    return (
      <section className="relative min-h-screen py-16 px-4 flex flex-col items-center justify-center overflow-hidden bg-radial from-[#1e0712] via-[#0d140e] to-[#040905]">
        {/* Animated ambient glowing floating hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-soft"
              style={{
                top: `${(i * 19) % 92}%`,
                left: `${(i * 21) % 95}%`,
                animationDelay: `${(i * 0.4) % 4}s`,
                animationDuration: `${5 + (i % 4)}s`,
                opacity: 0.35 + (i % 4) * 0.15,
              }}
            >
              <span className="text-2xl sm:text-4xl text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.9)]">
                {i % 2 === 0 ? '💚' : '❤️'}
              </span>
            </div>
          ))}
        </div>

        {/* Soft background couple collage preview */}
        <div className="absolute inset-0 opacity-15 filter blur-xs overflow-hidden pointer-events-none">
          <img
            src="/images/26.jpg"
            alt="SowRam Romance"
            className="w-full h-full object-cover scale-110 animate-pulse"
            style={{ animationDuration: '8s' }}
          />
        </div>

        <div className="max-w-2xl w-full mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-500/40 text-center shadow-2xl animate-fade-in relative z-10 bg-black/75 backdrop-blur-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-600/30 border border-emerald-400/50 flex items-center justify-center mx-auto mb-4 text-emerald-300 shadow-lg shadow-emerald-950/70">
            <Gamepad2 className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-950/70 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-semibold uppercase tracking-widest mb-4">
            <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>15 Romantic Questions • SowRam Special</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-rose-100 to-amber-200 mb-4 drop-shadow-md">
            {loveQuiz.headline}
          </h2>

          <div className="space-y-3 text-sm sm:text-base text-rose-100/90 leading-relaxed font-light mb-8 max-w-lg mx-auto">
            {loveQuiz.introParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Couple photo preview strip */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {['/images/26.jpg', '/images/14_10cf6bb8.jpg', '/images/27.jpg', '/images/18_dab562c2.jpg'].map(
              (src, i) => (
                <div
                  key={i}
                  className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-emerald-400/40 shadow-lg shrink-0 transform hover:scale-110 transition-transform duration-300"
                >
                  <img src={src} alt="SowRam" className="w-full h-full object-cover" />
                </div>
              )
            )}
          </div>

          <button
            onClick={() => {
              setHasStarted(true);
              romanticAudio.playSparkle();
            }}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-rose-600 hover:from-emerald-500 hover:to-rose-500 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-emerald-950/80 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-300/40"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>{loveQuiz.startButtonText}</span>
          </button>
        </div>
      </section>
    );
  }

  // 2. Score Screen upon Quiz completion
  if (isQuizCompleted) {
    return (
      <section className="relative min-h-screen py-16 px-4 flex flex-col items-center justify-center overflow-hidden bg-radial from-[#1e0712] via-[#0d140e] to-[#040905]">
        {/* Animated couple montage backdrop */}
        <div className="absolute inset-0 opacity-20 filter blur-xs overflow-hidden pointer-events-none">
          <img
            src="/images/26.jpg"
            alt="SowRam Montage"
            className="w-full h-full object-cover scale-110 animate-pulse"
            style={{ animationDuration: '6s' }}
          />
        </div>

        <div className="max-w-3xl w-full mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-500/40 text-center shadow-2xl animate-fade-in relative z-10 bg-black/80 backdrop-blur-xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-rose-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-950/60 border border-emerald-300/50">
            <Award className="w-10 h-10 text-white" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-semibold uppercase tracking-widest mb-3">
            <span>SowRam Love Score 👑</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white mb-2">
            Quiz Completed, My Thangakunjii! 👑
          </h2>
          <p className="text-rose-200/80 text-sm sm:text-base mb-6">
            Here is how well you know your Sowmiyaa and our little world:
          </p>

          {/* Score Counter */}
          <div className="inline-flex items-baseline gap-2 px-8 py-4 rounded-2xl bg-black/60 border border-emerald-400/50 mb-6 shadow-inner">
            <span className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-300">
              {totalScore}
            </span>
            <span className="text-rose-200/60 text-lg sm:text-xl font-medium">/ 15 Points</span>
          </div>

          {/* Couple photo celebration snapshot */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-emerald-400/60 shadow-xl">
              <img src="/images/26.jpg" alt="Kiss" className="w-full h-full object-cover" />
            </div>
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-rose-400/60 shadow-xl">
              <img src="/images/27.jpg" alt="Kiss" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 max-w-xl mx-auto mb-8 text-sm sm:text-base text-emerald-200">
            {totalScore >= 12 ? (
              <p className="font-medium leading-relaxed font-serif-luxury">
                💖 “Incredible, Ramesh! You know your Sowmiyaa inside out! From our nicknames to our kisses, your heart remembers everything! You are officially my forever king! 👑💚”
              </p>
            ) : totalScore >= 8 ? (
              <p className="font-medium leading-relaxed font-serif-luxury">
                🥰 “Great job, baby! You got most of our sweetest memories right! I love you so much, Suuthhh! ❤️”
              </p>
            ) : (
              <p className="font-medium leading-relaxed font-serif-luxury">
                🙈 “Aww Ramesh! Looks like you need some extra revision cuddle lessons with Sowmiyaa tonight! Love you endlessly!”
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setIsQuizCompleted(false);
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-rose-200 text-sm font-medium border border-white/15 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Revisit Questions</span>
            </button>

            <button
              onClick={() => {
                romanticAudio.playSparkle();
                onProceedToMemories();
              }}
              className="flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-rose-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white font-extrabold text-base shadow-lg shadow-emerald-950/60 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-300/40"
            >
              <span>Next: Our Memories & Couple Videos 📸🎬</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // 3. Question Screen with Moving Background Couple Photo Animation
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <section className="relative min-h-screen py-16 px-4 flex flex-col items-center justify-center overflow-hidden bg-radial from-[#1e0712] via-[#0d140e] to-[#040905]">
      {/* 🎬 DYNAMIC MOVING BACKGROUND COUPLE PHOTO LAYER */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Moving Ken-Burns animated background image */}
        <div
          key={currentIndex}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-25"
        >
          <img
            src={currentBackdrop.url}
            alt={currentBackdrop.caption}
            className="w-full h-full object-cover scale-110 animate-[pulse_6s_ease-in-out_infinite] filter saturate-125 brightness-90"
            style={{
              animation: 'spin-slow 20s ease-in-out alternate infinite',
            }}
          />
        </div>

        {/* Gradient dark vignette & emerald-ruby light leaks */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040905] via-[#040905]/70 to-[#040905]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#080205]/60 to-[#040805]" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-rose-600/20 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Floating Glowing Green Hearts & Petals */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-soft"
            style={{
              top: `${(i * 17 + 5) % 88}%`,
              left: `${(i * 23 + 4) % 92}%`,
              animationDelay: `${(i * 0.5) % 4}s`,
              animationDuration: `${6 + (i % 3)}s`,
              opacity: 0.4 + (i % 3) * 0.2,
            }}
          >
            <span className="text-xl sm:text-3xl text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.9)]">
              {i % 2 === 0 ? '💚' : '❤️'}
            </span>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl w-full mx-auto flex flex-col items-center">
        {/* Top Header & Score Pill */}
        <div className="w-full flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-emerald-300 uppercase font-mono">
              Our Little Love Quiz 🤭💚
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-rose-200/80 bg-black/60 px-3.5 py-1.5 rounded-full border border-emerald-400/30 backdrop-blur-md">
            <span>Score:</span>
            <span className="text-amber-300 font-bold font-mono text-sm">{totalScore}</span>
            <span>/ {questions.length}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-black/60 h-2.5 rounded-full overflow-hidden border border-emerald-500/20 mb-6 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-rose-500 transition-all duration-300 shadow-md shadow-emerald-500/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 📸 Backside Floating Animated Photo Badge directly linked with this question */}
        <div className="w-full flex items-center justify-between gap-3 mb-4 px-2">
          <div className="flex items-center gap-2 text-xs text-emerald-200 font-mono">
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>Behind Question:</span>
            <span className="text-amber-200 font-semibold">{currentBackdrop.caption}</span>
          </div>
          <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-emerald-400/60 shadow-lg shrink-0 transform hover:scale-125 transition-transform duration-300">
            <img
              src={currentBackdrop.url}
              alt={currentBackdrop.caption}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Question Card with Glassmorphic styling over the moving photo */}
        <div className="w-full glass-panel-emerald p-6 sm:p-8 rounded-3xl border border-emerald-400/40 mb-6 shadow-2xl relative bg-black/75 backdrop-blur-xl">
          {/* Subtle glowing animated border highlight */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-emerald-500/20">
            <span className="text-xs font-mono tracking-widest text-emerald-300 uppercase font-bold">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-xs text-rose-300/80 font-mono">
              {isAnswered ? 'Submitted' : 'Tap an option to answer'}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white mb-6 leading-relaxed text-left drop-shadow-sm">
            {currentQ?.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQ?.options.map((optText, optIdx) => {
              const isOptionChosen = selectedAnswer === optIdx;
              const isOptionCorrect = optIdx === currentQ.correctAnswerIndex;

              let style =
                'bg-white/5 border-white/10 text-rose-100 hover:bg-white/10 hover:border-emerald-400/40';

              if (isAnswered) {
                if (isOptionCorrect) {
                  style =
                    'bg-emerald-950/90 border-emerald-400 text-emerald-100 font-bold ring-2 ring-emerald-400 shadow-lg shadow-emerald-950/60';
                } else if (isOptionChosen && !isOptionCorrect) {
                  style =
                    'bg-rose-950/90 border-rose-500 text-rose-200 font-medium ring-1 ring-rose-400';
                } else {
                  style = 'bg-white/5 border-white/5 text-rose-100/30 opacity-50';
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl border text-left font-medium transition-all duration-200 flex items-center justify-between cursor-pointer ${style}`}
                >
                  <span className="text-sm sm:text-base leading-snug">{optText}</span>
                  {isAnswered && isOptionCorrect && (
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                  )}
                  {isAnswered && isOptionChosen && !isOptionCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Personalized Feedback Reaction or Hint from Sowmiyaa */}
          {isAnswered && (
            <div
              className={`p-4 rounded-2xl border text-sm sm:text-base text-left animate-fade-in ${
                isCorrect
                  ? 'bg-emerald-950/80 border-emerald-400/50 text-emerald-200'
                  : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <Sparkles
                  className={`w-4 h-4 mt-1 shrink-0 ${
                    isCorrect ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                />
                <div>
                  <span className="font-semibold block mb-0.5 font-mono text-xs uppercase tracking-wide">
                    {isCorrect ? 'Sowmiyaa\'s Reaction: ' : 'Hint from Sowmiyaa: '}
                  </span>
                  <p className="leading-relaxed font-serif-luxury font-normal">
                    {isCorrect ? currentQ.feedback : currentQ.wrongHint}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="w-full flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-white/10 transition-all ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-white/5 text-white/40'
                : 'bg-white/10 hover:bg-white/20 text-rose-200 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              className="text-xs text-rose-300/60 hover:text-emerald-300 underline underline-offset-4 cursor-pointer hidden sm:block"
            >
              Custom Questions Spec
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold transition-all ${
              !isAnswered
                ? 'opacity-50 cursor-not-allowed bg-emerald-950/60 text-emerald-200/40 border border-emerald-900/40'
                : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-rose-600 hover:from-emerald-500 hover:to-rose-500 text-white shadow-lg shadow-emerald-950/60 hover:scale-105 active:scale-95 cursor-pointer border border-emerald-300/40'
            }`}
          >
            <span>{currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
