import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { SectionTitle } from '@/components/layout/SectionTitle';
import { ScoreCard } from '@/components/result/ScoreCard';
import { StageCard } from '@/components/result/StageCard';
import { WarningCard } from '@/components/result/WarningCard';
import { MetricsGrid } from '@/components/result/MetricsGrid';
import { SurplusCard } from '@/components/result/SurplusCard';
import { NetWorthCard } from '@/components/result/NetWorthCard';
import { InsightCard } from '@/components/result/InsightCard';
import { StrengthItem } from '@/components/result/StrengthItem';
import { FocusItem } from '@/components/result/FocusItem';
import { ActionPlanCard } from '@/components/result/ActionPlanCard';
import { Roadmap } from '@/components/result/Roadmap';
import { PlannerCard } from '@/components/recommendation/PlannerCard';
import { PrivateClassCard } from '@/components/recommendation/PrivateClassCard';
import { ConsultationCard } from '@/components/recommendation/ConsultationCard';
import { SaveResultCard } from '@/components/recommendation/SaveResultCard';
import { useAssessmentForm } from '@/hooks/useAssessmentForm';
import { useAnalysisResult } from '@/hooks/useAnalysisResult';
import { STAGE_DATA } from '@/data/stages';
import { trackScreen, trackCTAClick } from '@/services/analytics';
import { staggerContainer, fadeInUp } from '@/hooks/useAnimationVariants';

export function FullResultPage() {
  const { state, reset } = useAssessmentForm();
  const { l1Form, l2Form } = state;

  // Full analysis with L2 data included
  const result = useAnalysisResult(l1Form, l2Form, true);
  const {
    score,
    stage,
    metrics,
    strengths,
    focusAreas,
    warnings,
    insights,
    actionPlan,
    netWorth,
    recommendation,
  } = result;

  const stageData = STAGE_DATA[stage];

  useEffect(() => {
    trackScreen('full-result');
    // Scroll to top when page mounts
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleRetake = () => {
    trackCTAClick('retake_assessment');
    reset();
  };

  const handleShareResult = () => {
    trackCTAClick('share_result');
    if (navigator.share) {
      navigator.share({
        title: 'Hasil Financial Journey Assessment — Loka Finance',
        text: `Skor finansialku: ${score} — Tahap ${stage}. Coba cek kondisi keuanganmu juga!`,
        url: window.location.href,
      }).catch(() => {
        // Share cancelled or not supported — silently fail
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `Skor finansialku: ${score} — Tahap ${stage}. Coba cek kondisi keuanganmu di Loka Finance!`,
      ).catch(() => {
        // Clipboard not available — silently fail
      });
    }
  };

  return (
    <PageWrapper padBottom>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* ── Header ────────────────────────────── */}
        <motion.div variants={fadeInUp} className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide bg-loka-green-bg text-loka-green mb-4">
            📊 Analisis Lengkap
          </span>
          <h1 className="text-[22px] font-extrabold text-loka-text leading-tight">
            Financial Journey Report
          </h1>
          <p className="text-sm text-loka-muted mt-1.5">
            Berdasarkan profil lengkapmu, {l1Form.name || 'Teman Loka'}
          </p>
        </motion.div>

        {/* ── Score ─────────────────────────────── */}
        <ScoreCard
          score={score}
          stage={stage}
          scoreColor={stageData.color}
          name={l1Form.name}
          age={l2Form.age || undefined}
          label="Financial Health Score"
        />

        {/* ── Warnings (pinjol, CC — highest priority) ── */}
        {warnings.length > 0 && (
          <WarningCard warnings={warnings} />
        )}

        {/* ── Stage description ─────────────────── */}
        <StageCard stage={stage} />

        {/* ── Key Metrics ───────────────────────── */}
        <SectionTitle>Metrik Keuangan Utama</SectionTitle>
        <MetricsGrid metrics={metrics} />
        <SurplusCard metrics={metrics} />

        {/* ── Net Worth (only if L2 data available) ── */}
        {netWorth && (
          <>
            <SectionTitle>Posisi Kekayaan Bersih</SectionTitle>
            <NetWorthCard netWorth={netWorth} />
          </>
        )}

        {/* ── Personalized Insight ──────────────── */}
        {insights.length > 0 && (
          <InsightCard insights={insights} />
        )}

        {/* ── Strengths ─────────────────────────── */}
        {strengths.length > 0 && (
          <>
            <SectionTitle>Yang sudah berjalan baik</SectionTitle>
            <motion.div variants={staggerContainer} initial="initial" animate="animate">
              {strengths.map((s) => (
                <StrengthItem key={s.title} item={s} />
              ))}
            </motion.div>
          </>
        )}

        {/* ── Focus Areas ───────────────────────── */}
        {focusAreas.length > 0 && (
          <>
            <SectionTitle>Area yang perlu ditingkatkan</SectionTitle>
            <motion.div variants={staggerContainer} initial="initial" animate="animate">
              {focusAreas.map((f) => (
                <FocusItem key={f.title} item={f} />
              ))}
            </motion.div>
          </>
        )}

        {/* ── Action Plan ───────────────────────── */}
        {actionPlan.length > 0 && (
          <>
            <SectionTitle>Langkah Selanjutnya</SectionTitle>
            <ActionPlanCard steps={actionPlan} />
          </>
        )}

        {/* ── Journey Roadmap ───────────────────── */}
        <SectionTitle>Perjalananmu ke Depan</SectionTitle>
        <Roadmap currentStage={stage} />

        {/* ── Recommendation: Planner ───────────── */}
        {recommendation && (
          <>
            <SectionTitle>Rekomendasi Untukmu</SectionTitle>
            <PlannerCard recommendation={recommendation} />
          </>
        )}

        {/* ── Private Class — Starter + Builder only ── */}
        {(stage === 'Starter' || stage === 'Builder') && (
          <PrivateClassCard />
        )}

        {/* ── 1-on-1 Consultation — Builder, Organizer, Wealth Builder ── */}
        {stage !== 'Starter' && (
          <ConsultationCard />
        )}

        {/* ── Save Result ───────────────────────── */}
        <SaveResultCard result={result} userName={l1Form.name} />

        {/* ── Share + Retake ────────────────────── */}
        <motion.div variants={fadeInUp} className="flex flex-col gap-3 mt-2 pb-8">
          <button
            onClick={handleShareResult}
            className="w-full py-3.5 rounded-xl text-[15px] font-semibold text-loka-green border border-loka-green/25 bg-loka-green-bg hover:bg-loka-green/10 transition-all duration-150"
          >
            Bagikan Hasil Ini →
          </button>
          <button
            onClick={handleRetake}
            className="w-full py-3 rounded-xl text-sm font-medium text-loka-muted hover:text-loka-text transition-colors"
          >
            Ulangi Assessment
          </button>
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
}
