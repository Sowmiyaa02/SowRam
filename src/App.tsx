/**
 * SowRam ❤️ — Our Own Little World 💚
 * A romantic birthday and love anniversary surprise website for Ramesh,
 * created with infinite love by Sowmiyaa.
 */

import React, { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { RosePetalsCanvas } from './components/RosePetalsCanvas';
import { Navbar } from './components/Navbar';
import { MusicPlayer } from './components/MusicPlayer';
import { OpeningVideoSection } from './components/OpeningVideoSection';
import { BirthdayWelcomeSection } from './components/BirthdayWelcomeSection';
import { AnniversaryMysterySection } from './components/AnniversaryMysterySection';
import { LoveQuizSection } from './components/LoveQuizSection';
import { MemoriesScrapbookSection } from './components/MemoriesScrapbookSection';
import { FinalSurpriseSection } from './components/FinalSurpriseSection';
import { ContentEditorModal } from './components/ContentEditorModal';
import { loadSavedContent, SiteContentConfig } from './data/romanticContent';
import { Sliders } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [content, setContent] = useState<SiteContentConfig>(loadSavedContent());
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);

  // Smooth scroll to top when changing section
  const navigateToSection = (sectionNum: number) => {
    setCurrentSection(sectionNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#080305] text-[#fce7f3] selection:bg-rose-700 selection:text-white font-sans overflow-x-hidden">
      {/* SOWRAM Cinematic Opening Splash Screen */}
      {showSplash && (
        <SplashScreen
          onEnter={() => {
            setShowSplash(false);
            navigateToSection(1);
          }}
        />
      )}

      {/* Falling Rose Petals, Emerald Hearts and Glowing Particles Canvas */}
      <RosePetalsCanvas />

      {/* Floating Audio Controller (Featuring: "Paathi Nee Paathi Naa") */}
      <MusicPlayer content={content} />

      {/* Navigation Bar (visible after opening section or when navigating) */}
      {!showSplash && currentSection > 1 && (
        <Navbar
          currentSection={currentSection}
          onNavigate={navigateToSection}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />
      )}

      {/* Main Content Sections */}
      {!showSplash && (
        <main className={currentSection > 1 ? 'pt-14 sm:pt-16' : ''}>
          {currentSection === 1 && (
            <OpeningVideoSection
              content={content}
              onComplete={() => navigateToSection(2)}
            />
          )}

          {currentSection === 2 && (
            <BirthdayWelcomeSection
              content={content}
              onOpenSurprise={() => navigateToSection(3)}
            />
          )}

          {currentSection === 3 && (
            <AnniversaryMysterySection
              content={content}
              onProceedToQuiz={() => navigateToSection(4)}
            />
          )}

          {currentSection === 4 && (
            <LoveQuizSection
              content={content}
              onProceedToMemories={() => navigateToSection(5)}
              onOpenCustomizer={() => setIsCustomizerOpen(true)}
            />
          )}

          {currentSection === 5 && (
            <MemoriesScrapbookSection
              content={content}
              onProceedToFinalSurprise={() => navigateToSection(6)}
            />
          )}

          {currentSection === 6 && <FinalSurpriseSection content={content} />}
        </main>
      )}

      {/* Global Romantic Footer */}
      {!showSplash && currentSection > 1 && (
        <footer className="relative z-20 py-10 px-4 border-t border-emerald-900/40 bg-[#050204] text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury font-bold text-lg text-rose-200">
                SowRam ❤️
              </span>
              <span className="text-xs text-rose-400/80">•</span>
              <span className="text-xs text-emerald-400 font-medium">
                Our Own Little World 💚
              </span>
              <span className="text-xs text-rose-400/80">•</span>
              <span className="text-xs text-amber-300 font-mono">07 • 11 • 2026</span>
            </div>

            <p className="text-xs text-rose-300/80 max-w-md font-light leading-relaxed">
              Crafted with all the love, hugs, and forever promises by Sowmiyaa for Ramesh.
              Happy Birthday to my world! 🌍💚
            </p>

            <div className="pt-2 flex items-center gap-4 text-[11px] text-emerald-400/70">
              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Sliders className="w-3 h-3" />
                <span>Customize Content / Questions</span>
              </button>
              <span>•</span>
              <span className="italic">“Paathi Nee Paathi Naa ❤️ | SowRam Love Theme 💚”</span>
            </div>
          </div>
        </footer>
      )}

      {/* Content Customization & Specification Drawer Modal */}
      <ContentEditorModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        currentContent={content}
        onSave={(updated) => setContent(updated)}
      />
    </div>
  );
}
