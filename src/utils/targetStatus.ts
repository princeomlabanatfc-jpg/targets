import { StudyTargetStatus, PhysicalTargetStatus } from '../types';

export function getStudyTargetStatus(value: unknown): StudyTargetStatus | null {
  if (value === 'green' || value === true) return 'green';
  if (value === 'yellow') return 'yellow';
  if (value === 'red') return 'red';
  return null;
}

export function getPhysicalTargetStatus(value: unknown): PhysicalTargetStatus | null {
  if (value === 'green' || value === true) return 'green';
  if (value === 'red') return 'red';
  return null;
}

export function getNextStudyStatus(current: StudyTargetStatus | null): StudyTargetStatus | null {
  if (!current) return 'green';
  if (current === 'green') return 'yellow';
  if (current === 'yellow') return 'red';
  return null;
}

export function getNextPhysicalStatus(current: PhysicalTargetStatus | null): PhysicalTargetStatus | null {
  if (!current) return 'green';
  if (current === 'green') return 'red';
  return null;
}

export const TARGET_STATUS_INFO = {
  study: {
    green: {
      label: 'Done on Target Day',
      shortLabel: 'Done On Day',
      bgColor: 'bg-emerald-950/25',
      borderColor: 'border-emerald-500/40',
      textColor: 'text-emerald-300',
      badgeBg: 'bg-emerald-500/20',
      badgeText: 'text-emerald-300',
      badgeBorder: 'border-emerald-500/30',
      dotColor: 'bg-emerald-400',
    },
    yellow: {
      label: 'Done on Another Day',
      shortLabel: 'Done Another Day',
      bgColor: 'bg-amber-950/25',
      borderColor: 'border-amber-500/40',
      textColor: 'text-amber-300',
      badgeBg: 'bg-amber-500/20',
      badgeText: 'text-amber-300',
      badgeBorder: 'border-amber-500/30',
      dotColor: 'bg-amber-400',
    },
    red: {
      label: 'Not Done',
      shortLabel: 'Not Done',
      bgColor: 'bg-rose-950/25',
      borderColor: 'border-rose-500/40',
      textColor: 'text-rose-300',
      badgeBg: 'bg-rose-500/20',
      badgeText: 'text-rose-300',
      badgeBorder: 'border-rose-500/30',
      dotColor: 'bg-rose-400',
    },
  },
  physical: {
    green: {
      label: 'Done',
      shortLabel: 'Done',
      bgColor: 'bg-emerald-950/25',
      borderColor: 'border-emerald-500/40',
      textColor: 'text-emerald-300',
      badgeBg: 'bg-emerald-500/20',
      badgeText: 'text-emerald-300',
      badgeBorder: 'border-emerald-500/30',
      dotColor: 'bg-emerald-400',
    },
    red: {
      label: 'Not Done',
      shortLabel: 'Not Done',
      bgColor: 'bg-rose-950/25',
      borderColor: 'border-rose-500/40',
      textColor: 'text-rose-300',
      badgeBg: 'bg-rose-500/20',
      badgeText: 'text-rose-300',
      badgeBorder: 'border-rose-500/30',
      dotColor: 'bg-rose-400',
    },
  },
};
