import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  Heart,
  Calendar,
  MapPin,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  ArrowRight,
  Grid,
  Video,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { SiteContentConfig, MediaItem, VideoItem } from '../data/romanticContent';
import { romanticAudio } from '../utils/soundEffects';

interface Props {
  content: SiteContentConfig;
  onProceedToFinalSurprise: () => void;
}

export const MemoriesScrapbookSection: React.FC<Props> = ({
  content,
  onProceedToFinalSurprise,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'slideshow'>('grid');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Slideshow auto-play state
  const [slideshowIndex, setSlideshowIndex] = useState<number>(0);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState<boolean>(true);

  // Video active state
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const { memories } = content;
  const photos: MediaItem[] = memories.photos;
  const videos: VideoItem[] = memories.videos || [
    {
      id: 'v-1',
      url: '/videos/video_1.mp4',
      title: 'SowRam Reel #1: Our Pure Love & Memories 💚',
      caption:
        'Every sweet smile, bus ride, giggle, and romantic song with you, Ramesh! Our journey captured in motion. 🎬✨',
      date: 'Special Memories',
    },
    {
      id: 'v-2',
      url: '/videos/video_2.mp4',
      title: 'SowRam Reel #2: Forever & Always Together ❤️',
      caption:
        'Holding you tight and smiling like there is nobody else in the universe. Happy Birthday my king! 🎂🥹',
      date: 'Happy Birthday My Love',
    },
  ];

  const filteredPhotos = photos.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  // Auto-advance slideshow
  useEffect(() => {
    let interval: number | null = null;
    if (viewMode === 'slideshow' && isSlideshowPlaying && filteredPhotos.length > 0) {
      interval = window.setInterval(() => {
        setSlideshowIndex((prev) => (prev + 1) % filteredPhotos.length);
      }, 3500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [viewMode, isSlideshowPlaying, filteredPhotos.length]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    romanticAudio.playSparkle();
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
    }
  };

  return (
    <section className="relative min-h-screen py-16 px-4 flex flex-col items-center overflow-hidden bg-gradient-to-b from-[#080205] via-[#09150e] to-[#040905]">
      {/* Background Glows & Floating Green Hearts */}
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-rose-600/20 blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-soft"
            style={{
              top: `${(i * 18) % 90}%`,
              left: `${(i * 22) % 94}%`,
              animationDelay: `${(i * 0.4) % 4}s`,
              animationDuration: `${5 + (i % 3)}s`,
              opacity: 0.35 + (i % 4) * 0.15,
            }}
          >
            <span className="text-xl sm:text-3xl text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.9)]">
              {i % 2 === 0 ? '💚' : '❤️'}
            </span>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-center text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/40 bg-emerald-950/60 backdrop-blur-md mb-6 shadow-lg shadow-emerald-950/60">
          <Camera className="w-4 h-4 text-emerald-300" />
          <span className="text-xs uppercase tracking-widest text-emerald-200 font-bold font-mono">
            {memories.subtitle} & Couple Videos 🎬
          </span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif-luxury text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-rose-100 to-amber-200 mb-4 drop-shadow-md">
          {memories.headline}
        </h2>

        {/* Narrative Paragraphs */}
        <div className="max-w-2xl mx-auto space-y-2.5 text-sm sm:text-base text-rose-100/90 leading-relaxed font-light mb-8">
          {memories.introParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* 🎬 DEDICATED COUPLE VIDEOS REEL SECTION */}
        <div className="w-full mb-14 text-left">
          <div className="flex items-center justify-between gap-3 mb-6 px-2 border-b border-emerald-500/30 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">
                  Our Love Story in Motion 🎬❤️
                </h3>
                <p className="text-xs text-emerald-300/80 font-mono">
                  Real videos of Ramesh & Sowmiyaa • Watch with love! 💚
                </p>
              </div>
            </div>

            <span className="hidden sm:inline-block text-xs font-mono px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300">
              2 Videos Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {videos.map((vid, idx) => (
              <div
                key={vid.id}
                className="glass-panel-emerald rounded-3xl border-2 border-emerald-400/40 overflow-hidden shadow-2xl flex flex-col bg-black/80 backdrop-blur-xl group hover:border-emerald-300/70 transition-all duration-300"
              >
                {/* Video Player */}
                <div className="relative aspect-9/16 sm:aspect-16/10 w-full bg-black overflow-hidden flex items-center justify-center">
                  <video
                    src={vid.url}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain bg-black"
                    onPlay={() => {
                      setActiveVideoId(vid.id);
                      romanticAudio.pauseMusic(); // Pause background audio so video audio plays cleanly
                    }}
                    onPause={() => {
                      if (activeVideoId === vid.id) setActiveVideoId(null);
                    }}
                  />
                </div>

                {/* Video Meta & Romantic Caption */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="text-lg font-serif-luxury font-bold text-white group-hover:text-amber-200 transition-colors">
                        {vid.title}
                      </h4>
                      <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400 shrink-0" />
                    </div>
                    <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed font-light mb-3">
                      {vid.caption}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-emerald-300 font-mono pt-3 border-t border-emerald-500/20">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{vid.date || 'SowRam Forever'}</span>
                    </span>
                    <span className="text-[11px] text-rose-300/80">SowRam ❤️</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continuous Animated Scrolling Photo Ribbon */}
        <div className="w-full overflow-hidden py-4 mb-10 relative">
          <div className="flex gap-4 w-max animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
            {[...photos, ...photos].map((photo, i) => (
              <div
                key={i}
                onClick={() => openLightbox(i % photos.length)}
                className="w-40 sm:w-52 aspect-4/5 rounded-2xl overflow-hidden shadow-xl border-2 border-emerald-400/40 shrink-0 cursor-pointer group relative bg-black transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-2.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="text-[11px] text-rose-100 font-medium truncate">
                    {photo.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Controls & Filter Bar */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-black/60 border border-emerald-500/30 rounded-2xl backdrop-blur-md">
            {[
              { id: 'all', label: 'All Photos (20+)' },
              { id: 'romantic', label: 'Romantic Memories 🌹' },
              { id: 'favourite', label: 'Favourite Photos ❤️' },
              { id: 'special', label: 'Special SowRam 💚' },
              { id: 'funny', label: 'Fun Moments 🤭' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFilter(tab.id);
                  setSlideshowIndex(0);
                  romanticAudio.playSparkle();
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-emerald-600 to-rose-600 text-white shadow-md shadow-emerald-950'
                    : 'text-rose-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* View Modes (Grid, Slideshow) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-black/60 border border-emerald-500/30 rounded-2xl backdrop-blur-md">
            <button
              onClick={() => {
                setViewMode('grid');
                romanticAudio.playSparkle();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-rose-200/60 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Polaroids</span>
            </button>

            <button
              onClick={() => {
                setViewMode('slideshow');
                romanticAudio.playSparkle();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'slideshow'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-rose-200/60 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Slideshow</span>
            </button>
          </div>
        </div>

        {/* 1. Polaroid Grid View */}
        {viewMode === 'grid' && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {filteredPhotos.map((item, index) => {
              const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0'];
              const rotClass = rotations[index % rotations.length];

              return (
                <div
                  key={item.id}
                  onClick={() => openLightbox(index)}
                  className={`polaroid-card p-3 sm:p-4 rounded-2xl text-slate-900 cursor-pointer transform ${rotClass} hover:rotate-0 hover:scale-105 transition-all duration-300 relative group shadow-2xl border-2 border-emerald-400/20 hover:border-emerald-400/60`}
                >
                  {/* Decorative Washi Tape */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-emerald-100/90 border border-emerald-300/40 rounded-xs shadow-xs backdrop-blur-xs z-10 opacity-80" />

                  <div className="relative aspect-4/5 w-full rounded-xl overflow-hidden bg-slate-900 mb-3 shadow-inner">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="text-left px-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-serif-luxury font-bold text-slate-900 text-base sm:text-lg truncate">
                        {item.title}
                      </h4>
                      {item.isFavorite && (
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2 font-light">
                      {item.caption}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1 border-t border-slate-200">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-rose-500" />
                        {item.date || 'Sweet Day'}
                      </span>
                      {item.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. Slideshow View */}
        {viewMode === 'slideshow' && filteredPhotos.length > 0 && (
          <div className="w-full max-w-4xl glass-panel-emerald p-4 sm:p-8 rounded-3xl border border-emerald-400/40 mb-12 shadow-2xl relative bg-black/80 backdrop-blur-xl">
            <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-black/80 shadow-2xl mb-4 group">
              <img
                src={filteredPhotos[slideshowIndex].url}
                alt={filteredPhotos[slideshowIndex].title}
                className="w-full h-full object-contain sm:object-cover"
              />

              <button
                onClick={() =>
                  setSlideshowIndex(
                    (slideshowIndex - 1 + filteredPhotos.length) % filteredPhotos.length
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() =>
                  setSlideshowIndex((slideshowIndex + 1) % filteredPhotos.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-4 sm:p-6 text-left">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 font-bold mb-1 block">
                  Memory {slideshowIndex + 1} of {filteredPhotos.length}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white mb-1">
                  {filteredPhotos[slideshowIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-rose-100/90 max-w-2xl font-light">
                  {filteredPhotos[slideshowIndex].caption}
                </p>
              </div>
            </div>

            {/* Slideshow Controls Bar */}
            <div className="flex items-center justify-between px-2 text-sm text-rose-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSlideshowPlaying(!isSlideshowPlaying)}
                  className="p-2 rounded-full bg-emerald-600/40 hover:bg-emerald-600/60 text-emerald-200 border border-emerald-400/30 transition-all cursor-pointer"
                  title={isSlideshowPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
                >
                  {isSlideshowPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 fill-emerald-200" />
                  )}
                </button>
                <span className="text-xs text-emerald-300/80 font-mono">
                  {isSlideshowPlaying ? 'Auto-advancing' : 'Paused'}
                </span>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-[240px] sm:max-w-md py-1">
                {filteredPhotos.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setSlideshowIndex(idx)}
                    className={`w-9 h-9 rounded-md overflow-hidden shrink-0 border transition-all cursor-pointer ${
                      slideshowIndex === idx
                        ? 'border-emerald-400 ring-2 ring-emerald-400/50 scale-105'
                        : 'border-white/20 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prevLightbox}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextLightbox}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
              <div className="relative max-h-[65vh] rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-400/50 mb-4 bg-black">
                <img
                  src={filteredPhotos[lightboxIndex].url}
                  alt={filteredPhotos[lightboxIndex].title}
                  className="max-h-[65vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="text-center max-w-xl px-4">
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white mb-1">
                  {filteredPhotos[lightboxIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-rose-200/90 mb-2 font-light">
                  {filteredPhotos[lightboxIndex].caption}
                </p>
                <div className="flex items-center justify-center gap-4 text-xs font-mono text-emerald-300">
                  <span>{filteredPhotos[lightboxIndex].date}</span>
                  {filteredPhotos[lightboxIndex].location && (
                    <span>• {filteredPhotos[lightboxIndex].location}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA to Final Surprise */}
        <div className="mt-8 flex flex-col items-center">
          <button
            onClick={() => {
              romanticAudio.playSparkle();
              onProceedToFinalSurprise();
            }}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-emerald-600 via-rose-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white font-extrabold text-base sm:text-xl shadow-xl shadow-emerald-950/80 hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-emerald-300/50"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>{memories.buttonText}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <span className="text-xs text-emerald-300/80 mt-2 font-mono">
            One last grand surprise awaits for my world... 🎁❤️
          </span>
        </div>
      </div>
    </section>
  );
};
