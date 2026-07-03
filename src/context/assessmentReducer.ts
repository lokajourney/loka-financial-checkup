import type { AppScreen } from '@/types/common';
import type { L1FormData, L2FormData } from '@/types/assessment';
import type { AnalysisResult } from '@/types/result';
import { DEFAULT_L1, DEFAULT_L2 } from '@/types/assessment';

export interface AssessmentState {
  screen: AppScreen;
  l1Step: number;
  l2Step: number;
  l1Form: L1FormData;
  l2Form: L2FormData;
  score: number;
  analysisResult: AnalysisResult | null;
}

export const initialState: AssessmentState = {
  screen: 'landing',
  l1Step: 1,
  l2Step: 1,
  l1Form: DEFAULT_L1,
  l2Form: DEFAULT_L2,
  score: 0,
  analysisResult: null,
};

export type AssessmentAction =
  | { type: 'NAVIGATE'; payload: AppScreen }
  | { type: 'SET_L1_STEP'; payload: number }
  | { type: 'SET_L2_STEP'; payload: number }
  | { type: 'UPDATE_L1'; payload: Partial<L1FormData> }
  | { type: 'UPDATE_L2'; payload: Partial<L2FormData> }
  | { type: 'SET_SCORE'; payload: number }
  | { type: 'SET_ANALYSIS_RESULT'; payload: AnalysisResult }
  | { type: 'RESET' };

export function assessmentReducer(
  state: AssessmentState,
  action: AssessmentAction,
): AssessmentState {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, screen: action.payload };

    case 'SET_L1_STEP':
      return { ...state, l1Step: action.payload };

    case 'SET_L2_STEP':
      return { ...state, l2Step: action.payload };

    case 'UPDATE_L1':
      return { ...state, l1Form: { ...state.l1Form, ...action.payload } };

    case 'UPDATE_L2':
      return { ...state, l2Form: { ...state.l2Form, ...action.payload } };

    case 'SET_SCORE':
      return { ...state, score: action.payload };

    case 'SET_ANALYSIS_RESULT':
      return { ...state, analysisResult: action.payload };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}
