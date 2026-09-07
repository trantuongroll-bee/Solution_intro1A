import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { SlideHeader } from '../SlideHeader';
import { WORD_BANK_FOR_PRACTICE } from '../../data/lessonData';
import { sound, speakText } from '../../utils/audio';
import {
  Users,
  MessageCircle,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  RefreshCw,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const SlidePairWork: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState('studying chemistry');
  const [partnerTimer, setPartnerTimer] = useState(120); // 2 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<'A' | 'B' | null>(null);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isTimerRunning && partnerTimer > 0) {
      timerRef.current = window.setInterval(() => {
        setPartnerTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsTimerRunning(false);
            sound.playWhistle();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, partnerTimer]);

  const handleWordSelect = (word: string) => {
    sound.playClick();
    setSelectedWord(word);
  };

  const handleRandomWord = () => {
    sound.playClick();
    const random = WORD_BANK_FOR_PRACTICE[Math.floor(Math.random() * WORD_BANK_FOR_PRACTICE.length)];
    setSelectedWord(random.name);
  };

  const speakSampleDialogue = async () => {
    sound.playClick();
    setActiveSpeaker('A');
    await speakText(`What do you think of ${selectedWord}?`, 0.95);
    setActiveSpeaker('B');
    await new Promise((r) => setTimeout(r, 300));
    await speakText(`I like ${selectedWord}! What about you?`, 0.95);
    setActiveSpeaker('A');
    await new Promise((r) => setTimeout(r, 300));
    await speakText(`I don't mind it. It's OK.`, 0.95);
    setActiveSpeaker(null);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="h-full flex flex-col justify-between relative overflow-hidden">
      <SlideHeader
        stage="Speaking"
        stageNumber="5"
        title="Pair Work: Expressing Opinions"
        subtitle="Choose ONE word from the board → Talk to your partner → Change activity → Talk again"
        teacherTip="Put students in pairs (Student A and B). Keep the dialogue scaffold displayed clearly. Model once, then start the 2-minute timer. Have them swap roles halfway through!"
      />

      {/* Scaffold Instructions Banner */}
      <div className="bg-gradient-to-r from-blue-950/60 to-purple-950/60 border border-blue-500/30 rounded-xl p-2.5 sm:p-3 mb-3 flex flex-wrap items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-white">
          <span className="bg-cyan-500 text-slate-950 px-2 py-0.5 rounded text-xs font-black uppercase">
            Instructions
          </span>
          <span className="flex items-center gap-1 text-cyan-300">
            1. Choose ONE word
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="flex items-center gap-1 text-purple-300">
            2. Talk with partner
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="flex items-center gap-1 text-emerald-300">
            3. Change word &amp; swap roles
          </span>
        </div>

        {/* Pair work timer */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold bg-slate-900 px-2.5 py-1 rounded border border-slate-700 text-cyan-300">
            ⏱️ {formatTime(partnerTimer)}
          </span>
          <button
            onClick={() => {
              sound.playClick();
              setIsTimerRunning(!isTimerRunning);
            }}
            className="p-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setIsTimerRunning(false);
              setPartnerTimer(120);
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Scaffold Display (Prominently Visible Throughout) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 my-auto overflow-y-auto max-h-[calc(100%-140px)] pr-1 items-stretch">
        {/* The Clean Speaking Scaffold (Left & Center) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-850 border-2 border-cyan-500/50 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/80 mb-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-black text-cyan-300 uppercase tracking-wider">
                Dialogue Scaffold (Always Visible)
              </span>
            </div>
            <button
              onClick={speakSampleDialogue}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold border border-cyan-400/40 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Model Dialogue</span>
            </button>
          </div>

          {/* Dialogue Lines */}
          <div className="flex flex-col gap-4 py-2">
            {/* Person A */}
            <motion.div
              animate={{ scale: activeSpeaker === 'A' ? 1.02 : 1 }}
              className={`p-4 rounded-2xl border transition-all ${
                activeSpeaker === 'A'
                  ? 'bg-cyan-500/20 border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/90 border-slate-700/80'
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-black flex items-center justify-center text-sm shrink-0">
                  A
                </span>
                <div className="text-lg sm:text-2xl font-black text-white leading-relaxed">
                  What do you think of{' '}
                  <span className="underline decoration-cyan-400 decoration-wavy text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-md">
                    {selectedWord}
                  </span>
                  ?
                </div>
              </div>
            </motion.div>

            {/* Person B */}
            <motion.div
              animate={{ scale: activeSpeaker === 'B' ? 1.02 : 1 }}
              className={`p-4 rounded-2xl border transition-all ${
                activeSpeaker === 'B'
                  ? 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/90 border-slate-700/80'
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shrink-0">
                  B
                </span>
                <div className="text-lg sm:text-2xl font-black text-white leading-relaxed">
                  I{' '}
                  <span className="text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-md border border-dashed border-amber-400/60">
                    [love / like / don't mind / hate]
                  </span>{' '}
                  it. What about you?
                </div>
              </div>
            </motion.div>

            {/* Person A Reply */}
            <motion.div
              animate={{ scale: activeSpeaker === 'A' ? 1.02 : 1 }}
              className={`p-4 rounded-2xl border transition-all ${
                activeSpeaker === 'A'
                  ? 'bg-cyan-500/20 border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/90 border-slate-700/80'
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-black flex items-center justify-center text-sm shrink-0">
                  A
                </span>
                <div className="text-lg sm:text-2xl font-black text-white leading-relaxed">
                  I{' '}
                  <span className="text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-dashed border-cyan-400/60">
                    [am keen on / not keen on / think it's terrible]
                  </span>
                  .
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-xs text-slate-400 mt-2 italic flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>After one exchange, pick another word below and swap roles!</span>
          </div>
        </div>

        {/* Word Board To Choose From (Right Column) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-800/80 border border-slate-700 rounded-2xl p-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-3">
              <span className="text-xs font-black uppercase text-slate-300 tracking-wider">
                Click Word to Insert in Dialogue
              </span>
              <button
                onClick={handleRandomWord}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                Random Word
              </button>
            </div>

            <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto pr-1">
              {WORD_BANK_FOR_PRACTICE.map((item, idx) => {
                const isSelected = item.name === selectedWord;
                return (
                  <button
                    key={idx}
                    onClick={() => handleWordSelect(item.name)}
                    className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 scale-105'
                        : 'bg-slate-900 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span>{item.type === 'subject' ? '📚' : '🎯'}</span>
                    <span className="capitalize">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick opinion bank reminder */}
          <div className="mt-3 pt-3 border-t border-slate-700/80">
            <div className="text-[11px] font-bold text-slate-400 uppercase mb-1.5">
              Quick Opinion Cheatsheet:
            </div>
            <div className="grid grid-cols-3 gap-1 text-[11px] text-center font-bold">
              <div className="p-1.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                👍 love / like / keen on
              </div>
              <div className="p-1.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                😐 don't mind
              </div>
              <div className="p-1.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                👎 hate / not keen on / terrible
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom control info */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
        <div>
          Current activity: <span className="text-cyan-300 font-bold capitalize">{selectedWord}</span>
        </div>
        <div className="font-semibold text-slate-300">
          Tip: Move around the room and listen for natural intonation!
        </div>
      </div>
    </div>
  );
};
