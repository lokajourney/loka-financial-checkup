import { Button } from '@/components/ui/Button';

interface FixedNavBarProps {
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  nextLoading?: boolean;
}

export function FixedNavBar({
  onNext,
  onBack,
  nextLabel = 'Lanjut →',
  nextDisabled = false,
  nextLoading = false,
}: FixedNavBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-loka-cream border-t border-loka-border/50 px-5 py-3.5 z-20">
      <div className="max-w-form mx-auto flex gap-2.5">
        {onBack && (
          <Button
            variant="secondary"
            onClick={onBack}
            className="flex-1 text-sm"
            fullWidth={false}
          >
            Kembali
          </Button>
        )}
        <Button
          onClick={onNext}
          disabled={nextDisabled}
          loading={nextLoading}
          className={onBack ? 'flex-[2]' : 'flex-1'}
          fullWidth={false}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
}
