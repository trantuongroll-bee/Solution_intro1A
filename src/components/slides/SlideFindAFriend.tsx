import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { SlideHeader } from '../SlideHeader';
import { sound } from '../../utils/audio';
import {
  Users,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Table,
  MessageSquare
} from 'lucide-react';

interface RowData {
  category: 'like' | 'dislike' | 'neutral';
  targetLabel: string;
  emoji: string;
  color: string;
  name: string;
  activity: string;
}

export const SlideFindAFriend: React.FC = () => {
  const [mingleTimer, setMingleTimer] = useState(300); // 5 minutes mingle
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [tableData, setTableData] = useState<RowData[]>([
    {
      category: 'like',
      targetLabel: 'likes / is keen on something',
      emoji: '👍',
      color: 'emerald',
      name: '',
      activity: ''
    },
    {
      category: 'dislike',
      targetLabel: 'doesn’t like / hates something',
      emoji: '👎',
      color: 'rose',
      name: '',
      activity: ''
    },
    {
      category: 'neutral',
      targetLabel: 'doesn’t mind something',
      emoji: '😐',
      color: 'amber',
      name: '',
      activity: ''
    }
  ]);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isTimerRunning && mingleTimer > 0) {
      timerRef.current = window.setInterval(() => {
        setMingleTimer((prev) => {
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
  }, [isTimerRunning, mingleTimer]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const updateField = (index: number, field: 'name' | 'activity', value: string) => {
    setTableData((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const fillExample = () => {
    sound.playSuccess();
    setTableData([
      {
        category: 'like',
        targetLabel: 'likes / is keen on something',
        emoji: '👍',
        color: 'emerald',
        name: 'Lucas',
        activity: 'playing chess'
      },
      {
        category: 'dislike',
        targetLabel: 'doesn’t like / hates something',
        emoji: '👎',
        color: 'rose',
        name: 'Sarah',
        activity: 'ice skating'
      },
      {
        category: 'neutral',
        targetLabel: 'doesn’t mind something',
        emoji: '😐',
        color: 'amber',
        name: 'Leo',
        activity: 'studying chemistry'
      }
    ]);
  };

  const resetTable = () => {
    sound.playClick();
    setTableData([
      {
        category: 'like',
        targetLabel: 'likes / is keen on something',
        emoji: '👍',
        color: 'emerald',
        name: '',
        activity: ''
      },
      {
        category: 'dislike',
        targetLabel: 'doesn’t like / hates something',
        emoji: '👎',
        color: 'rose',
        name: '',
        activity: ''
      },
      {
        category: 'neutral',
        targetLabel: 'doesn’t mind something',
        emoji: '😐',
        color: 'amber',
        name: '',
        activity: ''
      }
    ]);
  };

  return (
    <div className="h-full flex flex-col justify-between relative overflow-hidden">
      <SlideHeader
        stage="Production"
        stageNumber="6"
        title="Find a friend who…"
        subtitle="Mingle with 3 different classmates and complete your survey notes"
        teacherTip="Students stand up with notebooks. They must ask at least 3 different classmates using the target language, note their names and their activities/subjects."
      />

      {/* Top Instructions & Timer Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/80 p-2.5 sm:p-3 rounded-xl border border-slate-700/80 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider bg-purple-500 text-slate-950 px-2 py-0.5 rounded">
            Survey Goal
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-200">
            Stand up, walk around &amp; talk to <span className="text-cyan-300 font-extrabold underline">3 DIFFERENT classmates</span>!
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs sm:text-sm font-bold bg-slate-900 px-3 py-1 rounded-lg border border-slate-700 text-amber-300">
            ⏱️ Mingle Time: {formatTime(mingleTimer)}
          </span>
          <button
            onClick={() => {
              sound.playClick();
              setIsTimerRunning(!isTimerRunning);
            }}
            className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer"
          >
            {isTimerRunning ? 'Pause' : 'Start Timer'}
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setIsTimerRunning(false);
              setMingleTimer(300);
            }}
            className="p-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content Area: Survey Table & Language Support */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 my-auto overflow-y-auto max-h-[calc(100%-140px)] pr-1">
        {/* The Survey Table (Left 7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-850 border border-slate-700 rounded-2xl p-4 shadow-lg">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-700/80 mb-3">
              <div className="flex items-center gap-2 text-cyan-300 font-extrabold text-sm uppercase tracking-wide">
                <Table className="w-4 h-4 text-cyan-400" />
                <span>Classroom Survey Notes</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fillExample}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 px-2 py-1 rounded font-bold cursor-pointer border border-slate-700"
                >
                  Model Example
                </button>
                <button
                  onClick={resetTable}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Structured Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-800/80 text-slate-300 uppercase text-[11px] font-bold border-b border-slate-700">
                    <th className="p-3">Find a friend who…</th>
                    <th className="p-3 w-28 sm:w-36">Name</th>
                    <th className="p-3">Activity / Subject</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {tableData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`transition-colors ${
                        row.category === 'like'
                          ? 'hover:bg-emerald-950/20'
                          : row.category === 'dislike'
                          ? 'hover:bg-rose-950/20'
                          : 'hover:bg-amber-950/20'
                      }`}
                    >
                      <td className="p-3 font-extrabold flex items-center gap-2">
                        <span className="text-xl">{row.emoji}</span>
                        <span
                          className={
                            row.category === 'like'
                              ? 'text-emerald-300'
                              : row.category === 'dislike'
                              ? 'text-rose-300'
                              : 'text-amber-300'
                          }
                        >
                          {row.targetLabel}
                        </span>
                      </td>

                      <td className="p-2">
                        <input
                          type="text"
                          value={row.name}
                          onChange={(e) => updateField(idx, 'name', e.target.value)}
                          placeholder="Friend's Name"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-500 font-semibold"
                        />
                      </td>

                      <td className="p-2">
                        <input
                          type="text"
                          value={row.activity}
                          onChange={(e) => updateField(idx, 'activity', e.target.value)}
                          placeholder="e.g. playing chess / math"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-3 p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Fill in each row with a <b className="text-white">different friend's answer</b> before the timer ends!
            </span>
          </div>
        </div>

        {/* Language Support Boxes (Right 5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* ASK Box */}
          <div className="bg-gradient-to-r from-blue-950/40 to-slate-850 border-2 border-blue-500/50 rounded-2xl p-3.5 shadow-md">
            <div className="flex items-center gap-2 text-xs font-black text-blue-300 uppercase tracking-wider mb-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span>Language Support · ASK</span>
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm font-bold text-white">
              <div className="p-2 rounded-lg bg-slate-900/90 border border-blue-500/30">
                • What do you think of <span className="text-cyan-300 font-black">______</span>?
              </div>
              <div className="p-2 rounded-lg bg-slate-900/90 border border-blue-500/30">
                • Do you like <span className="text-cyan-300 font-black">______</span>?
              </div>
            </div>
          </div>

          {/* ANSWER Box */}
          <div className="bg-gradient-to-r from-purple-950/40 to-slate-850 border-2 border-purple-500/50 rounded-2xl p-3.5 shadow-md flex-1 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-black text-purple-300 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Language Support · ANSWER</span>
            </div>

            <div className="space-y-2 text-xs sm:text-sm font-semibold">
              {/* Like */}
              <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-emerald-200">
                <span className="font-bold text-emerald-400 mr-1.5">👍</span>
                I love ______ · I like ______ · I’m keen on ______
              </div>

              {/* OK */}
              <div className="p-2 rounded-lg bg-amber-950/30 border border-amber-500/40 text-amber-200">
                <span className="font-bold text-amber-400 mr-1.5">😐</span>
                I don’t mind ______
              </div>

              {/* Dislike */}
              <div className="p-2 rounded-lg bg-rose-950/30 border border-rose-500/40 text-rose-200">
                <span className="font-bold text-rose-400 mr-1.5">👎</span>
                I don’t like ______ · I hate ______ · I think ______ is terrible
              </div>
            </div>

            <div className="text-[11px] text-slate-400 italic mt-2">
              Speak full sentences with your partner!
            </div>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
        <div>
          Next step: Be ready to report your findings to the whole class!
        </div>
        <div className="font-semibold text-purple-300">
          Stage 7 of 8 · Mingle in English
        </div>
      </div>
    </div>
  );
};
