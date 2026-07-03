import type { JourneyStage } from '@/types/common';

/**
 * Determine a user's Journey Stage based on their Financial Health Score.
 */
export function getJourneyStage(score: number): JourneyStage {
  if (score < 35) return 'Starter';
  if (score < 55) return 'Builder';
  if (score < 75) return 'Organizer';
  return 'Wealth Builder';
}
