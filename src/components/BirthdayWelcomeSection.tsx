import React from 'react';
import { Heart, Sparkles, Cake, ArrowRight } from 'lucide-react';
import { SiteContentConfig } from '../data/romanticContent';
import { romanticAudio } from '../utils/soundEffects';

interface Props {
  content: SiteContentConfig;
  onOpenSurprise: () => void;
}

export const BirthdayWelcomeSection: React.FC<Props> = ({ content, onOpenSurprise }) => {
  const handleClick = () => {
    romanticAudio.playSparkle();
    romanticAudio.playSuccess();
    onOpenSurprise();
  };

  const { welcome, couple } = content;

  return (
    <section className="relative min-h-screen py-16 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0507] via-[#1a060d] to-[#08120b]">
      {/* Soft romantic ambient background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-96 bg-rose-700/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
        {/* Birthday Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-400/40 bg-amber-950/30 backdrop-blur-md mb-6 shadow-lg shadow-amber-950/50">
          <Cake className="w-4 h-4 text-amber-300 animate-bounce" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-amber-200 uppercase">
            Special Day for Ramesh Nagale • {couple.specialDate}
          </span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif-luxury tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-rose-100 to-amber-200 drop-shadow-md">
          {welcome.headline}
        </h1>

        {/* Personal Message from Sowmiyaa */}
        <div className="max-w-2xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/20 mb-10 shadow-2xl relative text-left">
          <div className="absolute -top-3.5 left-8 px-3.5 py-0.5 rounded-full bg-rose-600 text-[11px] font-medium tracking-wider text-white uppercase shadow-md flex items-center gap-1">
            <Heart className="w-3 h-3 fill-white" />
            <span>From Sowmiyaa with All Her Heart 💌</span>
          </div>

          <div className="space-y-3.5 text-base sm:text-lg text-rose-100/90 leading-relaxed font-light mb-6">
            {welcome.messageParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="pt-4 border-t border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <span className="font-serif-luxury italic text-emerald-300 font-semibold tracking-wide text-base">
              “{couple.dateQuote}”
            </span>
            <span className="text-xs text-rose-300/80 font-script text-lg sm:text-xl shrink-0">
              Forever Your Sowmiyaa 💚
            </span>
          </div>
        </div>

        {/* Couple Photo Collage */}
        <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {/* Main Hero Card: Bike Ride Tight Hug */}
          <div className="col-span-2 sm:col-span-2 row-span-2 relative group rounded-2xl overflow-hidden border border-rose-500/30 shadow-2xl bg-black/40">
            <img
              src="/images/18_dab562c2.jpg"
              alt="SowRam Bike Ride Tight Hug"
              className="w-full h-full min-h-[300px] sm:min-h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-4 sm:p-6 text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 font-bold mb-1">
                Our Little World 💚
              </span>
              <h3 className="text-lg sm:text-xl font-serif-luxury font-bold text-white">
                Holding You Tight on the Road
              </h3>
              <p className="text-xs text-rose-200/80 mt-1">
                Rings on our fingers, wind on our faces, and your warm embrace.
              </p>
            </div>
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-rose-600/80 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1 shadow-md">
              <Heart className="w-3 h-3 fill-white" />
              <span>Soulmates</span>
            </div>
          </div>

          {/* Photo 2: Green Post-it Note */}
          <div className="relative group rounded-xl overflow-hidden border border-emerald-500/30 shadow-lg bg-black/40 aspect-square">
            <img
              src="/images/13_a75e867c.jpg"
              alt="Happy Birthday My Love Post-it"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 p-2 sm:p-3 flex items-end">
              <span className="text-[11px] sm:text-xs text-emerald-200 font-medium">
                Happy Birthday My Love 💚
              </span>
            </div>
          </div>

          {/* Photo 3: Saturday 07:41 pm Interlocked Hands */}
          <div className="relative group rounded-xl overflow-hidden border border-amber-500/30 shadow-lg bg-black/40 aspect-square">
            <img
              src="/images/15_e442ba55.jpg"
              alt="Interlocked Hands on Stone Steps"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 p-2 sm:p-3 flex items-end">
              <span className="text-[11px] sm:text-xs text-amber-200 font-medium">
                Saturday 07:41 pm 🤝
              </span>
            </div>
          </div>

          {/* Photo 4: Cloudy Highway Smiles */}
          <div className="relative group rounded-xl overflow-hidden border border-rose-500/20 shadow-lg bg-black/40 aspect-square">
            <img
              src="/images/20_bc4d7471.jpg"
              alt="Roadtrip Highway Smiles"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 p-2 sm:p-3 flex items-end">
              <span className="text-[11px] sm:text-xs text-rose-100 font-medium">
                Highway Smiles 🛣️
              </span>
            </div>
          </div>

          {/* Photo 5: Snuggle with Green Heart */}
          <div className="relative group rounded-xl overflow-hidden border border-emerald-500/30 shadow-lg bg-black/40 aspect-square">
            <img
              src="/images/22_7b611d89.jpg"
              alt="Snuggle & Green Heart"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 p-2 sm:p-3 flex items-end">
              <span className="text-[11px] sm:text-xs text-emerald-200 font-medium">
                Cozy Together 💚
              </span>
            </div>
          </div>

          {/* Photo 6: Kisses & Cuddles */}
          <div className="relative group rounded-xl overflow-hidden border border-rose-500/30 shadow-lg bg-black/40 aspect-square">
            <img
              src="/images/26.jpg"
              alt="Our Sweet Kisses & Cuddles"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 p-2 sm:p-3 flex items-end">
              <span className="text-[11px] sm:text-xs text-rose-200 font-medium">
                Our Kisses 💋
              </span>
            </div>
          </div>

          {/* Photo 7: Deep Intimate Embrace */}
          <div className="relative group rounded-xl overflow-hidden border border-emerald-500/30 shadow-lg bg-black/40 aspect-square">
            <img
              src="/images/27.jpg"
              alt="Deep Lip Kiss & Embrace"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 p-2 sm:p-3 flex items-end">
              <span className="text-[11px] sm:text-xs text-emerald-200 font-medium">
                Deep Lip Kiss 🫦
              </span>
            </div>
          </div>
        </div>

        {/* Open Your Surprise CTA Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleClick}
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-lg sm:text-xl shadow-xl shadow-rose-900/50 hover:shadow-rose-600/60 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-amber-300/40"
          >
            <Heart className="w-6 h-6 animate-heart-pulse text-amber-200" />
            <span>{welcome.buttonText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
          <span className="mt-3 text-xs text-rose-300/70">
            Every click has a surprise, and every memory has a piece of my heart...
          </span>
        </div>
      </div>
    </section>
  );
};
