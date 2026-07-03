import { useMemo } from 'react';
import { calculateMetrics } from '@/utils/metrics';
import type { L1FormData } from '@/types/assessment';
import type { FinancialMetrics } from '@/types/result';

/**
 * Memoized hook for financial metrics calculation.
 * Recomputes only when L1 form data changes.
 */
export function useFinancialMetrics(l1Form: L1FormData): FinancialMetrics {
  return useMemo(() => calculateMetrics(l1Form), [l1Form]);
}
