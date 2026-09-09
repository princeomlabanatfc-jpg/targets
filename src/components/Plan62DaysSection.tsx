import React from 'react';
import { targetsData } from '../data/targetsData';
import { Moon, CheckCircle2, Circle, Sparkles, Flame, RefreshCw } from 'lucide-react';

interface Plan62DaysSectionProps {
  checkedItems: Record<string, boolean>;
  onToggleItem: (id: string) => void;
  onResetItems?: () => void;
}

export const Plan62DaysSection: React.FC<Plan62DaysSectionProps> = ({
  checkedItems,
  onToggleItem,
  onResetItems,
}) => {
  // Count stats
  const totalItems = targetsData.areas.reduce((acc, area) => acc + area.items.length, 0);
  const completedCount = targetsData.areas.reduce(
    (acc, area) => acc + area.items.filter((item) => checkedItems[item.id]).length,
    0
  );
  const completionPercent = Math.round((completedCount / totalItems) * 100);

  return (
    <section
      id="section-targets"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0f19] border-t border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300 text-xs font-mono tracking-widest uppercase mb-3">
              <span>{targetsData.headerTag}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-slate-100 tracking-tight">
              {targetsData.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 font-sans max-w-2xl">
              {targetsData.subtitle}
            </p>
          </div>

          {/* Progress Pill & Reset */}
          <div className="flex items-center gap-4">
            <div className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <Flame className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-[11px] font-mono text-slate-400">Pillar Progress</div>
                <div className="text-sm font-mono font-bold text-slate-100">
                  {completedCount}/{totalItems} ({completionPercent}%)
                </div>
              </div>
            </div>

            {onResetItems && completedCount > 0 && (
              <button
                onClick={onResetItems}
                title="Reset checked items"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                aria-label="Reset targets"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 6 Target Areas Grid (2 columns on desktop matching original layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {targetsData.areas.map((area) => {
            const areaCompleted = area.items.filter((i) => checkedItems[i.id]).length;
            const isAllDone = areaCompleted === area.items.length;

            return (
              <div
                key={area.id}
                id={`target-card-${area.id}`}
                className="rounded-2xl bg-[#0e1626]/90 border border-slate-800 p-6 sm:p-7 shadow-xl shadow-black/30 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                    <h3 className={`text-base sm:text-lg font-mono font-bold tracking-wider ${area.color.split(' ')[1]}`}>
                      {area.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                      {areaCompleted}/{area.items.length}
                    </span>
                  </div>

                  {/* Items list with exact verbatim checkbox entries */}
                  <ul className="space-y-3">
                    {area.items.map((item) => {
                      const isChecked = !!checkedItems[item.id];
                      return (
                        <li
                          key={item.id}
                          onClick={() => onToggleItem(item.id)}
                          className={`group flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-emerald-950/20 text-slate-300'
                              : 'hover:bg-slate-800/40 text-slate-200'
                          }`}
                        >
                          <button
                            type="button"
                            className="mt-0.5 flex-shrink-0 text-slate-500 group-hover:text-amber-400 transition-colors"
                            aria-label={`Toggle ${item.text}`}
                          >
                            {isChecked ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-500" />
                            )}
                          </button>
                          <span
                            className={`text-sm sm:text-base leading-snug font-sans transition-all ${
                              isChecked
                                ? 'line-through text-slate-400 font-normal'
                                : 'text-slate-200 font-medium'
                            }`}
                          >
                            {item.text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {isAllDone && (
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Area fully mastered</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sleep Time Banner (Exact reproduction from Page 2 footer) */}
        <div
          id="sleep-time-banner"
          className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-[#10182b] to-slate-950 border-2 border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Moon className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-indigo-300 font-semibold">
                {targetsData.sleepTime.label}
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-slate-100 mt-0.5">
                {targetsData.sleepTime.range}
              </div>
            </div>
          </div>

          <div className="text-center sm:text-right text-xs sm:text-sm text-slate-400 font-sans max-w-sm">
            <span className="text-indigo-300 font-mono font-medium">Non-negotiable recovery window.</span>
            <br />
            6 hours of deep sleep to restore cognitive architecture and athletic readiness.
          </div>
        </div>
      </div>
    </section>
  );
};
