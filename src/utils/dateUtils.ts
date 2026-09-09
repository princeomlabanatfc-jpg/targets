import { dailyLogs } from '../data/dailyLogsData';

/**
 * Calculates the current target day number (1 to 50) based on the user's real-time local date.
 * - September 8, 2026 = Day 1
 * - September 9, 2026 = Day 2
 * - ...
 * - October 27, 2026 = Day 50
 */
export function getTodayDayNumber(): number {
  const now = new Date();
  
  const day = now.getDate();
  const month = now.toLocaleString('en-US', { month: 'long' });
  const year = now.getFullYear();
  const formattedToday = `${day} ${month} ${year}`;
  
  // 1. Direct match by date string in dailyLogs (e.g. "9 September 2026")
  const exactMatch = dailyLogs.find(
    (d) => d.date.toLowerCase() === formattedToday.toLowerCase()
  );
  if (exactMatch) {
    return exactMatch.dayNumber;
  }

  // 2. Fallback using midnight timestamp comparison from September 8, 2026
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const planStartMidnight = new Date(2026, 8, 8).getTime(); // Note: Month 8 is September in JS Date

  const diffMs = todayMidnight - planStartMidnight;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const calculatedDay = diffDays + 1;

  if (calculatedDay < 1) {
    return 1;
  }
  if (calculatedDay > 50) {
    return 50;
  }
  return calculatedDay;
}

/**
 * Returns formatted string of current local date, e.g. "9 September 2026"
 */
export function getTodayDateString(): string {
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleString('en-US', { month: 'long' });
  const year = now.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Checks if a specific dayNumber is today's real-time day
 */
export function isDayToday(dayNumber: number): boolean {
  return dayNumber === getTodayDayNumber();
}
