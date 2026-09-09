import React from 'react';
import { routineData } from '../data/routineData';
import { Clock, Sun, Dumbbell, Coffee, BookOpen, Sparkles, Moon, Video, Sparkle } from 'lucide-react';

export const DailySystemSection: React.FC = () => {
  return (
    <section
      id="section-system"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#090d16] border-t border-slate-800"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-xs font-mono tracking-widest uppercase">
            <Clock className="w-3.5 h-3.5" />
            <span>{routineData.headerTag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-slate-100 tracking-tight">
            {routineData.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans max-w-2xl mx-auto">
            {routineData.subtitle}
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
          {routineData.items.map((item, index) => (
            <div
              key={index}
              id={`routine-step-${index}`}
              className="relative group"
            >
              {/* Timeline marker node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-amber-400 group-hover:bg-amber-400 transition-colors shadow-sm" />

              {/* Step Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0e1626]/90 border border-slate-800/90 shadow-md group-hover:border-slate-700 transition-all space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm sm:text-base font-black text-amber-400">
                      {item.time}
                    </span>
                    <span className="text-slate-600">•</span>
                    <h3 className="font-sans text-base sm:text-lg font-bold text-slate-100">
                      {item.title}
                    </h3>
                  </div>

                  {item.tag && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border border-slate-700/60 bg-slate-900 text-slate-400">
                      {item.tag}
                    </span>
                  )}
                </div>

                {item.description && (
                  <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed pt-1">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
