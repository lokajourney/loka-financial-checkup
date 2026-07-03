import { ProgressBar } from '@/components/ui/ProgressBar';

interface StepHeaderProps {
  level: 1 | 2;
  step: number;
  totalSteps: number;
  title: string;
  description: string;
  levelLabel?: string;
}

export function StepHeader({ level, step, totalSteps, title, description, levelLabel }: StepHeaderProps) {
  const levelTag = level === 2 ? 'Level 2 · ' : '';

  return (
    <div className="mb-6">
      <ProgressBar segments={totalSteps} activeSegments={step} className="mb-6" />
      <p className="text-[11px] font-bold text-loka-muted uppercase tracking-widest mb-1.5">
        {levelLabel ?? `${levelTag}Langkah ${step} dari ${totalSteps}`}
      </p>
      <h2 className="text-2xl font-extrabold text-loka-text mb-1.5 tracking-tight">{title}</h2>
      <p className="text-sm text-loka-muted leading-relaxed">{description}</p>
    </div>
  );
}
