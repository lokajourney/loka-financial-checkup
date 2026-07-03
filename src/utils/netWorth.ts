import type { L1FormData, L2FormData } from '@/types/assessment';
import type { NetWorthBreakdown } from '@/types/result';
import { parseAmount } from './formatting';

/**
 * Calculate net worth from L1 + L2 data.
 * Only meaningful when L2 data (totalAssets, totalOutstandingDebt) is available.
 */
export function calculateNetWorth(
  l1: L1FormData,
  l2: L2FormData,
): NetWorthBreakdown {
  const emergencyFund      = parseAmount(l1.emergencyFund);
  const investment         = parseAmount(l1.investment);
  const physicalAssets     = parseAmount(l2.totalAssets);
  const totalOutstandingDebt = parseAmount(l2.totalOutstandingDebt);

  const totalAssets  = emergencyFund + investment + physicalAssets;
  const netWorth     = totalAssets - totalOutstandingDebt;

  return {
    emergencyFund,
    investment,
    physicalAssets,
    totalAssets,
    totalOutstandingDebt,
    netWorth,
    isPositive: netWorth >= 0,
  };
}

/**
 * Check whether net worth data is meaningful (user has entered L2 asset/debt data).
 */
export function hasNetWorthData(l2: L2FormData): boolean {
  return parseAmount(l2.totalAssets) > 0 || parseAmount(l2.totalOutstandingDebt) > 0;
}
