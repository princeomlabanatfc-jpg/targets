/**
 * Instant direct storage helper for Prince 3.0 execution data.
 * Guarantees immediate, synchronous persistence to localStorage.
 */

export const STORAGE_KEYS = {
  DAY_TARGETS: 'prince3_day_targets',
  PHYSICAL_TARGETS: 'prince3_physical_targets',
  MENTAL_TARGETS: 'prince3_mental_targets',
  PILLAR_TARGETS: 'prince3_pillar_targets',
  DAY_NOTES: 'prince3_day_notes',
} as const;

export function loadInstantStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn(`[Storage] Failed to read ${key}:`, e);
    return defaultValue;
  }
}

export function saveInstantStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`[Storage] Direct save failed for ${key}:`, e);
  }
}
