import { cn } from '@/lib/utils';

type LoadingSpinnerSize = 'sm' | 'md' | 'lg';

interface LoadingSpinnerProps {
  className?: string;
  fullScreen?: boolean;
  label?: string;
  size?: LoadingSpinnerSize;
}

const sizeClassMap: Record<LoadingSpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function LoadingSpinner({
  className,
  fullScreen = false,
  label = 'Loading...',
  size = 'md',
}: LoadingSpinnerProps) {
  const content = (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <div className={cn('animate-spin rounded-full border-b-2 border-primary', sizeClassMap[size])} />
      <span className='sr-only'>{label}</span>
    </div>
  );

  if (fullScreen) {
    return <div className='min-h-screen bg-background flex items-center justify-center'>{content}</div>;
  }

  return content;
}
