import React, { useState } from 'react';
import { Heart, Menu, X, Sparkles, Sliders, Gift, Camera, HelpCircle, Flame } from 'lucide-react';
import { romanticAudio } from '../utils/soundEffects';

interface Props {
  currentSection: number;
  onNavigate: (section: number) => void;
  onOpenCustomizer: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentSection,
  onNavigate,
  onOpenCustomizer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 1, label: 'Opening', icon: Sparkles },
    { id: 2, label: 'Birthday Welcome', icon: Sparkles },
    { id: 3, label: 'Our Special Day', icon: Heart },
    { id: 4, label: 'Love Quiz', icon: HelpCircle },
    { id: 5, label: 'Memories & Videos', icon: Camera },
    { id: 6, label: 'Final Surprise', icon: Gift },
  ];

  const handleNavClick = (id: number) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    romanticAudio.playSparkle();
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#0c0408]/85 backdrop-blur-md border-b border-rose-500/15">
      <div className="max-w-6xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => handleNavClick(2)}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-full bg-rose-600/30 border border-rose-400/40 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-heart-pulse" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif-luxury font-bold text-sm sm:text-base text-rose-100 group-hover:text-amber-200 transition-colors">
              SowRam ❤️
            </span>
            <span className="text-[10px] text-emerald-400 font-medium -mt-1 hidden sm:block">
              07 • 11 • 2026 💚
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-rose-600/90 text-white shadow-xs font-semibold'
                    : 'text-rose-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onOpenCustomizer();
              romanticAudio.playSparkle();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 border border-amber-400/30 text-xs font-semibold transition-all cursor-pointer shadow-xs"
            title="Edit questions, truth/dare, or love letter"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Customize / Spec</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-rose-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#12050c] border-b border-rose-500/20 px-4 py-3 space-y-1 animate-fade-in">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-rose-600 text-white'
                    : 'text-rose-200/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 text-amber-300" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
