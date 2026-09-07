import React, { useState } from 'react';
import { SlideId, SlideMeta } from '../types';
import { sound } from '../utils/audio';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Grid,
  BookOpen,
  X,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface NavigationControlsProps {
  slides: SlideMeta[];
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  activeTeacherTip?: string;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  slides,
  currentSlideIndex,
  onSelectSlide,
  onNext,
  onPrev,
  isFullscreen,
  onToggleFullscreen,
  activeTeacherTip,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);

  const currentSlide = slides[currentSlideIndex];

  return (
    <>
      {/* Floating Bottom Presentation Bar */}
      <div className="w-full bg-slate-950/90 backdrop-blur-md border-t border-slate-800 px-4 py-2 flex items-center justify-between z-30 select-none">
        {/* Left: Quick Jump Drawer Trigger & Lesson Name */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              sound.playClick();
              setShowDrawer(!showDrawer);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
            title="Open Slide Grid (All Slides)"
          >
            <Grid className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">All Slides</span>
          </button>

          {activeTeacherTip && (
            <button
              onClick={() => {
                sound.playClick();
                setShowTipModal(true);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-semibold border border-amber-500/30 cursor-pointer"
              title="Teacher Lesson Tip"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Teacher Notes</span>
            </button>
          )}

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="font-semibold text-slate-300">{currentSlide.stageNumber} · {currentSlide.title}</span>
          </div>
        </div>

        {/* Center: Slide Navigator Buttons & Counter */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onPrev}
            disabled={currentSlideIndex === 0}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90 cursor-pointer border border-slate-700"
            title="Previous Slide (← / PageUp)"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-1 font-mono text-xs sm:text-sm font-bold bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-cyan-400">{currentSlideIndex + 1}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">{slides.length}</span>
          </div>

          <button
            onClick={onNext}
            disabled={currentSlideIndex === slides.length - 1}
            className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90 cursor-pointer shadow-md shadow-cyan-500/20 font-black"
            title="Next Slide (→ / Space)"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Right: Fullscreen & Keyboard Hints */}
        <div className="flex items-center gap-2">
          <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-slate-500">
            <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300">←</kbd>
            <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300">→</kbd>
            <span>Nav</span>
            <span className="mx-1">·</span>
            <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300">F</kbd>
            <span>Fullscreen</span>
          </div>

          <button
            onClick={onToggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen (F)'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* All Slides Drawer / Grid Modal */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full p-5 max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-extrabold text-base">
                <Grid className="w-5 h-5 text-cyan-400" />
                <span>Lesson Slide Deck Roadmap</span>
              </div>
              <button
                onClick={() => setShowDrawer(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid of slides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-4 overflow-y-auto pr-1">
              {slides.map((slide, idx) => {
                const isCurrent = idx === currentSlideIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => {
                      sound.playClick();
                      onSelectSlide(idx);
                      setShowDrawer(false);
                    }}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between h-28 ${
                      isCurrent
                        ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-500/20 ring-2 ring-cyan-500/40'
                        : 'bg-slate-800/80 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-700">
                        Slide {idx + 1}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold uppercase">
                        {slide.stage}
                      </span>
                    </div>

                    <div>
                      <div className="text-sm font-extrabold text-white line-clamp-1">
                        {slide.title}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {slide.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Solution Intro 1A · Total 9 Slides</span>
              <button
                onClick={() => setShowDrawer(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-white font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Notes Modal */}
      {showTipModal && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-md w-full p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-2 text-amber-300 font-extrabold text-sm uppercase">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Teacher Lesson Notes · {currentSlide.title}</span>
              </div>
              <button
                onClick={() => setShowTipModal(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-slate-200 text-sm leading-relaxed font-medium">
              {activeTeacherTip || currentSlide.teacherTip || 'Deliver this slide according to the lesson flow.'}
            </div>

            <button
              onClick={() => setShowTipModal(false)}
              className="mt-4 w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Got it, continue teaching
            </button>
          </div>
        </div>
      )}
    </>
  );
};
