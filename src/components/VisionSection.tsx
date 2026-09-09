import React from 'react';
import { visionData } from '../data/visionData';
import { Calendar, Compass, ShieldCheck, Flame, ArrowDown } from 'lucide-react';

interface VisionSectionProps {
  onExploreNext: () => void;
}

export const VisionSection: React.FC<VisionSectionProps> = ({ onExploreNext }) => {
  return (
    <section
      id="section-vision"
      className="relative min-h-[90vh] flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#090d16] via-[#0d1424] to-[#0b0f19]"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-10">
        {/* Top Header Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300">
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase font-semibold">
            {visionData.headerTag}
          </span>
        </div>

        {/* Main Title Hero */}
        <div className="space-y-4">
          <h1
            id="hero-title"
            className="text-5xl sm:text-7xl lg:text-8xl font-black font-cinzel tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 drop-shadow-sm"
          >
            {visionData.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-mono tracking-[0.3em] uppercase text-slate-300 font-medium">
            {visionData.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 pt-1 text-xs sm:text-sm font-mono text-slate-400 italic">
            <span>{visionData.author}</span>
          </div>
        </div>

        {/* The Golden Target Box (exact reproduction of Page 1 center block) */}
        <div
          id="target-box-june-2027"
          className="relative mx-auto max-w-2xl text-left p-8 sm:p-10 rounded-2xl bg-[#0e1627]/90 border-2 border-amber-500/40 shadow-2xl shadow-black/60 transition-all hover:border-amber-400/70 group"
        >
          {/* Subtle gold corner accents */}
          <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
          <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
          <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
          <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-amber-400" />

          {/* Badge */}
          <div className="flex items-center gap-2 mb-6">
            <Compass className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs sm:text-sm font-mono font-bold tracking-[0.2em] text-amber-400 uppercase">
              {visionData.targetBadge}
            </h2>
          </div>

          {/* Exact target statement */}
          <blockquote className="text-base sm:text-lg leading-relaxed text-slate-200 font-normal font-sans border-l-2 border-amber-500/60 pl-4 py-1">
            {visionData.targetDescription}
          </blockquote>
        </div>

        {/* Date Range Footer */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs sm:text-sm font-mono tracking-[0.2em] text-slate-400">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/60 border border-slate-800">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>{visionData.dateRange}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/60 border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>JEE ADVANCED PROTOCOL</span>
          </div>
        </div>

        {/* Jump Button */}
        <div className="pt-4">
          <button
            id="jump-to-plan-btn"
            onClick={onExploreNext}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold font-sans text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore 62-Day Target Plan</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
