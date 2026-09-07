import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideHeader } from '../SlideHeader';
import { VOCABULARY_LIST } from '../../data/lessonData';
import { sound, speakText } from '../../utils/audio';
import {
  Volume2,
  CheckCircle,
  Video,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Eye,
  BookOpen,
  ArrowRight,
  Flame
} from 'lucide-react';

export const SlideVocabulary: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Stages: 1 = Meaning (image + concept question), 2 = Pronunciation (phonetic + audio), 3 = Form & Collocation, 4 = Clip Suggestion
  const [revealStep, setRevealStep] = useState<number>(1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentWord = VOCABULARY_LIST[currentIndex];

  const handleNextWord = () => {
    if (currentIndex < VOCABULARY_LIST.length - 1) {
      sound.playClick();
      setCurrentIndex(currentIndex + 1);
      setRevealStep(1);
    }
  };

  const handlePrevWord = () => {
    if (currentIndex > 0) {
      sound.playClick();
      setCurrentIndex(currentIndex - 1);
      setRevealStep(1);
    }
  };

  const advanceStep = () => {
    sound.playClick();
    if (revealStep < 4) {
      const next = revealStep + 1;
      setRevealStep(next);
      if (next === 2) {
        handlePronounce();
      }
    }
  };

  const handlePronounce = async () => {
    setIsSpeaking(true);
    await speakText(currentWord.word);
    setIsSpeaking(false);
  };

  const handlePronounceCollocation = async () => {
    setIsSpeaking(true);
    await speakText(currentWord.collocation);
    setIsSpeaking(false);
  };

  return (
    <div className="h-full flex flex-col justify-between relative overflow-hidden">
      <SlideHeader
        stage="Presentation"
        stageNumber="1"
        title="Vocabulary: Meaning → Pronunciation → Form"
        subtitle={`Word ${currentIndex + 1} of ${VOCABULARY_LIST.length}: Large visuals & step-by-step discovery`}
        teacherTip="First show the picture (Meaning) and elicit what students see. Then reveal Pronunciation (/IPA/ & Audio). Next reveal Form & Collocation. Lastly review the video clip suggestion!"
      />

      {/* Word Switcher Tabs */}
      <div className="flex items-center justify-between gap-2 mb-3 select-none">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {VOCABULARY_LIST.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setCurrentIndex(idx);
                  setRevealStep(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                <span>{idx + 1}.</span>
                <span className="capitalize">{item.word}</span>
              </button>
            );
          })}
        </div>

        {/* Step Indicator (Meaning -> Pronunciation -> Form) */}
        <div className="hidden md:flex items-center gap-1 text-xs font-semibold bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
          <span className={`px-2 py-0.5 rounded ${revealStep >= 1 ? 'bg-blue-500/30 text-blue-300' : 'text-slate-500'}`}>1. Meaning</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className={`px-2 py-0.5 rounded ${revealStep >= 2 ? 'bg-purple-500/30 text-purple-300' : 'text-slate-500'}`}>2. Pronunciation</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className={`px-2 py-0.5 rounded ${revealStep >= 3 ? 'bg-emerald-500/30 text-emerald-300' : 'text-slate-500'}`}>3. Form</span>
        </div>
      </div>

      {/* Main Single-Word Showcase Canvas */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center my-auto overflow-y-auto max-h-[calc(100%-120px)] pr-1">
        {/* Large High-Quality Picture Section */}
        <div className="lg:col-span-6 flex flex-col gap-2">
          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 shadow-xl group aspect-[4/3] max-h-72 sm:max-h-80 w-full flex items-center justify-center">
            <img
              src={currentWord.imageUrl}
              alt={currentWord.word}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Category tag */}
            <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-cyan-300 border border-slate-700 uppercase tracking-wider">
              {currentWord.category === 'subject' ? '📚 School Subject' : '🎯 Leisure Hobby'}
            </div>

            {/* Meaning question banner if step is 1 */}
            {revealStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-3 inset-x-3 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-cyan-500/40 text-center"
              >
                <span className="text-xs font-bold text-cyan-300">
                  What activity or subject do you see here?
                </span>
              </motion.div>
            )}
          </div>

          {/* Clip suggestion bar */}
          {revealStep >= 4 ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-purple-950/40 border border-purple-500/30 rounded-xl p-3 flex items-start gap-2.5"
            >
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300 shrink-0">
                <Video className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-purple-200 flex items-center gap-1.5">
                  <span>Clip Suggestion:</span>
                  <span className="text-white font-medium">{currentWord.clipSuggestion}</span>
                </div>
                <div className="text-slate-400 mt-0.5">{currentWord.clipDetails}</div>
              </div>
            </motion.div>
          ) : (
            <button
              onClick={() => {
                sound.playClick();
                setRevealStep(4);
              }}
              className="text-xs text-slate-400 hover:text-purple-300 flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-slate-800/50 cursor-pointer self-start"
            >
              <Video className="w-3.5 h-3.5 text-purple-400" />
              <span>Show short video/clip suggestion</span>
            </button>
          )}
        </div>

        {/* Right Info: Meaning → Pronunciation → Form Breakdown */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          {/* 1. Meaning Card */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3.5 shadow-sm">
            <div className="flex items-center justify-between text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-400" />
                1. Meaning
              </span>
              <span className="text-slate-400 font-normal">Contextual Definition</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
              {currentWord.meaning}
            </p>
          </div>

          {/* 2. Pronunciation Card (Step 2+) */}
          {revealStep >= 2 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-purple-950/40 to-slate-800 border border-purple-500/40 rounded-xl p-3.5 shadow-md"
            >
              <div className="flex items-center justify-between text-xs font-bold text-purple-300 uppercase tracking-wider mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-purple-400" />
                  2. Pronunciation
                </span>
                <span className="text-slate-400 font-normal">Listen &amp; Repeat</span>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-white capitalize">
                    {currentWord.word}
                  </span>
                  <span className="text-sm sm:text-base text-purple-300 font-mono tracking-wider font-semibold">
                    {currentWord.phonetic}
                  </span>
                </div>

                <button
                  onClick={handlePronounce}
                  disabled={isSpeaking}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                  <span>Listen</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="p-3 rounded-xl border border-dashed border-slate-700 bg-slate-800/30 flex items-center justify-between">
              <span className="text-xs text-slate-400">Step 2: Pronunciation hidden</span>
              <button
                onClick={advanceStep}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Reveal Pronunciation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* 3. Form & Collocation Card (Step 3+) */}
          {revealStep >= 3 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-emerald-950/50 to-slate-800 border-2 border-emerald-500/50 rounded-xl p-3.5 shadow-lg"
            >
              <div className="flex items-center justify-between text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-emerald-400" />
                  3. Form &amp; Collocation (Crucial!)
                </span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                  VERB + NOUN
                </span>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="text-xl sm:text-2xl font-black text-emerald-300">
                  {currentWord.collocation}
                </div>
                <button
                  onClick={handlePronounceCollocation}
                  className="text-xs text-emerald-300 hover:text-emerald-200 flex items-center gap-1 bg-emerald-500/20 px-2.5 py-1 rounded-md font-semibold cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Say Collocation</span>
                </button>
              </div>

              <div className="text-xs text-slate-300 bg-slate-900/80 p-2 rounded-lg border border-slate-700/60 italic">
                "{currentWord.exampleSentence}"
              </div>
            </motion.div>
          ) : (
            <div className="p-3 rounded-xl border border-dashed border-slate-700 bg-slate-800/30 flex items-center justify-between">
              <span className="text-xs text-slate-400">Step 3: Collocation hidden</span>
              <button
                onClick={advanceStep}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Reveal Collocation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Step progression button */}
          <div className="flex items-center justify-between pt-1">
            {revealStep < 4 ? (
              <button
                onClick={advanceStep}
                className="w-full py-2 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <span>Next Step: {revealStep === 1 ? 'Reveal Pronunciation' : revealStep === 2 ? 'Reveal Collocation' : 'Show Video Suggestion'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="w-full flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> All steps revealed for {currentWord.word}!
                </span>
                {currentIndex < VOCABULARY_LIST.length - 1 && (
                  <button
                    onClick={handleNextWord}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next Word</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom word navigation bar */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
        <button
          onClick={handlePrevWord}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:pointer-events-none cursor-pointer font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Word</span>
        </button>

        <div className="text-slate-400 font-medium text-center">
          <span className="text-cyan-400 font-bold">Tip:</span> Encourage choral repetition when revealing the collocation!
        </div>

        <button
          onClick={handleNextWord}
          disabled={currentIndex === VOCABULARY_LIST.length - 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:pointer-events-none cursor-pointer font-semibold"
        >
          <span>Next Word</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
