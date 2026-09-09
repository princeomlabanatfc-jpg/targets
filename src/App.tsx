import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { VisionSection } from './components/VisionSection';
import { Plan62DaysSection } from './components/Plan62DaysSection';
import { PrinciplesSection } from './components/PrinciplesSection';
import { PersonalLawsSection } from './components/PersonalLawsSection';
import { DailySystemSection } from './components/DailySystemSection';
import { DailyLogsSection } from './components/DailyLogsSection';
import { dailyLogs } from './data/dailyLogsData';
import { ArrowUp, Award, Shield, CheckCircle } from 'lucide-react';
import { getTodayDayNumber, getTodayDateString } from './utils/dateUtils';
import { STORAGE_KEYS, loadInstantStorage, saveInstantStorage } from './utils/storage';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('vision');
  const todayDayNumber = getTodayDayNumber();
  const [logsNavTimestamp, setLogsNavTimestamp] = useState<number>(() => Date.now());

  // Direct instant persistence for 62-day pillar targets (Section 2)
  const [checkedPillarTargets, setCheckedPillarTargets] = useState<Record<string, boolean>>(() =>
    loadInstantStorage(STORAGE_KEYS.PILLAR_TARGETS, {})
  );

  // Direct instant persistence for individual day academic targets (Section 7)
  const [checkedDayTargets, setCheckedDayTargets] = useState<Record<string, boolean>>(() =>
    loadInstantStorage(STORAGE_KEYS.DAY_TARGETS, {})
  );

  // Direct instant persistence for individual day physical training targets
  const [checkedPhysicalTargets, setCheckedPhysicalTargets] = useState<Record<string, boolean>>(() =>
    loadInstantStorage(STORAGE_KEYS.PHYSICAL_TARGETS, {})
  );

  // Direct instant persistence for mental training targets
  const [checkedMentalTargets, setCheckedMentalTargets] = useState<Record<string, boolean>>(() =>
    loadInstantStorage(STORAGE_KEYS.MENTAL_TARGETS, {})
  );

  // Direct instant persistence for user daily reflection notes per day
  const [dayNotes, setDayNotes] = useState<Record<number, string>>(() =>
    loadInstantStorage(STORAGE_KEYS.DAY_NOTES, {})
  );

  // Synchronous, immediate writes to localStorage
  const handleTogglePillarItem = (id: string) => {
    setCheckedPillarTargets((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      saveInstantStorage(STORAGE_KEYS.PILLAR_TARGETS, next);
      return next;
    });
  };

  const handleResetPillarItems = () => {
    if (window.confirm('Reset all 62-day target checkmarks?')) {
      saveInstantStorage(STORAGE_KEYS.PILLAR_TARGETS, {});
      setCheckedPillarTargets({});
    }
  };

  const handleToggleDayTarget = (key: string) => {
    setCheckedDayTargets((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveInstantStorage(STORAGE_KEYS.DAY_TARGETS, next);
      return next;
    });
  };

  const handleTogglePhysicalTarget = (key: string) => {
    setCheckedPhysicalTargets((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveInstantStorage(STORAGE_KEYS.PHYSICAL_TARGETS, next);
      return next;
    });
  };

  const handleToggleMentalTarget = (key: string) => {
    setCheckedMentalTargets((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveInstantStorage(STORAGE_KEYS.MENTAL_TARGETS, next);
      return next;
    });
  };

  const handleUpdateDayNotes = (dayNumber: number, note: string) => {
    setDayNotes((prev) => {
      const next = { ...prev, [dayNumber]: note };
      saveInstantStorage(STORAGE_KEYS.DAY_NOTES, next);
      return next;
    });
  };

  // Compute total completed academic targets across all 50 days
  const totalAcademicCount = dailyLogs.reduce((acc, d) => acc + d.academicTargets.length, 0);
  const completedAcademicCount = Object.values(checkedDayTargets).filter(Boolean).length;

  // Compute total completed physical targets across all 50 days
  const totalPhysicalCount = dailyLogs.reduce(
    (acc, d) => acc + d.cardioAndPushUps.length + d.coreLegsAndPull.length,
    0
  );
  const completedPhysicalCount = Object.values(checkedPhysicalTargets).filter(Boolean).length;

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'logs') {
      // User entered Day-by-Day Execution Log section -> trigger auto-opening of today's day (e.g. D2)
      setLogsNavTimestamp(Date.now());
    }
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['vision', 'targets', 'principles', 'laws', 'system', 'logs'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(`section-${section}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={scrollToSection}
        completedAcademicCount={completedAcademicCount}
        totalAcademicCount={totalAcademicCount}
        completedPhysicalCount={completedPhysicalCount}
        totalPhysicalCount={totalPhysicalCount}
        todayDayNumber={todayDayNumber}
      />

      {/* Main Content Sections */}
      <main id="main-content-flow">
        {/* Section 1: Page 1 */}
        <VisionSection onExploreNext={() => scrollToSection('targets')} />

        {/* Section 2: Page 2 */}
        <Plan62DaysSection
          checkedItems={checkedPillarTargets}
          onToggleItem={handleTogglePillarItem}
          onResetItems={handleResetPillarItems}
        />

        {/* Section 3: Pages 3 & 4 */}
        <PrinciplesSection />

        {/* Section 4: Page 5 */}
        <PersonalLawsSection />

        {/* Section 5: Page 6 */}
        <DailySystemSection />

        {/* Section 7: Pages 7 to 56 */}
        <DailyLogsSection
          checkedDayTargets={checkedDayTargets}
          onToggleDayTarget={handleToggleDayTarget}
          checkedPhysicalTargets={checkedPhysicalTargets}
          onTogglePhysicalTarget={handleTogglePhysicalTarget}
          checkedMentalTargets={checkedMentalTargets}
          onToggleMentalTarget={handleToggleMentalTarget}
          dayNotes={dayNotes}
          onUpdateDayNotes={handleUpdateDayNotes}
          logsNavTimestamp={logsNavTimestamp}
        />
      </main>

      {/* Back to top floating button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-3 rounded-xl bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-slate-300 border border-slate-700/80 shadow-2xl backdrop-blur-md transition-all group"
          title="Scroll to Top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Site Footer */}
      <footer className="border-t border-slate-800/80 bg-[#080c14] py-12 px-4 sm:px-6 lg:px-8 text-center text-xs font-mono text-slate-400 space-y-4">
        <div className="flex items-center justify-center gap-2 text-amber-400 font-bold font-cinzel text-sm">
          <span>PRINCE 3.0</span>
          <span>•</span>
          <span>THE SHIFT FROM VERSION 2.0 TO VERSION 3.0</span>
        </div>
        <p className="max-w-xl mx-auto text-slate-400 leading-relaxed font-sans text-xs">
          Target: June 2027 · A calm, disciplined, academically elite, physically healthy, strategically thinking, socially intelligent and highly competent young person.
        </p>
        <div className="pt-2 text-slate-400">
          8 September 2026 — 27 October 2026 · 62-Day Plan & Daily Target Log
        </div>
      </footer>
    </div>
  );
}
