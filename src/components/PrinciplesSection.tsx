import React, { useState } from 'react';
import { principlesData } from '../data/principlesData';
import { Search, Eye, Shield, Brain, ChevronRight, Zap } from 'lucide-react';

export const PrinciplesSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrinciples = principlesData.principles.filter((p) => {
    const term = searchTerm.toLowerCase();
    const matchesNum = p.number.toString().includes(term);
    const matchesTitle = p.title.toLowerCase().includes(term);
    const matchesDesc = p.description ? p.description.toLowerCase().includes(term) : false;
    const matchesSub = p.subPoints ? p.subPoints.some((s) => s.toLowerCase().includes(term)) : false;
    const matchesQuote = p.quote ? p.quote.toLowerCase().includes(term) : false;
    return matchesNum || matchesTitle || matchesDesc || matchesSub || matchesQuote;
  });

  return (
    <section
      id="section-principles"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#090d16] border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono tracking-widest uppercase mb-3">
              <Brain className="w-3.5 h-3.5" />
              <span>{principlesData.headerTag}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-slate-100 tracking-tight">
              {principlesData.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 font-sans">
              {principlesData.subtitle}
            </p>
          </div>

          {/* Search box */}
          <div className="w-full md:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search principles..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400/80 transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-xs font-mono text-slate-400 hover:text-white absolute right-3 top-1/2 -translate-y-1/2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Principles List */}
        <div className="space-y-4">
          {filteredPrinciples.map((principle) => {
            const hasExtraContent =
              Boolean(principle.description) ||
              Boolean(principle.subPoints?.length) ||
              Boolean(principle.quote);

            return (
              <div
                key={principle.number}
                id={`principle-${principle.number}`}
                className="rounded-xl bg-[#0e1626]/80 border border-slate-800/90 p-5 sm:p-6 transition-all hover:border-slate-700 shadow-md"
              >
                <div className="flex items-start gap-4">
                  {/* Principle Number Badge (exact circular badge styling from PDF) */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black border border-slate-700 flex items-center justify-center font-mono font-bold text-xs sm:text-sm text-amber-300 shadow-inner">
                    {principle.number}
                  </div>

                  {/* Title & Body */}
                  <div className="flex-1 space-y-3">
                    <h3 className="text-base sm:text-lg font-bold font-sans text-slate-100 tracking-tight leading-snug">
                      {principle.title}
                    </h3>

                    {/* Main Description */}
                    {principle.description && (
                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                        {principle.description}
                      </p>
                    )}

                    {/* Sub points (e.g. for Principle 2 Observation & Principle 9 Scenario thinking) */}
                    {principle.subPoints && principle.subPoints.length > 0 && (
                      <div className="space-y-2 pt-1 border-t border-slate-800/80">
                        {principle.subPoints.map((point, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1"
                          >
                            <ChevronRight className="w-4 h-4 text-amber-400/80 flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Long term Quote / Nuance (Principle 15) */}
                    {principle.quote && (
                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-200/90 italic">
                        {principle.quote}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredPrinciples.length === 0 && (
            <div className="py-12 text-center text-slate-500 font-mono text-sm">
              No principles found matching &ldquo;{searchTerm}&rdquo;.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
