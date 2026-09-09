import { TargetArea } from '../types';

export const targetsData = {
  headerTag: "MY ACTUAL 62-DAY PLAN / TARGETS",
  title: "Prince 3.0 — Before Diwali",
  subtitle: "Six target areas to build simultaneously over the 62-day cycle.",
  sleepTime: {
    label: "SLEEP TIME",
    range: "9:00 PM → 3:00 AM",
  },
  areas: [
    {
      id: "academics",
      title: "ACADEMICS",
      color: "border-sky-500/40 text-sky-400 bg-sky-950/20",
      items: [
        { id: "acad-1", text: "Mathematics — full syllabus completed" },
        { id: "acad-2", text: "Mathematics — first revision completed" },
        { id: "acad-3", text: "Mathematics — mixed tests completed" },
        { id: "acad-4", text: "Physics — 8–10 chapters" },
        { id: "acad-5", text: "Physics — one-time revision" },
      ],
    },
    {
      id: "self-control",
      title: "SELF-CONTROL",
      color: "border-rose-500/40 text-rose-400 bg-rose-950/20",
      items: [
        { id: "sc-1", text: "Social media removed / restricted — Instagram & YouTube" },
        { id: "sc-2", text: "Phone controlled" },
        { id: "sc-3", text: "Laptop only for defined tasks — target-oriented tasks only" },
        { id: "sc-4", text: "No purposeless browsing" },
        { id: "sc-5", text: "No unnecessary conversations with anyone" },
        { id: "sc-6", text: "Daily targets must be completed before end of day" },
        { id: "sc-7", text: "No masturbation and no porn videos" },
        { id: "sc-8", text: "Don't talk with Anvii" },
      ],
    },
    {
      id: "cognition",
      title: "COGNITION",
      color: "border-purple-500/40 text-purple-400 bg-purple-950/20",
      items: [
        { id: "cog-1", text: "Meditation — memory, focus, calmness" },
        { id: "cog-2", text: "Visualization — peak detailing" },
        { id: "cog-3", text: "Observation — peak detailing" },
        { id: "cog-4", text: "Scenario analysis / planning — every single moment" },
        { id: "cog-5", text: "Pattern recognition" },
        { id: "cog-6", text: "First-principles analysis" },
      ],
    },
    {
      id: "body",
      title: "BODY",
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20",
      items: [
        { id: "bod-1", text: "Regular exercise" },
        { id: "bod-2", text: "Proper body shape" },
        { id: "bod-3", text: "Good posture habits" },
        { id: "bod-4", text: "Adequate nutrition" },
        { id: "bod-5", text: "Adequate sleep" },
        { id: "bod-6", text: "Body growth" },
      ],
    },
    {
      id: "communication",
      title: "COMMUNICATION",
      color: "border-teal-500/40 text-teal-400 bg-teal-950/20",
      items: [
        { id: "com-1", text: "Mirror speaking" },
        { id: "com-2", text: "Video recording — upload on “Think Out Loud” — expressions and voice" },
        { id: "com-3", text: "Clear explanation practice" },
        { id: "com-4", text: "Eye-contact practice" },
        { id: "com-5", text: "Body-language awareness" },
      ],
    },
    {
      id: "character",
      title: "CHARACTER",
      color: "border-amber-500/40 text-amber-400 bg-amber-950/20",
      items: [
        { id: "cha-1", text: "Keep commitments" },
        { id: "cha-2", text: "No excuses" },
        { id: "cha-3", text: "No unnecessary drama" },
        { id: "cha-4", text: "Admit mistakes quickly" },
        { id: "cha-5", text: "Correct weaknesses" },
        { id: "cha-6", text: "Protect values" },
      ],
    },
  ] as TargetArea[],
};
