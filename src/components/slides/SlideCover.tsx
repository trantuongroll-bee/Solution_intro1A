import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, ArrowRight, CheckCircle2, Play, Users, Award, Headphones } from 'lucide-react';

interface SlideCoverProps {
  onStart: () => void;
}

export const SlideCover: React.FC<SlideCoverProps> = ({ onStart }) => {
  const objectives = [
    { icon: BookOpen, text: 'Identify & collocate hobbies & subjects', color: 'from-cyan-500 to-blue-500' },
    { icon: Headphones, text: 'Listen and extract key vocabulary', color: 'from-purple-500 to-indigo-500' },
    { icon: Users, text: 'Express likes, neutrals & dislikes fluently', color: 'from-emerald-500 to-teal-500' },
    { icon: Award, text: 'Classroom mingling & final report speaking', color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="h-full flex flex-col justify-between relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Tag */}
      <div className="flex items-center justify-between z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>OXFORD SOLUTION · INTRO 1A</span>
        </div>
        <div className="text-xs font-bold text-slate-400 tracking-wider uppercase bg-slate-800/80 border border-slate-700/60 px-3 py-1 rounded-xl">
          Lower-Secondary ESL
        </div>
      </div>

      {/* Main Hero Section */}
      <div className="my-auto py-4 z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-indigo-400 font-extrabold text-sm sm:text-base tracking-widest uppercase mb-1">
            VOCABULARY &amp; SPEAKING
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black italic text-white tracking-tight leading-tight">
            Hobbies &amp; Subjects
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-lg leading-relaxed max-w-2xl font-medium">
            Interactive multimedia lesson slides: Meaning, Pronunciation &amp; Form discovery, listening scan, relay race game, 3-column preference scale, and peer mingling survey.
          </p>
        </motion.div>

        {/* Objectives cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {objectives.map((obj, i) => {
            const Icon = obj.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 transition-colors shadow-sm"
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${obj.color} flex items-center justify-center shrink-0 shadow-md`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-200">
                  {obj.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-700/60 z-10">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Interactive tools: Duck Race · 60s Timer · Scoreboard · Audio Synthesizer · Speech Pronunciation</span>
        </div>

        <button
          onClick={onStart}
          className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Start Lesson</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
