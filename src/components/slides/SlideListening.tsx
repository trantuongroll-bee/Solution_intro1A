import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideHeader } from '../SlideHeader';
import { LISTENING_EXERCISE_ITEMS, LISTENING_AUDIO_SCRIPT } from '../../data/lessonData';
import { sound, speakText, stopSpeech } from '../../utils/audio';
import {
  Volume2,
  Square,
  CheckCircle2,
  XCircle,
  FileText,
  RotateCcw,
  Sparkles,
  Headphones,
  Check,
  Pause
} from 'lucide-react';

export const SlideListening: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [answersRevealed, setAnswersRevealed] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showScript, setShowScript] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState<number | null>(null);

  const toggleItem = (id: string) => {
    sound.playClick();
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePlayDialogue = async () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
      setCurrentLineIndex(null);
      return;
    }

    setIsPlayingAudio(true);
    sound.playBeep();

    for (let i = 0; i < LISTENING_AUDIO_SCRIPT.length; i++) {
      if (!isPlayingAudio && i > 0 && typeof window !== 'undefined' && !window.speechSynthesis.speaking) {
        // stopped
        break;
      }
      setCurrentLineIndex(i);
      const line = LISTENING_AUDIO_SCRIPT[i];
      // Read line
      await speakText(`${line.speaker}: ${line.text}`, 0.95);
      // Brief pause between speakers
      await new Promise((r) => setTimeout(r, 400));
    }

    setIsPlayingAudio(false);
    setCurrentLineIndex(null);
    sound.playSuccess();
  };

  const handleRevealAnswers = () => {
    sound.playSuccess();
    setAnswersRevealed(true);
  };

  const handleReset = () => {
    sound.playClick();
    stopSpeech();
    setIsPlayingAudio(false);
    setCurrentLineIndex(null);
    setSelectedItems({});
    setAnswersRevealed(false);
  };

  return (
    <div className="h-full flex flex-col justify-between relative overflow-hidden">
      <SlideHeader
        stage="Listening"
        stageNumber="2"
        title="Ex 2. LISTENING"
        subtitle="Listen and circle the hobbies and subjects you hear."
        teacherTip="Play the audio track (or read the script). Students scan the 6 large options on the board and tap to circle what they hear. Check together."
      />

      {/* Audio Player and Action Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 mb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayDialogue}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer ${
              isPlayingAudio
                ? 'bg-rose-500 hover:bg-rose-400 text-white animate-pulse'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause Audio</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Play Audio Track</span>
              </>
            )}
          </button>

          <span className="text-xs text-slate-300 font-medium hidden sm:inline">
            {isPlayingAudio ? '🔊 Dialogue playing...' : '🎧 Click to play English dialogue'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setShowScript(!showScript);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer border border-slate-600"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>{showScript ? 'Hide Script' : 'View Script'}</span>
          </button>

          {!answersRevealed ? (
            <button
              onClick={handleRevealAnswers}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md cursor-pointer transition-transform active:scale-95"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Check Answers</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Options Grid - Large & Easy to Scan */}
      <div className="flex-1 my-auto overflow-y-auto max-h-[calc(100%-140px)] pr-1">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
          {LISTENING_EXERCISE_ITEMS.map((item) => {
            const isSelected = !!selectedItems[item.id];
            const isCorrectHeard = item.isHeard;

            let borderStyle = 'border-slate-700/80 hover:border-cyan-400/60 bg-slate-800/70';
            let statusBadge = null;

            if (answersRevealed) {
              if (isCorrectHeard) {
                borderStyle = 'border-2 border-emerald-400 bg-emerald-950/40 text-emerald-200 shadow-lg shadow-emerald-500/10';
                statusBadge = (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Heard in audio ({item.timeMentioned})
                  </span>
                );
              } else {
                borderStyle = 'border-2 border-rose-500/60 bg-rose-950/20 text-rose-300 opacity-60';
                statusBadge = (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded-md">
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    Not mentioned!
                  </span>
                );
              }
            } else if (isSelected) {
              borderStyle = 'border-3 border-amber-400 bg-amber-950/30 shadow-lg shadow-amber-500/20';
            }

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleItem(item.id)}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[115px] sm:min-h-[135px] transition-all relative overflow-hidden ${borderStyle}`}
              >
                {/* Simulated hand-drawn highlighter circle when circled */}
                {isSelected && !answersRevealed && (
                  <div className="absolute inset-2 rounded-xl border-3 border-amber-400/80 border-dashed pointer-events-none animate-pulse" />
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold px-2 py-0.5 rounded tracking-wider bg-slate-900/80 text-slate-300 border border-slate-700">
                    {item.category === 'hobby' ? '🎯 Hobby' : '📚 Subject'}
                  </span>

                  <div className="w-6 h-6 rounded-full flex items-center justify-center border text-xs">
                    {isSelected ? (
                      <div className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 font-black">
                        ✓
                      </div>
                    ) : (
                      <span className="text-slate-500">○</span>
                    )}
                  </div>
                </div>

                <div className="my-2">
                  <span className="text-xl sm:text-2xl font-black capitalize tracking-tight text-white block">
                    {item.text}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  {statusBadge ? (
                    statusBadge
                  ) : (
                    <span className="text-slate-400 font-medium">
                      {isSelected ? 'Circled by class' : 'Click to circle'}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Audio Script Modal / Drawer */}
      <AnimatePresence>
        {showScript && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border-2 border-cyan-500 rounded-2xl p-5 max-w-xl w-full shadow-2xl relative max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-cyan-300 font-extrabold text-base">
                  <Headphones className="w-5 h-5 text-cyan-400" />
                  <span>Listening Audio Script</span>
                </div>
                <button
                  onClick={() => setShowScript(false)}
                  className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
                >
                  Close
                </button>
              </div>

              <div className="my-3 overflow-y-auto flex flex-col gap-2.5 pr-2 flex-1">
                {LISTENING_AUDIO_SCRIPT.map((line, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border transition-colors ${
                      currentLineIndex === idx
                        ? 'bg-cyan-500/20 border-cyan-400/60 text-white'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold text-cyan-400 block mb-0.5 uppercase tracking-wide">
                      {line.speaker}:
                    </span>
                    <p className="text-sm font-medium leading-relaxed">
                      {line.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Look for: PE, history, skateboarding, ice skating, bowling</span>
                <button
                  onClick={handlePlayDialogue}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  {isPlayingAudio ? 'Stop Audio' : 'Play Along with Script'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Summary Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
        <div>
          Target to circle: <span className="text-emerald-400 font-bold">5 items</span> heard in the conversation (math is NOT in the dialogue).
        </div>
        <div className="font-semibold text-slate-300">
          Tip: Have students say the full phrase aloud after checking!
        </div>
      </div>
    </div>
  );
};
