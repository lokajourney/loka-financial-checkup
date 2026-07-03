import type { L1FormData } from '@/types/assessment';
import type { FinancialMetrics } from '@/types/result';

/**
 * Calculate a Financial Health Score from 0–100.
 * Breakdown:
 *   - Saving Rate:   0–25 pts
 *   - DSR:           0–20 pts
 *   - Emergency Fund:0–20 pts
 *   - Investment:    0–15 pts
 *   - Habits:        0–20 pts (5 habits × 4 pts each)
 */
export function calculateScore(metrics: FinancialMetrics, form: L1FormData): number {
  let score = 0;

  // 1. Saving Rate (0–25)
  if      (metrics.savingRate >= 20) score += 25;
  else if (metrics.savingRate >= 10) score += 18;
  else if (metrics.savingRate >= 5)  score += 10;
  else if (metrics.savingRate > 0)   score += 4;

  // 2. Debt Service Ratio (0–20)
  if      (metrics.dsr === 0)  score += 20;
  else if (metrics.dsr <= 20)  score += 15;
  else if (metrics.dsr <= 30)  score += 9;
  else if (metrics.dsr <= 40)  score += 3;

  // 3. Emergency Fund (0–20) — uses the specific emergencyFund field
  if      (metrics.efMonths >= 6) score += 20;
  else if (metrics.efMonths >= 3) score += 13;
  else if (metrics.efMonths >= 1) score += 6;

  // 4. Investment presence (0–15)
  if (metrics.investment > 0) {
    score += form.habits['ir'] ? 15 : 8;
  }

  // 5. Habits (0–20): 5 habits × 4 pts
  const habitCount = Object.values(form.habits).filter(Boolean).length;
  score += habitCount * 4;

  return Math.min(100, Math.round(score));
}
