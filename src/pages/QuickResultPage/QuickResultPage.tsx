import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ScoreCard } from '@/components/result/ScoreCard';
import { MetricsGrid } from '@/components/result/MetricsGrid';
import { SurplusCard } from '@/components/result/SurplusCard';
import { StrengthItem } from '@/components/result/StrengthItem';
import { FocusItem } from '@/components/result/FocusItem';
import { Alert } from '@/components/ui/Alert';
import { SectionTitle } from '@/components/layout/SectionTitle';
import { UnlockSection } from '@/components/unlock/UnlockSection';
import { useAssessmentForm } from '@/hooks/useAssessmentForm';
import { useAnalysisResult } from '@/hooks/useAnalysisResult';
import { STAGE_DATA } from '@/data/stages';
import { trackScreen } from '@/services/analytics';
import { staggerContainer, fadeInUp } from '@/hooks/useAnimationVariants';

export function QuickResultPage() {
  const { state, navigate } = useAssessmentForm();
  const { l1Form, l2Form } = state;
  const result = useAnalysisResult(l1Form, l2Form, false);
  const { score, stage, metrics, strengths, focusAreas } = result;
  const stageData = STAGE_DATA[stage];
  const hasPinjol = l1Form.debtTypes['pl'];

  useEffect(() => { trackScreen('quick-result'); }, []);

  const handleUnlock = () => {
    navigate('l2-assessment');
  };

  return (
    <PageWrapper padBottom={false}>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="pb-8"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-6">
          <h1 className="text-[22px] font-extrabold text-loka-text mb-1.5">
            Hei, {l1Form.name || 'Teman Loka'}! 👋
          </h1>
          <p className="text-sm text-loka-muted">Ini snapshot singkat kondisi keuanganmu.</p>
        </motion.div>

        <ScoreCard
          score={score}
          stage={stage}
          scoreColor={stageData.color}
          name={l1Form.name}
          label="Snapshot Keuangan"
        />

        {hasPinjol && (
          <Alert
            variant="danger"
            icon="⚠️"
            title="Pinjol terdeteksi"
            description="Lunasin pinjol sebelum fokus ke investasi atau tujuan lain ya."
          />
        )}

        <MetricsGrid metrics={metrics} />
        <SurplusCard metrics={metrics} />

        {strengths.length > 0 && (
          <>
            <SectionTitle>Yang sudah berjalan baik</SectionTitle>
            <motion.div variants={staggerContainer} initial="initial" animate="animate">
              {strengths.map((s) => <StrengthItem key={s.title} item={s} />)}
            </motion.div>
          </>
        )}

        {focusAreas.length > 0 && (
          <>
            <SectionTitle>Fokus yang perlu ditingkatkan</SectionTitle>
            <motion.div variants={staggerContainer} initial="initial" animate="animate">
              {focusAreas.map((f) => <FocusItem key={f.title} item={f} />)}
            </motion.div>
          </>
        )}

        <UnlockSection onUnlock={handleUnlock} />
      </motion.div>
    </PageWrapper>
  );
}
