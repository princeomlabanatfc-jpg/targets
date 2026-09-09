import React from 'react';
import { lawsData } from '../data/lawsData';
import { Scale, Shield } from 'lucide-react';

export const PersonalLawsSection: React.FC = () => {
  return (
    <section
      id="section-laws"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0f19] border-t border-slate-800"
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono tracking-widest uppercase">
            <Scale className="w-3.5 h-3.5" />
            <span>{lawsData.headerTag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-slate-100 tracking-tight">
            {lawsData.title}
          </h2>
          <p className="text-xs sm:text-sm font-mono tracking-widest text-slate-400 uppercase">
            Non-negotiable behavioral boundaries & cognitive axioms
          </p>
        </div>

        {/* 10 Laws Stack (matching the crisp clean boxed style of Page 5) */}
        <div className="space-y-3.5">
          {lawsData.laws.map((law) => (
            <div
              key={law.lawNumber}
              id={`law-card-${law.lawNumber}`}
              className="group p-5 sm:p-6 rounded-xl bg-[#0e1626]/90 border border-slate-800/90 shadow-md hover:border-amber-500/50 hover:bg-[#111a2f] transition-all flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="text-[11px] font-mono tracking-[0.2em] uppercase font-bold text-amber-400/90 group-hover:text-amber-300 transition-colors">
                  L a w {law.lawNumber}
                </div>
                <p className="text-base sm:text-lg font-sans font-semibold text-slate-100 tracking-tight leading-snug">
                  {law.title}
                </p>
              </div>

              <div className="w-8 h-8 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-center text-slate-600 group-hover:text-amber-400 group-hover:border-amber-500/30 transition-all">
                <Shield className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
