import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { SlideHeader } from '../SlideHeader';
import { sound } from '../../utils/audio';
import {
  Trophy,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Star,
  Users,
  Check,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const SlideTeamGame: React.FC = () => {
  // Timer State (60 seconds)
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  // Scores
  const [hobbyScore, setHobbyScore] = useState(0);
  const [subjectScore, setSubjectScore] = useState(0);

  // Word lists for live referee recording
  const [hobbyWords, setHobbyWords] = useState<string[]>([]);
  const [subjectWords, setSubjectWords] = useState<string[]>([]);
  const [inputHobby, setInputHobby] = useState('');
  const [inputSubject, setInputSubject] = useState('');

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setHasFinished(true);
            sound.playWhistle();
            try {
              confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
            } catch {
              // ignore
            }
            return 0;
          }
          // Beep on last 5 seconds
          if (prev <= 6) {
            sound.playBeep();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleStartTimer = () => {
    sound.playClick();
    if (timeLeft === 0) {
      setTimeLeft(60);
      setHasFinished(false);
    }
    setIsRunning(true);
  };

  const handlePauseTimer = () => {
    sound.playClick();
    setIsRunning(false);
  };

  const handleResetTimer = () => {
    sound.playClick();
    setIsRunning(false);
    setTimeLeft(60);
    setHasFinished(false);
  };

  const addPoint = (team: 'hobby' | 'subject', pts: number) => {
    sound.playSuccess();
    if (team === 'hobby') {
      setHobbyScore((prev) => Math.max(0, prev + pts));
    } else {
      setSubjectScore((prev) => Math.max(0, prev + pts));
    }
  };

  const handleAddWord = (team: 'hobby' | 'subject', isTodayVocab: boolean = false) => {
    const input = team === 'hobby' ? inputHobby.trim() : inputSubject.trim();
    if (!input) return;

    const points = isTodayVocab ? 2 : 1;
    addPoint(team, points);

    if (team === 'hobby') {
      setHobbyWords((prev) => [input + (isTodayVocab ? ' ⭐ (+2)' : ' (+1)'), ...prev]);
      setInputHobby('');
    } else {
      setSubjectWords((prev) => [input + (isTodayVocab ? ' ⭐ (+2)' : ' (+1)'), ...prev]);
      setInputSubject('');
    }
  };

  return (
    <div className="h-full flex flex-col justify-between relative overflow-hidden">
      <SlideHeader
        stage="Practice Game"
        stageNumber="3"
        title="TEAM HOBBY vs TEAM SUBJECT"
        subtitle="1 Marker · 1 Minute · Relay Race Challenge"
        teacherTip="Divide class into 2 teams. Line them up. On 'GO!', one student writes one word on the board, passes the marker, and goes to the back of the line. 60 seconds!"
      />

      {/* Visual Rule Banner: One student -> one word -> pass the marker */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-slate-800 to-amber-950/60 border border-slate-700 rounded-xl p-2.5 sm:p-3 mb-3 flex flex-wrap items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider bg-cyan-500 text-slate-950 px-2 py-0.5 rounded">
            Relay Rule
          </span>
          <div className="flex items-center gap-1.5 sm:gap-3 text-xs sm:text-sm font-extrabold text-white">
            <span className="flex items-center gap-1 text-cyan-300">
              <span>🏃‍♂️</span> One student
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="flex items-center gap-1 text-amber-300">
              <span>✍️</span> One word
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="flex items-center gap-1 text-emerald-300">
              <span>🖊️</span> Pass the marker!
            </span>
          </div>
        </div>

        {/* Scoring Key pill tags */}
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <span className="text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            ✓ Correct spelling: <b className="text-white">+1</b>
          </span>
          <span className="text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
            ⭐ Today's vocab: <b className="text-white">+2</b>
          </span>
          <span className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 hidden md:inline">
            Duplicate / Wrong category: <b className="text-white">0</b>
          </span>
        </div>
      </div>

      {/* Main Scoreboard Arena */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3.5 my-auto overflow-y-auto max-h-[calc(100%-140px)] pr-1">
        {/* TEAM HOBBY (Left) */}
        <div className="lg:col-span-4 bg-gradient-to-b from-cyan-950/40 to-slate-850 border-2 border-cyan-500/50 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/30 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <span className="font-black text-cyan-300 text-lg uppercase tracking-wide">
                  Team Hobby
                </span>
              </div>
              <span className="text-xs text-cyan-200 bg-cyan-500/20 px-2 py-0.5 rounded font-bold">
                Leisure &amp; Sports
              </span>
            </div>

            {/* Score display */}
            <div className="text-center py-2 bg-slate-900/80 rounded-xl border border-cyan-500/30 my-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Score</div>
              <div className="text-5xl font-black text-cyan-300">{hobbyScore}</div>
            </div>

            {/* Point buttons */}
            <div className="grid grid-cols-3 gap-1.5 my-2">
              <button
                onClick={() => addPoint('hobby', 1)}
                className="py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs cursor-pointer active:scale-95 transition-all shadow"
              >
                +1 Point
              </button>
              <button
                onClick={() => addPoint('hobby', 2)}
                className="py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer active:scale-95 transition-all shadow flex items-center justify-center gap-0.5"
              >
                <Star className="w-3 h-3 fill-slate-950" />
                +2 Bonus
              </button>
              <button
                onClick={() => addPoint('hobby', -1)}
                className="py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer active:scale-95 transition-all"
              >
                -1
              </button>
            </div>
          </div>

          {/* Quick word logger for referee */}
          <div className="mt-2 pt-2 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddWord('hobby', false);
              }}
              className="flex gap-1.5"
            >
              <input
                type="text"
                value={inputHobby}
                onChange={(e) => setInputHobby(e.target.value)}
                placeholder="Log hobby word..."
                className="flex-1 bg-slate-900 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="px-2.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-bold cursor-pointer"
              >
                +1
              </button>
              <button
                type="button"
                onClick={() => handleAddWord('hobby', true)}
                className="px-2 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-black cursor-pointer"
                title="Add as Today's Lesson Vocab (+2 pts)"
              >
                +2★
              </button>
            </form>

            <div className="flex flex-wrap gap-1 mt-2 max-h-16 overflow-y-auto">
              {hobbyWords.map((w, idx) => (
                <span key={idx} className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-cyan-200">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER: 60-Second Match Timer */}
        <div className="lg:col-span-4 bg-slate-800/90 border border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-between shadow-xl">
          <div className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Trophy className="w-4 h-4 text-amber-400" />
            Match Clock
          </div>

          {/* Big countdown clock */}
          <div className="my-2 relative flex flex-col items-center justify-center">
            <div
              className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 flex flex-col items-center justify-center transition-all ${
                timeLeft <= 10 && isRunning
                  ? 'border-rose-500 bg-rose-950/40 text-rose-300 animate-pulse'
                  : 'border-cyan-400 bg-slate-900 text-white'
              }`}
            >
              <span className="text-4xl sm:text-5xl font-black font-mono">
                {timeLeft}s
              </span>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                {hasFinished ? 'TIME UP!' : isRunning ? 'RACING' : '1 MINUTE'}
              </span>
            </div>
          </div>

          {/* Timer controls */}
          <div className="flex items-center gap-2 w-full">
            {!isRunning ? (
              <button
                onClick={handleStartTimer}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>{timeLeft === 60 ? 'Start 1 Min' : 'Resume'}</span>
              </button>
            ) : (
              <button
                onClick={handlePauseTimer}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </button>
            )}

            <button
              onClick={handleResetTimer}
              className="p-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white cursor-pointer transition-colors"
              title="Reset 60s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Winner announcement if finished */}
          {hasFinished && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-2 text-center text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30"
            >
              {hobbyScore > subjectScore
                ? '🏆 TEAM HOBBY WINS!'
                : subjectScore > hobbyScore
                ? '🏆 TEAM SUBJECT WINS!'
                : '🤝 AMAZING TIE MATCH!'}
            </motion.div>
          )}
        </div>

        {/* TEAM SUBJECT (Right) */}
        <div className="lg:col-span-4 bg-gradient-to-b from-amber-950/40 to-slate-850 border-2 border-amber-500/50 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-amber-500/30 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📚</span>
                <span className="font-black text-amber-300 text-lg uppercase tracking-wide">
                  Team Subject
                </span>
              </div>
              <span className="text-xs text-amber-200 bg-amber-500/20 px-2 py-0.5 rounded font-bold">
                School Classes
              </span>
            </div>

            {/* Score display */}
            <div className="text-center py-2 bg-slate-900/80 rounded-xl border border-amber-500/30 my-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Score</div>
              <div className="text-5xl font-black text-amber-300">{subjectScore}</div>
            </div>

            {/* Point buttons */}
            <div className="grid grid-cols-3 gap-1.5 my-2">
              <button
                onClick={() => addPoint('subject', 1)}
                className="py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer active:scale-95 transition-all shadow"
              >
                +1 Point
              </button>
              <button
                onClick={() => addPoint('subject', 2)}
                className="py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs cursor-pointer active:scale-95 transition-all shadow flex items-center justify-center gap-0.5"
              >
                <Star className="w-3 h-3 fill-slate-950" />
                +2 Bonus
              </button>
              <button
                onClick={() => addPoint('subject', -1)}
                className="py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer active:scale-95 transition-all"
              >
                -1
              </button>
            </div>
          </div>

          {/* Quick word logger for referee */}
          <div className="mt-2 pt-2 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddWord('subject', false);
              }}
              className="flex gap-1.5"
            >
              <input
                type="text"
                value={inputSubject}
                onChange={(e) => setInputSubject(e.target.value)}
                placeholder="Log subject word..."
                className="flex-1 bg-slate-900 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold cursor-pointer"
              >
                +1
              </button>
              <button
                type="button"
                onClick={() => handleAddWord('subject', true)}
                className="px-2 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg text-xs font-black cursor-pointer"
                title="Add as Today's Lesson Vocab (+2 pts)"
              >
                +2★
              </button>
            </form>

            <div className="flex flex-wrap gap-1 mt-2 max-h-16 overflow-y-auto">
              {subjectWords.map((w, idx) => (
                <span key={idx} className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-amber-200">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
        <div>
          Bonus tip: <span className="text-amber-400 font-bold">chemistry, gymnastics, chess, photography, trekking</span> give 2 points!
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setHobbyScore(0);
              setSubjectScore(0);
              setHobbyWords([]);
              setSubjectWords([]);
            }}
            className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
          >
            Reset Scores &amp; Words
          </button>
        </div>
      </div>
    </div>
  );
};
