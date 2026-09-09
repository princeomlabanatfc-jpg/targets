import { DailyRoutineItem } from '../types';

export const routineData = {
  headerTag: "THE REAL DAILY TARGETS TILL JEE ADVANCED",
  title: "System: Common / General Daily Targets",
  subtitle: "The same wake-to-sleep structure repeats every day of the 62-day cycle.",
  items: [
    {
      time: "3:00 AM",
      title: "Wake up & brush teeth",
      tag: "WAKEUP",
      color: "border-sky-500/30 text-sky-400 bg-sky-950/30",
    },
    {
      time: "+30 min",
      title: "Meditation",
      description: "Candle focus, breathing, and manifestation — 30 minutes.",
      tag: "MIND",
      color: "border-purple-500/30 text-purple-400 bg-purple-950/30",
    },
    {
      time: "+10 min",
      title: "Face massage for proper shape",
      description: "Nose and smile lines — 10 minutes.",
      tag: "RECOVERY",
      color: "border-pink-500/30 text-pink-400 bg-pink-950/30",
    },
    {
      time: "≤ 1 hr",
      title: "Video recording",
      description: "For communication, expressions and voice, max 1 hour with editing (time-skip edited, then back to study).",
      tag: "COMMUNICATION",
      color: "border-teal-500/30 text-teal-400 bg-teal-950/30",
    },
    {
      time: "Gap time",
      title: "Study work",
      description: "In the gap before exercise.",
      tag: "ACADEMICS",
      color: "border-blue-500/30 text-blue-400 bg-blue-950/30",
    },
    {
      time: "Exercise",
      title: "Full training block",
      description: "Running (normal + sprint), stretching for flexibility, push-up variations, pull-ups, plank, squats, TRX row, Russian twist, sit-ups, sprinting leg drills, leg bridges (mid-air hold).",
      tag: "PHYSICAL",
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-950/30",
    },
    {
      time: "After exercise",
      title: "Proper nutrition",
      description: "500 ml milk · 4 bananas · 2–4 spoons sugar (optional) · 2–4 spoons peanut butter · cashews & almonds · extra seeds.",
      tag: "NUTRITION",
      color: "border-amber-500/30 text-amber-400 bg-amber-950/30",
    },
    {
      time: "Remaining time",
      title: "Focused study",
      description: "Only small 5-minute breaks, except for breakfast, lunch, and dinner.",
      tag: "DEEP FOCUS",
      color: "border-indigo-500/30 text-indigo-400 bg-indigo-950/30",
    },
    {
      time: "Before sleep",
      title: "Manifestation",
      description: "Visualize the goal before sleep.",
      tag: "VISION",
      color: "border-violet-500/30 text-violet-400 bg-violet-950/30",
    },
    {
      time: "9:00 PM",
      title: "Sleep",
      description: "Without overthinking.",
      tag: "REST",
      color: "border-cyan-500/30 text-cyan-400 bg-cyan-950/30",
    },
  ] as DailyRoutineItem[],
};
