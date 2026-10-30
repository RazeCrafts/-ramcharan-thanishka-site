/**
 * Relationship counter.
 * Start date: 20 July 2026. Calculates elapsed time accurately,
 * never hardcodes the displayed values.
 */
export const RELATIONSHIP_START = new Date("2026-07-20T00:00:00").getTime();

export interface Counter {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export function computeCounter(now: number = Date.now()): Counter {
  const diffMs = Math.max(0, now - RELATIONSHIP_START);
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, totalSeconds };
}

export function formatCounter(c: Counter): string {
  return `${c.days} days, ${c.hours}h ${c.minutes}m ${c.seconds}s together`;
}

/** Milestone status relative to now. */
export function milestoneStatus(dateString: string): "past" | "upcoming" {
  const d = new Date(dateString).getTime();
  return d <= Date.now() ? "past" : "upcoming";
}
