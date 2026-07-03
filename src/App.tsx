import { AnimatePresence } from 'framer-motion';
import { LandingPage } from '@/pages/LandingPage';
import { AssessmentPage } from '@/pages/AssessmentPage';
import { LoadingPage } from '@/pages/LoadingPage';
import { QuickResultPage } from '@/pages/QuickResultPage';
import { L2AssessmentPage } from '@/pages/L2AssessmentPage';
import { FullResultPage } from '@/pages/FullResultPage';
import { useAssessmentContext } from '@/context/useAssessmentContext';

/**
 * App is a screen-state machine.
 * Navigation is driven by AssessmentContext — no URL routing needed
 * for this linear wizard flow.
 */
export function App() {
  const { state } = useAssessmentContext();
  const { screen } = state;

  return (
    <AnimatePresence mode="wait">
      {screen === 'landing' && (
        <LandingPage key="landing" />
      )}

      {screen === 'l1-assessment' && (
        <AssessmentPage key="l1-assessment" />
      )}

      {screen === 'l1-loading' && (
        <LoadingPage key="l1-loading" type="l1" />
      )}

      {screen === 'quick-result' && (
        <QuickResultPage key="quick-result" />
      )}

      {screen === 'l2-assessment' && (
        <L2AssessmentPage key="l2-assessment" />
      )}

      {screen === 'l2-loading' && (
        <LoadingPage key="l2-loading" type="l2" />
      )}

      {screen === 'full-result' && (
        <FullResultPage key="full-result" />
      )}
    </AnimatePresence>
  );
}
