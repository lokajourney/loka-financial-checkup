import { useEffect } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { FixedNavBar } from '@/components/layout/FixedNavBar';
import { StepHeader } from '@/components/assessment/StepHeader';
import { L1Step1Name } from '@/components/assessment/steps/L1Step1Name';
import { L1Step2Finance } from '@/components/assessment/steps/L1Step2Finance';
import { L1Step3Habits } from '@/components/assessment/steps/L1Step3Habits';
import { L1Step4Goals } from '@/components/assessment/steps/L1Step4Goals';
import { useAssessmentForm } from '@/hooks/useAssessmentForm';
import { useFinancialMetrics } from '@/hooks/useFinancialMetrics';
import { useAnalysisResult } from '@/hooks/useAnalysisResult';
import { trackScreen, trackStepComplete, trackScoreGenerated } from '@/services/analytics';

const TOTAL_STEPS = 4;

const STEP_META = [
  { title: 'Hei, siapa kamu?', description: 'Nama kamu membantu kami memberikan insight yang lebih personal.' },
  { title: 'Kondisi Keuangan', description: 'Masukkan angka yang paling mendekati kondisi aktualmu tiap bulan.' },
  { title: 'Kebiasaan Finansial', description: 'Centang yang sudah kamu lakukan secara konsisten — jujur menghasilkan rekomendasi yang lebih tepat.' },
  { title: 'Tujuan Saat Ini', description: 'Boleh pilih lebih dari satu. Pilih yang paling kamu prioritaskan sekarang.' },
];

export function AssessmentPage() {
  const { state, navigate, setL1Step, setL1Field, toggleL1Record } = useAssessmentForm();
  const { l1Step, l1Form, l2Form } = state;
  const metrics = useFinancialMetrics(l1Form);
  const analysisResult = useAnalysisResult(l1Form, l2Form, false);

  useEffect(() => {
    trackScreen('l1-assessment');
  }, []);

  const canProceed = () => {
    if (l1Step === 1) return !!l1Form.name.trim();
    if (l1Step === 2) return parseFloat(l1Form.income || '0') > 0 && parseFloat(l1Form.expenses || '0') > 0;
    return true; // Steps 3 and 4 are optional
  };

  const handleNext = () => {
    if (!canProceed()) return;
    trackStepComplete(1, l1Step);
    if (l1Step < TOTAL_STEPS) {
      setL1Step(l1Step + 1);
    } else {
      // Calculate score and navigate to loading
      trackScoreGenerated(analysisResult.score, analysisResult.stage);
      navigate('l1-loading');
    }
  };

  const handleBack = () => {
    if (l1Step > 1) {
      setL1Step(l1Step - 1);
    } else {
      navigate('landing');
    }
  };

  const meta = STEP_META[l1Step - 1];

  return (
    <PageWrapper>
      <StepHeader
        level={1}
        step={l1Step}
        totalSteps={TOTAL_STEPS}
        title={meta.title}
        description={meta.description}
      />

      {l1Step === 1 && (
        <L1Step1Name form={l1Form} onChange={(v) => setL1Field('name', v)} />
      )}
      {l1Step === 2 && (
        <L1Step2Finance
          form={l1Form}
          metrics={metrics}
          onAmountChange={(field, value) => setL1Field(field, value)}
          onDebtTypeToggle={(key) => toggleL1Record('debtTypes', key)}
        />
      )}
      {l1Step === 3 && (
        <L1Step3Habits
          form={l1Form}
          onToggle={(key) => toggleL1Record('habits', key)}
        />
      )}
      {l1Step === 4 && (
        <L1Step4Goals
          form={l1Form}
          onToggle={(key) => toggleL1Record('goals', key)}
        />
      )}

      <FixedNavBar
        onNext={handleNext}
        onBack={handleBack}
        nextLabel={l1Step < TOTAL_STEPS ? 'Lanjut →' : 'Lihat Snapshot Keuanganku →'}
        nextDisabled={!canProceed()}
      />
    </PageWrapper>
  );
}
