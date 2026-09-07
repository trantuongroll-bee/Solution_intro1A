import React from 'react';
import { Sparkles, HelpCircle } from 'lucide-react';

interface SlideHeaderProps {
  stage: string;
  stageNumber: string;
  title: string;
  subtitle?: string;
  teacherTip?: string;
  onOpenTip?: () => void;
}

export const SlideHeader: React.FC<SlideHeaderProps> = ({
  stage,
  stageNumber,
  title,
  subtitle,
  teacherTip,
  onOpenTip,
}) => {
  return (
    <div className="w-full flex items-center justify-between pb-3 border-b border-slate-700/60 mb-4 select-none">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Stage {stageNumber} · {stage}</span>
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black italic text-white tracking-tight flex items-center gap-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {teacherTip && onOpenTip && (
        <button
          onClick={onOpenTip}
          className="flex items-center gap-1.5 text-xs text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          title="Teacher Instructions & Tips"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden sm:inline font-semibold">Teacher Tip</span>
        </button>
      )}
    </div>
  );
};
