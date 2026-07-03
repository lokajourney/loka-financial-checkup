import { useEffect } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { FixedNavBar } from '@/components/layout/FixedNavBar';
import { StepHeader } from '@/components/assessment/StepHeader';
import { L2Step1Profile } from '@/components/assessment/steps/L2Step1Profile';
import { L2Step2Protection } from '@/components/assessment/steps/L2Step2Protection';
import { L2Step3Debt } from '@/components/assessment/steps/L2Step3Debt';
import { useAssessmentForm } from '@/hooks/useAssessmentForm';
import { useAnalysisResult } from '@/hooks/useAnalysisResult';
import { trackScreen, trackStepComplete, trackScoreGenerated } from '@/services/analytics';

const TOTAL_STEPS = 3;

const STEP_META = [
  {
    title: 'Profil Singkat',
    description: 'Informasi ini membantu kami menyesuaikan analisis dengan kondisi hidupmu.',
  },
  {
    title: 'Proteksi & Aset',
    description: 'Gambaran perlindungan dan jenis aset yang kamu miliki saat ini.',
  },
  {
    title: 'Utang & Kondisi Emosional',
    description: 'Dua hal ini sering diabaikan tapi punya dampak besar pada kondisi keuangan keseluruhan.',
  },
];

export function L2AssessmentPage() {
  const {
    state,
    navigate,
    setL2Step,
    setL2Field,
    toggleL2Record,
  } = useAssessmentForm();

  const { l2Step, l1Form, l2Form } = state;

  // Compute full analysis to get score + stage for analytics on final step
  const analysisResult = useAnalysisResult(l1Form, l2Form, true);

  useEffect(() => {
    trackScreen('l2-assessment');
  }, []);

  const canProceed = (): boolean => {
    // All steps are optional except basic age on step 1 (we allow empty to not block)
    return true;
  };

  const handleNext = () => {
    trackStepComplete(2, l2Step);
    if (l2Step < TOTAL_STEPS) {
      setL2Step(l2Step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Done — set full result and go to loading
      trackScoreGenerated(analysisResult.score, analysisResult.stage);
      navigate('l2-loading');
    }
  };

  const handleBack = () => {
    if (l2Step > 1) {
      setL2Step(l2Step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('quick-result');
    }
  };

  const meta = STEP_META[l2Step - 1];

  return (
    <PageWrapper>
      <StepHeader
        level={2}
        step={l2Step}
        totalSteps={TOTAL_STEPS}
        title={meta.title}
        description={meta.description}
      />

      {l2Step === 1 && (
        <L2Step1Profile
          form={l2Form}
          onChange={(key, value) => setL2Field(key, value)}
          onAssetChange={(value) => setL2Field('totalAssets', value)}
        />
      )}

      {l2Step === 2 && (
        <L2Step2Protection
          form={l2Form}
          onChange={(key, value) => setL2Field(key, value)}
          onInvestmentTypeToggle={(key) => toggleL2Record('investmentTypes', key)}
        />
      )}

      {l2Step === 3 && (
        <L2Step3Debt
          form={l2Form}
          onChange={(key, value) => setL2Field(key, value)}
          onDebtOutstandingChange={(value) => setL2Field('totalOutstandingDebt', value)}
          onDebtTypeToggle={(key) => toggleL2Record('debtTypes', key)}
        />
      )}

      <FixedNavBar
        onNext={handleNext}
        onBack={handleBack}
        nextLabel={
          l2Step < TOTAL_STEPS
            ? 'Lanjut →'
            : 'Lihat Analisis Lengkap →'
        }
        nextDisabled={!canProceed()}
      />
    </PageWrapper>
  );
}
