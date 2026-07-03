import React, { createContext, useReducer, useMemo } from 'react';
import { assessmentReducer, initialState } from './assessmentReducer';
import type { AssessmentState, AssessmentAction } from './assessmentReducer';

interface AssessmentContextValue {
  state: AssessmentState;
  dispatch: React.Dispatch<AssessmentAction>;
}

export const AssessmentContext = createContext<AssessmentContextValue | null>(null);

interface AssessmentProviderProps {
  children: React.ReactNode;
}

export function AssessmentProvider({ children }: AssessmentProviderProps) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}
