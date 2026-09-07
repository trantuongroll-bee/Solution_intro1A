import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { SlideHeader } from '../SlideHeader';
import { LEAD_IN_MIME_HOBBIES, MORE_HOBBY_IDEAS } from '../../data/lessonData';
import { sound } from '../../utils/audio';
import { Play, RotateCcw, Eye, Sparkles, VolumeX, Plus, HelpCircle, Trophy } from 'lucide-react';

interface Duck {
  id: number;
  name: string;
  color: string;
  laneColor: string;
  progress: number;
}

const INITIAL_DUCKS: Duck[] = [
  { id: 1, name: 'Alex', color: 'bg-yellow-400 text-yellow-950 border-yellow-300', laneColor: 'border-yellow-500/30', progress: 0 },
  { id: 2, name: 'Bella', color: 'bg-cyan-400 text-cyan-950 border-cyan-300', laneColor: 'border-cyan-500/30', progress: 0 },
  { id: 3, name: 'Charlie', color: 'bg-pink-400 text-pink-950 border-pink-300', laneColor: 'border-pink-500/30', progress: 0 },
  { id: 4, name: 'David', color: 'bg-emerald-400 text-emerald-950 border-emerald-300', laneColor: 'border-emerald-500/30', progress: 0 },
  { id: 5, name: 'Emma', color: 'bg-amber-400 text-amber-950 border-amber-300', laneColor: 'border-amber-500/30', progress: 0 },
  { id: 6, name: 'Frank', color: 'bg-purple-400 text-purple-950 border-purple-300', laneColor: 'border-purple-500/30', progress: 0 },
];

export const SlideLeadIn: React.FC = () => {
  // Duck Race State
  const [ducks, setDucks] = useState<Duck[]>(INITIAL_DUCKS);
  const [isRacing, setIsRacing] = useState(false);
  const [winner, setWinner] = useState<Duck | null>(null);
  const [showRaceModal, setShowRaceModal] = useState(false);

  // Mime Cards State
  const [selectedHobby, setSelectedHobby] = useState<typeof LEAD_IN_MIME_HOBBIES[0] | null>(null);
  const [revealedHobbies, setRevealedHobbies] = useState<Record<string, boolean>>({});
  const [secretStudentView, setSecretStudentView] = useState(false);

  // Brainstorm "Can you think of MORE hobbies?"
  const [showMoreSection, setShowMoreSection] = useState(false);
  const [extraHobbies, setExtraHobbies] = useState<string[]>(MORE_HOBBY_IDEAS.slice(0, 4));
  const [newHobbyInput, setNewHobbyInput] = useState('');

  const raceIntervalRef = useRef<number | null>(null);

  // Clean up race on unmount
  useEffect(() => {
    return () => {
      if (raceIntervalRef.current) clearInterval(raceIntervalRef.current);
    };
  }, []);

  const startDuckRace = () => {
    sound.playQuack();
    setWinner(null);
    setDucks(INITIAL_DUCKS.map((d) => ({ ...d, progress: 0 })));
    setIsRacing(true);
    setShowRaceModal(true);

    if (raceIntervalRef.current) clearInterval(raceIntervalRef.current);

    // Run race
    const interval = window.setInterval(() => {
      setDucks((prevDucks) => {
        let raceEnded = false;
        let raceWinner: Duck | null = null;

        const updated = prevDucks.map((duck) => {
          if (duck.progress >= 100) return duck;
          // Random paddle jump
          const jump = Math.random() * 8 + 2;
          const nextProgress = Math.min(100, duck.progress + jump);

          if (nextProgress >= 100 && !raceWinner) {
            raceWinner = duck;
            raceEnded = true;
          }
          return { ...duck, progress: nextProgress };
        });

        if (raceEnded && raceWinner) {
          clearInterval(interval);
          setIsRacing(false);
          setWinner(raceWinner);
          sound.playSuccess();
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
            });
          } catch {
            // ignore
          }
        }

        return updated;
      });
    }, 80);

    raceIntervalRef.current = interval;
  };

  const pickRandomHobbyForWinner = () => {
    sound.playClick();
    const unrevealed = LEAD_IN_MIME_HOBBIES.filter((h) => !revealedHobbies[h.id]);
    const pool = unrevealed.length > 0 ? unrevealed : LEAD_IN_MIME_HOBBIES;
    const random = pool[Math.floor(Math.random() * pool.length)];
    setSelectedHobby(random);
    setSecretStudentView(true);
  };

  const toggleHobbyReveal = (id: string) => {
    sound.playClick();
    setRevealedHobbies((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddHobby = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHobbyInput.trim()) return;
    sound.playSuccess();
    setExtraHobbies((prev) => [...prev, newHobbyInput.trim()]);
    setNewHobbyInput('');
  };

  return (
    <div className="h-full flex flex-col justify-between relative overflow-hidden">
      <SlideHeader
        stage="Lead-in"
        stageNumber="1"
        title="Hobbies we know"
        subtitle="Duck Race → Mime & Guess → Brainstorm"
        teacherTip="Click 'Duck Race' to pick a student. The student chooses/views a secret card and acts it out with body language only (no speaking). Class guesses. Then ask: 'Can you think of MORE hobbies?'"
      />

      {/* Main interactive area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 my-auto overflow-y-auto max-h-[calc(100%-110px)] pr-1">
        {/* Left column: Duck Race & Act-it-out rule */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {/* Duck Race Trigger Card */}
          <div className="bg-gradient-to-b from-amber-500/15 to-yellow-600/10 border border-amber-500/30 rounded-xl p-3.5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                Duck Race Chooser
              </span>
              <button
                onClick={startDuckRace}
                disabled={isRacing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRacing ? 'Racing...' : 'Start Race'}</span>
              </button>
            </div>

            {winner ? (
              <div className="flex items-center gap-2 p-2.5 bg-amber-500/20 rounded-lg border border-amber-400/40">
                <span className="text-2xl">🦆</span>
                <div>
                  <div className="text-xs text-amber-200 font-semibold">Chosen Actor:</div>
                  <div className="text-base font-extrabold text-white">{winner.name}</div>
                </div>
                <button
                  onClick={pickRandomHobbyForWinner}
                  className="ml-auto text-xs bg-amber-400 text-slate-950 font-bold px-2.5 py-1 rounded-md hover:bg-amber-300"
                >
                  Give Secret Card
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-300 leading-relaxed">
                Click <span className="text-amber-300 font-semibold">Start Race</span> to let 6 colorful ducks race across the pool to select a volunteer!
              </p>
            )}
          </div>

          {/* Mime Rules Card */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
              <VolumeX className="w-4 h-4 text-cyan-400" />
              <span>Mime Rule</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-slate-200 text-xs sm:text-sm font-medium leading-relaxed">
              <p className="flex items-center gap-2 text-rose-400 font-bold mb-1">
                <span>🤫 Body language only</span>
                <span className="text-xs bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded">NO SPEAKING!</span>
              </p>
              Act out <span className="text-cyan-300 font-semibold">ONE hobby</span>. Classmates raise hands to guess the exact English word!
            </div>
          </div>

          {/* Brainstorm Toggle Card */}
          <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-3">
            <button
              onClick={() => {
                sound.playClick();
                setShowMoreSection(!showMoreSection);
              }}
              className="w-full flex items-center justify-between text-left cursor-pointer group"
            >
              <div>
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wide block">Step 2: Extension</span>
                <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Can you think of MORE hobbies?
                </span>
              </div>
              <span className={`text-xs px-2 py-1 rounded font-bold ${showMoreSection ? 'bg-cyan-500 text-slate-950' : 'bg-slate-700 text-slate-300'}`}>
                {showMoreSection ? 'Hide' : 'Reveal'}
              </span>
            </button>
          </div>
        </div>

        {/* Right column: 6 Target Hobbies to act out + brainstorm cards */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Target Hobbies (Click card to reveal / hide name)
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setRevealedHobbies({});
              }}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Cards
            </button>
          </div>

          {/* 6 Hobbies Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {LEAD_IN_MIME_HOBBIES.map((hobby) => {
              const isRevealed = !!revealedHobbies[hobby.id];
              return (
                <motion.div
                  key={hobby.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleHobbyReveal(hobby.id)}
                  className={`cursor-pointer rounded-xl p-3 border transition-all flex flex-col justify-between h-28 relative overflow-hidden ${
                    isRevealed
                      ? 'bg-gradient-to-br from-cyan-950/60 to-slate-900 border-cyan-400/50 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{hobby.emoji}</span>
                    <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                      isRevealed ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {isRevealed ? 'Revealed' : 'Mystery'}
                    </span>
                  </div>

                  <div>
                    {isRevealed ? (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="text-base font-extrabold text-cyan-300 capitalize tracking-wide">
                          {hobby.title}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">{hobby.hint}</div>
                      </motion.div>
                    ) : (
                      <div>
                        <div className="text-sm font-bold text-slate-300 flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          <span>Click to reveal</span>
                        </div>
                        <div className="text-[10px] text-slate-500">Tap after class guesses</div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Extension: "Can you think of MORE hobbies?" */}
          <AnimatePresence>
            {showMoreSection && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-3.5 mt-1"
              >
                <div className="flex items-center gap-2 mb-2 text-indigo-300 font-extrabold text-sm sm:text-base">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Can you think of MORE hobbies?</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {extraHobbies.map((hobby, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs sm:text-sm font-semibold capitalize"
                    >
                      <span>✨</span>
                      <span>{hobby}</span>
                    </span>
                  ))}
                </div>

                <form onSubmit={handleAddHobby} className="flex gap-2">
                  <input
                    type="text"
                    value={newHobbyInput}
                    onChange={(e) => setNewHobbyInput(e.target.value)}
                    placeholder="Type a student hobby idea (e.g., cooking, skateboarding)..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Board</span>
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Secret Card Modal for chosen student */}
      <AnimatePresence>
        {secretStudentView && selectedHobby && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border-2 border-amber-400 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl relative"
            >
              <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1">
                🤫 SECRET MIME CARD FOR {winner?.name || 'STUDENT'}
              </div>
              <div className="text-xs text-slate-400 mb-4">
                Show this only to the actor! Do not show the whole class!
              </div>

              <div className="py-6 px-4 bg-slate-800 rounded-xl border border-slate-700 my-2">
                <div className="text-5xl mb-3">{selectedHobby.emoji}</div>
                <div className="text-2xl font-black text-cyan-300 capitalize">
                  {selectedHobby.title}
                </div>
                <div className="text-xs text-slate-300 mt-2">
                  Hint: {selectedHobby.hint}
                </div>
              </div>

              <div className="text-xs font-semibold text-rose-400 mt-3 mb-4">
                Remember: No talking! Body language only!
              </div>

              <button
                onClick={() => setSecretStudentView(false)}
                className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm cursor-pointer"
              >
                I Know It! Start Acting
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Duck Race Modal */}
      <AnimatePresence>
        {showRaceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border-2 border-cyan-500 rounded-2xl p-5 max-w-xl w-full shadow-2xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🦆</span>
                  <h3 className="text-lg font-black text-white">DUCK RACE ARENA</h3>
                </div>
                {winner && (
                  <span className="text-xs bg-emerald-500 text-slate-950 font-black px-2.5 py-1 rounded-full animate-bounce">
                    WINNER: {winner.name}!
                  </span>
                )}
              </div>

              {/* Pool tracks */}
              <div className="my-4 flex flex-col gap-2 bg-blue-950/40 p-3 rounded-xl border border-blue-800/40">
                {ducks.map((duck) => (
                  <div key={duck.id} className="flex items-center gap-2">
                    <span className="w-16 text-xs font-bold text-slate-300 truncate text-right">
                      {duck.name}
                    </span>

                    <div className="flex-1 h-7 bg-blue-900/60 rounded-full relative overflow-hidden border border-blue-700/50">
                      {/* Water ripples */}
                      <div
                        className="h-full bg-cyan-500/20 transition-all duration-75"
                        style={{ width: `${duck.progress}%` }}
                      />

                      {/* Duck indicator */}
                      <div
                        className="absolute top-0.5 bottom-0.5 flex items-center transition-all duration-75"
                        style={{ left: `calc(${duck.progress}% - 22px)` }}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md border ${duck.color}`}>
                          🦆
                        </div>
                      </div>

                      {/* Finish line */}
                      <div className="absolute top-0 bottom-0 right-3 w-1 border-r border-dashed border-white/60" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer controls */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={startDuckRace}
                  disabled={isRacing}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer disabled:opacity-50"
                >
                  {isRacing ? 'Racing...' : 'Race Again'}
                </button>
                <button
                  onClick={() => setShowRaceModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
