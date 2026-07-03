import type { JourneyStage, ProductId } from './common';

export interface FinancialMetrics {
  income: number;
  expenses: number;
  savingsMonthly: number;
  monthlyDebt: number;
  emergencyFund: number;
  investment: number;
  savingRate: number;
  dsr: number;
  efMonths: number;
  trueSelisih: number;
}

export interface NetWorthBreakdown {
  emergencyFund: number;
  investment: number;
  physicalAssets: number;
  totalAssets: number;
  totalOutstandingDebt: number;
  netWorth: number;
  isPositive: boolean;
}

export interface Strength {
  icon: string;
  title: string;
  description: string;
}

export interface FocusArea {
  icon: string;
  title: string;
  description: string;
}

export interface Warning {
  type: 'pinjol' | 'credit-card';
  title: string;
  description: string;
}

export interface ProductRecommendation {
  id: ProductId;
  name: string;
  why: string;
  features: string[];
}

export interface AnalysisResult {
  score: number;
  stage: JourneyStage;
  metrics: FinancialMetrics;
  strengths: Strength[];
  focusAreas: FocusArea[];
  warnings: Warning[];
  insights: string[];
  actionPlan: string[];
  netWorth?: NetWorthBreakdown;
  recommendation?: ProductRecommendation;
}
