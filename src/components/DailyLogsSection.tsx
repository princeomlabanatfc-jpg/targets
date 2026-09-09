import React, { useState, useEffect } from 'react';
import { dailyLogs } from '../data/dailyLogsData';
import { DailyLogDay } from '../types';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Flame,
  Search,
  CheckCircle2,
  Circle,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  Award,
  Layers,
  Dumbbell,
  Brain,
  Quote,
  CheckCircle,
} from 'lucide-react';
import { getTodayDayNumber, getTodayDateString, isDayToday } from '../utils/dateUtils';

interface DailyLogsSectionProps {
  checkedDayTargets: Record<string, boolean>;
  onToggleDayTarget: (key: string) => void;
  checkedPhysicalTargets: Record<string, boolean>;
  onTogglePhysicalTarget: (key: string) => void;
  checkedMentalTargets: Record<string, boolean>;
  onToggleMentalTarget: (key: string) => void;
  dayNotes: Record<number, string>;
  onUpdateDayNotes: (dayNumber: number, note: string) => void;
  logsNavTimestamp?: number;
}

export const DailyLogsSection: React.FC<DailyLogsSectionProps> = ({
  checkedDayTargets,
  onToggleDayTarget,
  checkedPhysicalTargets,
  onTogglePhysicalTarget,
  checkedMentalTargets,
  onToggleMentalTarget,
  dayNotes,
  onUpdateDayNotes,
  logsNavTimestamp,
}) => {
  const todayDayNumber = getTodayDayNumber();
  const todayDateString = getTodayDateString();

  // Automatically opens today's real-time day (e.g. Day 2 on 9/9/2026)
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(() => todayDayNumber);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'single' | 'all'>('single');

  // When user clicks the logs section or navigation triggers it, auto-open today's day
  useEffect(() => {
    if (logsNavTimestamp) {
      setSelectedDayNumber(todayDayNumber);
      setViewMode('single');
    }
  }, [logsNavTimestamp, todayDayNumber]);

  // Auto-scroll ribbon to center the selected/today day pill
  useEffect(() => {
    const el = document.getElementById(`day-selector-btn-${selectedDayNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [selectedDayNumber]);

  // Breath hold timer state
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [initialTimerSeconds, setInitialTimerSeconds] = useState(60);

  const currentDay = dailyLogs.find((d) => d.dayNumber === selectedDayNumber) || dailyLogs[0];

  // Set initial timer seconds based on current day mental training duration
  useEffect(() => {
    let secs = 60;
    if (currentDay.mentalTraining.duration.includes('3.0')) {
      secs = 180;
    } else if (currentDay.mentalTraining.duration.includes('2.0')) {
      secs = 120;
    } else if (currentDay.mentalTraining.duration.includes('1.5')) {
      secs = 90;
    } else {
      secs = 60;
    }
    setInitialTimerSeconds(secs);
    setTimerSeconds(secs);
    setTimerActive(false);
  }, [currentDay.dayNumber, currentDay.mentalTraining.duration]);

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  // Filtered days for search
  const filteredDays = dailyLogs.filter((d) => {
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    const matchDay = d.dayNumber.toString().includes(q);
    const matchDate = d.date.toLowerCase().includes(q);
    const matchTargets = d.academicTargets.some((t) => t.toLowerCase().includes(q));
    const matchTest = d.coachingTest
      ? d.coachingTest.maths.toLowerCase().includes(q) ||
        d.coachingTest.physics.toLowerCase().includes(q) ||
        d.coachingTest.chemistry.toLowerCase().includes(q)
      : false;
    const matchMilestone = d.milestoneTitle ? d.milestoneTitle.toLowerCase().includes(q) : false;
    return matchDay || matchDate || matchTargets || matchTest || matchMilestone;
  });

  const coachingDays = dailyLogs.filter((d) => d.coachingTest);
  const freeDays = dailyLogs.filter((d) => d.isFreeDay);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const renderDayContent = (day: DailyLogDay, isCompact = false) => {
    return (
      <div
        key={day.dayNumber}
        id={`daily-log-day-${day.dayNumber}`}
        className="rounded-2xl bg-[#0e1627] border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden"
      >
        {/* Subtle decorative cycle line */}
        <div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 transition-all"
          style={{ width: `${day.percentThroughCycle}%` }}
        />

        {/* Real-time Today Active Indicator */}
        {isDayToday(day.dayNumber) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/50 shadow-lg shadow-amber-500/10">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <span className="text-xs font-mono font-black text-amber-300 tracking-wider uppercase">
                TODAY'S ACTIVE TARGETS (DAY {day.dayNumber} OF {day.totalDays}) · {day.date}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-500/30">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>Direct Storage Sync Active</span>
            </div>
          </div>
        )}

        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-black border border-slate-700 font-mono font-black text-sm sm:text-base text-amber-400">
                DAY {day.dayNumber}
              </span>
              <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                OF {day.totalDays} · BEFORE DIWALI CYCLE
              </span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xl sm:text-2xl font-bold font-sans text-slate-100">
                {day.date}
              </span>
              <span className="text-sm font-mono text-amber-400/90 font-semibold">
                {day.dayOfWeek}
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs font-mono text-slate-400">
              {day.percentThroughCycle}% through the cycle
            </div>
            <div className="w-32 h-2 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full"
                style={{ width: `${day.percentThroughCycle}%` }}
              />
            </div>
          </div>
        </div>

        {/* Milestone Banner (e.g. Day 50) */}
        {day.isMilestone && (
          <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500/50 text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-bold">
              <Award className="w-4 h-4" />
              <span>M I L E S T O N E</span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-cinzel text-amber-200">
              {day.milestoneTitle}
            </div>
          </div>
        )}

        {/* Free Day Banner (Day 16, Day 49) */}
        {day.isFreeDay && (
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-2">
            <div className="text-base sm:text-lg font-mono font-black text-emerald-400 tracking-wider">
              FREE DAY · ENJOY
            </div>
            {day.freeDayNote && (
              <p className="text-xs sm:text-sm text-slate-300 font-sans italic">
                {day.freeDayNote}
              </p>
            )}
          </div>
        )}

        {/* Coaching Test (Sundays) */}
        {day.coachingTest && (
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-950/20 via-slate-900 to-amber-950/20 border-2 border-amber-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold tracking-widest text-amber-400">
                COACHING TEST
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-semibold">
                {day.coachingTest.duration}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Maths</span>
                <span className="text-slate-100 font-medium">{day.coachingTest.maths}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Physics</span>
                <span className="text-slate-100 font-medium">{day.coachingTest.physics}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Chemistry</span>
                <span className="text-slate-100 font-medium">{day.coachingTest.chemistry}</span>
              </div>
            </div>
          </div>
        )}

        {/* Academic Targets */}
        {day.academicTargets.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-sky-400" />
                <h4 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                  ACADEMIC TARGETS
                </h4>
              </div>
              {day.speedPracticeNote && (
                <span className="flex items-center gap-1 text-xs font-mono text-amber-400 font-semibold">
                  <Zap className="w-3.5 h-3.5 fill-amber-400" />
                  <span>Speed practice — important</span>
                </span>
              )}
            </div>

            <ul className="space-y-2.5">
              {day.academicTargets.map((target, idx) => {
                const targetKey = `day-${day.dayNumber}-target-${idx}`;
                const isChecked = !!checkedDayTargets[targetKey];

                return (
                  <li
                    key={idx}
                    onClick={() => onToggleDayTarget(targetKey)}
                    className={`flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-950/20 text-slate-400'
                        : 'hover:bg-slate-800/50 text-slate-200'
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 flex-shrink-0 text-slate-500 hover:text-amber-400 transition-colors"
                      aria-label="Toggle target"
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                    <span
                      className={`text-sm font-sans leading-relaxed ${
                        isChecked ? 'line-through text-slate-400' : 'font-medium'
                      }`}
                    >
                      {target}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Mental Training with Interactive Target Checkmark */}
        {(() => {
          const mentalKey = `day-${day.dayNumber}-mental`;
          const isMentalChecked = !!checkedMentalTargets[mentalKey];

          return (
            <div
              className={`p-4 rounded-xl border transition-all ${
                isMentalChecked
                  ? 'bg-emerald-950/25 border-emerald-500/40 shadow-sm'
                  : 'bg-purple-950/20 border-purple-500/30'
              } flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
            >
              <div
                onClick={() => onToggleMentalTarget(mentalKey)}
                className="flex items-start gap-3 cursor-pointer group flex-1"
              >
                <button
                  type="button"
                  aria-label="Toggle mental training completion"
                  className="mt-0.5 flex-shrink-0"
                >
                  {isMentalChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                  ) : (
                    <Circle className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  )}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono tracking-widest uppercase font-semibold ${
                        isMentalChecked ? 'text-emerald-400' : 'text-purple-400'
                      }`}
                    >
                      MENTAL TRAINING
                    </span>
                    {isMentalChecked && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        COMPLETED
                      </span>
                    )}
                  </div>
                  <div
                    className={`text-sm font-bold font-sans mt-0.5 flex items-center gap-2 transition-all ${
                      isMentalChecked ? 'line-through text-slate-400' : 'text-slate-100'
                    }`}
                  >
                    <span>{day.mentalTraining.title}</span>
                    {day.mentalTraining.note && (
                      <span className="text-xs font-mono text-purple-300 font-normal">
                        {day.mentalTraining.note}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Interactive Breath Timer (Only in detailed view or clickable) */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-base font-black text-purple-300 px-3 py-1 rounded bg-purple-900/40 border border-purple-500/40">
                  {day.dayNumber === selectedDayNumber && timerActive
                    ? formatTimer(timerSeconds)
                    : day.mentalTraining.duration}
                </span>

                {day.dayNumber === selectedDayNumber && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setTimerActive(!timerActive)}
                      className="p-1.5 rounded-lg bg-purple-800/60 hover:bg-purple-700 text-purple-200"
                      title={timerActive ? 'Pause' : 'Start Focus Timer'}
                    >
                      {timerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => {
                        setTimerActive(false);
                        setTimerSeconds(initialTimerSeconds);
                      }}
                      className="p-1.5 rounded-lg bg-purple-900/40 hover:bg-purple-800 text-purple-300"
                      title="Reset Timer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* Physical Training */}
        {(() => {
          const totalDayPhysical = day.cardioAndPushUps.length + day.coreLegsAndPull.length;
          const completedDayCardio = day.cardioAndPushUps.filter(
            (_, idx) => !!checkedPhysicalTargets[`day-${day.dayNumber}-cardio-${idx}`]
          ).length;
          const completedDayCore = day.coreLegsAndPull.filter(
            (_, idx) => !!checkedPhysicalTargets[`day-${day.dayNumber}-core-${idx}`]
          ).length;
          const completedDayPhysical = completedDayCardio + completedDayCore;
          const isAllDayPhysicalCompleted =
            totalDayPhysical > 0 && completedDayPhysical === totalDayPhysical;

          return (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                    PHYSICAL TRAINING TARGETS
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isAllDayPhysicalCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-900 border border-slate-800 text-slate-400'
                    }`}
                  >
                    {completedDayPhysical}/{totalDayPhysical} Completed
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Cardio & Push-Ups */}
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      CARDIO & PUSH-UPS
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      {completedDayCardio}/{day.cardioAndPushUps.length} done
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs font-mono">
                    {day.cardioAndPushUps.map((item, idx) => {
                      const targetKey = `day-${day.dayNumber}-cardio-${idx}`;
                      const isChecked = !!checkedPhysicalTargets[targetKey];

                      return (
                        <div
                          key={idx}
                          id={`physical-cardio-${day.dayNumber}-${idx}`}
                          onClick={() => onTogglePhysicalTarget(targetKey)}
                          className={`flex items-center justify-between py-1.5 px-2 rounded-lg cursor-pointer transition-all border ${
                            isChecked
                              ? 'bg-emerald-950/30 border-emerald-500/30 text-slate-400'
                              : 'bg-slate-900/40 hover:bg-slate-800/60 border-slate-800/60 text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <button
                              type="button"
                              aria-label={`Toggle target ${item.name}`}
                              className="flex-shrink-0 text-slate-500 hover:text-emerald-400 transition-colors"
                            >
                              {isChecked ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-500 hover:text-emerald-400" />
                              )}
                            </button>
                            <span
                              className={`text-xs font-sans truncate ${
                                isChecked ? 'line-through text-slate-400' : 'text-slate-200 font-medium'
                              }`}
                            >
                              {item.name}
                              {item.isOptional && (
                                <span className="text-slate-500 font-mono text-[10px] ml-1.5">
                                  (optional)
                                </span>
                              )}
                            </span>
                          </div>
                          <span
                            className={`font-bold font-mono text-xs flex-shrink-0 ${
                              isChecked ? 'text-emerald-400/70' : 'text-amber-300'
                            }`}
                          >
                            {item.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Core, Legs & Pull */}
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      CORE, LEGS & PULL
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      {completedDayCore}/{day.coreLegsAndPull.length} done
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs font-mono">
                    {day.coreLegsAndPull.map((item, idx) => {
                      const targetKey = `day-${day.dayNumber}-core-${idx}`;
                      const isChecked = !!checkedPhysicalTargets[targetKey];

                      return (
                        <div
                          key={idx}
                          id={`physical-core-${day.dayNumber}-${idx}`}
                          onClick={() => onTogglePhysicalTarget(targetKey)}
                          className={`flex items-center justify-between py-1.5 px-2 rounded-lg cursor-pointer transition-all border ${
                            isChecked
                              ? 'bg-emerald-950/30 border-emerald-500/30 text-slate-400'
                              : 'bg-slate-900/40 hover:bg-slate-800/60 border-slate-800/60 text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <button
                              type="button"
                              aria-label={`Toggle target ${item.name}`}
                              className="flex-shrink-0 text-slate-500 hover:text-emerald-400 transition-colors"
                            >
                              {isChecked ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-500 hover:text-emerald-400" />
                              )}
                            </button>
                            <span
                              className={`text-xs font-sans truncate ${
                                isChecked ? 'line-through text-slate-400' : 'text-slate-200 font-medium'
                              }`}
                            >
                              {item.name}
                            </span>
                          </div>
                          <span
                            className={`font-bold font-mono text-xs flex-shrink-0 ${
                              isChecked ? 'text-emerald-400/70' : 'text-emerald-400'
                            }`}
                          >
                            {item.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Evening Manifestation */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1">
          <div className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-semibold flex items-center gap-1.5">
            <Quote className="w-3 h-3" />
            <span>EVENING MANIFESTATION</span>
          </div>
          <p className="text-sm font-sans font-medium text-amber-200/95 italic pl-4 border-l-2 border-amber-500/40">
            {day.eveningManifestation}
          </p>
        </div>

        {/* Daily Reflection & Execution Notes (Direct Instant Auto-Save) */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300 font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Day {day.dayNumber} Execution Log & Reflection</span>
            </div>
            <span className="text-[10px] text-emerald-400/90 font-mono flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              Direct storage active
            </span>
          </div>
          <textarea
            value={dayNotes[day.dayNumber] || ''}
            onChange={(e) => onUpdateDayNotes(day.dayNumber, e.target.value)}
            placeholder={`Record your questions solved, mock scores, key mistakes, or observations for Day ${day.dayNumber}...`}
            rows={2}
            className="w-full p-3 rounded-lg bg-[#0b0f19] border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/80 transition-colors resize-y"
          />
        </div>

        {/* Footer info line matching PDF */}
        <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-800/60">
          <span>Prince 3.0 · 62-Day Plan</span>
          <span>Day {day.dayNumber} / 50</span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="section-logs"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0f19] border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono tracking-widest uppercase mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Section 7 · Pages 7 to 56</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-cinzel text-slate-100 tracking-tight">
              Day-by-Day Execution Log
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 font-sans">
              Complete 50 daily logs with exact targets, training parameters, tests, and manifestations.
            </p>
          </div>

          {/* Controls: Search & View Mode */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center">
              <button
                onClick={() => setViewMode('single')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  viewMode === 'single'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Single Day View
              </button>
              <button
                onClick={() => setViewMode('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  viewMode === 'all'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All 50 Days View
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search day, chapter, test..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Quick Filter Tags (Coaching Tests, Free Days, Milestones) */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-400 mr-1">Quick Jumps:</span>

          {/* Today Button */}
          <button
            id="quick-jump-today-btn"
            onClick={() => {
              setSelectedDayNumber(todayDayNumber);
              setViewMode('single');
            }}
            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>Today: Day {todayDayNumber} ({todayDateString})</span>
          </button>

          <button
            onClick={() => {
              setSelectedDayNumber(1);
              setViewMode('single');
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-amber-500/40"
          >
            Day 1 Baseline
          </button>
          {coachingDays.map((d) => (
            <button
              key={d.dayNumber}
              onClick={() => {
                setSelectedDayNumber(d.dayNumber);
                setViewMode('single');
              }}
              className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
            >
              Day {d.dayNumber} Test
            </button>
          ))}
          {freeDays.map((d) => (
            <button
              key={d.dayNumber}
              onClick={() => {
                setSelectedDayNumber(d.dayNumber);
                setViewMode('single');
              }}
              className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300"
            >
              Day {d.dayNumber} Free
            </button>
          ))}
          <button
            onClick={() => {
              setSelectedDayNumber(50);
              setViewMode('single');
            }}
            className="px-2.5 py-1 rounded-lg bg-purple-950/40 border border-purple-500/40 text-purple-300 font-bold"
          >
            Day 50 Physics Start
          </button>
        </div>

        {/* Day Selector Ribbon (50 pills) */}
        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-max">
            {dailyLogs.map((d) => {
              const isSelected = selectedDayNumber === d.dayNumber && viewMode === 'single';
              const isToday = d.dayNumber === todayDayNumber;
              const hasTest = !!d.coachingTest;
              const isFree = !!d.isFreeDay;
              const isMilestone = !!d.isMilestone;

              return (
                <button
                  key={d.dayNumber}
                  id={`day-selector-btn-${d.dayNumber}`}
                  onClick={() => {
                    setSelectedDayNumber(d.dayNumber);
                    setViewMode('single');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all relative ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-105 z-10'
                      : isToday
                      ? 'bg-amber-500/20 text-amber-300 border-2 border-amber-400/80 font-black hover:bg-amber-500/30'
                      : hasTest
                      ? 'bg-amber-950/40 text-amber-300 border border-amber-500/40 hover:bg-amber-900/40'
                      : isFree
                      ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/40'
                      : isMilestone
                      ? 'bg-purple-950/40 text-purple-300 border border-purple-500/40 hover:bg-purple-900/40'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span>D{d.dayNumber}</span>
                    {isToday && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400 text-slate-950 uppercase font-black">
                        TODAY
                      </span>
                    )}
                  </div>
                  {hasTest && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute top-1 right-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows for Single Day View */}
        {viewMode === 'single' && (
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setSelectedDayNumber((prev) => Math.max(1, prev - 1))}
              disabled={selectedDayNumber === 1}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none border border-slate-800 text-slate-200 text-xs font-mono flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Day {Math.max(1, selectedDayNumber - 1)}</span>
            </button>

            <div className="text-center">
              <span className="text-xs font-mono text-slate-400">
                Viewing Day <strong className="text-amber-300">{selectedDayNumber}</strong> of 50
              </span>
            </div>

            <button
              onClick={() => setSelectedDayNumber((prev) => Math.min(50, prev + 1))}
              disabled={selectedDayNumber === 50}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none border border-slate-800 text-slate-200 text-xs font-mono flex items-center gap-2"
            >
              <span>Day {Math.min(50, selectedDayNumber + 1)}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Display Main Content */}
        {viewMode === 'single' ? (
          renderDayContent(currentDay)
        ) : (
          <div className="space-y-8">
            {filteredDays.map((day) => renderDayContent(day))}
            {filteredDays.length === 0 && (
              <div className="py-12 text-center text-slate-500 font-mono text-sm">
                No day logs match &ldquo;{searchQuery}&rdquo;.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
