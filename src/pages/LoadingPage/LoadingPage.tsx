import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { L1_LOADING_MESSAGES, L2_LOADING_MESSAGES } from '@/constants';
import { useAssessmentForm } from '@/hooks/useAssessmentForm';
import { loadingItemVariants, staggerContainer } from '@/hooks/useAnimationVariants';

interface LoadingPageProps {
  type: 'l1' | 'l2';
}

export function LoadingPage({ type }: LoadingPageProps) {
  const { navigate } = useAssessmentForm();
  const messages = type === 'l1' ? L1_LOADING_MESSAGES : L2_LOADING_MESSAGES;
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let idx = 0;
    const timer = setInterval(() => {
      idx += 1;
      setVisibleCount(idx);
      if (idx >= messages.length) {
        clearInterval(timer);
        // Navigate to next screen after messages finish
        setTimeout(() => {
          navigate(type === 'l1' ? 'quick-result' : 'full-result');
        }, 900);
      }
    }, 900);
    return () => clearInterval(timer);
  }, [type, messages.length, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 bg-loka-dark">
      <div className="max-w-form w-full">
        {/* Spinner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex justify-center mb-10"
        >
          <div className="relative w-16 h-16">
            <div
              className="absolute inset-0 rounded-full border-4 animate-spin"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
                borderTopColor: '#D8895B',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-2xl">
              💰
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-center text-[11px] font-bold uppercase tracking-widest mb-6"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          {type === 'l1' ? 'Memproses Financial Snapshot' : 'Menganalisis Kondisi Keuangan'}
        </motion.p>

        {/* Message list */}
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <AnimatePresence>
            {messages.slice(0, visibleCount).map((msg, i) => (
              <motion.div
                key={i}
                variants={loadingItemVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3.5 py-3 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{ background: 'rgba(91,138,104,0.3)', color: '#5B8A68' }}
                >
                  ✓
                </motion.div>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.80)' }}>
                  {msg}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
