import { useMemo } from 'react';
import type { L1FormData, L2FormData } from '@/types/assessment';
import type { AnalysisResult } from '@/types/result';
import { calculateMetrics } from '@/utils/metrics';
import { calculateScore } from '@/utils/scoring';
import { getJourneyStage } from '@/utils/stage';
import { getStrengths } from '@/utils/strengths';
import { getFocusAreas } from '@/utils/focusAreas';
import { getInsights } from '@/utils/insights';
import { getActionPlan } from '@/utils/actionPlan';
import { calculateNetWorth, hasNetWorthData } from '@/utils/netWorth';
import { getProductRecommendation } from '@/utils/recommendation';
import { getWarnings } from '@/utils/warnings';

/**
 * Computes the full AnalysisResult from L1 + L2 form data.
 * All computation is memoized and pure.
 *
 * @param withL2 - Whether to include L2-specific analysis (net worth, full recommendation, full action plan)
 */
export function useAnalysisResult(
  l1Form: L1FormData,
  l2Form: L2FormData,
  withL2 = false,
): AnalysisResult {
  return useMemo(() => {
    const metrics = calculateMetrics(l1Form);
    const score   = calculateScore(metrics, l1Form);
    const stage   = getJourneyStage(score);
    const strengths  = getStrengths(l1Form, metrics).slice(0, withL2 ? 3 : 2);
    const focusAreas = getFocusAreas(l1Form, metrics).slice(0, withL2 ? 3 : 2);
    const warnings   = withL2 ? getWarnings(l1Form, l2Form) : [];
    const insights   = withL2 ? getInsights(stage, metrics, l2Form) : [];
    const actionPlan = withL2 ? getActionPlan(l1Form, metrics, l2Form) : [];
    const netWorth   = withL2 && hasNetWorthData(l2Form)
      ? calculateNetWorth(l1Form, l2Form)
      : undefined;
    const recommendation = withL2
      ? getProductRecommendation(score, l1Form, l2Form)
      : undefined;

    return {
      score,
      stage,
      metrics,
      strengths,
      focusAreas,
      warnings,
      insights,
      actionPlan,
      netWorth,
      recommendation,
    };
  }, [l1Form, l2Form, withL2]);
}
