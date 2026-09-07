import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { SlideHeader } from '../SlideHeader';
import { sound, speakText } from '../../utils/audio';
import {
  Award,
  Sparkles,
  Volume2,
  Users,
  CheckCircle2,
  Shuffle,
  Star,
  PartyPopper
} from 'lucide-react';

const SAMPLE_REPORTERS = ['Alex', 'Bella', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Hannah', 'Liam', 'Maya'];

export const SlideConsolidation: React.FC = () => {
  // Chosen reporter
  const [chosenReporter, setChosenReporter] = useState<string | null>(null);
  const [isPicking, setIsPicking] = useState(false);

  // Template inputs
  const [friend1, setFriend1] = useState('');
  const [friend2, setFriend2] = useState('');
  const [friend3, setFriend3] = useState('');

  const [likeFriend, setLikeFriend] = useState('');
  const [likeVerb, setLikeVerb] = useState<'loves' | 'likes' | 'is keen on'>('loves');
  const [likeActivity, setLikeActivity] = useState('');

  const [dislikeFriend, setDislikeFriend] = useState('');
  const [dislikeVerb, setDislikeVerb] = useState<'doesn’t like' | 'hates' | 'thinks ___ is terrible'>('hates');
  const [dislikeActivity, setDislikeActivity] = useState('');

  const [neutralFriend, setNeutralFriend] = useState('');
  const [neutralActivity, setNeutralActivity] = useState('');

  const [isSpeaking, setIsSpeaking] = useState(false);

  const pickReporter = () => {
    sound.playClick();
    setIsPicking(true);
    let count = 0;
    const interval = window.setInterval(() => {
      const rand = SAMPLE_REPORTERS[Math.floor(Math.random() * SAMPLE_REPORTERS.length)];
      setChosenReporter(rand);
      count++;
      if (count > 12) {
        clearInterval(interval);
        setIsPicking(false);
        sound.playSuccess();
        try {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        } catch {
          // ignore
        }
      }
    }, 90);
  };

  const fillModelReport = () => {
    sound.playSuccess();
    setFriend1('Lucas');
    setFriend2('Sarah');
    setFriend3('Leo');

    setLikeFriend('Lucas');
    setLikeVerb('is keen on');
    setLikeActivity('playing chess');

    setDislikeFriend('Sarah');
    setDislikeVerb('doesn’t like');
    setDislikeActivity('ice skating');

    setNeutralFriend('Leo');
    setNeutralActivity('studying chemistry');
  };

  const speakReport = async () => {
    const f1 = friend1 || 'Lucas';
    const f2 = friend2 || 'Sarah';
    const f3 = friend3 || 'Leo';

    const lf = likeFriend || f1;
    const la = likeActivity || 'playing chess';

    const df = dislikeFriend || f2;
    const da = dislikeActivity || 'ice skating';

    const nf = neutralFriend || f3;
    const na = neutralActivity || 'studying chemistry';

    const text = `My three friends are ${f1}, ${f2} and ${f3}. ${lf} ${likeVerb} ${la}. ${df} ${dislikeVerb} ${da}. ${nf} doesn't mind ${na}.`;

    sound.playClick();
    setIsSpeaking(true);
    await speakText(text, 0.95);
    setIsSpeaking(false);
  };

  return (
    <div className="h-full flex flex-col justify-between relative overflow-hidden">
      <SlideHeader
        stage="Consolidation"
        stageNumber="7"
        title="Classroom Report"
        subtitle="1–2 students report their survey findings to the class"
        teacherTip="Teacher selects 1–2 students to report using the reporting scaffold. Encourage loud, confident delivery. Finish with whole-class praise!"
      />

      {/* Top Banner: Pick a Reporter Button & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/80 p-2.5 sm:p-3 rounded-xl border border-slate-700/80 mb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={pickReporter}
            disabled={isPicking}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Shuffle className="w-4 h-4" />
            <span>{isPicking ? 'Selecting...' : 'Pick a Reporter'}</span>
          </button>

          {chosenReporter && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-lg text-xs font-bold text-amber-300">
              <span>🎤 Reporter:</span>
              <span className="text-white font-extrabold text-sm">{chosenReporter}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fillModelReport}
            className="text-xs bg-slate-700 hover:bg-slate-600 text-cyan-300 px-3 py-1.5 rounded-lg font-bold cursor-pointer border border-slate-600"
          >
            Fill Model Example
          </button>
          <button
            onClick={speakReport}
            disabled={isSpeaking}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md cursor-pointer transition-transform active:scale-95 disabled:opacity-50"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Hear Model Report</span>
          </button>
        </div>
      </div>

      {/* Main Reporting Template Box (Exactly Matching Prompt Specifications) */}
      <div className="flex-1 my-auto overflow-y-auto max-h-[calc(100%-140px)] pr-1 flex flex-col justify-center">
        <div className="bg-gradient-to-br from-slate-850 via-slate-900 to-indigo-950/40 border-2 border-cyan-500/60 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
          {/* Decorative tag */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-black text-cyan-400 uppercase tracking-wider bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Reporting Template</span>
          </div>

          <div className="space-y-4 sm:space-y-5 text-base sm:text-xl lg:text-2xl font-extrabold text-slate-100 leading-relaxed">
            {/* Line 1: Friends */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-wrap items-center gap-2">
              <span>My three friends are</span>
              <input
                type="text"
                value={friend1}
                onChange={(e) => setFriend1(e.target.value)}
                placeholder="Friend 1"
                className="w-28 sm:w-36 bg-slate-800 border-b-2 border-cyan-400 px-2 py-1 text-center text-cyan-300 font-black focus:outline-none placeholder:text-slate-600 text-sm sm:text-lg"
              />
              <span>,</span>
              <input
                type="text"
                value={friend2}
                onChange={(e) => setFriend2(e.target.value)}
                placeholder="Friend 2"
                className="w-28 sm:w-36 bg-slate-800 border-b-2 border-cyan-400 px-2 py-1 text-center text-cyan-300 font-black focus:outline-none placeholder:text-slate-600 text-sm sm:text-lg"
              />
              <span>and</span>
              <input
                type="text"
                value={friend3}
                onChange={(e) => setFriend3(e.target.value)}
                placeholder="Friend 3"
                className="w-28 sm:w-36 bg-slate-800 border-b-2 border-cyan-400 px-2 py-1 text-center text-cyan-300 font-black focus:outline-none placeholder:text-slate-600 text-sm sm:text-lg"
              />
              <span>.</span>
            </div>

            {/* Line 2: Likes */}
            <div className="p-3 bg-emerald-950/20 rounded-xl border border-emerald-500/30 flex flex-wrap items-center gap-2">
              <span className="text-xl">👍</span>
              <input
                type="text"
                value={likeFriend}
                onChange={(e) => setLikeFriend(e.target.value)}
                placeholder="Name"
                className="w-28 sm:w-36 bg-slate-800 border-b-2 border-emerald-400 px-2 py-1 text-center text-emerald-300 font-black focus:outline-none placeholder:text-slate-600 text-sm sm:text-lg"
              />
              <select
                value={likeVerb}
                onChange={(e) => setLikeVerb(e.target.value as any)}
                className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 rounded-lg px-2 py-1 text-xs sm:text-base font-bold cursor-pointer"
              >
                <option value="loves" className="bg-slate-900 text-white">loves</option>
                <option value="likes" className="bg-slate-900 text-white">likes</option>
                <option value="is keen on" className="bg-slate-900 text-white">is keen on</option>
              </select>
              <input
                type="text"
                value={likeActivity}
                onChange={(e) => setLikeActivity(e.target.value)}
                placeholder="Activity / Subject"
                className="flex-1 min-w-[140px] bg-slate-800 border-b-2 border-emerald-400 px-2 py-1 text-emerald-300 font-black focus:outline-none placeholder:text-slate-600 text-sm sm:text-lg"
              />
              <span>.</span>
            </div>

            {/* Line 3: Dislikes */}
            <div className="p-3 bg-rose-950/20 rounded-xl border border-rose-500/30 flex flex-wrap items-center gap-2">
              <span className="text-xl">👎</span>
              <input
                type="text"
                value={dislikeFriend}
                onChange={(e) => setDislikeFriend(e.target.value)}
                placeholder="Name"
                className="w-28 sm:w-36 bg-slate-800 border-b-2 border-rose-400 px-2 py-1 text-center text-rose-300 font-black focus:outline-none placeholder:text-slate-600 text-sm sm:text-lg"
              />
              <select
                value={dislikeVerb}
                onChange={(e) => setDislikeVerb(e.target.value as any)}
                className="bg-rose-500/20 text-rose-300 border border-rose-400/40 rounded-lg px-2 py-1 text-xs sm:text-base font-bold cursor-pointer"
              >
                <option value="doesn’t like" className="bg-slate-900 text-white">doesn’t like</option>
                <option value="hates" className="bg-slate-900 text-white">hates</option>
                <option value="thinks ___ is terrible" className="bg-slate-900 text-white">thinks it is terrible</option>
              </select>
              <input
                type="text"
                value={dislikeActivity}
                onChange={(e) => setDislikeActivity(e.target.value)}
                placeholder="Activity / Subject"
                className="flex-1 min-w-[140px] bg-slate-800 border-b-2 border-rose-400 px-2 py-1 text-rose-300 font-black focus:outline-none placeholder:text-slate-600 text-sm sm:text-lg"
              />
              <span>.</span>
            </div>

            {/* Line 4: OK / Doesn't mind */}
            <div className="p-3 bg-amber-950/20 rounded-xl border border-amber-500/30 flex flex-wrap items-center gap-2">
              <span className="text-xl">😐</span>
              <input
                type="text"
                value={neutralFriend}
                onChange={(e) => setNeutralFriend(e.target.value)}
                placeholder="Name"
                className="w-28 sm:w-36 bg-slate-800 border-b-2 border-amber-400 px-2 py-1 text-center text-amber-300 font-black focus:outline-none placeholder:text-slate-600 text-sm sm:text-lg"
              />
              <span className="text-amber-300">doesn’t mind</span>
              <input
                type="text"
                value={neutralActivity}
                onChange={(e) => setNeutralActivity(e.target.value)}
                placeholder="Activity / Subject"
                className="flex-1 min-w-[140px] bg-slate-800 border-b-2 border-amber-400 px-2 py-1 text-amber-300 font-black focus:outline-none placeholder:text-slate-600 text-sm sm:text-lg"
              />
              <span>.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Praise Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <PartyPopper className="w-4 h-4" />
          <span>Great job! Lesson Intro 1A complete!</span>
        </div>
        <div className="font-semibold text-cyan-300">
          Oxford Solution Intro · Unit 1A
        </div>
      </div>
    </div>
  );
};
