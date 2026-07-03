import { useContext } from 'react';
import { AssessmentContext } from './AssessmentContext';

/**
 * Hook to consume the Assessment context.
 * Throws if used outside of AssessmentProvider.
 */
export function useAssessmentContext() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessmentContext must be used within AssessmentProvider');
  }
  return context;
}
