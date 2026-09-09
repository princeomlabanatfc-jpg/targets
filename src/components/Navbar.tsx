import React, { useState, useEffect } from 'react';
import {
  Target,
  Compass,
  BookOpen,
  Scale,
  Clock,
  CalendarDays,
  Menu,
  X,
  CheckSquare,
  Dumbbell,
  Brain,
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
  completedAcademicCount: number;
  totalAcademicCount: number;
  completedPhysicalCount: number;
  totalPhysicalCount: number;
  todayDayNumber?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onSelectSection,
  completedAcademicCount,
  totalAcademicCount,
  completedPhysicalCount,
  totalPhysicalCount,
  todayDayNumber,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'vision', label: '1. Vision', icon: Target, subtitle: 'Page 1' },
    { id: 'targets', label: '2. 62-Day Plan', icon: Compass, subtitle: 'Page 2' },
    { id: 'principles', label: '3. 52 Principles', icon: BookOpen, subtitle: 'Pages 3–4' },
    { id: 'laws', label: '4. Personal Laws', icon: Scale, subtitle: 'Page 5' },
    { id: 'system', label: '5. Daily Routine', icon: Clock, subtitle: 'Page 6' },
    {
      id: 'logs',
      label: '6. Day-by-Day Logs',
      icon: CalendarDays,
      subtitle: todayDayNumber ? `Today: Day ${todayDayNumber}` : 'Pages 7–56',
    },
  ];

  return (
    <header
      id="main-nav-header"
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#090d16]/95 backdrop-blur-md border-amber-500/20 shadow-xl shadow-black/40'
          : 'bg-[#0b0f19] border-slate-800/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo / Brand */}
          <div
            id="brand-logo-trigger"
            onClick={() => {
              onSelectSection('vision');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/30 via-slate-800 to-amber-600/20 border border-amber-500/40 flex items-center justify-center shadow-inner group-hover:border-amber-400 transition-colors">
              <span className="font-cinzel font-black text-amber-300 text-lg">3.0</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel font-bold text-base tracking-widest text-slate-100 group-hover:text-amber-300 transition-colors">
                  PRINCE 3.0
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  JEE ADVANCED
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-wider">
                62-Day Execution Protocol
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1.5" aria-label="Desktop Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => onSelectSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 relative ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Status Tracker & Mobile Menu Button */}
          <div className="flex items-center gap-2.5">
            {/* Real-time Today Shortcut */}
            {todayDayNumber && (
              <button
                type="button"
                id="navbar-today-pill"
                onClick={() => onSelectSection('logs')}
                title={`Real-time Today: Day ${todayDayNumber}. Click to jump straight to Day ${todayDayNumber} log.`}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-xs font-mono text-amber-300 transition-all cursor-pointer shadow-sm group"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                <span className="font-bold tracking-wider">D{todayDayNumber} TODAY</span>
              </button>
            )}

            {/* Academic Targets Tracker */}
            {totalAcademicCount > 0 && (
              <div
                title="Academic Targets Completed"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-xs font-mono text-slate-300"
              >
                <Brain className="w-3.5 h-3.5 text-sky-400" />
                <span>
                  <strong className="text-sky-400">{completedAcademicCount}</strong>
                  <span className="text-slate-500">/{totalAcademicCount}</span>
                </span>
              </div>
            )}

            {/* Physical Targets Tracker */}
            {totalPhysicalCount > 0 && (
              <div
                title="Physical Training Targets Completed"
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-xs font-mono text-slate-300"
              >
                <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  <strong className="text-emerald-400">{completedPhysicalCount}</strong>
                  <span className="text-slate-500">/{totalPhysicalCount}</span>
                </span>
              </div>
            )}

            {/* Mobile menu trigger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="xl:hidden bg-[#090d16] border-b border-slate-800 px-4 pt-2 pb-4 space-y-2"
        >
          {/* Mobile target stats */}
          <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-slate-900/70 border border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Brain className="w-3.5 h-3.5 text-sky-400" />
              <span>
                Academic: <strong className="text-sky-400">{completedAcademicCount}</strong>/{totalAcademicCount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                Physical: <strong className="text-emerald-400">{completedPhysicalCount}</strong>/{totalPhysicalCount}
              </span>
            </div>
          </div>

          <div className="space-y-1 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => {
                    onSelectSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">{item.subtitle}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
