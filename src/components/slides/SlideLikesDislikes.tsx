import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideHeader } from '../SlideHeader';
import { LIKES_COLUMNS_DATA } from '../../data/lessonData';
import { sound, speakText } from '../../utils/audio';
import {
  ThumbsUp,
  Meh,
  ThumbsDown,
  Volume2,
  HelpCircle,
  CheckCircle,
  Eye,
  ArrowDown,
  Sparkles,
  MessageSquareQuote
} from 'lucide-react';

export const SlideLikesDislikes: React.FC = () => {
  // Phase 1: Elicitation (Ryan & Becky)
  const [ryanRevealed, setRyanRevealed] = useState(false);
  const [beckyRevealed, setBeckyRevealed] = useState(false);

  // Phase 2: 3-Column Table
  const [tableRevealed, setTableRevealed] = useState(false);
  const [activePhraseIndex, setActivePhraseIndex] = useState<string | null>(null);

  const handleRevealRyan = () => {
    sound.playSuccess();
    setRyanRevealed(true);
  };

  const handleRevealBecky = () => {
    sound.playSuccess();
    setBeckyRevealed(true);
  };

  const handleRevealTable = () => {
    sound.playSuccess();
    setTableRevealed(true);
  };

  const handlePronounce = async (phrase: string) => {
    sound.playClick();
    setActivePhraseIndex(phrase);
    await speakText(phrase, 0.95);
    setActivePhraseIndex(null);
  };

  return (
    <div className="h-full flex flex-col justify-between relative overflow-hidden">
      <SlideHeader
        stage="Language Focus"
        stageNumber="4"
        title="Ex 6. LIKES, OK & DON'T LIKE"
        subtitle="Elicit meaning from Ryan & Becky → Reveal 3-Column Scale"
        teacherTip="First ask students about Ryan & Becky's opinions. Once they identify the emotions, reveal the 3-column table: LIKE (👍), OK (😐), DON'T LIKE (👎)."
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-4 my-auto overflow-y-auto pr-1">
        {/* Step 1: Meaning Elicitation Cards (Ryan & Becky in Immersive UI style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ryan's Quote Card */}
          <div className="p-4 bg-indigo-900/40 rounded-2xl border-l-4 border-indigo-400 border-t border-r border-b border-slate-700/60 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-300 uppercase tracking-wide">
                  <MessageSquareQuote className="w-4 h-4 text-indigo-400" />
                  Elicitation 1 · Ryan
                </span>
                <span className="text-[11px] bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 px-2 py-0.5 rounded-full font-semibold">
                  Which column?
                </span>
              </div>

              <div className="py-1">
                <p className="text-base sm:text-lg text-indigo-200">
                  <span className="font-bold text-white">Ryan says:</span> “I’m not very keen on ice skating.” <br/>
                  <span className="italic text-indigo-300 text-sm">Which column does this go in?</span>
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-indigo-500/20 flex items-center justify-between">
              {ryanRevealed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 text-rose-300 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black w-full"
                >
                  <ThumbsDown className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Column: 👎 DON’T LIKE (He does not enjoy it!)</span>
                </motion.div>
              ) : (
                <button
                  onClick={handleRevealRyan}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                >
                  <Eye className="w-4 h-4 text-indigo-400" />
                  <span>Check Student Guess</span>
                </button>
              )}
            </div>
          </div>

          {/* Becky's Quote Card */}
          <div className="p-4 bg-indigo-900/40 rounded-2xl border-l-4 border-indigo-400 border-t border-r border-b border-slate-700/60 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 uppercase tracking-wide">
                  <MessageSquareQuote className="w-4 h-4 text-amber-400" />
                  Elicitation 2 · Becky
                </span>
                <span className="text-[11px] bg-amber-500/20 text-amber-200 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold">
                  Like or don't like?
                </span>
              </div>

              <div className="py-1">
                <p className="text-base sm:text-lg text-indigo-200">
                  <span className="font-bold text-white">Becky says:</span> “I don’t mind ice skating.” <br/>
                  <span className="italic text-indigo-300 text-sm">Does she like it, or not like it? (Middle)</span>
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-indigo-500/20 flex items-center justify-between">
              {beckyRevealed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black w-full"
                >
                  <Meh className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Column: 😐 OK (In the middle / neither loves nor hates it!)</span>
                </motion.div>
              ) : (
                <button
                  onClick={handleRevealBecky}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                >
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>Check Student Guess</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Reveal 3-Column Table Trigger Button */}
        {!tableRevealed && (
          <div className="text-center py-2">
            <button
              onClick={handleRevealTable}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm shadow-lg shadow-indigo-600/30 active:scale-95 transition-all cursor-pointer border border-indigo-400/40"
            >
              <Sparkles className="w-4 h-4" />
              <span>Reveal 3-Column Scale (👍 LIKE · 😐 OK · 👎 DON'T LIKE)</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: The 3-Column Table matching Immersive UI Design HTML */}
        <AnimatePresence>
          {tableRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 min-h-[300px]"
            >
              {/* Column 1: LIKE (Emerald) */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-between group shadow-lg">
                <div className="w-full flex flex-col items-center">
                  <div className="text-4xl sm:text-5xl mb-3 grayscale group-hover:grayscale-0 transition-all">👍</div>
                  <h4 className="text-emerald-400 font-black text-lg sm:text-xl mb-4 tracking-widest">LIKE</h4>
                  <ul className="space-y-3 w-full text-center">
                    {LIKES_COLUMNS_DATA.like.phrases.map((item, idx) => (
                      <li
                        key={idx}
                        onClick={() => handlePronounce(item.text)}
                        className="bg-emerald-500/20 hover:bg-emerald-500/30 py-2.5 px-3 rounded-xl font-bold border border-emerald-500/30 text-white flex items-center justify-between cursor-pointer transition-all active:scale-98"
                      >
                        <span className="text-xs sm:text-sm font-bold text-center flex-1">{item.text}</span>
                        <Volume2 className="w-4 h-4 text-emerald-300 opacity-60 hover:opacity-100 shrink-0" />
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-[11px] text-emerald-300/80 mt-4 text-center">Positive · Use with noun or -ing</p>
              </div>

              {/* Column 2: OK (Amber) */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-between group shadow-lg">
                <div className="w-full flex flex-col items-center">
                  <div className="text-4xl sm:text-5xl mb-3">😐</div>
                  <h4 className="text-amber-400 font-black text-lg sm:text-xl mb-4 tracking-widest">OK</h4>
                  <ul className="space-y-3 w-full text-center">
                    {LIKES_COLUMNS_DATA.ok.phrases.map((item, idx) => (
                      <li
                        key={idx}
                        onClick={() => handlePronounce(item.text)}
                        className="bg-amber-500/20 hover:bg-amber-500/30 py-2.5 px-3 rounded-xl font-bold border border-amber-500/30 text-white flex items-center justify-between cursor-pointer transition-all active:scale-98"
                      >
                        <span className="text-xs sm:text-sm font-bold text-center flex-1">{item.text}</span>
                        <Volume2 className="w-4 h-4 text-amber-300 opacity-60 hover:opacity-100 shrink-0" />
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 p-2.5 bg-amber-500/15 rounded-xl border border-amber-500/20 text-xs text-amber-200 text-center w-full">
                    💡 Neither loves nor hates it
                  </div>
                </div>
                <p className="text-[11px] text-amber-300/80 mt-4 text-center">Neutral · "I don't mind..."</p>
              </div>

              {/* Column 3: DON'T LIKE (Rose) */}
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-between group shadow-lg">
                <div className="w-full flex flex-col items-center">
                  <div className="text-4xl sm:text-5xl mb-3">👎</div>
                  <h4 className="text-rose-400 font-black text-lg sm:text-xl mb-4 tracking-widest">DON'T LIKE</h4>
                  <ul className="space-y-3 w-full text-center">
                    {LIKES_COLUMNS_DATA.dontLike.phrases.map((item, idx) => (
                      <li
                        key={idx}
                        onClick={() => handlePronounce(item.text)}
                        className="bg-rose-500/20 hover:bg-rose-500/30 py-2.5 px-3 rounded-xl font-bold border border-rose-500/30 text-white flex items-center justify-between cursor-pointer transition-all active:scale-98"
                      >
                        <span className="text-xs sm:text-sm font-bold text-center flex-1">{item.text}</span>
                        <Volume2 className="w-4 h-4 text-rose-300 opacity-60 hover:opacity-100 shrink-0" />
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-[11px] text-rose-300/80 mt-4 text-center">Negative · Expressing dislikes</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Tip Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-700/60 text-xs text-slate-400">
        <div>
          Click any phrase button to listen to pronunciation!
        </div>
        <div className="font-semibold text-indigo-400">
          Ready for pair work practice
        </div>
      </div>
    </div>
  );
};
