import { Alert } from '@/components/ui/Alert';
import type { Warning } from '@/types/result';

interface WarningCardProps {
  warnings: Warning[];
}

export function WarningCard({ warnings }: WarningCardProps) {
  if (warnings.length === 0) return null;

  return (
    <div>
      {warnings.map((w) => (
        <Alert
          key={w.type}
          variant="danger"
          icon={w.type === 'pinjol' ? '⚠️' : '💳'}
          title={w.title}
          description={w.description}
        />
      ))}
    </div>
  );
}
