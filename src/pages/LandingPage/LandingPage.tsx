import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useAssessmentForm } from '@/hooks/useAssessmentForm';
import { trackScreen, trackCTAClick } from '@/services/analytics';
import { useEffect } from 'react';
import { staggerContainer, fadeInUp } from '@/hooks/useAnimationVariants';

const TRUST_PILLS = ['100% Gratis', 'Tidak perlu login', 'Hasil instan', 'Tanpa registrasi'];

export function LandingPage() {
  const { navigate } = useAssessmentForm();

  useEffect(() => { trackScreen('landing'); }, []);

  const handleStart = () => {
    trackCTAClick('start_assessment');
    navigate('l1-assessment');
  };

  return (
    <div className="min-h-screen bg-loka-cream flex flex-col items-center justify-center px-5 py-12">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="max-w-form w-full text-center"
      >
        {/* Brand pill */}
        <motion.div variants={fadeInUp}>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide bg-loka-green-bg text-loka-green mb-7">
            💳 Loka Finance
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeInUp}
          className="text-[30px] font-extrabold text-loka-text leading-tight tracking-tight mb-3.5"
        >
          Kenali Kondisi Keuanganmu dalam 2 Menit.
        </motion.h1>

        <motion.p variants={fadeInUp} className="text-base text-loka-muted leading-relaxed mb-8">
          Jawab beberapa pertanyaan sederhana dan dapatkan gambaran awal kondisi keuanganmu beserta langkah terbaik berikutnya.
        </motion.p>

        {/* Trust pills */}
        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2 mb-8">
          {TRUST_PILLS.map((pill) => (
            <span
              key={pill}
              className="px-3 py-1.5 rounded-full bg-white border border-loka-border text-xs text-loka-muted"
            >
              {pill}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeInUp} className="max-w-xs mx-auto">
          <Button onClick={handleStart} className="text-[17px] py-[18px]">
            Mulai Financial Check-up →
          </Button>
          <p className="text-xs text-loka-muted/60 mt-3">Dipercaya 70.000+ Teman Loka</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
