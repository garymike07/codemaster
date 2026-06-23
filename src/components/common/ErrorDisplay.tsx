import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorDisplayProps {
  className?: string;
  fullScreen?: boolean;
  message: string;
  onRetry?: () => void;
  title?: string;
}

export function ErrorDisplay({
  className,
  fullScreen = false,
  message,
  onRetry,
  title = 'Something went wrong',
}: ErrorDisplayProps) {
  const content = (
    <div className={cn('text-center space-y-4', className)}>
      <div className='text-4xl'>⚠️</div>
      <h2 className='text-xl font-semibold'>{title}</h2>
      <p className='text-muted-foreground max-w-md mx-auto'>{message}</p>
      {onRetry && <Button onClick={onRetry}>Try Again</Button>}
    </div>
  );

  if (fullScreen) {
    return <div className='min-h-screen flex items-center justify-center bg-background'>{content}</div>;
  }

  return content;
}
