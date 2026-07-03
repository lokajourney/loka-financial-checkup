import { useCallback } from 'react';
import { useAssessmentContext } from '@/context/useAssessmentContext';
import type { AppScreen } from '@/types/common';
import type { L1FormData, L2FormData } from '@/types/assessment';

/**
 * Hook for managing assessment form state and navigation.
 * Abstracts dispatch calls into semantic actions.
 */
export function useAssessmentForm() {
  const { state, dispatch } = useAssessmentContext();

  const navigate = useCallback((screen: AppScreen) => {
    dispatch({ type: 'NAVIGATE', payload: screen });
  }, [dispatch]);

  const setL1Step = useCallback((step: number) => {
    dispatch({ type: 'SET_L1_STEP', payload: step });
  }, [dispatch]);

  const setL2Step = useCallback((step: number) => {
    dispatch({ type: 'SET_L2_STEP', payload: step });
  }, [dispatch]);

  const updateL1 = useCallback((data: Partial<L1FormData>) => {
    dispatch({ type: 'UPDATE_L1', payload: data });
  }, [dispatch]);

  const updateL2 = useCallback((data: Partial<L2FormData>) => {
    dispatch({ type: 'UPDATE_L2', payload: data });
  }, [dispatch]);

  const setL1Field = useCallback(<K extends keyof L1FormData>(
    key: K,
    value: L1FormData[K],
  ) => {
    dispatch({ type: 'UPDATE_L1', payload: { [key]: value } as Partial<L1FormData> });
  }, [dispatch]);

  const setL2Field = useCallback(<K extends keyof L2FormData>(
    key: K,
    value: L2FormData[K],
  ) => {
    dispatch({ type: 'UPDATE_L2', payload: { [key]: value } as Partial<L2FormData> });
  }, [dispatch]);

  const toggleL1Record = useCallback((
    field: 'habits' | 'goals' | 'debtTypes',
    key: string,
    exclusive?: boolean,
  ) => {
    const current = state.l1Form[field];
    let updated: Record<string, boolean>;
    if (exclusive) {
      updated = { [key]: !current[key] };
    } else if (key === 'na' || key === 'no') {
      // "None" option clears all others
      updated = { [key]: !current[key] };
    } else {
      updated = { ...current, na: false, no: false, [key]: !current[key] };
    }
    dispatch({ type: 'UPDATE_L1', payload: { [field]: updated } });
  }, [state.l1Form, dispatch]);

  const toggleL2Record = useCallback((
    field: 'investmentTypes' | 'debtTypes',
    key: string,
  ) => {
    const current = state.l2Form[field];
    let updated: Record<string, boolean>;
    if (key === 'no') {
      updated = { no: !current[key] };
    } else {
      updated = { ...current, no: false, [key]: !current[key] };
    }
    dispatch({ type: 'UPDATE_L2', payload: { [field]: updated } });
  }, [state.l2Form, dispatch]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  return {
    state,
    navigate,
    setL1Step,
    setL2Step,
    updateL1,
    updateL2,
    setL1Field,
    setL2Field,
    toggleL1Record,
    toggleL2Record,
    reset,
  };
}
