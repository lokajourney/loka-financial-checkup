import type { ProductId } from '@/types/common';
import type { ProductRecommendation } from '@/types/result';

export const PRODUCTS: Record<ProductId, Omit<ProductRecommendation, 'why'>> = {
  premium: {
    id: 'premium',
    name: 'Premium Financial Planner',
    features: [
      'Cashflow tracker bulanan',
      'Dana darurat tracker',
      'Budgeting sederhana',
      'Financial goal starter',
    ],
  },
  ultimate: {
    id: 'ultimate',
    name: 'Ultimate Financial Planner',
    features: [
      'Multiple saving goals',
      'Debt tracker dan strategi pelunasan',
      'Investasi tracker',
      'Net worth monitoring',
    ],
  },
  advanced: {
    id: 'advanced',
    name: 'Advanced Financial Planner',
    features: [
      'Credit card tracker',
      'Multi-account tracker',
      'Portofolio investasi detail',
      'Financial report bulanan',
      'Advanced net worth analysis',
    ],
  },
};
