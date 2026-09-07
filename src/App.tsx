/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SLIDES_CONFIG } from './data/slidesList';
import { SlideVocabulary } from './components/slides/SlideVocabulary';
import { SlideListening } from './components/slides/SlideListening';
import { SlideTeamGame } from './components/slides/SlideTeamGame';
import { SlideLikesDislikes } from './components/slides/SlideLikesDislikes';
import { SlidePairWork } from './components/slides/SlidePairWork';
import { SlideFindAFriend } from './components/slides/SlideFindAFriend';
import { SlideConsolidation } from './components/slides/SlideConsolidation';
import { sound } from './utils/audio';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  HelpCircle,
  PanelLeftClose,
  PanelLeft,
  X,
  Volume2,
  VolumeX
} from 'lucide-react';

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showTeacherNotes, setShowTeacherNotes] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const goToNext = useCallback(() => {
    if (currentSlideIndex < SLIDES_CONFIG.length - 1) {
      sound.playClick();
      setCurrentSlideIndex((prev) => prev + 1);
    }
  }, [currentSlideIndex]);

  const goToPrev = useCallback(() => {
    if (currentSlideIndex > 0) {
      sound.playClick();
      setCurrentSlideIndex((prev) => prev - 1);
    }
  }, [currentSlideIndex]);

  const toggleFullscreen = useCallback(() => {
    sound.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'PageDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        sound.playClick();
        setCurrentSlideIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        sound.playClick();
        setCurrentSlideIndex(SLIDES_CONFIG.length - 1);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, toggleFullscreen]);

  // Track native fullscreen change
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const currentSlide = SLIDES_CONFIG[currentSlideIndex];
  const progressPercent = Math.round(((currentSlideIndex + 1) / SLIDES_CONFIG.length) * 100);

  // Helper for slide thumbnail preview icon / mini visual
  const renderThumbnailPreview = (id: string) => {
    switch (id) {
      case 'cover':
        return <span className="text-sm">🎓 Intro 1A</span>;
      case 'lead-in':
        return <span className="tracking-widest">🦆🦆🦆</span>;
      case 'presentation':
        return <span className="text-sm">📖 5 Words</span>;
      case 'listening':
        return <span className="text-sm">🎧 Audio Scan</span>;
      case 'team-game':
        return <span className="text-sm">🏆 Relay Race</span>;
      case 'likes-table':
        return (
          <div className="grid grid-cols-3 gap-1 w-16 h-3">
            <div className="bg-emerald-500/40 rounded" />
            <div className="bg-amber-500/40 rounded" />
            <div className="bg-rose-500/40 rounded" />
          </div>
        );
      case 'pair-work':
        return <span className="text-sm">💬 A &amp; B</span>;
      case 'find-a-friend':
        return <span className="text-sm">📋 Survey</span>;
      case 'consolidation':
        return <span className="text-sm">🎤 Report</span>;
      default:
        return <span>📖</span>;
    }
  };

  const getSlideColorDot = (idx: number) => {
    const colors = [
      'bg-indigo-400',
      'bg-yellow-400',
      'bg-blue-400',
      'bg-cyan-400',
      'bg-amber-400',
      'bg-indigo-500',
      'bg-purple-400',
      'bg-orange-400',
      'bg-emerald-400',
    ];
    return colors[idx % colors.length];
  };

  const renderSlide = () => {
    const currentSlide = SLIDES_CONFIG[currentSlideIndex];
    switch (currentSlide?.id) {
      case 'presentation':
        return <SlideVocabulary />;
      case 'listening':
        return <SlideListening />;
      case 'team-game':
        return <SlideTeamGame />;
      case 'likes-table':
        return <SlideLikesDislikes />;
      case 'pair-work':
        return <SlidePairWork />;
      case 'find-a-friend':
        return <SlideFindAFriend />;
      case 'consolidation':
        return <SlideConsolidation />;
      default:
        return <SlideVocabulary />;
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0F172A] text-white flex font-sans overflow-hidden select-none">
      {/* Immersive UI Aside Sidebar */}
      {isSidebarOpen && (
        <aside className="w-[240px] xl:w-[260px] bg-[#1E293B] border-r border-slate-700 flex flex-col shadow-2xl shrink-0 z-20 transition-all duration-300">
          {/* Header */}
          <div className="p-5 border-b border-slate-700 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">Lesson 1A</p>
              <h2 className="text-lg font-bold leading-tight text-white mt-0.5">Hobbies &amp; Subjects</h2>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer lg:hidden"
              title="Collapse Sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* Slides List Thumbnail Cards */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {SLIDES_CONFIG.map((slide, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <div
                  key={slide.id}
                  onClick={() => {
                    sound.playClick();
                    setCurrentSlideIndex(idx);
                  }}
                  className={`group cursor-pointer transition-all ${
                    isActive ? '' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <p
                    className={`text-[10px] mb-1 font-mono tracking-wide ${
                      isActive ? 'text-indigo-400 font-bold' : 'text-slate-500'
                    }`}
                  >
                    SLIDE {String(idx + 1).padStart(2, '0')} {isActive && '(ACTIVE)'}
                  </p>

                  <div
                    className={`aspect-video rounded-lg border-2 p-2.5 flex flex-col justify-between transition-all ${
                      isActive
                        ? 'bg-slate-900 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)] ring-1 ring-indigo-400/40'
                        : 'bg-slate-800 border-transparent hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${getSlideColorDot(idx)}`} />
                      <span className="text-[10px] font-bold text-slate-200 truncate">{slide.title}</span>
                    </div>

                    <div className="h-full flex items-center justify-center opacity-40 group-hover:opacity-75 font-bold transition-opacity">
                      {renderThumbnailPreview(slide.id)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar Footer Controls */}
          <div className="p-3 border-t border-slate-700/80 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={() => setShowTeacherNotes(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 cursor-pointer"
              title="View Teacher Notes"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Notes</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setSoundEnabled(!soundEnabled);
              }}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              title={soundEnabled ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>
        </aside>
      )}

      {/* Main Presentation Stage */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 relative min-w-0 bg-[#0F172A] overflow-hidden">
        {/* Immersive Header */}
        <header className="flex justify-between items-start mb-4 sm:mb-6 select-none">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer transition-colors"
                title="Show Slide Panel (B)"
              >
                <PanelLeft className="w-5 h-5 text-indigo-400" />
              </button>
            )}
            <div>
              <h3 className="text-slate-400 font-mono text-xs sm:text-sm tracking-tighter uppercase font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                PRESENTATION MODE · STAGE {currentSlide.stageNumber}
              </h3>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black italic tracking-tight text-white line-clamp-1 mt-0.5">
                {currentSlide.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* LIVE VIEWING BADGE */}
            <div className="bg-indigo-600 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold flex items-center gap-2 text-white shadow-lg shadow-indigo-600/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="tracking-wide">LIVE VIEWING</span>
            </div>

            {/* Quick Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 sm:p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer transition-colors shadow-sm"
              title="Toggle Fullscreen (F)"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4 text-indigo-400" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Center Immersive Slide Container: bg-slate-800/50 rounded-3xl p-6 mb-10 flex-1 border border-slate-700/50 shadow-inner */}
        <div className="bg-slate-800/50 rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 flex-1 border border-slate-700/50 shadow-inner overflow-y-auto flex flex-col relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full flex-1 flex flex-col"
            >
              {renderSlide()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Immersive UI Footer */}
        <footer className="flex justify-between items-center select-none pt-1">
          {/* Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={goToPrev}
              disabled={currentSlideIndex === 0}
              className="bg-slate-800 p-3.5 sm:p-4 rounded-2xl border border-slate-700 hover:bg-slate-700 text-white disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
              title="Previous Slide (← / PageUp)"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline font-bold text-xs">Prev</span>
            </button>

            <button
              onClick={goToNext}
              disabled={currentSlideIndex === SLIDES_CONFIG.length - 1}
              className="bg-indigo-600 p-3.5 sm:p-4 rounded-2xl border border-indigo-500 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 text-white disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95 cursor-pointer font-bold flex items-center gap-1.5"
              title="Next Slide (→ / Space)"
            >
              <span className="hidden sm:inline font-bold text-xs">Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Progress & Slide Counter */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="text-right hidden xs:block">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Slide Progress</p>
              <div className="w-32 sm:w-48 h-2 bg-slate-800 rounded-full mt-1 overflow-hidden border border-slate-700/50">
                <div
                  className="h-full bg-indigo-500 shadow-[0_0_10px_#6366f1] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-800 px-4 py-3 rounded-2xl border border-slate-700 font-mono font-bold text-indigo-400 text-sm sm:text-base">
              {String(currentSlideIndex + 1).padStart(2, '0')} / {String(SLIDES_CONFIG.length).padStart(2, '0')}
            </div>
          </div>
        </footer>
      </main>

      {/* Teacher Notes Modal */}
      {showTeacherNotes && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2 text-amber-300 font-extrabold text-sm uppercase tracking-wide">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Teacher Lesson Notes · {currentSlide.title}</span>
              </div>
              <button
                onClick={() => setShowTeacherNotes(false)}
                className="p-1 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-200 text-sm leading-relaxed font-medium">
              {currentSlide.teacherTip || 'Deliver this slide according to the lesson flow.'}
            </div>

            <button
              onClick={() => setShowTeacherNotes(false)}
              className="mt-5 w-full py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer transition-colors"
            >
              Continue Teaching
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

